using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser, AppRole,  string, 
    IdentityUserClaim<string>, AppUserRole, IdentityUserLogin<string>, 
    IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityPhoto> ActivityPhotos { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<DiaryEntry> DiaryEntries { get; set; }
        public DbSet<DiaryPhoto> DiaryPhotos { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductViewer> ProductViewers { get; set; }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> Followings { get; set; }

        // === MOTOFY ===
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Motofy> Motofies { get; set; }
        public DbSet<MotofyPhoto> MotofyPhotos { get; set; }
        public DbSet<Forumpost> Forumposts { get; set; }
        public DbSet<Mechanic> Mechanics { get; set; }
        public DbSet<MechanicBrand> MechanicBrands { get; set; }
        public DbSet<UserMotofy> UserMotofies { get; set; }

        //==Redundant but kept for future options== (code:finduser)

        public DbSet<Testimonial> Testimonials { get; set; }

        public DbSet<PrivateMessageThread> PrivateMessageThreads { get; set; }
        public DbSet<PrivateMessage> PrivateMessages { get; set; }

        public DbSet<Group> Groups { get; set; }
        public DbSet<Connection> Connections { get; set; }

        //=== COMMENTS FOR THE REST OF THE SECTIONS ===
        public DbSet<CommentMotofy> CommentMotofies { get; set; }
        public DbSet<CommentMechanic> CommentMechanics { get; set; }
        public DbSet<CommentForumPost> CommentForumPosts { get; set; }

        //=== Refactor Mechanic ===
        public DbSet<UserMechanic> UserMechanics { get; set; }
        public DbSet<Country> Countries { get; set; }

        //=== Entity Photos ===
        public DbSet<ProductPhoto> ProductPhotos { get; set; }
        public DbSet<MechanicPhoto> MechanicPhotos { get; set; }
        public DbSet<MotofyScore> MotofyScores { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        //=== Rating ===
        public DbSet<AverageRating> AverageRatings { get; set; }

        //=== ForumpostRating ===
        public DbSet<ForumpostRating> ForumpostRatings { get; set; }

        // === Feed ===
        public DbSet<Feed> Feeds { get; set; }
        public DbSet<FeedNotifyee> FeedNotifyees { get; set; }

        // === User Ranking ===
        public DbSet<Rank> Ranks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

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
                new { um.AppUserId, um.MotofyId }));

            builder.Entity<UserMotofy>()
                .HasOne(u => u.AppUser)
                .WithMany(m => m.UserMotofies)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserMotofy>()
                .HasOne(m => m.Motofy)
                .WithMany(u => u.UserMotofies)
                .HasForeignKey(m => m.MotofyId);



            // ==== end ====

            // ==== One more many2many for UserMechanic====
            builder.Entity<UserMechanic>(x => x.HasKey(um =>
                new { um.AppUserId, um.MechanicId }));

            builder.Entity<UserMechanic>()
                .HasOne(u => u.AppUser)
                .WithMany(m => m.Mechanics)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserMechanic>()
                .HasOne(m => m.Mechanic)
                .WithMany(u => u.Customers)
                .HasForeignKey(m => m.MechanicId);


            builder.Entity<MechanicBrand>(x => x.HasKey(mb =>
                new { mb.MechanicId, mb.BrandId }));

            builder.Entity<MechanicBrand>()
                .HasOne(b => b.Brand)
                .WithMany(m => m.Mechanics)
                .HasForeignKey(b => b.BrandId);

            builder.Entity<MechanicBrand>()
                .HasOne(m => m.Mechanic)
                .WithMany(b => b.Brands)
                .HasForeignKey(m => m.MechanicId);


            builder.Entity<ProductViewer>(x => x.HasKey(pm =>
                new { pm.AppUserId, pm.ProductId }));

            builder.Entity<ProductViewer>()
                .HasOne(u => u.AppUser)
                .WithMany(p => p.ViewingProducts)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<ProductViewer>()
                .HasOne(p => p.Product)
                .WithMany(v => v.Viewers)
                .HasForeignKey(m => m.ProductId);

            // === define m2m relationship for users and roles ===
            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(r => r.Role)
                .HasForeignKey(r => r.RoleId)
                .IsRequired();

            // === define one2many relationship ===
            // builder.Entity<Motofy>()
            //     .HasOne(m => m.Brand)
            //     .WithMany(b => b.Motofies)
            //     .OnDelete(DeleteBehavior.SetNull);

            // === selfreferencing many2many relationship ===
            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });

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

            // ==== one to one ===
            builder.Entity<Motofy>()
            .HasOne(a => a.MotofyPhoto)
            .WithOne(m => m.Motofy)
            .HasForeignKey<MotofyPhoto>(m => m.MotofyForeignKey);
           
            builder.Entity<Activity>()
            .HasOne(a => a.ActivityPhoto)
            .WithOne(m => m.Activity)
            .HasForeignKey<ActivityPhoto>(m => m.ActivityForeignKey);

            builder.Entity<Mechanic>()
            .HasOne(a => a.MechanicPhoto)
            .WithOne(m => m.Mechanic)
            .HasForeignKey<MechanicPhoto>(m => m.MechanicForeignKey);

            builder.Entity<Product>()
            .HasOne(a => a.ProductPhoto)
            .WithOne(m => m.Product)
            .HasForeignKey<ProductPhoto>(m => m.ProductForeignKey);

            builder.Entity<DiaryEntry>()
            .HasOne(a => a.DiaryPhoto)
            .WithOne(m => m.DiaryEntry)
            .HasForeignKey<DiaryPhoto>(m => m.DiaryEntryForeignKey);

            builder.Entity<PrivateMessage>()
            .HasOne(u => u.Recipient)
            .WithMany(m => m.PrivateMessagesReceived)
            .OnDelete(DeleteBehavior.Restrict);
            //--recipient
            builder.Entity<PrivateMessage>()
            .HasOne(u => u.Sender)
            .WithMany(m => m.PrivateMessagesSent)
            .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
