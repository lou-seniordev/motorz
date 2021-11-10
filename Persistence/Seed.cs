using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!context.Products.Any())
            {
                var products = new List<Product>
                {
                    new Product
                    {
                        Id = Guid.Parse("FDC7BB35-4A57-4491-AD47-9B0AD9B18637"),
                        Title = "Gloves",
                        Category = "Equipment",
                        Brand = "Dream Time",
                        Model = "De luxe",
                        Price = "100",
                        PictureUrl = "https://res.cloudinary.com/motofy/image/upload/v1636533746/gloves.jpg",
                        DatePublished = DateTime.Now,
                        DateActivated = DateTime.Now,
                        IsActive = true,
                        IsAdvertised = false,
                        ActivationCounter = 1,
                        ProductPhoto = new Photo {
                                    Id = "gloves",
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1636533746/gloves.jpg",
                                }

                    },
                    new Product
                    {
                        Id = Guid.Parse("F84B3E8E-1F1D-45A6-8ED2-7BED090E0D3F"),
                        Title = "Jacket",
                        Category = "Clothing",
                        Brand = "Dainese",
                        Model = "De luxe",
                        Price = "200",
                        PictureUrl = "https://dainese-cdn.thron.com/delivery/public/image/dainese/cbe8919f-c870-4254-9e38-3449a041fc0f/ramfdh/std/615x615/rain-master-lady-d.jpg",
                        DatePublished = DateTime.Now,
                        DateActivated = DateTime.Now,
                        IsActive = true,
                        IsAdvertised = false,
                        ActivationCounter = 1,

                    },
                    new Product
                    {
                        Id = Guid.Parse("811F1598-0D5A-4CF3-91BF-2EC44CCBB7B0"),
                        Title = "Boots",
                        Category = "Clothing",
                        Brand = "Riding Tribe",
                        Model = "Speed X",
                        Price = "75",
                        PictureUrl = "https://img.joomcdn.net/706411a61f6af2566550479c9e9446ff29dda9b0_original.jpeg",
                        DatePublished = DateTime.Now,
                        DateActivated = DateTime.Now,
                        IsActive = true,
                        IsAdvertised = false,
                        ActivationCounter = 1,

                    },
                    new Product
                    {
                        Id = Guid.Parse("0C75E9A7-B737-4838-8D59-04F2B07509C2"),
                        Title = "Front bag",
                        Category = "Equipment",
                        Brand = "Ghost racing",
                        Model = "Speed X",
                        Price = "10",
                        PictureUrl = "https://ae01.alicdn.com/kf/HTB15bM8arr1gK0jSZFDq6z9yVXaG.jpg",
                        DatePublished = DateTime.Now,
                        DateActivated = DateTime.Now,
                        IsActive = true,
                        IsAdvertised = false,
                        ActivationCounter = 1,

                    },

                };

                context.Products.AddRange(products);
                context.SaveChanges();
            }

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com",
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "zfma0utdfu2ce5wyrrmq",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1635271729/zfma0utdfu2ce5wyrrmq.jpg",
                                IsMain = true,
                            }
                        },
                        Products = new List<Product> {
                            new Product {
                                Id = Guid.Parse("AEE0C4FD-C8C8-4184-B91C-7BAC64213821"),
                                Title = "Nolan Helmet",
                                Model = "Nolan N86 Louis Special Full-Face Helmet",
                                Price = "800",
                                Description = "Yet another hit from Nolan: The N86. A versatile full-face helmet brimming with features. The Clima Comfort fabric is fully removable, and the replaceable cheek pads allow the helmet width to be adjusted to suit your head size.",
                                PictureUrl = "https://res.cloudinary.com/motofy/image/upload/v1636482034/nolan_helmet.jpg",
                                Brand ="Nolan",
                                Category = "Gear",
                                ProductPhoto = new Photo {
                                    Id = "709F91A5-C37B-47F9-A210-BEF3979981D6",
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1636482034/nolan_helmet.jpg",
                                }
                            }
                        }

                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com",
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "qc4p1rr7qfymo8pap6ig",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1633544430/qc4p1rr7qfymo8pap6ig.jpg",
                                IsMain = true,
                            }
                        },
                        Products = new List<Product> {
                            new Product {
                                Id = Guid.Parse("D938C1D0-3321-4357-B7C3-D5144C4EEB68"),
                                Title = "Nolan Jacket",
                                Model = "Jack & Jones Nolan Biker Jacket",
                                Price = "35",
                                Description = "Jack & jones Nolan Biker Jacket in the Men´s clothing category from your online fashion store, you can find other products related with Jackets.",
                                PictureUrl = "https://res.cloudinary.com/motofy/image/upload/v1636482030/nolan-biker-jacket.jpg",
                                Brand ="Nolan",
                                Category = "Gear",
                                ProductPhoto = new Photo {
                                    Id = "FBC92591-FD02-4494-9129-C3459DC84D1C",
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1636482030/nolan-biker-jacket.jpg",
                                }
                            }
                        }
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com",
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "ahy5hc8yd7cmeck8xnf7",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1635408836/ahy5hc8yd7cmeck8xnf7.jpg",
                                IsMain = true,
                            }
                        },
                    },
                    new AppUser
                    {
                        Id = "d",
                        DisplayName = "Jerry",
                        UserName = "jerry",
                        Email = "jerry@test.com",
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "nzgorptzllx41uflfmal",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1634079764/nzgorptzllx41uflfmal.jpg",
                                IsMain = true,
                            }
                        },
                    },
                    new AppUser
                    {
                        Id = "e",
                        DisplayName = "Joe",
                        UserName = "joe",
                        Email = "joe@test.com",
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "Joe",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1636485225/Joe.png",
                                IsMain = true,
                            }
                        },
                    },
                    new AppUser
                    {
                        Id = "f",
                        DisplayName = "Emir",
                        UserName = "emir",
                        Email = "emir@test.com"
                    },
                    new AppUser
                    {
                        Id = "g",
                        DisplayName = "Nina",
                        UserName = "nina",
                        Email = "nina@test.com"
                    },
                    new AppUser
                    {
                        Id = "h",
                        DisplayName = "Cato",
                        UserName = "cato",
                        Email = "cato@test.com"
                    },
                    new AppUser
                    {
                        Id = "i",
                        DisplayName = "Giulietta",
                        UserName = "giulietta",
                        Email = "giulietta@test.com"
                    },
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            // === Forumposts
            if (!context.Forumposts.Any())
            {
                var forumposts = new List<Forumpost>
                {
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-2),
                        Title= "Lorem",
                        Body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                        Category = "Offer information"
                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-1),
                        Title= "Explain",
                        Body = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. ",
                        Category = "Ask for assistance"
                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-3),
                        Title= "Again",
                        Body = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?",
                        Category = "Ask for advice"
                    },

                };
                await context.Forumposts.AddRangeAsync(forumposts);
                await context.SaveChangesAsync();
            }

            if (!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Session 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Session 2 months ago",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Past Session 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Session 1 month ago",
                        Category = "Culture",
                        City = "Paris",
                        Venue = "The Louvre",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Session 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Session 1 month in future",
                        Category = "Music",
                        City = "London",
                        Venue = "Wembly Stadium",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Session 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Session 2 months in future",
                        Category = "Food",
                        City = "London",
                        Venue = "Jamies Italian",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Session 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Session 3 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Session 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Session 4 months in future",
                        Category = "Culture",
                        City = "London",
                        Venue = "British Museum",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(4)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Session 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Session 5 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Punch and Judy",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Session 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Session 6 months in future",
                        Category = "Music",
                        City = "London",
                        Venue = "O2 Arena",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Session 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Session 7 months in future",
                        Category = "Travel",
                        City = "Berlin",
                        Venue = "All",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Session 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Session 8 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Session 9",
                        Date = DateTime.Now.AddMonths(9),
                        Description = "Session 9 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Session 10",
                        Date = DateTime.Now.AddMonths(10),
                        Description = "Session 10 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Far future Session 11",
                        Date = DateTime.Now.AddMonths(11),
                        Description = "Session 11 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "d",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                            new UserActivity
                            {
                                AppUserId = "i",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Very far future Session 12",
                        Date = DateTime.Now.AddMonths(12),
                        Description = "Session 12 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "f",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Long far future Session 13",
                        Date = DateTime.Now.AddMonths(13),
                        Description = "Session 13 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "e",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Long far future Session 14",
                        Date = DateTime.Now.AddMonths(14),
                        Description = "Session 14 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "g",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                            new UserActivity
                            {
                                AppUserId = "d",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Never to happen future Session 15",
                        Date = DateTime.Now.AddMonths(15),
                        Description = "Session 15 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "i",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                        }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }

            if (!context.Brands.Any())
            {
                var brands = new List<Brand>
                {
                    new Brand
                    {
                        Id = Guid.Parse("C3E2AE61-BE37-4E22-B3B3-C4C124CCCE8D"),
                        Name = "Moto Guzzi",
                        DateOfEstablishment = DateTime.Now.AddYears(-100),//AddMonths(-200),
                        LogoUrl = "https://res.cloudinary.com/motofy/image/upload/v1635195423/Moto_Guzzi.png",
                        LandOfOrigin = "Italy",
                        CityOfOrigin = "Mandello del Lario",
                    },
                    new Brand
                    {
                        Id = Guid.Parse("7ACE392B-F077-4E4B-8679-2A5D1D8B77A9"),
                        Name = "MV Agusta",
                        DateOfEstablishment = DateTime.Now.AddYears(-76),
                        LogoUrl = "https://res.cloudinary.com/motofy/image/upload/v1636476893/mv_augsta.png8",
                        LandOfOrigin = "Italy",
                        CityOfOrigin = "Varese",
                    },
                    new Brand
                    {
                        Id = Guid.Parse("D1AA07A2-094F-4239-8E98-337E71D6350A"),
                        Name = "Triumph",
                        DateOfEstablishment = DateTime.Now.AddYears(-48),
                        LogoUrl = "https://res.cloudinary.com/motofy/image/upload/v1636476973/Triumph.png",
                        LandOfOrigin = "England",
                        CityOfOrigin = "Hinckley, Leicestershire,",
                    },
                    new Brand
                    {
                        Id = Guid.Parse("5EF0A7C9-5E33-44AF-8DE5-976990F59340"),
                        Name = "Suzuki",
                        DateOfEstablishment = DateTime.Now.AddYears(-111),
                        LogoUrl = "https://res.cloudinary.com/motofy/image/upload/v1636477063/Suzuki.png",
                        LandOfOrigin = "Japan",
                        CityOfOrigin = "Hamamatsu",
                    },
                    new Brand
                    {
                        Id = Guid.Parse("CFBCB816-86D2-4F51-B60D-DCA907BC474D"),
                        Name = "Kawasaki",
                        DateOfEstablishment = DateTime.Now.AddYears(-153),
                        LogoUrl = "https://res.cloudinary.com/motofy/image/upload/v1636477576/kawasaki.png",
                        LandOfOrigin = "Japan",
                        CityOfOrigin = "Tokyo",
                    },
                    new Brand
                    {
                        Id = Guid.Parse("75A7C213-06D2-4EC3-87AD-FFF9F14F83B0"),
                        Name = "Yamaha",
                        DateOfEstablishment = DateTime.Now.AddYears(-76),
                        LogoUrl = "https://res.cloudinary.com/motofy/image/upload/v1636477685/yamaha.png",
                        LandOfOrigin = "Japan",
                        CityOfOrigin = "Iwata",
                    },

                };

                context.Brands.AddRange(brands);
                context.SaveChanges();
            }

            // if (!context.MotofyPhotos.Any())
            // {
            //     var motofyPhotos = new List<MotofyPhoto>
            //     {
            //         new MotofyPhoto
            //         {
            //             // Id = context.Motofies.FirstOrDefault(m => m.Name == "Lillie").Id,
            //             Id = Guid.Parse("084c3b38-6ded-4d5f-ad49-63dd9dca46ae"),
            //             Url = "https://res.cloudinary.com/motofy/image/upload/v1542747581/htzdagawfprqsmbwkb5a.jpg",
            //             DateUploaded = DateTime.Now
            //         },
            //         new MotofyPhoto
            //         {
            //             // Id = context.Motofies.FirstOrDefault(m => m.Name == "King").Id,
            //             Id = Guid.Parse("62d2f63a-46d3-4dd1-84d1-67cdf3c9fb92"),
            //             Url = "https://res.cloudinary.com/motofy/image/upload/v1542881277/hr1axmxfrz6hnnjzmqdl.jpg",
            //             DateUploaded = DateTime.Now

            //         },
            //         new MotofyPhoto
            //         {
            //             // Id = context.Motofies.FirstOrDefault(m => m.Name == "Fly").Id,
            //             Id = Guid.Parse("edc693f8-90b7-4c0a-af6b-5b2c6947becf"),
            //             Url = "https://res.cloudinary.com/motofy/image/upload/v1543859124/qwg8b9xd4z1h9nzjvuzi.jpg",
            //             DateUploaded = DateTime.Now
            //         },
            //         new MotofyPhoto
            //         {
            //             // Id = context.Motofies.FirstOrDefault(m => m.Name == "Tripp").Id,
            //             Id = Guid.Parse("c525b36c-ab52-4e04-8d87-6facd3d70234"),
            //             Url = "https://www.motorcyclespecs.co.za/Gallery%20B/BMW%20R1200GS%20Adventure%2014%20%203.jpg",
            //             DateUploaded = DateTime.Now
            //         },

            //     };
            //     context.MotofyPhotos.AddRange(motofyPhotos);
            //     context.SaveChanges();
            // }
            if (!context.Motofies.Any())
            {
                var motofies = new List<Motofy>
                {
                    new Motofy
                    {
                        Id = Guid.Parse("71d0f37a-4954-425e-9773-300e0669d9bd"),
                        Name = "Lillie",
                        Model = "620 Dark",
                        // BrandId = Guid.Parse("1c8326c8-5843-48e9-aa3b-16496e1ca897"),

                        // Brand = "Ducati",

                        Brand = new Brand
                        {
                            Id = Guid.Parse("1c8326c8-5843-48e9-aa3b-16496e1ca897"),
                            Name = "Ducati",
                            DateOfEstablishment = DateTime.Now.AddYears(-94),//AddMonths(-200),
                            LogoUrl = "https://res.cloudinary.com/motofy/image/upload/v1634591641/ducati.png",
                            LandOfOrigin = "Italy",
                            CityOfOrigin = "Bologna",
                        },
                        CubicCentimeters = "620",
                        PhotoUrl = "https://res.cloudinary.com/motofy/image/upload/v1542747581/htzdagawfprqsmbwkb5a.jpg",
                        
                        //Url = "https://res.cloudinary.com/motofy/image/upload/v1542747581/htzdagawfprqsmbwkb5a.jpg",
                        Description = "The often forgotten about Multistrada 620 is an absolutely brilliant bike for those looking for a practical do-it-all that has a bit of Italian charm without too many of the associated hassles.",
                        // YearOfProduction = DateTime.Now.AddYears(-15),
                        MotofyPhoto = new MotofyPhoto {
                            // Id = context.MotofyPhotos.FirstOrDefault(s => s.Id == Guid.Parse("084c3b38-6ded-4d5f-ad49-63dd9dca46ae")).Id,
                            // Id = Guid.Parse("084c3b38-6ded-4d5f-ad49-63dd9dca46ae"),
                            Id = "084c3b38-6ded-4d5f-ad49-63dd9dca46ae",
                            Url = "https://res.cloudinary.com/motofy/image/upload/v1542747581/htzdagawfprqsmbwkb5a.jpg",
                            DateUploaded = DateTime.Now,
                            MotofyForeignKey = Guid.Parse("71d0f37a-4954-425e-9773-300e0669d9bd")
                        },
                        YearOfProduction = "2005",
                        DatePublished = DateTime.Now.AddDays(-100),
                        City = "Rome",
                        Country = "Italy",
                        PricePaid = "2000",
                        EstimatedValue = "3000",
                        NumberOfKilometers = "67100",

                        UserMotofies = new List<UserMotofy>
                        {
                            new UserMotofy
                            {
                                AppUserId = "a",
                                IsOwner = true,
                                DateEmbraced = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Motofy
                    {
                        Id = Guid.Parse("7c54ae0d-f927-4fc0-bde5-7c18a6514928"),
                        Name = "King",
                        Model = "Sportster",
                        // BrandId = Guid.Parse("43d5a027-67e2-42ac-b210-6c7b8d1fc591"),

                        // Brand = "Harley-Davidson",

                        Brand = new Brand
                        {
                            Id = Guid.Parse("43d5a027-67e2-42ac-b210-6c7b8d1fc591"),
                            Name = "Harley-Davidson",
                            DateOfEstablishment = DateTime.Now.AddYears(-117),
                            LogoUrl = "https://res.cloudinary.com/motofy/image/upload/v1634592025/harley.png",
                            LandOfOrigin = "USA",
                            CityOfOrigin = "Milwaukee, Wisconsin",
                        },
                        CubicCentimeters = "700",
                        // PhotoUrl = "https://res.cloudinary.com/motofy/image/upload/v1542881277/hr1axmxfrz6hnnjzmqdl.jpg",
                        PhotoUrl = "https://res.cloudinary.com/motofy/image/upload/v1542881277/hr1axmxfrz6hnnjzmqdl.jpg",

                        Description = "Harley-Davidson Sportster cusom bikes - bobbers, choppers and cafe racers. We do NOT own the video materials and all credits belong to respectful owners. In case of copyright issues, please contact us immediately for further credits or clip delete.",
                        // YearOfProduction = DateTime.Now.AddYears(-25),
                        MotofyPhoto = new MotofyPhoto {
                            // Id = Guid.Parse("62d2f63a-46d3-4dd1-84d1-67cdf3c9fb92"),
                            Id = "62d2f63a-46d3-4dd1-84d1-67cdf3c9fb92",
                            Url = "https://res.cloudinary.com/motofy/image/upload/v1542881277/hr1axmxfrz6hnnjzmqdl.jpg",
                            DateUploaded = DateTime.Now,
                            MotofyForeignKey = Guid.Parse("7c54ae0d-f927-4fc0-bde5-7c18a6514928"),
                            // Id = context.MotofyPhotos.FirstOrDefault(s => s.Id == Guid.Parse("62d2f63a-46d3-4dd1-84d1-67cdf3c9fb92")).Id,
                        },
                        YearOfProduction = "2015",
                        DatePublished = DateTime.Now.AddDays(-10),
                        City = "Berlin",
                        Country = "Germany",
                        PricePaid = "4000",
                        EstimatedValue = "4000",
                        NumberOfKilometers = "107100",
                         UserMotofies = new List<UserMotofy>
                        {
                            new UserMotofy
                            {
                                AppUserId = "b",
                                IsOwner = true,
                                DateEmbraced = DateTime.Now.AddMonths(-1)
                            }
                        }

                    },
                    new Motofy
                    {
                        Id = Guid.Parse("b2613251-e8aa-4d30-b9ab-4f243b64075d"),
                        Name = "Fly",
                        Model = "Hornet",
                        // BrandId = Guid.Parse("a585178f-1252-413a-939f-b8640e93a940"),

                        // Brand = "Honda",
                        Brand = new Brand
                        {
                            Id = Guid.Parse("a585178f-1252-413a-939f-b8640e93a940"),
                            Name = "Honda",
                            DateOfEstablishment = DateTime.Now.AddYears(-72),
                            LogoUrl = "https://res.cloudinary.com/motofy/image/upload/v1634591918/honda.png",
                            LandOfOrigin = "Japan",
                            CityOfOrigin = "Hamamatsu, Shizuoka",
                        },
                        CubicCentimeters = "700",
                        PhotoUrl = "https://res.cloudinary.com/motofy/image/upload/v1543859124/qwg8b9xd4z1h9nzjvuzi.jpg",

                        Description = "Honda CB Hornet 160R is powered by the same engine that used to serve Honda CB Unicorn. It houses a 162.71cc, single-cylinder, air-cooled 4-stroke SI engine with Honda Eco Technology (HET) that is mated to 5-speed gearbox.",
                        // YearOfProduction = DateTime.Now.AddYears(-8), edc693f8-90b7-4c0a-af6b-5b2c6947becf
                        MotofyPhoto = new MotofyPhoto {
                            // Id = context.MotofyPhotos.FirstOrDefault(s => s.Id == Guid.Parse("edc693f8-90b7-4c0a-af6b-5b2c6947becf")).Id,
                            // Id = Guid.Parse("edc693f8-90b7-4c0a-af6b-5b2c6947becf"),
                            Id = "edc693f8-90b7-4c0a-af6b-5b2c6947becf",
                            Url = "https://res.cloudinary.com/motofy/image/upload/v1543859124/qwg8b9xd4z1h9nzjvuzi.jpg",
                            DateUploaded = DateTime.Now,
                            MotofyForeignKey = Guid.Parse("b2613251-e8aa-4d30-b9ab-4f243b64075d")

                        },
                        YearOfProduction = "2018",
                        DatePublished = DateTime.Now.AddDays(-85),
                        City = "Ljubljana",
                        Country = "Slovenia",
                        PricePaid = "2000",
                        EstimatedValue = "2000",
                        NumberOfKilometers = "30100",
                        UserMotofies = new List<UserMotofy>
                        {
                            new UserMotofy
                            {
                                AppUserId = "c",
                                IsOwner = true,
                                DateEmbraced = DateTime.Now.AddMonths(-2)
                            }
                        }

                    },
                    new Motofy
                    {
                        Id = Guid.Parse("02d05033-ec4c-4fb5-9477-95ddb8ce5e39"),
                        Name = "Tripp",
                        Model = "R 1200GS LC Adventure",
                        // BrandId = Guid.Parse("e22940da-0bc9-4f66-9875-504f47335f31"),
                        // Brand = "BMW",
                        Brand = new Brand
                        {
                            Id = Guid.Parse("e22940da-0bc9-4f66-9875-504f47335f31"),
                            Name = "BMW",
                            DateOfEstablishment = DateTime.Now.AddYears(-104),
                            LogoUrl = "https://res.cloudinary.com/motofy/image/upload/v1634591827/bmw.png",
                            LandOfOrigin = "Germany",
                            CityOfOrigin = "Munchen",
                        },
                        CubicCentimeters = "1200",
                        PhotoUrl = "https://www.motorcyclespecs.co.za/Gallery%20B/BMW%20R1200GS%20Adventure%2014%20%203.jpg",

                        Description = "The BMW R1200GS is one of the best selling motorcycles of all time. And yet, as I prepared to make a purchase of a 2018 lowered rallye model, I found a surprising dearth of meaningful answers to my questions and concerns.",
                        // YearOfProduction = DateTime.Now.AddYears(-2),
                        MotofyPhoto = new MotofyPhoto {
                            // Id = context.MotofyPhotos.FirstOrDefault(s => s.Id == Guid.Parse("c525b36c-ab52-4e04-8d87-6facd3d70234")).Id,
                            // Id = Guid.Parse("c525b36c-ab52-4e04-8d87-6facd3d70234"),
                            Id = "c525b36c-ab52-4e04-8d87-6facd3d70234",
                            Url = "https://www.motorcyclespecs.co.za/Gallery%20B/BMW%20R1200GS%20Adventure%2014%20%203.jpg",
                            DateUploaded = DateTime.Now,
                            MotofyForeignKey = Guid.Parse("02d05033-ec4c-4fb5-9477-95ddb8ce5e39")

                        },
                        YearOfProduction = "2012",
                        DatePublished = DateTime.Now.AddDays(-40),
                        City = "Zurich",
                        Country = "Switzerland",
                        PricePaid = "12000",
                        EstimatedValue = "10000",
                        NumberOfKilometers = "7100",
                        UserMotofies = new List<UserMotofy>
                        {
                            new UserMotofy
                            {
                                AppUserId = "a",
                                IsOwner = false,
                                DateEmbraced = DateTime.Now.AddMonths(-2)
                            }
                        }

                    },

                };

                context.Motofies.AddRange(motofies);
                context.SaveChanges();
            }

            if (!context.Mechanics.Any())
            {
                var mechanics = new List<Mechanic>
                {
                    new Mechanic
                    {
                      Name = "Corrado",
                      PhotoUrl = "https://res.cloudinary.com/motofy/image/upload/v1547320881/prgbklusjdbenfbqtqfy.jpg",
                      Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                      YearOfStart = "2008",//DateTime.Now.AddYears(-10),
                      DatePublished = DateTime.Now.AddDays(-40),
                      Country = "Italy",
                      City = "Rome",
                      Address = "Tor Pignattara 107",

                    },
                    new Mechanic
                    {
                      Name = "Serena",
                      PhotoUrl = "https://res.cloudinary.com/motofy/image/upload/v1562103618/nz6xfbrz5zrsdhvqwevw.jpg",
                      Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                      YearOfStart = "1999", //DateTime.Now.AddYears(-8),
                      DatePublished = DateTime.Now.AddDays(-10),
                      Country = "Italy",
                      City = "Rome",
                      Address = "Via Riccardo Riccardi 10",

                    },
                    new Mechanic
                    {
                      Name = "Gian Luca",
                      PhotoUrl = "https://static.cargurus.com/images/article/2019/09/13/14/35/how_to_talk_to_a_mechanic-pic-8471425371895651297-1600x1200.jpeg",
                      Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                      YearOfStart = "2017",//DateTime.Now.AddYears(-2),
                      DatePublished = DateTime.Now.AddDays(-3),
                      Country = "Italy",
                      City = "Rome",
                      Address = "Via Del Corso 107",

                    },
                };
                context.Mechanics.AddRange(mechanics);
                context.SaveChanges();
            }



        }
    }
}