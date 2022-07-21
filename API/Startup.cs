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
using Application.Feeds.FeedHub;

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

            // // // == COMMENTED AND REPLACED WITH HEROKU CONFIG
            // services.AddDbContext<DataContext>(opt =>
            // {
            //     // === must add in order to use Lazy Loading Proxies ===
            //     opt.UseLazyLoadingProxies();
            //     // opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            //     opt.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
            // });


            services.AddDbContext<DataContext>(options =>
            {
                options.UseLazyLoadingProxies();

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


            // services.AddServerSentEvents();

            // ===  MEDIATOR ===
            // comment
            services.AddMediatR(typeof(List.Handler).Assembly);

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
                                && ((path.StartsWithSegments("/chat") 
                                    || (path.StartsWithSegments("/message")) 
                                    || (path.StartsWithSegments("/feedhub")) 
                                    || (path.StartsWithSegments("/presence"))))
                                )
                            {
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddSingleton< PresenceTracker>();
            services.AddSingleton<FeedPresenceTracker>();
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

            // app.UseXContentTypeOptions();
            // app.UseReferrerPolicy(opt => opt.NoReferrer());
            // app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            // app.UseXfo(opt => opt.Deny());
            // app.UseCsp(opt => opt
            // .BlockAllMixedContent()
            // .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com", "http://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"))
            // .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", "data:", "https://cdn.jsdelivr.net"))
            // .FormActions(s => s.Self())
            // .FrameAncestors(s => s.Self())
            // // .ImageSources(s => s.Self().CustomSources("https://res.cloudinary.com", "data:", "https://icons.getbootstrap.com", "https://cdn.jsdelivr.net/npm/emoji-datasource-apple"))
            // .ScriptSources(s => s.Self().CustomSources
            // ("sha256-ma5XxS1EBgt17N22Qq31rOxxRWRfzUTQS1KOtfYwuNo=", 
            // "sha256-PmHF+y22EWy0WlrrcqhBTX9F6aYpg6ydu5dOnFQVV7E=", 
            // "sha256-K6uBQM4l8N6EURcKc2ZNQm+Gc1KvdEC8pC/MXadsE+I=",
            // "sha256-3Lf4VvkT+g5P4ttKjNTtwi9JCU/bUA2Ja4zMcjlw27k=",
            // "sha256-/LyxTDXIpXrAQ/Rz0qzI4leFgZ1eYPs2l40VLtOHYYk=",
            // "sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
            // "sha256-QQPGQ6JxqKsyu64fPMwV7cZA6fL+tWpwhvQqaQv0pY4=",
            // "sha256-zM69Aacc2A+NAmKUdtYQzCdWduXTxlDmwpguKPSVGo8=",
            // "sha256-4JqrX7rrNLxYOU9KFPHnQGL6TQuE9qWtUPge+ZpwA9o=",
            // "sha256-XwjND1lF2BByy27WKWeHM83JIFtpK44dNTydjb9W4mM=",
            // "sha256-e/E2+Ei+m9StjuUexPCI3BHbmPJm9vSj4zkB3a1VqEo="
            // ))
            // );

            // if (env.IsDevelopment())
            // {
            //     // commented for own middleware 
            //     // app.UseDeveloperExceptionPage();
            // }

            // app.UseHttpsRedirection();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            // app.MapServerSentEvents("/default-sse-endpoint");

            app.UseEndpoints(endpoints =>
            {
                // === routing provided by route controllers ===
                endpoints.MapControllers();

                // === additional endpoints form SignalR ===
                endpoints.MapHub<ChatHub>("/chat");

                endpoints.MapHub<PrivateMessageHub>("/message");

                endpoints.MapHub<PresenceHub>("/presence");
                
                endpoints.MapHub<FeedHub>("/feedhub");

                // === Fallback ===
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
