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
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, 
            RoleManager<AppRole> roleManager)
        {
            bool initialRun = false;

            if (!context.Countries.Any())
            {
                var countries = new List<Country>
                {
                    new Country { Name = "Afghanistan", CountryCode = "af" },
                    new Country { Name = "Aland Islands", CountryCode = "ax" },
                    new Country { Name = "Albania", CountryCode = "al" },
                    new Country { Name = "Algeria", CountryCode = "dz" },
                    new Country { Name = "American Samoa", CountryCode = "as" },
                    new Country { Name = "Andorra", CountryCode = "ad" },
                    new Country { Name = "Angola", CountryCode = "ao" },
                    new Country { Name = "Anguilla", CountryCode = "ai" },
                    new Country { Name = "Antigua", CountryCode = "ag" },
                    new Country { Name = "Argentina", CountryCode = "ar" },
                    new Country { Name = "Armenia", CountryCode = "am" },
                    new Country { Name = "Aruba", CountryCode = "aw" },
                    new Country { Name = "Australia", CountryCode = "au" },
                    new Country { Name = "Austria", CountryCode = "at" },
                    new Country { Name = "Azerbaijan", CountryCode = "az" },
                    new Country { Name = "Bahamas", CountryCode = "bs" },
                    new Country { Name = "Bahrain", CountryCode = "bh" },
                    new Country { Name = "Bangladesh", CountryCode = "bd" },
                    new Country { Name = "Barbados", CountryCode = "bb" },
                    new Country { Name = "Belarus", CountryCode = "by" },
                    new Country { Name = "Belgium", CountryCode = "be" },
                    new Country { Name = "Belize", CountryCode = "bz" },
                    new Country { Name = "Benin", CountryCode = "bj" },
                    new Country { Name = "Bermuda", CountryCode = "bm" },
                    new Country { Name = "Bhutan", CountryCode = "bt" },
                    new Country { Name = "Bolivia", CountryCode = "bo" },
                    new Country { Name = "Bosnia", CountryCode = "ba" },
                    new Country { Name = "Botswana", CountryCode = "bw" },
                    new Country { Name = "Bouvet Island", CountryCode = "bv" },
                    new Country { Name = "Brazil", CountryCode = "br" },
                    new Country { Name = "British Virgin Islands", CountryCode = "vg" },
                    new Country { Name = "Brunei", CountryCode = "bn" },
                    new Country { Name = "Bulgaria", CountryCode = "bg" },
                    new Country { Name = "Burkina Faso", CountryCode = "bf" },
                    new Country { Name = "Burma", CountryCode = "mm" },//, alias = "Myanmar
                    new Country { Name = "Burundi", CountryCode = "bi" },
                    new Country { Name = "Caicos Islands", CountryCode = "tc" },
                    new Country { Name = "Cambodia", CountryCode = "kh" },
                    new Country { Name = "Cameroon", CountryCode = "cm" },
                    new Country { Name = "Canada", CountryCode = "ca" },
                    new Country { Name = "Cape Verde", CountryCode = "cv" },
                    new Country { Name = "Cayman Islands", CountryCode = "ky" },
                    new Country { Name = "Central African Republic", CountryCode = "cf" },
                    new Country { Name = "Chad", CountryCode = "td" },
                    new Country { Name = "Chile", CountryCode = "cl" },
                    new Country { Name = "China", CountryCode = "cn" },
                    new Country { Name = "Christmas Island", CountryCode = "cx" },
                    new Country { Name = "Cocos Islands", CountryCode = "cc" },
                    new Country { Name = "Colombia", CountryCode = "co" },
                    new Country { Name = "Comoros", CountryCode = "km" },
                    new Country { Name = "Congo", CountryCode = "cd" },
                    new Country { Name = "Congo Brazzaville", CountryCode = "cg" },
                    new Country { Name = "Cook Islands", CountryCode = "ck" },
                    new Country { Name = "Costa Rica", CountryCode = "cr" },
                    new Country { Name = "Cote Divoire", CountryCode = "ci" },
                    new Country { Name = "Croatia", CountryCode = "hr" },
                    new Country { Name = "Cuba", CountryCode = "cu" },
                    new Country { Name = "Cyprus", CountryCode = "cy" },
                    new Country { Name = "Czech Republic", CountryCode = "cz" },
                    new Country { Name = "Denmark", CountryCode = "dk" },
                    new Country { Name = "Djibouti", CountryCode = "dj" },
                    new Country { Name = "Dominica", CountryCode = "dm" },
                    new Country { Name = "Dominican Republic", CountryCode = "do" },
                    new Country { Name = "Ecuador", CountryCode = "ec" },
                    new Country { Name = "Egypt", CountryCode = "eg" },
                    new Country { Name = "El Salvador", CountryCode = "sv" },
                    // new Country { Name = "England", CountryCode = "gb eng" },
                    new Country { Name = "Equatorial Guinea", CountryCode = "gq" },
                    new Country { Name = "Eritrea", CountryCode = "er" },
                    new Country { Name = "Estonia", CountryCode = "ee" },
                    new Country { Name = "Ethiopia", CountryCode = "et" },
                    new Country { Name = "Europeanunion", CountryCode = "eu" },
                    new Country { Name = "Falkland Islands", CountryCode = "fk" },
                    new Country { Name = "Faroe Islands", CountryCode = "fo" },
                    new Country { Name = "Fiji", CountryCode = "fj" },
                    new Country { Name = "Finland", CountryCode = "fi" },
                    new Country { Name = "France", CountryCode = "fr" },
                    new Country { Name = "French Guiana", CountryCode = "gf" },
                    new Country { Name = "French Polynesia", CountryCode = "pf" },
                    new Country { Name = "French Territories", CountryCode = "tf" },
                    new Country { Name = "Gabon", CountryCode = "ga" },
                    new Country { Name = "Gambia", CountryCode = "gm" },
                    new Country { Name = "Georgia", CountryCode = "ge" },
                    new Country { Name = "Germany", CountryCode = "de" },
                    new Country { Name = "Ghana", CountryCode = "gh" },
                    new Country { Name = "Gibraltar", CountryCode = "gi" },
                    new Country { Name = "Greece", CountryCode = "gr" },
                    new Country { Name = "Greenland", CountryCode = "gl" },
                    new Country { Name = "Grenada", CountryCode = "gd" },
                    new Country { Name = "Guadeloupe", CountryCode = "gp" },
                    new Country { Name = "Guam", CountryCode = "gu" },
                    new Country { Name = "Guatemala", CountryCode = "gt" },
                    new Country { Name = "Guinea", CountryCode = "gn" },
                    new Country { Name = "Guinea-Bissau", CountryCode = "gw" },
                    new Country { Name = "Guyana", CountryCode = "gy" },
                    new Country { Name = "Haiti", CountryCode = "ht" },
                    new Country { Name = "Heard Island", CountryCode = "hm" },
                    new Country { Name = "Honduras", CountryCode = "hn" },
                    new Country { Name = "Hong Kong", CountryCode = "hk" },
                    new Country { Name = "Hungary", CountryCode = "hu" },
                    new Country { Name = "Iceland", CountryCode = "is" },
                    new Country { Name = "India", CountryCode = "in" },
                    new Country { Name = "Indian Ocean Territory", CountryCode = "io" },
                    new Country { Name = "Indonesia", CountryCode = "id" },
                    new Country { Name = "Iran", CountryCode = "ir" },
                    new Country { Name = "Iraq", CountryCode = "iq" },
                    new Country { Name = "Ireland", CountryCode = "ie" },
                    new Country { Name = "Israel", CountryCode = "il" },
                    new Country { Name = "Italy", CountryCode = "it" },
                    new Country { Name = "Jamaica", CountryCode = "jm" },
                    new Country { Name = "Jan Mayen", CountryCode = "sj" },//, alias = "Svalbard"
                    new Country { Name = "Japan", CountryCode = "jp" },
                    new Country { Name = "Jordan", CountryCode = "jo" },
                    new Country { Name = "Kazakhstan", CountryCode = "kz" },
                    new Country { Name = "Kenya", CountryCode = "ke" },
                    new Country { Name = "Kiribati", CountryCode = "ki" },
                    new Country { Name = "Kuwait", CountryCode = "kw" },
                    new Country { Name = "Kyrgyzstan", CountryCode = "kg" },
                    new Country { Name = "Laos", CountryCode = "la" },
                    new Country { Name = "Latvia", CountryCode = "lv" },
                    new Country { Name = "Lebanon", CountryCode = "lb" },
                    new Country { Name = "Lesotho", CountryCode = "ls" },
                    new Country { Name = "Liberia", CountryCode = "lr" },
                    new Country { Name = "Libya", CountryCode = "ly" },
                    new Country { Name = "Liechtenstein", CountryCode = "li" },
                    new Country { Name = "Lithuania", CountryCode = "lt" },
                    new Country { Name = "Luxembourg", CountryCode = "lu" },
                    new Country { Name = "Macau", CountryCode = "mo" },
                    new Country { Name = "Macedonia", CountryCode = "mk" },
                    new Country { Name = "Madagascar", CountryCode = "mg" },
                    new Country { Name = "Malawi", CountryCode = "mw" },
                    new Country { Name = "Malaysia", CountryCode = "my" },
                    new Country { Name = "Maldives", CountryCode = "mv" },
                    new Country { Name = "Mali", CountryCode = "ml" },
                    new Country { Name = "Malta", CountryCode = "mt" },
                    new Country { Name = "Marshall Islands", CountryCode = "mh" },
                    new Country { Name = "Martinique", CountryCode = "mq" },
                    new Country { Name = "Mauritania", CountryCode = "mr" },
                    new Country { Name = "Mauritius", CountryCode = "mu" },
                    new Country { Name = "Mayotte", CountryCode = "yt" },
                    new Country { Name = "Mexico", CountryCode = "mx" },
                    new Country { Name = "Micronesia", CountryCode = "fm" },
                    new Country { Name = "Moldova", CountryCode = "md" },
                    new Country { Name = "Monaco", CountryCode = "mc" },
                    new Country { Name = "Mongolia", CountryCode = "mn" },
                    new Country { Name = "Montenegro", CountryCode = "me" },
                    new Country { Name = "Montserrat", CountryCode = "ms" },
                    new Country { Name = "Morocco", CountryCode = "ma" },
                    new Country { Name = "Mozambique", CountryCode = "mz" },
                    new Country { Name = "Namibia", CountryCode = "na" },
                    new Country { Name = "Nauru", CountryCode = "nr" },
                    new Country { Name = "Nepal", CountryCode = "np" },
                    new Country { Name = "Netherlands", CountryCode = "nl" },
                    new Country { Name = "Netherlandsantilles", CountryCode = "an" },
                    new Country { Name = "New Caledonia", CountryCode = "nc" },
                    new Country { Name = "New Guinea", CountryCode = "pg" },
                    new Country { Name = "New Zealand", CountryCode = "nz" },
                    new Country { Name = "Nicaragua", CountryCode = "ni" },
                    new Country { Name = "Niger", CountryCode = "ne" },
                    new Country { Name = "Nigeria", CountryCode = "ng" },
                    new Country { Name = "Niue", CountryCode = "nu" },
                    new Country { Name = "Norfolk Island", CountryCode = "nf" },
                    new Country { Name = "North Korea", CountryCode = "kp" },
                    new Country { Name = "Northern Mariana Islands", CountryCode = "mp" },
                    new Country { Name = "Norway", CountryCode = "no" },
                    new Country { Name = "Oman", CountryCode = "om" },
                    new Country { Name = "Pakistan", CountryCode = "pk" },
                    new Country { Name = "Palau", CountryCode = "pw" },
                    new Country { Name = "Palestine", CountryCode = "ps" },
                    new Country { Name = "Panama", CountryCode = "pa" },
                    new Country { Name = "Paraguay", CountryCode = "py" },
                    new Country { Name = "Peru", CountryCode = "pe" },
                    new Country { Name = "Philippines", CountryCode = "ph" },
                    new Country { Name = "Pitcairn Islands", CountryCode = "pn" },
                    new Country { Name = "Poland", CountryCode = "pl" },
                    new Country { Name = "Portugal", CountryCode = "pt" },
                    new Country { Name = "Puerto Rico", CountryCode = "pr" },
                    new Country { Name = "Qatar", CountryCode = "qa" },
                    new Country { Name = "Reunion", CountryCode = "re" },
                    new Country { Name = "Romania", CountryCode = "ro" },
                    new Country { Name = "Russia", CountryCode = "ru" },
                    new Country { Name = "Rwanda", CountryCode = "rw" },
                    new Country { Name = "Saint Helena", CountryCode = "sh" },
                    new Country { Name = "Saint Kitts and Nevis", CountryCode = "kn" },
                    new Country { Name = "Saint Lucia", CountryCode = "lc" },
                    new Country { Name = "Saint Pierre", CountryCode = "pm" },
                    new Country { Name = "Saint Vincent", CountryCode = "vc" },
                    new Country { Name = "Samoa", CountryCode = "ws" },
                    new Country { Name = "San Marino", CountryCode = "sm" },
                    new Country { Name = "Sandwich Islands", CountryCode = "gs" },
                    new Country { Name = "Sao Tome", CountryCode = "st" },
                    new Country { Name = "Saudi Arabia", CountryCode = "sa" },
                    new Country { Name = "Scotland", CountryCode = "gb sct" },
                    new Country { Name = "Senegal", CountryCode = "sn" },
                    // new Country { Name = "Serbia", CountryCode = "cs" },
                    new Country { Name = "Serbia", CountryCode = "rs" },
                    new Country { Name = "Seychelles", CountryCode = "sc" },
                    new Country { Name = "Sierra Leone", CountryCode = "sl" },
                    new Country { Name = "Singapore", CountryCode = "sg" },
                    new Country { Name = "Slovakia", CountryCode = "sk" },
                    new Country { Name = "Slovenia", CountryCode = "si" },
                    new Country { Name = "Solomon Islands", CountryCode = "sb" },
                    new Country { Name = "Somalia", CountryCode = "so" },
                    new Country { Name = "South Africa", CountryCode = "za" },
                    new Country { Name = "South Korea", CountryCode = "kr" },
                    new Country { Name = "Spain", CountryCode = "es" },
                    new Country { Name = "Sri Lanka", CountryCode = "lk" },
                    new Country { Name = "Sudan", CountryCode = "sd" },
                    new Country { Name = "SuriName", CountryCode = "sr" },
                    new Country { Name = "Swaziland", CountryCode = "sz" },
                    new Country { Name = "Sweden", CountryCode = "se" },
                    new Country { Name = "Switzerland", CountryCode = "ch" },
                    new Country { Name = "Syria", CountryCode = "sy" },
                    new Country { Name = "Taiwan", CountryCode = "tw" },
                    new Country { Name = "Tajikistan", CountryCode = "tj" },
                    new Country { Name = "Tanzania", CountryCode = "tz" },
                    new Country { Name = "Thailand", CountryCode = "th" },
                    new Country { Name = "Timorleste", CountryCode = "tl" },
                    new Country { Name = "Togo", CountryCode = "tg" },
                    new Country { Name = "Tokelau", CountryCode = "tk" },
                    new Country { Name = "Tonga", CountryCode = "to" },
                    new Country { Name = "Trinidad", CountryCode = "tt" },
                    new Country { Name = "Tunisia", CountryCode = "tn" },
                    new Country { Name = "Turkey", CountryCode = "tr" },
                    new Country { Name = "Turkmenistan", CountryCode = "tm" },
                    new Country { Name = "Tuvalu", CountryCode = "tv" },
                    new Country { Name = "U.A.E.", CountryCode = "ae" },//, alias = "United Arab Emirates"
                    new Country { Name = "Uganda", CountryCode = "ug" },
                    new Country { Name = "Ukraine", CountryCode = "ua" },
                    new Country { Name = "United Kingdom", CountryCode = "gb" },//, alias = "uk"
                    new Country { Name = "United States", CountryCode = "us" },//, alias = "America"
                    new Country { Name = "Uruguay", CountryCode = "uy" },
                    new Country { Name = "US Minor Islands", CountryCode = "um" },
                    new Country { Name = "US Virgin Islands", CountryCode = "vi" },
                    new Country { Name = "Uzbekistan", CountryCode = "uz" },
                    new Country { Name = "Vanuatu", CountryCode = "vu" },
                    new Country { Name = "Vatican City", CountryCode = "va" },
                    new Country { Name = "Venezuela", CountryCode = "ve" },
                    new Country { Name = "Vietnam", CountryCode = "vn" },
                    new Country { Name = "Wales", CountryCode = "gb wls" },
                    new Country { Name = "Wallis and Futuna", CountryCode = "wf" },
                    new Country { Name = "Western Sahara", CountryCode = "eh" },
                    new Country { Name = "Yemen", CountryCode = "ye" },
                    new Country { Name = "Zambia", CountryCode = "zm" },
                    new Country { Name = "Zimbabwe", CountryCode = "zw" },

                };

                context.Countries.AddRange(countries);
                context.SaveChanges();
            }
            if (initialRun)
            {

                // if (!context.Brands.Any())
                // {
                var brands = new List<Brand>
                {

                    new Brand
                    {
                        Id = Guid.Parse("7ACE392B-F077-4E4B-8679-2A5D1D8B77A9"),
                        Name = "MV Agusta",
                        DateOfEstablishment = DateTime.Now.AddYears(-76),
                        LogoUrl = "https://res.cloudinary.com/motofy/image/upload/v1636476893/mv_augsta.png",
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
                };
                context.Brands.AddRange(brands);
                context.SaveChanges();
                // }
            }
            if(!context.Ranks.Any())
            {
                var ranks = new List<Rank>
                {
                    new Rank
                    {
                        Id= "new-member",
                        Title = "New Member",
                        LogoUrl="https://res.cloudinary.com/motofy/image/upload/v1658926892/new-member.png"
                    },
                    new Rank
                    {
                        Id= "silver-eagle",
                        Title = "Silver Eagle",
                        LogoUrl="https://res.cloudinary.com/motofy/image/upload/v1658926892/silver-eagle.png"
                    },
                    new Rank
                    {
                        Id= "blue-dragon",
                        Title = "Blue Dragon",
                        LogoUrl="https://res.cloudinary.com/motofy/image/upload/v1658926892/blue-dragon.png"
                    },
                    new Rank
                    {
                        Id= "gold-lightning",
                        Title = "Gold Lightning",
                        LogoUrl="https://res.cloudinary.com/motofy/image/upload/v1658926892/gold-lightning.png"
                    },
                    new Rank
                    {
                        Id= "platinium-thunder",
                        Title = "Platinium Thunder",
                        LogoUrl="https://res.cloudinary.com/motofy/image/upload/v1658926892/platinium-thunder.png"
                    },
                    new Rank
                    {
                        Id= "diamond-rider",
                        Title = "Diamond Rider",
                        LogoUrl="https://res.cloudinary.com/motofy/image/upload/v1658926892/diamond-rider.png"
                    },
                    new Rank
                    {
                        Id= "unicorn",
                        Title = "Unicorn",
                        LogoUrl="https://res.cloudinary.com/motofy/image/upload/v1658926893/unicorn.png"
                    }
                };
                context.Ranks.AddRange(ranks);
                context.SaveChanges();
            }

            if (!userManager.Users.Any())
            {
                var roles = new List<AppRole>
                {
                    new AppRole{Name = "Member"},
                    new AppRole{Name = "Moderator"},
                    new AppRole{Name = "Admin"}
                };

                foreach(var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }

                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com",
                        EmailConfirmed = true,
                        City = "London",
                        Country = "UK",
                        Gender = "Masculine",
                        DateOfBirth = DateTime.Now.AddYears(-50),
                        JoinedUs = DateTime.Now.AddMonths(-2),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "blue-dragon"),
                        Points = 15,
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
                                Brand ="Nolan",
                                Category = "Gear",
                                City= "Zagreb",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Croatia"),//"Italy",
                                NumberSeen = 10,
                                NumberFollowed = 2,
                                DatePublished = DateTime.Now.AddDays(-2),
                                DateActivated = DateTime.Now.AddDays(-2),
                                InactivityExpirationDate = DateTime.Now.AddDays(29),
                                ActivationCounter = 0,
                                PhoneNumber= "+38533890279",
                                ProductPhoto = new ProductPhoto
                                {
                                    Id = "709F91A5-C37B-47F9-A210-BEF3979981D6",
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1636482034/nolan_helmet.jpg",
                                }
                            },
                            new Product
                            {
                                Id = Guid.Parse("FDC7BB35-4A57-4491-AD47-9B0AD9B18637"),
                                Title = "Gloves",
                                Category = "Equipment",
                                City= "Rome",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),//"Italy",
                                PhoneNumber= "+3933890279",
                                Brand = "Dream Time",
                                Model = "De luxe",
                                Price = "100",
                                DatePublished = DateTime.Now.AddDays(-1),
                                DateActivated = DateTime.Now.AddDays(-1),
                                InactivityExpirationDate = DateTime.Now.AddDays(29),
                                IsActive = true,
                                IsAdvertised = false,
                                NumberSeen = 20,
                                NumberFollowed = 2,
                                ActivationCounter = 1,
                                ProductPhoto = new ProductPhoto
                                {
                                    Id = "gloves",
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1636533746/gloves.jpg",
                                }
                            },
                            new Product
                            {
                                Id = Guid.Parse("F84B3E8E-1F1D-45A6-8ED2-7BED090E0D3F"),
                                Title = "Jacket",
                                Category = "Clothing",
                                City= "Berlin",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Germany"),//"Italy",
                                PhoneNumber= "+4933890279",
                                Brand = "Dainese",
                                Model = "Rain master lady d",
                                Price = "200",
                                DatePublished = DateTime.Now.AddDays(-1),
                                DateActivated = DateTime.Now.AddDays(-1),
                                InactivityExpirationDate = DateTime.Now.AddDays(29),
                                IsActive = true,
                                IsAdvertised = false,
                                NumberSeen = 0,
                                ActivationCounter = 0,
                                ProductPhoto = new ProductPhoto
                                {
                                    Id = "rain-master-lady-d",
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1637227543/rain-master-lady-d.png",
                                }
                            },

                        }

                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com",
                        EmailConfirmed = true,
                        City = "London",
                        Country = "UK",
                        Gender = "Feminine",
                        DateOfBirth = DateTime.Now.AddYears(-35),
                        JoinedUs = DateTime.Now.AddMonths(-1),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "blue-dragon"),
                        Points = 15,
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
                                Description = "Jack & jones Nolan Biker Jacket in the Men??s clothing category from your online fashion store, you can find other products related with Jackets.",
                                Brand ="Nolan",
                                Category = "Gear",
                                City= "Ljubljana",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Slovenia"),
                                PhoneNumber= "+38633890279",
                                NumberSeen = 4,
                                NumberFollowed = 2,
                                DatePublished = DateTime.Now.AddDays(-1),
                                DateActivated = DateTime.Now.AddDays(-1),
                                InactivityExpirationDate = DateTime.Now.AddDays(29),
                                IsActive = true,
                                IsAdvertised = false,
                                ActivationCounter = 0,
                                ProductPhoto = new ProductPhoto
                                {
                                    Id = "FBC92591-FD02-4494-9129-C3459DC84D1C",
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1636482030/nolan-biker-jacket.jpg",
                                }
                            },
                              new Product
                            {
                                Id = Guid.Parse("811F1598-0D5A-4CF3-91BF-2EC44CCBB7B0"),
                                Title = "Boots",
                                Category = "Clothing",
                                City= "London",
                                // Country= "UK",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "United Kingdom"),//"Italy",
                                PhoneNumber= "+4433890279",
                                Brand = "Riding Tribe",
                                Model = "Speed X",
                                Price = "75",
                                NumberSeen = 4  ,
                                DatePublished = DateTime.Now.AddDays(-1),
                                DateActivated = DateTime.Now.AddDays(-1),
                                InactivityExpirationDate = DateTime.Now.AddDays(29),
                                IsActive = true,
                                IsAdvertised = false,
                                ActivationCounter = 0,
                                 ProductPhoto = new ProductPhoto
                                {
                                    Id = "42EDB659-CB21-43EF-9726-43648A254144",
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1637227585/boots.jpg",
                                }

                            },
                            new Product
                            {
                                Id = Guid.Parse("0C75E9A7-B737-4838-8D59-04F2B07509C2"),
                                Title = "Front bag",
                                Category = "Equipment",
                                City= "Zurich",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Switzerland"),
                                PhoneNumber= "+4133890279",
                                Brand = "Ghost racing",
                                Model = "Speed X",
                                Price = "10",
                                DatePublished = DateTime.Now.AddDays(-1),
                                DateActivated = DateTime.Now.AddDays(-1),
                                InactivityExpirationDate = DateTime.Now.AddDays(29),
                                IsActive = true,
                                IsAdvertised = false,
                                NumberSeen = 4,
                                ActivationCounter = 1,
                                ProductPhoto = new ProductPhoto {
                                    Id = "3AEE7FCA-C73E-4BF6-8799-B938E260A0D8",
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1637227717/front_bag.jpg",
                                }
                            },

                        }
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com",
                        EmailConfirmed = true,
                        City = "London",
                        Country = "UK",
                        Gender = "Masculine",
                        DateOfBirth = DateTime.Now.AddYears(-55),
                        JoinedUs = DateTime.Now.AddMonths(-1),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "blue-dragon"),
                        Points = 15,
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "ahy5hc8yd7cmeck8xnf7",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1635408836/ahy5hc8yd7cmeck8xnf7.jpg",
                                IsMain = true,
                            }
                        },
                         Products = new List<Product> {
                            new Product {
                                Id =  Guid.Parse("484920EB-71BA-4D83-834B-0CA4A8F85A68"),
                                Title = "Kawasaki",
                                Model = "Ninja",
                                Price = "3500",
                                Description = "Motorcycle & Engine Company is the sole division of Kawasaki Heavy Industries, Ltd. that provides products directly to general consumers.",
                                Brand ="Kawasaki",
                                Category = "Vehicle",
                                City= "Pula",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Croatia"),
                                NumberSeen = 4,
                                DatePublished = DateTime.Now.AddDays(-1),
                                DateActivated = DateTime.Now.AddDays(-1),
                                InactivityExpirationDate = DateTime.Now.AddDays(29),
                                PhoneNumber= "+38633890279",
                                ProductPhoto = new ProductPhoto {
                                    Id = "smflae7fk3rgjcui7nwh",
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1646951575/sx13no7gnp7qubrzxb1f.jpg",
                                }
                            },
                              new Product
                            {
                                Id = new Guid(),
                                Title = "Sticker Hells Angels",
                                Category = "Equipment",
                                City= "Zagreb",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Croatia"),
                                PhoneNumber= "+38633890279",
                                Brand = "X Tribe",
                                Model = "Large",
                                Price = "3",
                                DatePublished = DateTime.Now.AddDays(-1),
                                DateActivated = DateTime.Now.AddDays(-1),
                                InactivityExpirationDate = DateTime.Now.AddDays(29),
                                IsActive = true,
                                IsAdvertised = false,
                                NumberSeen = 4,
                                ActivationCounter = 0,
                                 ProductPhoto = new ProductPhoto {
                                    Id = "vrvqrnc8ek12tlpix7fu",
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1562097989/vrvqrnc8ek12tlpix7fu.jpg",
                                }

                            },
                            new Product
                            {
                                Id = new Guid(),
                                Title = "Sticker Born For Speed",
                                Category = "Equipment",
                                City= "Zagreb",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Croatia"),
                                PhoneNumber= "+4133890279",
                                Brand = "X sticker",
                                Model = "Small",
                                Price = "1",
                                DatePublished = DateTime.Now.AddDays(-1),
                                DateActivated = DateTime.Now.AddDays(-1),
                                InactivityExpirationDate = DateTime.Now.AddDays(29),
                                IsActive = true,
                                IsAdvertised = false,
                                ActivationCounter = 1,
                                ProductPhoto = new ProductPhoto {
                                    Id = "nz6xfbrz5zrsdhvqwevw",
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1562103618/nz6xfbrz5zrsdhvqwevw.jpg",
                                }
                            },

                        }
                    },
                    new AppUser
                    {
                        Id = "d",
                        DisplayName = "Jerry",
                        UserName = "jerry",
                        Email = "jerry@test.com",
                        EmailConfirmed = true,
                        City = "London",
                        Country = "UK",
                        Gender = "Masculine",
                        DateOfBirth = DateTime.Now.AddYears(-50),
                        JoinedUs = DateTime.Now.AddMonths(-2),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "blue-dragon"),
                        Points = 15,
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "nzgorptzllx41uflfmal",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1634079764/nzgorptzllx41uflfmal.jpg",
                                IsMain = true,
                            }
                        },
                        Products = new List<Product>
                        {
                            new Product
                            {
                                Id = new Guid(),
                                Title = "Toy",
                                Category = "Other",
                                City= "Zurich",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Switzerland"),
                                PhoneNumber= "+4138686858",
                                Brand = "Speed toys",
                                Model = "Little suzuki",
                                Price = "55",
                                DatePublished = DateTime.Now,
                                DateActivated = DateTime.Now,
                                InactivityExpirationDate = DateTime.Now.AddDays(30),
                                IsActive = true,
                                IsAdvertised = false,
                                NumberSeen = 44,
                                ActivationCounter = 1,
                                ProductPhoto = new ProductPhoto {
                                    Id = "djq0puodrzfqvkur2fjo",
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1547297184/djq0puodrzfqvkur2fjo.png",
                                }

                            },
                        }
                    },
                    new AppUser
                    {
                        Id = "e",
                        DisplayName = "Joe",
                        UserName = "joe",
                        Email = "joe@test.com",
                        EmailConfirmed = true,
                        City = "London",
                        Country = "UK",
                        Gender = "Masculine",
                        DateOfBirth = DateTime.Now.AddYears(-50),
                        JoinedUs = DateTime.Now.AddMonths(-2),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "silver-eagle"),
                        Points = 50,
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "Joe",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1645198489/amqdrvytyqc1yttxbasa.jpg",
                                IsMain = true,
                            }
                        },
                    },
                    new AppUser
                    {
                        Id = "f",
                        DisplayName = "Emir",
                        UserName = "emir",
                        Email = "emir@test.com",
                        EmailConfirmed = true,
                        City = "Rome",
                        Country = "Italy",
                        Gender = "Masculine",
                        DateOfBirth = DateTime.Now.AddYears(-50),
                        JoinedUs = DateTime.Now.AddMonths(-2),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "unicorn"),
                        Points = 800,
                    },
                    new AppUser
                    {
                        Id = "g",
                        DisplayName = "Nina",
                        UserName = "nina",
                        Email = "nina@test.com",
                        EmailConfirmed = true,
                        City = "Ljubljana",
                        Country = "Slovenia",
                        Gender = "Feminine",
                        DateOfBirth = DateTime.Now.AddYears(-50),
                        JoinedUs = DateTime.Now.AddMonths(-2),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "unicorn"),
                        Points = 750,
                    },
                    new AppUser
                    {
                        Id = "h",
                        DisplayName = "Cato",
                        UserName = "cato",
                        Email = "cato@test.com",
                        EmailConfirmed = true,
                        City = "Wienna",
                        Country = "Austria",
                        Gender = "Masculine",
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "silver-eagle"),
                        DateOfBirth = DateTime.Now.AddYears(-8),
                        JoinedUs = DateTime.Now.AddMonths(-3),
                        Points = 125,
                    },
                    new AppUser
                    {
                        Id = "i",
                        DisplayName = "Giulietta",
                        UserName = "giulietta",
                        Email = "giulietta@test.com",
                        EmailConfirmed = true,
                        City = "Paris",
                        Country = "France",
                        Gender = "Feminine",
                        DateOfBirth = DateTime.Now.AddYears(-15),
                        JoinedUs = DateTime.Now.AddMonths(-1),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "silver-eagle"),
                        Points = 25,
                    },
                    new AppUser
                    {
                        Id = "ia",
                        DisplayName = "test_user_1",
                        UserName = "test_user_1",
                        Email = "test_user_1@test.com",
                        EmailConfirmed = true,
                        City = "Lyon",
                        Country = "France",
                        Gender = "Feminine",
                        DateOfBirth = DateTime.Now.AddYears(-25),
                        JoinedUs = DateTime.Now.AddDays(-10),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "new-member"),
                        Points = 5,
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "ia",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1646211270/rmbhtcq0tbgmzm6ge3dc.jpg",
                                IsMain = true,
                            }
                        },
                    },
                    new AppUser
                    {
                        Id = "ib",
                        DisplayName = "test_user_2",
                        UserName = "test_user_2",
                        Email = "test_user_2@test.com",
                        EmailConfirmed = true,
                        City = "Marseille",
                        Country = "France",
                        Gender = "Feminine",
                        DateOfBirth = DateTime.Now.AddYears(-35),
                        JoinedUs = DateTime.Now.AddDays(-10),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "new-member"),
                        Points = 5,
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "ib",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1646211270/rmbhtcq0tbgmzm6ge3dc.jpg",
                                IsMain = true,
                            }
                        },
                    },
                    new AppUser
                    {
                        Id = "ic",
                        DisplayName = "test_user_3",
                        UserName = "test_user_3",
                        Email = "test_user_3@test.com",
                        EmailConfirmed = true,
                        City = "Milan",
                        Country = "Italy",
                        Gender = "Masculine",
                        DateOfBirth = DateTime.Now.AddYears(-54),
                        JoinedUs = DateTime.Now.AddDays(-10),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "new-member"),
                        Points = 5,
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "ic",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1646211270/rmbhtcq0tbgmzm6ge3dc.jpg",
                                IsMain = true,
                            }
                        },
                    },
                    new AppUser
                    {
                        Id = "id",
                        DisplayName = "test_user_4",
                        UserName = "test_user_4",
                        Email = "test_user_4@test.com",
                        EmailConfirmed = true,
                        City = "Turin",
                        Country = "Italy",
                        Gender = "Masculine",
                        DateOfBirth = DateTime.Now.AddYears(-45),
                        JoinedUs = DateTime.Now.AddDays(-10),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "new-member"),
                        Points = 5,
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "id",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1646211270/rmbhtcq0tbgmzm6ge3dc.jpg",
                                IsMain = true,
                            }
                        },
                    },
                    new AppUser
                    {
                        Id = "ie",
                        DisplayName = "test_user_5",
                        UserName = "test_user_5",
                        Email = "test_user_5@test.com",
                        EmailConfirmed = true,
                        City = "Sarajevo",
                        Country = "Bosnia",
                        Gender = "Masculine",
                        DateOfBirth = DateTime.Now.AddYears(-60),
                        JoinedUs = DateTime.Now.AddDays(-10),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "new-member"),
                        Points = 5,
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "ie",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1646211270/rmbhtcq0tbgmzm6ge3dc.jpg",
                                IsMain = true,
                            }
                        },
                    },
                    new AppUser
                    {
                        Id = "if",
                        DisplayName = "test_user_6",
                        UserName = "test_user_6",
                        Email = "test_user_6@test.com",
                        EmailConfirmed = true,
                        City = "Mostar",
                        Country = "Bosnia",
                        Gender = "Masculine",
                        DateOfBirth = DateTime.Now.AddYears(-35),
                        JoinedUs = DateTime.Now.AddDays(-10),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "new-member"),
                        Points = 5,
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "if",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1646211270/rmbhtcq0tbgmzm6ge3dc.jpg",
                                IsMain = true,
                            }
                        },
                    },
                    new AppUser
                    {
                        Id = "ig",
                        DisplayName = "test_user_7",
                        UserName = "test_user_7",
                        Email = "test_user_7@test.com",
                        EmailConfirmed = true,
                        City = "Belgrade",
                        Country = "Serbia",
                        Gender = "Masculine",
                        DateOfBirth = DateTime.Now.AddYears(-19),
                        JoinedUs = DateTime.Now.AddDays(-10),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "new-member"),
                        Points = 5,
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "ig",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1646211270/rmbhtcq0tbgmzm6ge3dc.jpg",
                                IsMain = true,
                            }
                        },
                    },
                    new AppUser
                    {
                        Id = "ih",
                        DisplayName = "test_user_8",
                        UserName = "test_user_8",
                        Email = "test_user_8@test.com",
                        EmailConfirmed = true,
                        City = "Zagreb",
                        Country = "Croatia",
                        Gender = "Masculine",
                        DateOfBirth = DateTime.Now.AddYears(-21),
                        JoinedUs = DateTime.Now.AddDays(-10),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "new-member"),
                        Points = 5,
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "ih",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1646211270/rmbhtcq0tbgmzm6ge3dc.jpg",
                                IsMain = true,
                            }
                        },
                    },
                    new AppUser
                    {
                        Id = "ii",
                        DisplayName = "test_user_9",
                        UserName = "test_user_9",
                        Email = "test_user_9@test.com",
                        EmailConfirmed = true,
                        City = "Wienna",
                        Country = "Austria",
                        Gender = "Feminine",
                        DateOfBirth = DateTime.Now.AddYears(-29),
                        JoinedUs = DateTime.Now.AddDays(-10),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "new-member"),
                        Points = 5,
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "ii",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1646211270/rmbhtcq0tbgmzm6ge3dc.jpg",
                                IsMain = true,
                            }
                        },
                    },
                    new AppUser
                    {
                        Id = "ij",
                        DisplayName = "test_user_10",
                        UserName = "test_user_10",
                        Email = "test_user_10@test.com",
                        EmailConfirmed = true,
                        City = "Wienna",
                        Country = "Austria",
                        Gender = "Masculine",
                        DateOfBirth = DateTime.Now.AddYears(-33),
                        JoinedUs = DateTime.Now.AddDays(-10),
                        Rank = context.Ranks.FirstOrDefault(m => m.Id == "new-member"),
                        Points = 5,
                        Photos = new List<Photo> {
                            new Photo {
                                Id = "ij",
                                Url = "https://res.cloudinary.com/motofy/image/upload/v1646211270/rmbhtcq0tbgmzm6ge3dc.jpg",
                                IsMain = true,
                            }
                        },
                    },
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Member");
                }
                //==ADMIN===
                var admin = new AppUser
                {
                    Id = "aaa001",
                    DisplayName = "Admin001",
                    UserName = "admin001",
                    Email = "motoranza@outlook.com",
                    EmailConfirmed = true,
                    City = "Ljubljana",
                    Country = "Slovenia",
                    Gender = "Masculine",
                    DateOfBirth = DateTime.Now.AddYears(-55)
                };
                await userManager.CreateAsync(admin, "$3cr3tPa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
                
                //==MODERATOR===
                var moderator = new AppUser
                {
                    Id = "mmm001",
                    DisplayName = "Moderator001",
                    UserName = "moderator001",
                    Email = "motoranza@yahoo.com",
                    EmailConfirmed = true,
                    City = "Ljubljana",
                    Country = "Slovenia",
                    Gender = "Feminine",
                    DateOfBirth = DateTime.Now.AddYears(-25),
                };
                await userManager.CreateAsync(moderator, "$3cr3tPa$$w0rd");
                await userManager.AddToRoleAsync(moderator, "Moderator");

                 var moreUsers = new List<AppUser>();
                for(int i = 1; i < 75; i++)
                    {
                        var tempUsr = new AppUser
                        {
                            Id = "user_" + i,
                            DisplayName = "Test_user nr." + i,
                            UserName = "test_user " + i,
                            Email = "test_user_"+ i +"@test.com",
                            EmailConfirmed = true,
                            City = "Berlin",
                            Country = "Germany",
                            Gender = "Masculine",
                            DateOfBirth = DateTime.Now.AddYears(-52),
                            JoinedUs = DateTime.Now.AddDays(-10),
                            Rank = context.Ranks.FirstOrDefault(m => m.Id == "new-member"),
                            Points = 5,
                            LockoutEnabled = true,
                            Photos = new List<Photo> {
                                new Photo {
                                    Id = "test_user_" + i,
                                    Url = "https://res.cloudinary.com/motofy/image/upload/v1646211270/rmbhtcq0tbgmzm6ge3dc.jpg",
                                    IsMain = true,
                                }
                            },
                        };
                        moreUsers.Add(tempUsr);
                    }
                    foreach (var user in moreUsers)
                    {
                        await userManager.CreateAsync(user, "Pa$$w0rd");
                        await userManager.AddToRoleAsync(user, "Member");
                    }
                    await context.Users.AddRangeAsync(moreUsers);
                    await context.SaveChangesAsync();
            }

            //==TEST PRODUCT 
            if (initialRun)
            {

                var products = new List<Product>();

                for (int i = 1; i < 35; i++)
                {
                    var temp = new Product
                    {
                        Id = new Guid(),
                        Seller = userManager.Users.SingleOrDefault(x => x.UserName == "joe"),
                        Title = "Test" + i,
                        Category = "Other",
                        City = "Ljubljana " + i + ". krat",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Switzerland"),
                        PhoneNumber = "+413868685" + i,
                        Brand = "Test Products",
                        Model = "Test Products",
                        Price = "100" + i * 20,
                        DatePublished = DateTime.Now.AddDays(-3),
                        DateActivated = DateTime.Now.AddDays(-3),
                        InactivityExpirationDate = DateTime.Now.AddDays(27),
                        IsActive = true,
                        IsAdvertised = false,
                        NumberSeen = 20,
                        ActivationCounter = 1,
                        ProductPhoto = new ProductPhoto
                        {
                            Id = "djq0pu" + (i - 1) + "rzfqvkur2f" + i,
                            Url = "https://res.cloudinary.com/motofy/image/upload/v1646220808/sm2am3kwmdyvq6hhmc6t.jpg",
                        }
                    };
                    products.Add(temp);
                }
                await context.Products.AddRangeAsync(products);
                await context.SaveChangesAsync();

            }

            //==PRODUCT VIEWERS
            if (!context.ProductViewers.Any())
            {
                var productViewers = new List<ProductViewer>
                {

                    new ProductViewer
                    {
                        AppUserId = "b",
                        DateStarted = DateTime.Now.AddDays(-1),
                        ProductId = Guid.Parse("FDC7BB35-4A57-4491-AD47-9B0AD9B18637")
                    },
                    new ProductViewer
                    {
                        AppUserId = "d",
                        DateStarted = DateTime.Now.AddDays(-1),
                        ProductId = Guid.Parse("FDC7BB35-4A57-4491-AD47-9B0AD9B18637")
                    },
                    new ProductViewer
                    {
                        AppUserId = "b",
                        DateStarted = DateTime.Now.AddDays(-1),
                        ProductId = Guid.Parse("AEE0C4FD-C8C8-4184-B91C-7BAC64213821")
                    },
                    new ProductViewer
                    {
                        AppUserId = "g",
                        DateStarted = DateTime.Now.AddDays(-1),
                        ProductId = Guid.Parse("AEE0C4FD-C8C8-4184-B91C-7BAC64213821")
                    },
                    new ProductViewer
                    {
                        AppUserId = "a",
                        DateStarted = DateTime.Now.AddDays(-1),
                        ProductId = Guid.Parse("D938C1D0-3321-4357-B7C3-D5144C4EEB68")

                    },
                    new ProductViewer
                    {
                        AppUserId = "d",
                        DateStarted = DateTime.Now.AddDays(-1),
                        ProductId = Guid.Parse("D938C1D0-3321-4357-B7C3-D5144C4EEB68")
                    }
                };

                await context.ProductViewers.AddRangeAsync(productViewers);
                await context.SaveChangesAsync();
            }
          
            //==PRIVATE MESSAGES===

            if (!context.PrivateMessages.Any())
            {

                var privateMessages1 = new List<PrivateMessage>
                {
                    new PrivateMessage
                    {
                    Id= new Guid(),
                    SenderId= "d",
                    SenderUsername= "jerry",
                    RecipientId= "a",
                    RecipientUsername= "bob",
                    Content= "First Private PrivateMessage from Jerry to Bob 1",
                    DateSent = DateTime.Now.AddMinutes(-11),
                    DateRead = DateTime.Now
                    },
                    new PrivateMessage
                    {
                    Id= new Guid(),
                    SenderId= "a",
                    SenderUsername= "bob",
                    RecipientId= "d",
                    RecipientUsername= "jerry",
                    Content= "First Private PrivateMessage from Bob to Jerry 1",
                    DateSent = DateTime.Now.AddMinutes(-12),
                    DateRead = DateTime.Now
                    },
                    new PrivateMessage
                    {
                    Id= new Guid(),
                    SenderId= "d",
                    SenderUsername= "jerry",
                    RecipientId= "a",
                    RecipientUsername= "bob",
                    Content= "Second Private PrivateMessage from Jerry to Bob 2",
                    DateSent = DateTime.Now.AddMinutes(-11),
                    DateRead = DateTime.Now
                    },
                    new PrivateMessage
                    {
                    Id= new Guid(),
                    SenderId= "a",
                    SenderUsername= "bob",
                    RecipientId= "d",
                    RecipientUsername= "jerry",
                    Content= "Second Private PrivateMessage from Bob to Jerry 2",
                    DateSent = DateTime.Now.AddMinutes(-12),
                    DateRead = DateTime.Now
                    },
                };
                var privateMessages2 = new List<PrivateMessage>
                {
                    new PrivateMessage
                    {
                    Id= new Guid(),
                    SenderId= "b",
                    SenderUsername= "jane",
                    RecipientId= "a",
                    RecipientUsername= "bob",
                    Content= "First Private PrivateMessage from Jane to Bob 1",
                    DateSent = DateTime.Now.AddMinutes(-11),
                    DateRead = DateTime.Now
                    },
                    new PrivateMessage
                    {
                    Id= new Guid(),
                    SenderId= "a",
                    SenderUsername= "bob",
                    RecipientId= "b",
                    RecipientUsername= "jane",
                    Content= "First Private PrivateMessage from Bob to Jane 1",
                    DateSent = DateTime.Now.AddMinutes(-12),
                    DateRead = DateTime.Now
                    },
                    new PrivateMessage
                    {
                    Id= new Guid(),
                    SenderId= "b",
                    SenderUsername= "jane",
                    RecipientId= "a",
                    RecipientUsername= "bob",
                    Content= "Second Private PrivateMessage from Jane to Bob 2",
                    DateSent = DateTime.Now.AddMinutes(-11),
                    DateRead = DateTime.Now
                    },
                    new PrivateMessage
                    {
                    Id= new Guid(),
                    SenderId= "a",
                    SenderUsername= "bob",
                    RecipientId= "b",
                    RecipientUsername= "jane",
                    Content= "Second Private PrivateMessage from Bob to Jane 2",
                    DateSent = DateTime.Now.AddMinutes(-12),
                    DateRead = DateTime.Now
                    }
                 };
                await context.PrivateMessages.AddRangeAsync(privateMessages1);
                await context.PrivateMessages.AddRangeAsync(privateMessages2);
                await context.SaveChangesAsync();
                if (!context.PrivateMessageThreads.Any())
                {
                    var privateMessageThreads = new List<PrivateMessageThread>
                    {

                    new PrivateMessageThread
                    {
                        Id = new Guid(),
                        PrivateMessages = privateMessages1,
                        InitUsername= "jerry",
                        ReceiverUsername = "bob",
                        DateUpdated = DateTime.Now.AddMinutes(-1)
                    }
                    ,
                    new PrivateMessageThread
                    {
                        Id = new Guid(),
                        PrivateMessages = privateMessages2,
                        InitUsername= "jane",
                        ReceiverUsername = "bob",
                        DateUpdated = DateTime.Now.AddMinutes(-1)
                    }
                    };
                    await context.PrivateMessageThreads.AddRangeAsync(privateMessageThreads);
                    await context.SaveChangesAsync();
                };
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
                        Category = "Offer information",
                        Author = userManager.Users.SingleOrDefault(x => x.UserName == "bob"),
                        ForumpostRating = 4,
                        ForumpostRatings = new List<ForumpostRating>
                        {
                            new ForumpostRating
                            {
                                Id = new Guid(),
                                Author = userManager.Users.SingleOrDefault(x => x.UserName == "tom"),
                                IsInteresting = true,
                                Rating = 1
                            },
                            new ForumpostRating
                            {
                                Id = new Guid(),
                                Author = userManager.Users.SingleOrDefault(x => x.UserName == "jane"),
                                IsHelping = true,
                                Rating = 5
                            },
                            new ForumpostRating
                            {
                                Id = new Guid(),
                                Author = userManager.Users.SingleOrDefault(x => x.UserName == "joe"),
                                IsUsefull = true,
                                Rating = 3
                            },

                        }


                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-1),
                        Title= "Explain",
                        Body = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. ",
                        Category = "Ask for assistance",
                        Author = userManager.Users.SingleOrDefault(x => x.UserName == "jane"),
                        ForumpostRating = 3.6666666667,
                        ForumpostRatings = new List<ForumpostRating>
                        {
                             new ForumpostRating
                            {
                                Id = new Guid(),
                                Author = userManager.Users.SingleOrDefault(x => x.UserName == "bob"),
                                IsUsefull = true,
                                Rating = 3
                            },
                            new ForumpostRating
                            {
                                Id = new Guid(),
                                Author = userManager.Users.SingleOrDefault(x => x.UserName == "joe"),
                                IsUsefull = true,
                                Rating = 3
                            },
                            new ForumpostRating
                            {
                                Id = new Guid(),
                                Author = userManager.Users.SingleOrDefault(x => x.UserName == "nina"),
                                IsHelping = true,
                                Rating = 5
                            }
                        }
                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-3),
                        Title= "Again",
                        Body = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?",
                        Category = "Ask for advice",
                        Author = userManager.Users.SingleOrDefault(x => x.UserName == "tom"),
                        ForumpostRating = 4,
                        ForumpostRatings = new List<ForumpostRating>
                        {
                             new ForumpostRating
                            {
                                Id = new Guid(),
                                Author = userManager.Users.SingleOrDefault(x => x.UserName == "cato"),
                                IsUsefull = true,
                                Rating = 3
                            },
                            new ForumpostRating
                            {
                                Id = new Guid(),
                                Author = userManager.Users.SingleOrDefault(x => x.UserName == "nina"),
                                IsHelping = true,
                                Rating = 5
                            }
                        }
                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-4),
                        Title= "True",
                        Body = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?",
                        Category = "Ask for advice",
                        Author = userManager.Users.SingleOrDefault(x => x.UserName == "tom")
                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-13),
                        Title= "Love??",
                        Body = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?",
                        Category = "Ask for assistance",
                        Author = userManager.Users.SingleOrDefault(x => x.UserName == "jerry")
                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-9),
                        Title= "Where to...",
                        Body = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?",
                        Category = "Offer information",
                        Author = userManager.Users.SingleOrDefault(x => x.UserName == "cato")
                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-5),
                        Title= "Road Limits",
                        Body = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?",
                        Category = "Offer information",
                        Author = userManager.Users.SingleOrDefault(x => x.UserName == "emir")
                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-31),
                        Title= "Ridding South",
                        Body = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?",
                        Category = "Ask for assistance",
                        Author = userManager.Users.SingleOrDefault(x => x.UserName == "nina")
                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now,
                        Title= "Standing Next And That",
                        Body = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?",
                        Category = "Ask for advice",
                        Author = userManager.Users.SingleOrDefault(x => x.UserName == "bob")
                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-8),
                        Title= "Tom's Question",
                        Body = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?",
                        Category = "Ask for assistance",
                        Author = userManager.Users.SingleOrDefault(x => x.UserName == "tom")
                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-11),
                        Title= "Many times this have happened",
                        Body = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?",
                        Category = "Ask for advice",
                        Author = userManager.Users.SingleOrDefault(x => x.UserName == "jane")
                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-12),
                        Title= "So much pleasure, but still dangerous",
                        Body = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?",
                        Category = "Ask for assistance",
                        Author = userManager.Users.SingleOrDefault(x => x.UserName == "joe")
                    },
                    new Forumpost
                    {
                        DateAdded = DateTime.Now.AddDays(-14),
                        Title= "Hit and run",
                        Body = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?",
                        Category = "Ask for assistance",
                        Author = userManager.Users.SingleOrDefault(x => x.UserName == "emir")
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
                        Id = Guid.Parse("40732BB9-C725-4EC4-8773-C4E376D8D1CA"),
                        Title = "Past Diary 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Diary 2 months ago. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "City Ridding",
                        City = "London",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "United Kingdom"),//"Italy",
                        Departure = "Pub",
                        Destination = "Soho",
                        ActivityPhoto = new ActivityPhoto 
                        {
                            Id= "v1542652479",
                            Url="https://res.cloudinary.com/motofy/image/upload/v1542652479/sample.jpg",
                            ActivityForeignKey = Guid.Parse("40732BB9-C725-4EC4-8773-C4E376D8D1CA")

                        },
                        IsActive = true,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id == Guid.Parse("7ACE392B-F077-4E4B-8679-2A5D1D8B77A9")),
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
                        Id = Guid.Parse("004AE701-9653-4E4F-9EA5-252F0262076B"),
                        Title = "Past Diary 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Diary 1 month ago. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "Go To Places",
                        City = "Paris",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "France"),
                        Departure = "The Louvre",
                        Destination = "Champs Elysses",
                        ActivityPhoto = new ActivityPhoto 
                        {
                            Id= "xnyg9uyjqbaxdz2zeixi",
                            Url="https://res.cloudinary.com/motofy/image/upload/v1547295598/xnyg9uyjqbaxdz2zeixi.jpg",
                            ActivityForeignKey = Guid.Parse("004AE701-9653-4E4F-9EA5-252F0262076B")
                        },                        
                        IsActive = true,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("D1AA07A2-094F-4239-8E98-337E71D6350A")),
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
                        Id = Guid.Parse("C57244FD-6053-4D35-8068-616E0E22A304"),
                        Title = "Journey around Istria",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Journey around Istria. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "City Ridding",
                        City = "London",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "United Kingdom"),
                        Departure = "Wembly Stadium",
                        Destination = "Outside London",
                        ActivityPhoto = new ActivityPhoto 
                        {
                            Id= "b5ls74ojlv8va3ew7vvz",
                            Url="https://res.cloudinary.com/motofy/image/upload/v1546709652/b5ls74ojlv8va3ew7vvz.jpg",
                            ActivityForeignKey = Guid.Parse("C57244FD-6053-4D35-8068-616E0E22A304")
                        },                        
                        IsActive = true,
                        // TotalDiaries = 3,
                        MotorcycleBrand = new Brand
                        {
                            Id = Guid.Parse("75A7C213-06D2-4EC3-87AD-FFF9F14F83B0"),
                            Name = "Yamaha",
                            DateOfEstablishment = DateTime.Now.AddYears(-76),
                            LogoUrl = "https://res.cloudinary.com/motofy/image/upload/v1636477685/yamaha.png",
                            LandOfOrigin = "Japan",
                            CityOfOrigin = "Iwata",
                        },
                        DiaryEntries = new List<DiaryEntry>
                        {
                            new DiaryEntry
                            {
                                Id = Guid.Parse("30f9f621-9f63-4f49-8b64-ecf83196a224"),
                                EntryDate = DateTime.Now.AddDays(-2),
                                DayNumber = 1,
                                Body = "One of those days, I am feeling fantastic",
                                LocationCity = "Pula",
                                LocationCountry = "Croatia",
                                Mood = "Enthusiastic",
                                Road = "Very good",
                                Weather = "Sunny",
                                NumberOfKilometers = 150,
                                DiaryPhoto = new DiaryPhoto
                                {
                                    Id = "dayoneid",
                                    Url = "https://upload.wikimedia.org/wikipedia/commons/1/13/Pula-avion.JPG",
                                    DateUploaded = DateTime.Now.AddHours(-30),
                                    DiaryEntryForeignKey = Guid.Parse("30f9f621-9f63-4f49-8b64-ecf83196a224")
                                }
                            },
                            new DiaryEntry
                            {
                                Id = Guid.Parse("fa512f59-4b3e-4710-b7bd-84b5a838043a"),
                                EntryDate = DateTime.Now.AddDays(-1),
                                DayNumber = 2,
                                Body = "Today was little colder, but road is nevertheless fantastic!",
                                LocationCity = "Labin",
                                LocationCountry = "Croatia",
                                Mood = "Happy",
                                Road = "Very good",
                                Weather = "Sunny",
                                NumberOfKilometers = 90,
                                DiaryPhoto = new DiaryPhoto
                                {
                                    Id = "daytwoid",
                                    Url = "https://thumbs.dreamstime.com/b/photo-attractive-woman-has-real-adventure-outdoor-stands-near-motorbike-dressed-bikers-outfit-enjoys-sunny-day-calm-128779332.jpg",
                                    DateUploaded = DateTime.Now.AddHours(-20),
                                    DiaryEntryForeignKey = Guid.Parse("fa512f59-4b3e-4710-b7bd-84b5a838043a")
                                }
                            },
                            new DiaryEntry
                            {
                                Id = Guid.Parse("1c5bfedd-1af1-4246-a265-05a14ace55fa"),
                                EntryDate = DateTime.Now,
                                DayNumber = 3,
                                Body = "Some time to rest from the road",
                                LocationCity = "Pazin",
                                LocationCountry = "Croatia",
                                Mood = "Relaxed",
                                Road = "Excellent",
                                Weather = "Sunny",
                                NumberOfKilometers = 150,
                                DiaryPhoto = new DiaryPhoto
                                {
                                    Id = "daythreeid",
                                    Url = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                                    DateUploaded = DateTime.Now,
                                    DiaryEntryForeignKey = Guid.Parse("1c5bfedd-1af1-4246-a265-05a14ace55fa")
                                }
                            }
                        },
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddDays(-1)
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddDays(-2)
                            },
                            new UserActivity
                            {
                                AppUserId = "i",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddDays(-3)
                            },
                            new UserActivity
                            {
                                AppUserId = "ia",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddDays(-4)
                            },
                            new UserActivity
                            {
                                AppUserId = "ib",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddDays(-5)
                            },
                            new UserActivity
                            {
                                AppUserId = "ic",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddDays(-6)
                            },
                            new UserActivity
                            {
                                AppUserId = "id",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddDays(-7)
                            },
                            new UserActivity
                            {
                                AppUserId = "ie",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddDays(-8)
                            },
                            new UserActivity
                            {
                                AppUserId = "if",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddDays(-9)
                            },
                            new UserActivity
                            {
                                AppUserId = "ig",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddDays(-10)
                            },
                            new UserActivity
                            {
                                AppUserId = "ih",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddDays(-11)
                            },
                            new UserActivity
                            {
                                AppUserId = "ii",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddDays(-12)
                            },
                            new UserActivity
                            {
                                AppUserId = "ij",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddDays(-13)
                            },
                        }
                    },
                    new Activity
                    {
                        Id = Guid.Parse("72077C7E-B107-4A54-B65D-D7271F956150"),
                        Title = "Lovely Diary 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Diary 2 months in Lovely. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "Out To Lunch",
                        City = "London",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "United Kingdom"),
                        Departure = "Jamies Italian",
                        Destination = "Italian Pizzeria",
                        ActivityPhoto = new ActivityPhoto 
                        {
                            Id= "lwpww0jredvqlksdouu2",
                            Url="https://res.cloudinary.com/motofy/image/upload/v1546635391/lwpww0jredvqlksdouu2.png",
                            ActivityForeignKey = Guid.Parse("72077C7E-B107-4A54-B65D-D7271F956150")
                        },
                        IsActive = false,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("D1AA07A2-094F-4239-8E98-337E71D6350A")),
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
                        Id = Guid.Parse("23513C00-00E9-4BF3-B25A-8D09A9FD1872"),
                        Title = "Lovely Diary 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Diary 3 months in Lovely. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "Mountains",
                        City = "Ljubljana",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Slovenia"),
                        Departure = "Tivoli",
                        Destination = "Triglav",
                        ActivityPhoto = new ActivityPhoto 
                        {
                            Id= "v2mrltqthcrtqxvriazd",
                            Url="https://res.cloudinary.com/motofy/image/upload/v1547295257/v2mrltqthcrtqxvriazd.jpg",
                            ActivityForeignKey = Guid.Parse("23513C00-00E9-4BF3-B25A-8D09A9FD1872")
                        },                        
                        IsActive = false,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("a585178f-1252-413a-939f-b8640e93a940")),
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
                        Id = Guid.Parse("713AE504-78B2-4B3A-B767-F31E4B7DC0E7"),
                        Title = "Lovely road trip to Italy",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Lovely road trip to Italy. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "Go To Places",
                        City = "London",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "United Kingdom"),
                        Departure = "British Museum",
                        Destination = "StoneHenge",
                        ActivityPhoto = new ActivityPhoto 
                        {
                            Id= "t40e4f1wgavfpvsai11s",
                            Url="https://res.cloudinary.com/motofy/image/upload/v1562189005/t40e4f1wgavfpvsai11s.jpg",
                            ActivityForeignKey = Guid.Parse("713AE504-78B2-4B3A-B767-F31E4B7DC0E7")
                        },                        
                        IsActive = true,
                        MotorcycleBrand =  new Brand
                        {
                            Id = Guid.Parse("C3E2AE61-BE37-4E22-B3B3-C4C124CCCE8D"),
                            Name = "Moto Guzzi",
                            DateOfEstablishment = DateTime.Now.AddYears(-100),//AddMonths(-200),
                            LogoUrl = "https://res.cloudinary.com/motofy/image/upload/v1635195423/Moto_Guzzi.png",
                            LandOfOrigin = "Italy",
                            CityOfOrigin = "Mandello del Lario",
                        },
                        DiaryEntries = new List<DiaryEntry>
                        {
                            new DiaryEntry
                            {
                                Id = Guid.Parse("16CDCB83-9B8E-4832-BE6D-5118158053EB"),
                                EntryDate = DateTime.Now.AddDays(-5),
                                DayNumber = 1,
                                Body = "Fantastic roads, we are making much more kilometers than what we expected. All in all it is great",
                                LocationCity = "Nova Gorica",
                                LocationCountry = "Slovenia",
                                Mood = "Enthusiastic",
                                Road = "Excellent",
                                Weather = "Sunny",
                                NumberOfKilometers = 250,
                                DiaryPhoto = new DiaryPhoto
                                {
                                    Id = "day1id",
                                    Url = "https://upload.wikimedia.org/wikipedia/commons/1/13/Pula-avion.JPG",
                                    DateUploaded = DateTime.Now.AddDays(-5),
                                    DiaryEntryForeignKey = Guid.Parse("16CDCB83-9B8E-4832-BE6D-5118158053EB")
                                }
                            },
                            new DiaryEntry
                            {
                                Id = Guid.Parse("8CF0F358-E3CF-4954-B035-EB4CB5B9F78A"),
                                EntryDate = DateTime.Now.AddDays(-4),
                                DayNumber = 2,
                                Body = "Little rain on the road, but road is very good. We hope the weather is not going to get worse. Tomorrow we will be in Venice.",
                                LocationCity = "Trieste",
                                LocationCountry = "Italy",
                                Mood = "Concerned",
                                Road = "Very good",
                                Weather = "Sunny",
                                NumberOfKilometers = 150,
                                DiaryPhoto = new DiaryPhoto
                                {
                                    Id = "day2id",
                                    Url = "https://thumbs.dreamstime.com/b/photo-attractive-woman-has-real-adventure-outdoor-stands-near-motorbike-dressed-bikers-outfit-enjoys-sunny-day-calm-128779332.jpg",
                                    DateUploaded = DateTime.Now.AddDays(-4),
                                    DiaryEntryForeignKey = Guid.Parse("8CF0F358-E3CF-4954-B035-EB4CB5B9F78A")
                                }
                            },
                            new DiaryEntry
                            {
                                Id = Guid.Parse("31237CDC-FE3F-4045-848A-39E5B0379839"),
                                EntryDate = DateTime.Now.AddDays(-3),
                                DayNumber = 3,
                                Body = "It is actually even better than yesterday. We are thinking about staying in region.",
                                LocationCity = "Venice",
                                LocationCountry = "Italy",
                                Mood = "Relaxed",
                                Road = "Poor",
                                Weather = "Sunny",
                                NumberOfKilometers = 70,
                                DiaryPhoto = new DiaryPhoto
                                {
                                    Id = "day3id",
                                    Url = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                                    DateUploaded = DateTime.Now.AddDays(-3),
                                    DiaryEntryForeignKey = Guid.Parse("31237CDC-FE3F-4045-848A-39E5B0379839")
                                }
                            },
                            new DiaryEntry
                            {
                                Id = Guid.Parse("4993614E-BBCB-4FD7-910E-936C8184B9D3"),
                                EntryDate = DateTime.Now.AddDays(-2),
                                DayNumber = 4,
                                Body = "Long journey over the Dolomites.., some great scenery though. Italy is beautiful!",
                                LocationCity = "Bologna",
                                LocationCountry = "Italy",
                                Mood = "Tired",
                                Road = "Good",
                                Weather = "Sunny",
                                NumberOfKilometers = 150,
                                DiaryPhoto = new DiaryPhoto
                                {
                                    Id = "day4id",
                                    Url = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                                    DateUploaded = DateTime.Now.AddDays(-2),
                                    DiaryEntryForeignKey = Guid.Parse("4993614E-BBCB-4FD7-910E-936C8184B9D3")
                                }
                            },
                            new DiaryEntry
                            {
                                Id = Guid.Parse("948A87C6-4392-435B-9BA8-D15A34D8BD1D"),
                                EntryDate = DateTime.Now.AddDays(-1),
                                DayNumber = 5,
                                Body = "Some time to rest from the road. The end of our journey is in sight. We are going to spend some time in Rome. There were some technical difficulties, but it is probably going to be ok. We will check it all before setting off tomorrow.",
                                LocationCity = "Florence",
                                LocationCountry = "Italy",
                                Mood = "Happy",
                                Road = "Very good",
                                Weather = "Sunny",
                                NumberOfKilometers = 150,
                                DiaryPhoto = new DiaryPhoto
                                {
                                    Id = "day5id",
                                    Url = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                                    DateUploaded = DateTime.Now.AddDays(-1),
                                    DiaryEntryForeignKey = Guid.Parse("948A87C6-4392-435B-9BA8-D15A34D8BD1D")
                                }
                            }
                        },
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
                        Id = Guid.Parse("48E47B1C-AE72-4FBB-BE2A-AA939EBFBEDF"),
                        Title = "Lovely Diary 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Diary 5 months in Lovely. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "Racing",
                        City = "London",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "United Kingdom"),
                        Departure = "Punch and Judy",
                        Destination = "Calais",
                        ActivityPhoto = new ActivityPhoto 
                        {
                            Id= "v1634591827",
                            Url="https://res.cloudinary.com/motofy/image/upload/v1634591827/bmw.png",
                            ActivityForeignKey = Guid.Parse("48E47B1C-AE72-4FBB-BE2A-AA939EBFBEDF")
                        },                            
                        IsActive = true,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("a585178f-1252-413a-939f-b8640e93a940")),
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
                        Id = Guid.Parse("8A147127-C7FF-4669-B9BF-57705C0FFED9"),
                        Title = "Cool Diary 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Diary 6 months in Cool. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "Rock And Roll",
                        City = "London",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "United Kingdom"),
                        Departure = "O2 Arena",
                        Destination = "Hide Park",
                        ActivityPhoto = new ActivityPhoto 
                        {
                            Id= "v1635195423",
                            Url="https://res.cloudinary.com/motofy/image/upload/v1635195423/Moto_Guzzi.png",
                            ActivityForeignKey = Guid.Parse("8A147127-C7FF-4669-B9BF-57705C0FFED9")
                        },                        
                        IsActive = true,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("a585178f-1252-413a-939f-b8640e93a940")),
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
                        Id = Guid.Parse("F99B88CA-112F-45A4-8766-201CFE4FEE40"),
                        Title = "Cool Diary 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Diary 7 months in Cool. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "City Ridding",
                        City = "Berlin",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Germany"),
                        Departure = "Unter der Leyen",
                        Destination = "Brandburg Gate",
                        // ActivityPhoto = new ActivityPhoto 
                        // {
                        //     Id= "v1542652479",
                        //     Url="https://res.cloudinary.com/motofy/image/upload/v1542652479/sample.jpg",
                        //     ActivityForeignKey = Guid.Parse("F99B88CA-112F-45A4-8766-201CFE4FEE40")
                        // },                        
                        IsActive = true,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("a585178f-1252-413a-939f-b8640e93a940")),
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
                        Id = Guid.Parse("2C923CB2-5811-498C-AE6D-B1F6EAD99B2B"),
                        Title = "Cool Diary 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Diary 8 months in Cool. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "By The Sea",
                        City = "Pula",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Croatia"),
                        Departure = "Titov park",
                        Destination = "Kamenjak",
                        // ActivityPhoto = new ActivityPhoto 
                        // {
                        //     Id= "v1542652479",
                        //     Url="https://res.cloudinary.com/motofy/image/upload/v1542652479/sample.jpg",
                        //     ActivityForeignKey = Guid.Parse("2C923CB2-5811-498C-AE6D-B1F6EAD99B2B")
                        // },                       
                        IsActive = true,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("D1AA07A2-094F-4239-8E98-337E71D6350A")),
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
                        Id = Guid.Parse("5594D3E2-0E45-4685-A1E9-701743FD75C7"),
                        Title = "Il adventuros Diary 9",
                        Date = DateTime.Now.AddMonths(9),
                        Description = "Diary 9 months in adventuros. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "By The Sea",
                        City = "Pula",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Croatia"),
                        Departure = "Varudela",
                        Destination = "Motovun",
                        // ActivityPhoto = new ActivityPhoto 
                        // {
                        //     Id= "v1542652479",
                        //     Url="https://res.cloudinary.com/motofy/image/upload/v1542652479/sample.jpg",
                        //     ActivityForeignKey = Guid.Parse("5594D3E2-0E45-4685-A1E9-701743FD75C7")
                        // },                        
                        IsActive = true,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("D1AA07A2-094F-4239-8E98-337E71D6350A")),
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
                        Id = Guid.Parse("096848A3-B833-4BBE-8184-5FA1A7B840DD"),
                        Title = "Los adventuros Diary 10",
                        Date = DateTime.Now.AddMonths(10),
                        Description = "Diary 10 months in adventuros. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "Outdoors",
                        City = "Ljubljana",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Slovenia"),
                        Departure = "Kongresni trg",
                        Destination = "Rakov Skocjan",
                        // ActivityPhoto = new ActivityPhoto 
                        // {
                        //     Id= "v1542652479",
                        //     Url="https://res.cloudinary.com/motofy/image/upload/v1542652479/sample.jpg",
                        //     ActivityForeignKey = Guid.Parse("096848A3-B833-4BBE-8184-5FA1A7B840DD")
                        // },                        
                        IsActive = true,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("D1AA07A2-094F-4239-8E98-337E71D6350A")),
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
                        Id = Guid.Parse("5D2356A7-B650-46BC-A56B-FCFE52EF784D"),
                        Title = "Far adventuros Diary 11",
                        Date = DateTime.Now.AddMonths(11),
                        Description = "Diary 11 months in adventuros. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "Heavy Metal",
                        City = "Maribor",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Slovenia"),
                        Departure = "Veliki Park",
                        Destination = "Lendava",
                        // ActivityPhoto = new ActivityPhoto 
                        // {
                        //     Id= "v1542652479",
                        //     Url="https://res.cloudinary.com/motofy/image/upload/v1542652479/sample.jpg",
                        //     ActivityForeignKey = Guid.Parse("5D2356A7-B650-46BC-A56B-FCFE52EF784D")
                        // },                        
                        IsActive = true,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("D1AA07A2-094F-4239-8E98-337E71D6350A")),
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
                        Id = Guid.Parse("278B883C-F41A-4227-B6F6-84903F8F87FF"),
                        Title = "Very far adventuros Diary 12",
                        Date = DateTime.Now.AddMonths(12),
                        Description = "Diary 12 months in adventuros. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "Gang",
                        City = "Zagreb",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Croatia"),
                        Departure = "Jarun",
                        Destination = "Sava",
                        // ActivityPhoto = new ActivityPhoto 
                        // {
                        //     Id= "v1542652479",
                        //     Url="https://res.cloudinary.com/motofy/image/upload/v1542652479/sample.jpg",
                        //     ActivityForeignKey = Guid.Parse("278B883C-F41A-4227-B6F6-84903F8F87FF")
                        // },                        
                        IsActive = false,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("D1AA07A2-094F-4239-8E98-337E71D6350A")),
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
                        Id = Guid.Parse("F8466AF7-518F-4A95-BF5F-8520D7A87770"),
                        Title = "Long far coolest Diary 13",
                        Date = DateTime.Now.AddMonths(13),
                        Description = "Diary 13 months in coolest. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "Cruise",
                        City = "Roma",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),
                        Departure = "Piazza Venezia",
                        Destination = "San Gandolfo",
                        // ActivityPhoto = new ActivityPhoto 
                        // {
                        //     Id= "v1542652479",
                        //     Url="https://res.cloudinary.com/motofy/image/upload/v1542652479/sample.jpg",
                        //     ActivityForeignKey = Guid.Parse("F8466AF7-518F-4A95-BF5F-8520D7A87770")
                        // },                        
                        IsActive = false,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("D1AA07A2-094F-4239-8E98-337E71D6350A")),
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
                        Id = Guid.Parse("E35B17FC-7458-412F-9BF2-B366D6B01356"),
                        Title = "Long far coolest Diary 14",
                        Date = DateTime.Now.AddMonths(14),
                        Description = "Diary 14 months in coolest. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "By The Sea",
                        City = "Roma",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),
                        Departure = "Pignetto",
                        Destination = "Ostia, Roma",
                        // ActivityPhoto = new ActivityPhoto 
                        // {
                        //     Id= "v1542652479",
                        //     Url="https://res.cloudinary.com/motofy/image/upload/v1542652479/sample.jpg",
                        //     ActivityForeignKey = Guid.Parse("E35B17FC-7458-412F-9BF2-B366D6B01356")
                        // },
                        IsActive = false,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("D1AA07A2-094F-4239-8E98-337E71D6350A")),
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
                        Id = Guid.Parse("FE449D03-8712-447D-A606-5A89C3EB56D4"),
                        Title = "Never to happen coolest Diary 15",
                        Date = DateTime.Now.AddMonths(15),
                        Description = "Diary 15 months in coolest. Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
                        Category = "Cruise",
                        City = "Trieste",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),
                        Departure = "San Marco",
                        Destination = "Montfalcone",
                        // ActivityPhoto = new ActivityPhoto 
                        // {
                        //     Id= "v1542652479",
                        //     Url="https://res.cloudinary.com/motofy/image/upload/v1542652479/sample.jpg",
                        //     ActivityForeignKey = Guid.Parse("FE449D03-8712-447D-A606-5A89C3EB56D4")
                        // },                        
                        IsActive = false,
                        IsCompleted = true,
                        MotorcycleBrand = context.Brands.FirstOrDefault(m => m.Id ==Guid.Parse("75A7C213-06D2-4EC3-87AD-FFF9F14F83B0")),
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

            if (!context.Motofies.Any())
            {
                var motofies = new List<Motofy>
                {
                    new Motofy
                    {
                        Id = Guid.Parse("71d0f37a-4954-425e-9773-300e0669d9bd"),
                        Name = "Lillie",
                        Publisher = userManager.Users.SingleOrDefault(x => x.Id == "f"),
                        Model = "Multistrada 620 Dark",
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
                        Description = "The often forgotten about Multistrada 620 is an absolutely brilliant bike for those looking for a practical do-it-all that has a bit of Italian charm without too many of the associated hassles.",
                        MotofyPhoto = new MotofyPhoto {
                            Id = "084c3b38-6ded-4d5f-ad49-63dd9dca46ae",
                            Url = "https://res.cloudinary.com/motofy/image/upload/v1542747581/htzdagawfprqsmbwkb5a.jpg",
                            MotofyForeignKey = Guid.Parse("71d0f37a-4954-425e-9773-300e0669d9bd")
                        },
                        YearOfProduction = "2005",
                        DatePublished = DateTime.Now.AddDays(-100),
                        City = "Rome",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),//"Italy",
                        PricePaid = "2000",
                        EstimatedValue = "3000",
                        NumberOfKilometers = "67100",
                        TotalEmbraced = 4,
                        UserMotofies = new List<UserMotofy>
                        {
                            new UserMotofy
                            {
                                AppUserId = "f",
                                IsOwner = true,
                                DateEmbraced = DateTime.Now.AddMonths(-2)
                            },
                            new UserMotofy
                            {
                                AppUserId = "a",
                                IsOwner = false,
                                DateEmbraced = DateTime.Now.AddMonths(-2)
                            },
                            new UserMotofy
                            {
                                AppUserId = "d",
                                IsOwner = false,
                                DateEmbraced = DateTime.Now.AddMonths(-2)
                            },
                            new UserMotofy
                            {
                                AppUserId = "e",
                                IsOwner = false,
                                DateEmbraced = DateTime.Now.AddMonths(-2)
                            }
                        },
                        MotofyScores = new List<MotofyScore>
                        {
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "jane"),
                                Score = 5,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "tom"),
                                Score = 5,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "emir"),
                                Score = 5,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "nina"),
                                Score = 5,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "cato"),
                                Score = 4,
                            }
                        },
                        AverageRating = new AverageRating
                        {
                            Id = new Guid(),
                            Count = 5,
                            Average = 4.8
                        }

                    },
                    new Motofy
                    {
                        Id = Guid.Parse("7c54ae0d-f927-4fc0-bde5-7c18a6514928"),
                        Name = "King",
                        Publisher = userManager.Users.SingleOrDefault(x => x.Id == "b"),
                        Model = "Sportster",
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
                        PhotoUrl = "https://res.cloudinary.com/motofy/image/upload/v1542881277/hr1axmxfrz6hnnjzmqdl.jpg",
                        Description = "Harley-Davidson Sportster cusom bikes - bobbers, choppers and cafe racers. We do NOT own the video materials and all credits belong to respectful owners. In case of copyright issues, please contact us immediately for further credits or clip delete.",
                        MotofyPhoto = new MotofyPhoto {
                            Id = "62d2f63a-46d3-4dd1-84d1-67cdf3c9fb92",
                            Url = "https://res.cloudinary.com/motofy/image/upload/v1542881277/hr1axmxfrz6hnnjzmqdl.jpg",
                            MotofyForeignKey = Guid.Parse("7c54ae0d-f927-4fc0-bde5-7c18a6514928"),
                        },
                        YearOfProduction = "2015",
                        DatePublished = DateTime.Now.AddDays(-10),
                        City = "Berlin",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Germany"),//"Italy",
                        PricePaid = "4000",
                        EstimatedValue = "4000",
                        NumberOfKilometers = "107100",
                        TotalEmbraced = 3,
                        UserMotofies = new List<UserMotofy>
                        {
                            new UserMotofy
                            {
                                AppUserId = "b",
                                IsOwner = true,
                                DateEmbraced = DateTime.Now.AddMonths(-1)
                            },
                            new UserMotofy
                            {
                                AppUserId = "f",
                                IsOwner = false,
                                DateEmbraced = DateTime.Now.AddMonths(-2)
                            },
                            new UserMotofy
                            {
                                AppUserId = "d",
                                IsOwner = false,
                                DateEmbraced = DateTime.Now.AddMonths(-2)
                            }
                        },
                        MotofyScores = new List<MotofyScore>
                        {
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "bob"),
                                Score = 3,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "tom"),
                                Score = 3,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "emir"),
                                Score = 4,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "nina"),
                                Score = 1,
                            }
                        },
                        AverageRating = new AverageRating
                        {
                            Id = new Guid(),
                            Count = 4,
                            Average = 2.75
                        }

                    },
                    new Motofy
                    {
                        Id = Guid.Parse("b2613251-e8aa-4d30-b9ab-4f243b64075d"),
                        Name = "Fly",
                        Publisher = userManager.Users.SingleOrDefault(x => x.Id == "c"),
                        Model = "Hornet",
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
                        MotofyPhoto = new MotofyPhoto {
                            Id = "edc693f8-90b7-4c0a-af6b-5b2c6947becf",
                            Url = "https://res.cloudinary.com/motofy/image/upload/v1543859124/qwg8b9xd4z1h9nzjvuzi.jpg",
                            MotofyForeignKey = Guid.Parse("b2613251-e8aa-4d30-b9ab-4f243b64075d")

                        },
                        YearOfProduction = "2018",
                        DatePublished = DateTime.Now.AddDays(-85),
                        City = "Ljubljana",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Slovenia"),//"Italy",
                        PricePaid = "2000",
                        EstimatedValue = "2000",
                        NumberOfKilometers = "30100",
                        TotalEmbraced = 2,
                        UserMotofies = new List<UserMotofy>
                        {
                            new UserMotofy
                            {
                                AppUserId = "c",
                                IsOwner = true,
                                DateEmbraced = DateTime.Now.AddMonths(-2)
                            },
                            new UserMotofy
                            {
                                AppUserId = "g",
                                IsOwner = false,
                                DateEmbraced = DateTime.Now.AddMonths(-2)
                            }
                        },
                        MotofyScores = new List<MotofyScore>
                        {
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "jane"),
                                Score = 2,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "bob"),
                                Score = 1,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "emir"),
                                Score = 1,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "jerry"),
                                Score = 5,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "cato"),
                                Score = 4,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "joe"),
                                Score = 2,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "giulietta"),
                                Score = 4,
                            }
                        },
                        AverageRating = new AverageRating
                        {
                            Id = new Guid(),
                            Count = 7,
                            Average = 2.71
                        }

                    },
                    new Motofy
                    {
                        Id = Guid.Parse("02d05033-ec4c-4fb5-9477-95ddb8ce5e39"),
                        Name = "Tripp",
                        Publisher = userManager.Users.SingleOrDefault(x => x.Id == "d"),
                        Model = "R 1200GS LC Adventure",
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
                        PhotoUrl = "https://res.cloudinary.com/motofy/image/upload/v1646081991/njvz5rgogdsttchsjneb.jpg",

                        Description = "The BMW R1200GS is one of the best selling motorcycles of all time. And yet, as I prepared to make a purchase of a 2018 lowered rallye model, I found a surprising dearth of meaningful answers to my questions and concerns.",
                        MotofyPhoto = new MotofyPhoto {
                            Id = "c525b36c-ab52-4e04-8d87-6facd3d70234",
                            Url = "https://res.cloudinary.com/motofy/image/upload/v1646081991/njvz5rgogdsttchsjneb.jpg",
                            MotofyForeignKey = Guid.Parse("02d05033-ec4c-4fb5-9477-95ddb8ce5e39")

                        },
                        YearOfProduction = "2012",
                        DatePublished = DateTime.Now.AddDays(-40),
                        City = "Zurich",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Switzerland"),//"Italy",
                        PricePaid = "12000",
                        EstimatedValue = "10000",
                        NumberOfKilometers = "7100",
                        TotalEmbraced = 1,
                        UserMotofies = new List<UserMotofy>
                        {
                            new UserMotofy
                            {
                                AppUserId = "d",
                                IsOwner = false,
                                DateEmbraced = DateTime.Now.AddMonths(-2)
                            }
                        },
                        MotofyScores = new List<MotofyScore>
                        {
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "cato"),
                                Score = 4,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "joe"),
                                Score = 5,
                            },
                            new MotofyScore
                            {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "giulietta"),
                                Score = 3,
                            }
                        },
                        AverageRating = new AverageRating
                        {
                            Id = new Guid(),
                            Count = 3,
                            Average = 4
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
                      Id = Guid.Parse("03CF160B-D5BD-44E9-ADE3-0BB4EAA694B7"),
                      Name = "Corrado",
                      Publisher = context.Users.SingleOrDefault(x => x.Id == "g"),
                      IsOwner = false,
                      Owner = "Corrado",
                      Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                      YearOfStart = "2008",
                      DatePublished = DateTime.Now.AddDays(-40),
                      Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),//"Italy",
                      City = "Rome",
                      Address = "Tor Pignattara 107",
                      TotalRecommended = 6,
                      MechanicPhoto = new MechanicPhoto
                      {
                          Id = "B0ABFC9B-77E3-4068-96E0-DF704F156768",
                          Url="https://res.cloudinary.com/motofy/image/upload/v1547320881/prgbklusjdbenfbqtqfy.jpg",
                      },
                      Customers = new List<UserMechanic>
                        {
                            new UserMechanic
                            {
                                AppUserId = "a",
                                IsOwner = false,
                                IsCustomer = true,
                                CustomerRecommended = true,
                                DateBecameCustomer = DateTime.Now.AddMonths(-2),
                                Testimonial = new Testimonial
                                {
                                    Id = new Guid(),
                                    Text = "Found this place by chance after purchasing some highway pegs from them. Immediatley after talking with the owner, son and his family, I felt comfortable enough to get a 10,000 mi. major service from them along with a stator replacement, tune up and a few other items needed in preparation for a 1,500 mi. ride to Nor-Cal and through the Sierras.",
                                    DateAdded = DateTime.Now.AddDays(-2)
                                }
                            },
                            new UserMechanic
                            {
                                AppUserId = "b",
                                IsOwner = false,
                                IsCustomer = true,
                                CustomerRecommended = true,
                                DateBecameCustomer = DateTime.Now.AddMonths(-1),
                                Testimonial = new Testimonial
                                {
                                    Id = new Guid(),
                                    Text = "Glad I went with Corrado, he went above and beyond in going over everything with a fine toothed comb. Fixed many more problems than I thought I had, and as I was prepping for an upcoming trip, they ran into a snag with my front rim being bent. MARTIN ACTUALLY LET ME BORROW HIS SHOPS RIMS AS A LOANER FOR MY TRIP as to not set me back looking for a replacement in a rush.",
                                    DateAdded = DateTime.Now.AddDays(-2)
                                }
                            },
                            new UserMechanic
                            {
                                AppUserId = "g",
                                IsOwner = false,
                                IsCustomer = true,
                                CustomerRecommended = true,
                                DateBecameCustomer = DateTime.Now.AddMonths(-1)
                            },
                            new UserMechanic
                            {
                                AppUserId = "h",
                                IsOwner = false,
                                IsCustomer = true,
                                CustomerRecommended = true,
                                DateBecameCustomer = DateTime.Now.AddMonths(-1)
                            },
                            new UserMechanic
                            {
                                AppUserId = "d",
                                IsOwner = false,
                                IsCustomer = true,
                                CustomerRecommended = true,
                                DateBecameCustomer = DateTime.Now.AddMonths(-2)
                            },
                            new UserMechanic
                            {
                                AppUserId = "e",
                                IsOwner = false,
                                IsCustomer = true,
                                CustomerRecommended = true,
                                DateBecameCustomer = DateTime.Now.AddDays(-10)
                            }
                        },
                       Ratings = new List<Rating>
                       {
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "jane"),
                                Score = 4,
                           },
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "bob"),
                                Score = 5,
                           },
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "nina"),
                                Score = 4,
                           },
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "cato"),
                                Score = 5,
                           }
                        },
                        AverageRating = new AverageRating
                        {
                            Id = new Guid(),
                            Count = 4,
                            Average = 4.5
                        }
                    },
                    new Mechanic
                    {
                      Id = Guid.Parse("B0C1CE45-2E41-4C10-9D89-65EFB7EFE3EA"),
                      Name = "Serena",
                      Publisher = context.Users.SingleOrDefault(x => x.Id == "b"),
                      IsOwner = true,
                      Owner = "Jane",
                      Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                      YearOfStart = "1999", //DateTime.Now.AddYears(-8),
                      DatePublished = DateTime.Now.AddDays(-10),
                      Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),
                      City = "Rome",
                      Address = "Via Riccardo Riccardi 10",
                      TotalRecommended = 2,
                      MechanicPhoto = new MechanicPhoto
                       {
                          Id = "D07EB32A-19F7-438B-B8A6-2B7A471EC72D",
                          Url="https://res.cloudinary.com/motofy/image/upload/v1562103618/nz6xfbrz5zrsdhvqwevw.jpg",
                       },
                       Customers = new List<UserMechanic>
                        {
                            new UserMechanic
                            {
                                AppUserId = "c",
                                IsOwner = false,
                                IsCustomer = true,
                                DateBecameCustomer = DateTime.Now.AddMonths(-2),
                                CustomerRecommended = true,
                                Testimonial = new Testimonial
                                {
                                    Id = new Guid(),
                                    Text = "As someone who normally does 99% of the repairs and services myself, as their business name states, I have found 'My Mechanic'.",
                                    DateAdded = DateTime.Now.AddDays(-2)
                                }
                            },
                            new UserMechanic
                            {
                                AppUserId = "b",
                                IsOwner = true,
                                IsCustomer = false,
                                DateBecameCustomer = DateTime.Now.AddMonths(-1),
                                CustomerRecommended = true,
                                Testimonial = new Testimonial
                                {
                                    Id = new Guid(),
                                    Text = "Many thanks to Martin, Laura and Ricardo for the great customer service, and treating me and my family as a part of theirs.",
                                    DateAdded = DateTime.Now.AddDays(-2)
                                }
                            }
                        },
                        Ratings = new List<Rating>
                       {
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "jane"),
                                Score = 4,
                           },
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "tom"),
                                Score = 2,
                           }
                       },
                       AverageRating = new AverageRating
                        {
                            Id = new Guid(),
                            Count = 2,
                            Average = 3
                        }

                    },
                    new Mechanic
                    {
                      Name = "Casa di Gian Luca",
                      Publisher = context.Users.SingleOrDefault(x => x.Id == "h"),
                      IsOwner = false,
                      Owner = "Gian Luca",
                      Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                      YearOfStart = "2017",//DateTime.Now.AddYears(-2),
                      DatePublished = DateTime.Now.AddDays(-3),
                      Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),
                      City = "Rome",
                      Address = "Via Del Corso 107",
                      TotalRecommended = 2,
                      MechanicPhoto = new MechanicPhoto
                      {
                          Id = "E73715A2-C2D0-4A37-A36C-B74BE9D0C697",
                          Url="https://static.cargurus.com/images/article/2019/09/13/14/35/how_to_talk_to_a_mechanic-pic-8471425371895651297-1600x1200.jpeg",
                      },
                       Customers = new List<UserMechanic>
                        {
                            new UserMechanic
                            {
                                AppUserId = "a",
                                IsOwner = false,
                                IsCustomer = true,
                                DateBecameCustomer = DateTime.Now.AddDays(-5),
                                CustomerRecommended = true
                            },
                            new UserMechanic
                            {
                                AppUserId = "f",
                                IsOwner = false,
                                IsCustomer = true,
                                DateBecameCustomer = DateTime.Now.AddMonths(-1),
                                CustomerRecommended = true,
                            }
                        },
                        Ratings = new List<Rating>
                        {
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "bob"),
                                Score = 4,
                           },
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "emir"),
                                Score = 3,
                           }
                       },
                       AverageRating = new AverageRating
                        {
                            Id = new Guid(),
                            Count = 2,
                            Average = 3.5
                        }
                    },
                    new Mechanic
                    {
                      Name = "Casa Motoa",
                      Publisher = context.Users.SingleOrDefault(x => x.Id == "h"),
                      IsOwner = false,
                      Owner = "Zenit",
                      Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                      YearOfStart = "2017",//DateTime.Now.AddYears(-2),
                      DatePublished = DateTime.Now.AddDays(-35),
                      Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),
                      City = "Milan",
                      Address = "Via Del Liberta 10",
                      TotalRecommended = 2,
                      MechanicPhoto = new MechanicPhoto
                      {
                          Id = "zvqhhc6cvr4zecbkhwhb.jpg",
                          Url="https://res.cloudinary.com/motofy/image/upload/v1547294033/zvqhhc6cvr4zecbkhwhb.jpg",
                      },
                       Customers = new List<UserMechanic>
                        {
                            new UserMechanic
                            {
                                AppUserId = "c",
                                IsOwner = false,
                                IsCustomer = true,
                                DateBecameCustomer = DateTime.Now.AddDays(-5),
                                CustomerRecommended = false
                            },
                            new UserMechanic
                            {
                                AppUserId = "i",
                                IsOwner = false,
                                IsCustomer = true,
                                DateBecameCustomer = DateTime.Now.AddMonths(-1),
                                CustomerRecommended = false,
                            }
                        },
                        Ratings = new List<Rating>
                        {
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "joe"),
                                Score = 3,
                           },
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "jerry"),
                                Score = 3,
                           }
                       },
                       AverageRating = new AverageRating
                        {
                            Id = new Guid(),
                            Count = 2,
                            Average = 3
                        }
                    },
                    new Mechanic
                    {
                      Name = "Dule Radule",
                      Publisher = context.Users.SingleOrDefault(x => x.Id == "h"),
                      IsOwner = false,
                      Owner = "Dule Pavlovic",
                      Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                      YearOfStart = "2017",//DateTime.Now.AddYears(-2),
                      DatePublished = DateTime.Now.AddDays(-3),
                      Country = context.Countries.SingleOrDefault(x => x.Name == "Slovenia"),
                      City = "Ljubljana",
                      Address = "Detroit BB",
                      TotalRecommended = 4,
                      MechanicPhoto = new MechanicPhoto
                      {
                          Id = "b5ls74ojlv8va3ew7vvz",
                          Url="https://res.cloudinary.com/motofy/image/upload/v1546709652/b5ls74ojlv8va3ew7vvz.jpg",
                      },
                       Customers = new List<UserMechanic>
                        {
                            new UserMechanic
                            {
                                AppUserId = "c",
                                IsOwner = false,
                                IsCustomer = true,
                                DateBecameCustomer = DateTime.Now.AddDays(-5),
                                CustomerRecommended = true,
                            },
                            new UserMechanic
                            {
                                AppUserId = "g",
                                IsOwner = false,
                                IsCustomer = true,
                                DateBecameCustomer = DateTime.Now.AddDays(-5),
                                CustomerRecommended = true,
                            },
                            new UserMechanic
                            {
                                AppUserId = "e",
                                IsOwner = false,
                                IsCustomer = true,
                                DateBecameCustomer = DateTime.Now.AddDays(-5),
                                CustomerRecommended = true,
                            },
                            new UserMechanic
                            {
                                AppUserId = "d",
                                IsOwner = false,
                                IsCustomer = true,
                                DateBecameCustomer = DateTime.Now.AddMonths(-1),
                                CustomerRecommended = true,
                            }
                        },
                        Ratings = new List<Rating>
                        {
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "tom"),
                                Score = 5,
                           },
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "nina"),
                                Score = 5,
                           },
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "joe"),
                                Score = 5,
                           },
                           new Rating
                           {
                                Id = new Guid(),
                                User = userManager.Users.SingleOrDefault(x => x.UserName == "jerry"),
                                Score = 5,
                           }
                        },
                        AverageRating = new AverageRating
                            {
                                Id = new Guid(),
                                Count = 4,
                                Average = 5
                            }
                            },
                            new Mechanic
                            {
                            Name = "Noe Duca",
                            Publisher = context.Users.SingleOrDefault(x => x.Id == "h"),
                            IsOwner = false,
                            Owner = "Vlatko Serafciger",
                            Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                            YearOfStart = "2017",
                            DatePublished = DateTime.Now.AddDays(-3),
                            Country = context.Countries.SingleOrDefault(x => x.Name == "Croatia"),
                            City = "Pula",
                            Address = "Kolodvorska 7",
                            TotalRecommended = 3,
                            MechanicPhoto = new MechanicPhoto
                            {
                                Id = "djq0puodrzfqvkur2fjo",
                                Url="https://res.cloudinary.com/motofy/image/upload/v1547297184/djq0puodrzfqvkur2fjo.png",
                            },
                            Customers = new List<UserMechanic>
                                {
                                    new UserMechanic
                                    {
                                        AppUserId = "i",
                                        IsOwner = false,
                                        IsCustomer = true,
                                        DateBecameCustomer = DateTime.Now.AddDays(-5),
                                        CustomerRecommended = true,
                                    },
                                    new UserMechanic
                                    {
                                        AppUserId = "h",
                                        IsOwner = false,
                                        IsCustomer = true,
                                        DateBecameCustomer = DateTime.Now.AddMonths(-1),
                                        CustomerRecommended = false,
                                    },
                                    new UserMechanic
                                    {
                                        AppUserId = "f",
                                        IsOwner = false,
                                        IsCustomer = true,
                                        DateBecameCustomer = DateTime.Now.AddMonths(-1)
                                    }
                                },
                                Ratings = new List<Rating>
                                {
                                new Rating
                                {
                                        Id = new Guid(),
                                        User = userManager.Users.SingleOrDefault(x => x.UserName == "cato"),
                                        Score = 4,
                                },
                                new Rating
                                {
                                        Id = new Guid(),
                                        User = userManager.Users.SingleOrDefault(x => x.UserName == "giulietta"),
                                        Score = 2,
                                },
                                new Rating
                                {
                                        Id = new Guid(),
                                        User = userManager.Users.SingleOrDefault(x => x.UserName == "emir"),
                                        Score = 3,
                                }
                            },
                            AverageRating = new AverageRating
                                {
                                    Id = new Guid(),
                                    Count = 3,
                                    Average = 3
                                }
                            },
                        };
                context.Mechanics.AddRange(mechanics);
                context.SaveChanges();
            }
            if (!context.MechanicBrands.Any())
            {
                var mechanicBrands = new List<MechanicBrand>
                 {
                     new MechanicBrand
                     {
                        BrandId=Guid.Parse("C3E2AE61-BE37-4E22-B3B3-C4C124CCCE8D"),//motoguzzi
                        MechanicId=Guid.Parse("03CF160B-D5BD-44E9-ADE3-0BB4EAA694B7"), //corrado
                        DateAdded= DateTime.Now
                     },
                     new MechanicBrand
                     {
                        BrandId=Guid.Parse("1C8326C8-5843-48E9-AA3B-16496E1CA897"),//ducati
                        MechanicId=Guid.Parse("03CF160B-D5BD-44E9-ADE3-0BB4EAA694B7"), //corrado
                        DateAdded= DateTime.Now

                     },
                     new MechanicBrand
                     {
                        BrandId=Guid.Parse("7ACE392B-F077-4E4B-8679-2A5D1D8B77A9"),//mv avgusta
                        MechanicId=Guid.Parse("03CF160B-D5BD-44E9-ADE3-0BB4EAA694B7"), //corrado
                        DateAdded= DateTime.Now

                     },
                     new MechanicBrand
                     {
                        BrandId=Guid.Parse("A585178F-1252-413A-939F-B8640E93A940"),//honda
                        MechanicId=Guid.Parse("B0C1CE45-2E41-4C10-9D89-65EFB7EFE3EA"), //serena
                        DateAdded= DateTime.Now

                     },
                     new MechanicBrand
                     {
                        BrandId=Guid.Parse("1C8326C8-5843-48E9-AA3B-16496E1CA897"),//ducati
                        MechanicId=Guid.Parse("B0C1CE45-2E41-4C10-9D89-65EFB7EFE3EA"), //serena
                        DateAdded= DateTime.Now

                     },
                     new MechanicBrand
                     {
                        BrandId=Guid.Parse("43D5A027-67E2-42AC-B210-6C7B8D1FC591"),//harley davidson
                        MechanicId=Guid.Parse("B0C1CE45-2E41-4C10-9D89-65EFB7EFE3EA"), //serena
                        DateAdded= DateTime.Now
                     },
                     new MechanicBrand
                     {
                        BrandId=Guid.Parse("CFBCB816-86D2-4F51-B60D-DCA907BC474D"),//kawasaki
                        MechanicId=Guid.Parse("B0C1CE45-2E41-4C10-9D89-65EFB7EFE3EA"), //corrado
                        DateAdded= DateTime.Now
                     },
                 };
                context.MechanicBrands.AddRange(mechanicBrands);
                context.SaveChanges();
            }

        }
    }
}