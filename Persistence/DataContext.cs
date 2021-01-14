using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Photo> Photos { get; set; }

        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> Followings { get; set; }

        // === MOTOFY ===
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Motofy> Motofies { get; set; }
        public DbSet<Forumpost> Forumposts { get; set; } 
        public DbSet<Mechanic> Mechanics { get; set; }

        public DbSet<UserMotofy> UserMotofies { get; set; }
        // coming soon...
        public DbSet<Testimonial> Testimonials { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "Value 101 First" },
                    new Value { Id = 2, Name = "Value 102 Second" },
                    new Value { Id = 3, Name = "Value 103 Third" },
                    new Value { Id = 4, Name = "Value 104 Fourth" }
                );

            // === define many2many relationship ===
            builder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.AppUserId, ua.ActivityId }));

            builder.Entity<UserActivity>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.UserActivities)
                .HasForeignKey(u => u.AppUserId);
            
            builder.Entity<UserActivity>()
                .HasOne(a => a.Activity)
                .WithMany(a => a.UserActivities)
                .HasForeignKey(a => a.ActivityId);
            // ==== end ====

            // ==== One more many2many ====
            builder.Entity<UserMotofy>(x => x.HasKey(um => 
                new {um.AppUserId, um.MotofyId}));

            builder.Entity<UserMotofy>()
                .HasOne(u => u.AppUser)
                .WithMany(m => m.UserMotofies)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserMotofy>()
                .HasOne(m => m.Motofy)
                .WithMany(u => u.UserMotofies)
                .HasForeignKey(m => m.MotofyId);

            // ==== end ====

            // === define one2many relationship ===
            // builder.Entity<Motofy>()
            //     .HasOne(m => m.Brand)
            //     .WithMany(b => b.Motofies)
            //     .OnDelete(DeleteBehavior.SetNull);

            // === selfreferencing many2many relationship ===
            builder.Entity<UserFollowing>(b => 
            {
                b.HasKey(k => new {k.ObserverId, k.TargetId});

                b.HasOne(o => o.Observer)
                    .WithMany(f => f.Followings) 
                    .HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.Restrict);
                b.HasOne(o => o.Target)
                    .WithMany(f => f.Followers) 
                    .HasForeignKey(o => o.TargetId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
            // ==== end ====
             
        }
    }
}
