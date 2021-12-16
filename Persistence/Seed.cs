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
                    new Country { Name = "Serbia", CountryCode = "cs" },
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
                                City= "Zagreb",
                                // Country= "Croatia",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Croatia"),//"Italy",
                                ActivationCounter = 0,
                                PhoneNumber= "+38533890279",
                                ProductPhoto = new ProductPhoto {
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
                                // Country= "Italy",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),//"Italy",
                                PhoneNumber= "+3933890279",
                                Brand = "Dream Time",
                                Model = "De luxe",
                                Price = "100",
                                //PictureUrl = "https://res.cloudinary.com/motofy/image/upload/v1636533746/gloves.jpg",
                                DatePublished = DateTime.Now,
                                DateActivated = DateTime.Now,
                                IsActive = true,
                                IsAdvertised = false,
                                ActivationCounter = 1,
                                ProductPhoto = new ProductPhoto {
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
                                // Country= "Germany",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Germany"),//"Italy",

                                PhoneNumber= "+4933890279",
                                Brand = "Dainese",
                                Model = "Rain master lady d",
                                Price = "200",
                                //PictureUrl = "https://res.cloudinary.com/motofy/image/upload/v1637227543/rain-master-lady-d.png",
                                DatePublished = DateTime.Now,
                                DateActivated = DateTime.Now,
                                IsActive = true,
                                IsAdvertised = false,
                                ActivationCounter = 0,
                                ProductPhoto = new ProductPhoto {
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
                                // PictureUrl = "https://res.cloudinary.com/motofy/image/upload/v1636482030/nolan-biker-jacket.jpg",
                                Brand ="Nolan",
                                Category = "Gear",
                                City= "Ljubljana",
                                // Country= "Slovenia",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Slovenia"),//"Italy",
                                PhoneNumber= "+38633890279",
                                ProductPhoto = new ProductPhoto {
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
                                // PictureUrl = "https://res.cloudinary.com/motofy/image/upload/v1637227585/boots.jpg",
                                DatePublished = DateTime.Now,
                                DateActivated = DateTime.Now,
                                IsActive = true,
                                IsAdvertised = false,
                                ActivationCounter = 0,
                                 ProductPhoto = new ProductPhoto {
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
                                // Country= "Switzerland",
                                Country = context.Countries.SingleOrDefault(x => x.Name == "Switzerland"),
                                PhoneNumber= "+4133890279",
                                Brand = "Ghost racing",
                                Model = "Speed X",
                                Price = "10",
                                //PictureUrl = "https://res.cloudinary.com/motofy/image/upload/v1637227717/front_bag.jpg",
                                DatePublished = DateTime.Now,
                                DateActivated = DateTime.Now,
                                IsActive = true,
                                IsAdvertised = false,
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
            //==PRODUCT MESSAGES===
            if (!context.Messages.Any())
            {

                var messages1 = new List<Message>
                {
                    new Message
                    {
                    Id= Guid.Parse("15C1E352-FAC6-4756-B915-B7D3A67347F3"),
                    SenderId= "a",
                    SenderUsername= "bob",
                    RecipientId= "b",
                    RecipientUsername= "jane",
                    Content= "First Message from Bob to Jane 1!",
                    DateSent = DateTime.Now.AddMinutes(1)
// AddDays(-1),
                    },

                    new Message
                    {
                    Id= Guid.Parse("AD0B7BD5-856C-4BA4-B242-151E052138C5"),
                    SenderId= "a",
                    SenderUsername= "bob",
                    RecipientId= "b",
                    RecipientUsername= "jane",
                    Content= "Second Message from Bob to Jane! 2",
                    DateSent = DateTime.Now.AddMinutes(3)
                    },

                    new Message
                    {
                    Id= Guid.Parse("270C01F8-D970-46DB-8F1C-B5141B535F1E"),
                    SenderId= "b",
                    SenderUsername= "jane",
                    RecipientId= "a",
                    RecipientUsername= "bob",
                    Content= "First Message from Jane to Bob! 1",
                    DateSent = DateTime.Now.AddMinutes(2)
                    },
                    new Message
                    {
                    Id= Guid.Parse("B6064B38-EE20-40FC-A248-D2563DD43779"),
                    SenderId= "b",
                    SenderUsername= "jane",
                    RecipientId= "a",
                    RecipientUsername= "bob",
                    Content= "Second Messages Jane 2 Bob! 2",
                    DateSent = DateTime.Now.AddMinutes(4)
                    },
                     new Message
                    {
                    Id= Guid.Parse("FF510862-5C6F-43A0-B2BE-E0B3749B730F"),
                    SenderId= "a",
                    SenderUsername= "bob",
                    RecipientId= "b",
                    RecipientUsername= "jane",
                    Content= "Third Message from Bob to Jane 3!",
                    DateSent = DateTime.Now.AddMinutes(5)
                    },
                };
                var messages2 = new List<Message>
                {


                    new Message
                    {
                    Id= Guid.Parse("C0571EC4-EC3C-4377-9836-ECD3E1AACED1"),
                    SenderId= "a",
                    SenderUsername= "bob",
                    RecipientId= "c",
                    RecipientUsername= "tom",
                    Content= "First Message from Bob to Tom 1",
                    DateSent = DateTime.Now.AddMinutes(1)
                    },
                    new Message
                    {
                    Id= Guid.Parse("1888250C-4112-4DD8-8D29-37405E8FB7F5"),
                    SenderId= "c",
                    SenderUsername= "tom",
                    RecipientId= "a",
                    RecipientUsername= "bob",
                    Content= "First Message from Tom to Bob 1",
                    DateSent = DateTime.Now.AddMinutes(2)
                    },
                    new Message
                    {
                    Id= Guid.Parse("75729DD9-BC90-45D7-AF7A-CD6074B5D821"),
                    SenderId= "c",
                    SenderUsername= "tom",
                    RecipientId= "a",
                    RecipientUsername= "bob",
                    Content= "Second Message from Tom to Bob 2",
                    DateSent = DateTime.Now.AddMinutes(3)
                    },
                };

                await context.Messages.AddRangeAsync(messages1);
                await context.SaveChangesAsync();
                await context.Messages.AddRangeAsync(messages2);
                await context.SaveChangesAsync();

                Product product1 = context.Products.Find(Guid.Parse("AEE0C4FD-C8C8-4184-B91C-7BAC64213821"));
                if (product1 != null)
                {
                    product1.Messages = messages1;
                    await context.SaveChangesAsync();
                }
                else
                {
                    throw new Exception();
                }
                Product product2 = context.Products.Find(Guid.Parse("D938C1D0-3321-4357-B7C3-D5144C4EEB68"));
                if (product2 != null)
                {
                    product2.Messages = messages2;
                    await context.SaveChangesAsync();
                }
                else
                {
                    throw new Exception();
                }
                if (!context.MessageThreads.Any())
                {
                    var messageThreads = new List<MessageThread>
                {
                    new MessageThread
                    {
                        Id = Guid.Parse("603FDB55-2DE3-4624-AA9F-2F98D336875A"),
                        Messages = messages1,
                        InitUsername= "bob",
                        ReceiverUsername = "jane"
                    },
                    new MessageThread
                    {
                        Id = Guid.Parse("D5759CCD-CD56-4F18-890C-8C522C76C4E4"),
                        Messages = messages2,
                        InitUsername= "bob",
                        ReceiverUsername = "tome"

                    }


                };
                    await context.MessageThreads.AddRangeAsync(messageThreads);
                    await context.SaveChangesAsync();

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
                            // DateUploaded = DateTime.Now,
                            MotofyForeignKey = Guid.Parse("71d0f37a-4954-425e-9773-300e0669d9bd")
                        },
                        YearOfProduction = "2005",
                        DatePublished = DateTime.Now.AddDays(-100),
                        City = "Rome",
                        // Country = "Italy",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),//"Italy",

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
                            // DateUploaded = DateTime.Now,
                            MotofyForeignKey = Guid.Parse("7c54ae0d-f927-4fc0-bde5-7c18a6514928"),
                            // Id = context.MotofyPhotos.FirstOrDefault(s => s.Id == Guid.Parse("62d2f63a-46d3-4dd1-84d1-67cdf3c9fb92")).Id,
                        },
                        YearOfProduction = "2015",
                        DatePublished = DateTime.Now.AddDays(-10),
                        City = "Berlin",
                        // Country = "Germany",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Germany"),//"Italy",

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
                            // DateUploaded = DateTime.Now,
                            MotofyForeignKey = Guid.Parse("b2613251-e8aa-4d30-b9ab-4f243b64075d")

                        },
                        YearOfProduction = "2018",
                        DatePublished = DateTime.Now.AddDays(-85),
                        City = "Ljubljana",
                        // Country = "Slovenia",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Slovenia"),//"Italy",

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
                            // DateUploaded = DateTime.Now,
                            MotofyForeignKey = Guid.Parse("02d05033-ec4c-4fb5-9477-95ddb8ce5e39")

                        },
                        YearOfProduction = "2012",
                        DatePublished = DateTime.Now.AddDays(-40),
                        City = "Zurich",
                        // Country = "Switzerland",
                        Country = context.Countries.SingleOrDefault(x => x.Name == "Switzerland"),//"Italy",

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
                    //   PhotoUrl = "https://res.cloudinary.com/motofy/image/upload/v1547320881/prgbklusjdbenfbqtqfy.jpg",
                      Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                      YearOfStart = "2008",//DateTime.Now.AddYears(-10),
                      DatePublished = DateTime.Now.AddDays(-40),
                      Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),//"Italy",
                      City = "Rome",
                      Address = "Tor Pignattara 107",
                      MechanicPhoto = new MechanicPhoto{
                          Id = "B0ABFC9B-77E3-4068-96E0-DF704F156768",
                          Url="https://res.cloudinary.com/motofy/image/upload/v1547320881/prgbklusjdbenfbqtqfy.jpg",
                      }

                    },
                    new Mechanic
                    {
                      Name = "Serena",
                    //   PhotoUrl = "https://res.cloudinary.com/motofy/image/upload/v1562103618/nz6xfbrz5zrsdhvqwevw.jpg",
                      Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                      YearOfStart = "1999", //DateTime.Now.AddYears(-8),
                      DatePublished = DateTime.Now.AddDays(-10),
                    //   Country = "Italy",
                      Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),
                      City = "Rome",
                      Address = "Via Riccardo Riccardi 10",
                       MechanicPhoto = new MechanicPhoto{
                          Id = "D07EB32A-19F7-438B-B8A6-2B7A471EC72D",
                          Url="https://res.cloudinary.com/motofy/image/upload/v1562103618/nz6xfbrz5zrsdhvqwevw.jpg",
                      }

                    },
                    new Mechanic
                    {
                      Name = "Gian Luca",
                      //PhotoUrl = "https://static.cargurus.com/images/article/2019/09/13/14/35/how_to_talk_to_a_mechanic-pic-8471425371895651297-1600x1200.jpeg",
                      Description = "Many individuals choose to have a reliable auto repair technician come at their home or garage in case of problem with their vehicle. Automobile shops often nail their expenses like rent and other charges for performing repair of your vehicle. An auto repair mechanic can offer a great arrangement for their services. ",
                      YearOfStart = "2017",//DateTime.Now.AddYears(-2),
                      DatePublished = DateTime.Now.AddDays(-3),
                    //   Country = "Italy",
                      Country = context.Countries.SingleOrDefault(x => x.Name == "Italy"),
                      City = "Rome",
                      Address = "Via Del Corso 107",
                         MechanicPhoto = new MechanicPhoto{
                          Id = "E73715A2-C2D0-4A37-A36C-B74BE9D0C697",
                          Url="https://static.cargurus.com/images/article/2019/09/13/14/35/how_to_talk_to_a_mechanic-pic-8471425371895651297-1600x1200.jpeg",
                      }
                    },
                };
                context.Mechanics.AddRange(mechanics);
                context.SaveChanges();
            }



        }
    }
}