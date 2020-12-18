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
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
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
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
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
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
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
                        Title = "Future Activity 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity 1 month in future",
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
                        Title = "Future Activity 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future",
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
                        Title = "Future Activity 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 3 months in future",
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
                        Title = "Future Activity 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 4 months in future",
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
                        Title = "Future Activity 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 5 months in future",
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
                        Title = "Future Activity 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Activity 6 months in future",
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
                        Title = "Future Activity 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Activity 7 months in future",
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
                        Title = "Future Activity 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
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
                        Id = Guid.Parse("1c8326c8-5843-48e9-aa3b-16496e1ca897"),
                        Name = "Ducati",
                        DateOfEstablishment = DateTime.Now.AddYears(-94),//AddMonths(-200),
                        LogoUrl = "https://unsplash.com/photos/s0QMav76pmQ",
                        LandOfOrigin = "Italy",
                        CityOfOrigin = "Bologna",
                    },
                    new Brand
                    {
                        Id = Guid.Parse("a585178f-1252-413a-939f-b8640e93a940"),
                        Name = "Honda",
                        DateOfEstablishment = DateTime.Now.AddYears(-72),
                        LogoUrl = "https://unsplash.com/photos/5CchtuTTFs8",
                        LandOfOrigin = "Japan",
                        CityOfOrigin = "Hamamatsu, Shizuoka",
                    },
                    new Brand
                    {
                        Id = Guid.Parse("e22940da-0bc9-4f66-9875-504f47335f31"),
                        Name = "BMW",
                        DateOfEstablishment = DateTime.Now.AddYears(-104),
                        LogoUrl = "https://unsplash.com/photos/WuRsjF4iZK0",
                        LandOfOrigin = "Germany",
                        CityOfOrigin = "Munchen",
                    },
                    new Brand
                    {
                        Id = Guid.Parse("43d5a027-67e2-42ac-b210-6c7b8d1fc591"),
                        Name = "Harley-Davidson",
                        DateOfEstablishment = DateTime.Now.AddYears(-117),
                        LogoUrl = "https://unsplash.com/photos/YRGsG4oiNIg",
                        LandOfOrigin = "USA",
                        CityOfOrigin = "Milwaukee, Wisconsin",
                    },

                };

                context.Brands.AddRange(brands);
                context.SaveChanges();
            }

            if (!context.Motofies.Any())
            {
                var motofies = new List<Motofy>
                {
                    new Motofy
                    {
                        Name = "Lillie",
                        Model = "620 Dark",
                        // Brand = new Brand
                        // {
                        //     Id = Guid.Parse("1c8326c8-5843-48e9-aa3b-16496e1ca897"),
                        //     Name = "Ducati",
                        //     DateOfEstablishment = DateTime.Now.AddYears(-94),//AddMonths(-200),
                        //     LogoUrl = "https://unsplash.com/photos/s0QMav76pmQ",
                        //     LandOfOrigin = "Italy",
                        //     CityOfOrigin = "Bologna",
                        // },
                        CubicCentimeters = "620",
                        PhotoUrl = "https://res.cloudinary.com/motofy/image/upload/v1542747581/htzdagawfprqsmbwkb5a.jpg",
                        Description = "The often forgotten about Multistrada 620 is an absolutely brilliant bike for those looking for a practical do-it-all that has a bit of Italian charm without too many of the associated hassles.",
                        // YearOfProduction = DateTime.Now.AddYears(-15),
                        YearOfProduction = "2005",
                        DatePublished = DateTime.Now.AddDays(-100),
                        City = "Rome",
                        Country = "Italy",
                        PricePaid = "2000",
                        EstimatedValue = "3000",
                        NumberOfKilometers = "67100",
                    },
                    new Motofy
                    {
                        Name = "King",
                        Model = "Sportster",
                        // BrandId = Guid.Parse("43d5a027-67e2-42ac-b210-6c7b8d1fc591"),
                        // Brand = "Harley-Davidson",
                        // Brand = new Brand
                        // {
                        //     Id = Guid.Parse("43d5a027-67e2-42ac-b210-6c7b8d1fc591"),
                        //     Name = "Harley-Davidson",
                        //     DateOfEstablishment = DateTime.Now.AddYears(-117),
                        //     LogoUrl = "https://unsplash.com/photos/YRGsG4oiNIg",
                        //     LandOfOrigin = "USA",
                        //     CityOfOrigin = "Milwaukee, Wisconsin",
                        // },
                        CubicCentimeters = "700",
                        PhotoUrl = "https://res.cloudinary.com/motofy/image/upload/v1542881277/hr1axmxfrz6hnnjzmqdl.jpg",
                        Description = "Harley-Davidson Sportster cusom bikes - bobbers, choppers and cafe racers. We do NOT own the video materials and all credits belong to respectful owners. In case of copyright issues, please contact us immediately for further credits or clip delete.",
                        // YearOfProduction = DateTime.Now.AddYears(-25),
                        YearOfProduction = "2015",
                        DatePublished = DateTime.Now.AddDays(-10),
                        City = "Berlin",
                        Country = "Germany",
                        PricePaid = "4000",
                        EstimatedValue = "4000",
                        NumberOfKilometers = "107100",

                    },
                    new Motofy
                    {
                        Name = "Fly",
                        Model = "Hornet",
                        // BrandId = Guid.Parse("a585178f-1252-413a-939f-b8640e93a940"),
                        // Brand = "Honda",
                        // Brand = new Brand
                        // {
                        //     Id = Guid.Parse("a585178f-1252-413a-939f-b8640e93a940"),
                        //     Name = "Honda",
                        //     DateOfEstablishment = DateTime.Now.AddYears(-72),
                        //     LogoUrl = "https://unsplash.com/photos/5CchtuTTFs8",
                        //     LandOfOrigin = "Japan",
                        //     CityOfOrigin = "Hamamatsu, Shizuoka",
                        // },
                        CubicCentimeters = "700",
                        PhotoUrl = "https://res.cloudinary.com/motofy/image/upload/v1543859124/qwg8b9xd4z1h9nzjvuzi.jpg",
                        Description = "Honda CB Hornet 160R is powered by the same engine that used to serve Honda CB Unicorn. It houses a 162.71cc, single-cylinder, air-cooled 4-stroke SI engine with Honda Eco Technology (HET) that is mated to 5-speed gearbox.",
                        // YearOfProduction = DateTime.Now.AddYears(-8),
                        YearOfProduction = "2018",
                        DatePublished = DateTime.Now.AddDays(-85),
                        City = "Ljubljana",
                        Country = "Slovenia",
                        PricePaid = "2000",
                        EstimatedValue = "2000",
                        NumberOfKilometers = "30100",

                    },
                    new Motofy
                    {
                        Name = "Tripp",
                        Model = "R 1200GS LC Adventure",
                        // BrandId = Guid.Parse("e22940da-0bc9-4f66-9875-504f47335f31"),
                        // Brand = "BMW",
                        // Brand = new Brand
                        // {
                        //     Id = Guid.Parse("e22940da-0bc9-4f66-9875-504f47335f31"),
                        //     Name = "BMW",
                        //     DateOfEstablishment = DateTime.Now.AddYears(-104),
                        //     LogoUrl = "https://unsplash.com/photos/WuRsjF4iZK0",
                        //     LandOfOrigin = "Germany",
                        //     CityOfOrigin = "Munchen",
                        // },
                        CubicCentimeters = "1200",
                        PhotoUrl = "https://www.motorcyclespecs.co.za/Gallery%20B/BMW%20R1200GS%20Adventure%2014%20%203.jpg",
                        Description = "The BMW R1200GS is one of the best selling motorcycles of all time. And yet, as I prepared to make a purchase of a 2018 lowered rallye model, I found a surprising dearth of meaningful answers to my questions and concerns.",
                        // YearOfProduction = DateTime.Now.AddYears(-2),
                        YearOfProduction = "2012",
                        DatePublished = DateTime.Now.AddDays(-40),
                        City = "Zurich",
                        Country = "Switzerland",
                        PricePaid = "12000",
                        EstimatedValue = "10000",
                        NumberOfKilometers = "7100",

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
                      PhotoUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40SumeetKhanna%2Fwhat-are-the-characteristics-of-a-good-auto-repair-mechanic-c366d4473ef3&psig=AOvVaw0xra-NJpcyS0iDcgeu6yeU&ust=1607101396013000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIicw7Glsu0CFQAAAAAdAAAAABAD",
                      Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                      YearOfStart = DateTime.Now.AddYears(-10),
                      DatePublished = DateTime.Now.AddDays(-40),
                      Country = "Italy",
                      City = "Rome",
                      Address = "Tor Pignattara 107",

                    },
                    new Mechanic
                    {
                      Name = "Serena",
                      PhotoUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40SumeetKhanna%2Fwhat-are-the-characteristics-of-a-good-auto-repair-mechanic-c366d4473ef3&psig=AOvVaw0xra-NJpcyS0iDcgeu6yeU&ust=1607101396013000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIicw7Glsu0CFQAAAAAdAAAAABAD",
                      Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                      YearOfStart = DateTime.Now.AddYears(-8),
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
                      YearOfStart = DateTime.Now.AddYears(-2),
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