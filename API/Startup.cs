// using Application.Activities;
// using Application.Brands;
using System.Text;
using System;
using API.Middleware;
using Application.Activities;
using Application.Interfaces;
using Domain;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using AutoMapper;
using Infrastructure.Photos;
using System.Threading.Tasks;
using API.SignalR;
using Application.Profiles;
using Coravel;
using API.Workers;
using Infrastructure.Email;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // // == COMMENTED AND REPLACED WITH HEROKU CONFIG
            // services.AddDbContext<DataContext>(opt =>
            // {
            //     // === must add in order to use Lazy Loading Proxies ===
            //     opt.UseLazyLoadingProxies();
            //     // opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            //     opt.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
            // });


            services.AddDbContext<DataContext>(options =>
        {
            // options.UseLazyLoadingProxies();
             
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            string connStr;

            // Depending on if in development or production, use either Heroku-provided
            // connection string, or development connection string from env var.
            if (env == "Development")
            {
                // Use connection string from file.
                connStr = _configuration.GetConnectionString("DefaultConnection");
            }
            else
            {
                // Use connection string provided at runtime by Heroku.
                var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                // Parse connection URL to connection string for Npgsql
                connUrl = connUrl.Replace("postgres://", string.Empty);
                var pgUserPass = connUrl.Split("@")[0];
                var pgHostPortDb = connUrl.Split("@")[1];
                var pgHostPort = pgHostPortDb.Split("/")[0];
                var pgDb = pgHostPortDb.Split("/")[1];
                var pgUser = pgUserPass.Split(":")[0];
                var pgPass = pgUserPass.Split(":")[1];
                var pgHost = pgHostPort.Split(":")[0];
                var pgPort = pgHostPort.Split(":")[1];

                connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; SSL Mode=Require; Trust Server Certificate=true";
            }

            // Whether the connection string came from the local development configuration file
            // or from the environment variable from Heroku, use it to set up your DbContext.
            options.UseNpgsql(connStr);
        });


            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(cfg =>
                {
                    // here might be necessery to specify all folders
                    cfg.RegisterValidatorsFromAssemblyContaining<Create>();
                });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader()
                          .AllowAnyMethod()
                          .WithExposedHeaders("WWW-Authenticate")
                          .WithOrigins("http://localhost:3000")
                          .AllowCredentials();
                });
            });
             // === SCHEDULER ===
            services.AddScheduler();
            services.AddTransient<ProcessExpiredProducts>();
            services.AddTransient<ProcessInactiveProducts>();

            // ===  MEDIATOR ===
            // comment
            services.AddMediatR(typeof(List.Handler).Assembly);

            // uncomment
            // services.AddMediatR(typeof(Application.Activities.List.Handler).Assembly);
            // services.AddMediatR(typeof(Application.Mechanics.List.Handler).Assembly);
            // services.AddMediatR(typeof(Application.Motofies.List.Handler).Assembly);

            // === AUTOMAPPER ===
            services.AddAutoMapper(typeof(List.Handler));

            // === SIGNAL R ===
            services.AddSignalR();

            var builder = services.AddIdentityCore<AppUser>(options => 
            {
                options.SignIn.RequireConfirmedEmail = true;
            });
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();
            identityBuilder.AddDefaultTokenProviders();


            // === IS ACTIVITY HOST (ONE POSSIBLE WAY)===
            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsActivityHost", policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });
            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

            // === IS MOTOFY OWNER ===
            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsMotofyOwner", policy =>
                {
                    policy.Requirements.Add(new IsOwnerRequirement());
                });
            });
            // === AddTransient() - only for the life time of operation, not the complete request ===
            services.AddTransient<IAuthorizationHandler, IsOwnerRequirementHandler>();

            // === AUTHENTICATION === 
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };

                    // === add token to signal R ===
                    opt.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) 
                                && (
                                    (path.StartsWithSegments("/chat") 
                                || 
                                (path.StartsWithSegments("/message")) 
                                ))
                                )
                            {
                                context.Token = accessToken;
                            }
                          
                            return Task.CompletedTask;
                        }
                    };
                });
           

            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddScoped<IEntityPhotoAccessor, EntityPhotoAccessor>();
            services.AddScoped<IProfileReader, ProfileReader>();
            services.AddScoped<IEmailSender, EmailSender>();
            services.Configure<CloudinarySettings>(Configuration.GetSection("Cloudinary"));
            services.Configure<SendGridSettings>(Configuration.GetSection("SendGrid"));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {
                // commented for own middleware 
                // app.UseDeveloperExceptionPage();
            }

            // app.UseHttpsRedirection();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                // === routing provided by route controllers ===
                endpoints.MapControllers();

                // === additional endpoints form SignalR ===
                endpoints.MapHub<ChatHub>("/chat");

                endpoints.MapHub<PrivateMessageHub>("/message");
                
                // === 
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
