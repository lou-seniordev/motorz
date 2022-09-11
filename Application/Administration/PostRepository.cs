using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;

namespace Application.Administration
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PostRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        private async Task<AppUser> GetUser(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<Activity>> GetUserActivities(string username)
        {
            var user = await GetUser(username);

            var activities = user.UserActivities
                .Where(a => a.IsHost)
                .Select(a => a.Activity)
                .OrderByDescending(a => a.Date)
                .ToList();

            return activities;
        }


        public async Task<Activity> GetUserActivity(string id)
        {
            var activity = await _context.Activities.FindAsync(Guid.Parse(id));
            return activity;

        }

        public async Task<IEnumerable<Motofy>> GetUserMotofies(string username)
        {
            var user = await GetUser(username);

            var motofies = user.UserMotofies
                .Where(a => a.AppUserId == user.Id && a.IsOwner == true)
                .Select(a => a.Motofy)
                .OrderByDescending(a => a.DatePublished)
                .ToList();

            return motofies;
        }

        public async Task<Motofy> GetUserMotofy(string id)
        {
            var motofy = await _context.Motofies.FindAsync(Guid.Parse(id));
            return motofy;
        }

        public async Task<IEnumerable<Forumpost>> GetUserForumposts(string username)
        {
            var user = await GetUser(username);

            var forumposts = _context.Forumposts
                .Where(a => a.Author.Id == user.Id)
                // .Select(a => a.Motofy)
                .OrderByDescending(a => a.DateAdded)
                .ToList();

            return forumposts;
        }

        public async Task<Forumpost> GetUserForumpost(string id)
        {
            // var forumpost = await _context.Forumposts.FindAsync(Guid.Parse(id));
            // return forumpost;
            return await _context.Forumposts.FindAsync(Guid.Parse(id));
        }

        public async Task<IEnumerable<Mechanic>> GetUserMechanics(string username)
        {
            var user = await GetUser(username);

            var mechanics = _context.UserMechanics
                .Where(m => m.AppUserId == user.Id)
                .Select(m => m.Mechanic)
                .OrderByDescending(m => m.DatePublished)
                .ToList();

            return mechanics;
        }

        public async Task<Mechanic> GetUserMechanic(string id)
        {
            var mechanic = await _context.Mechanics.FindAsync(Guid.Parse(id));
            return mechanic;
        }

        public async Task<IEnumerable<Product>> GetUserProducts(string username)
        {
            var user = await GetUser(username);

            var mechanics = _context.Products
                .Where(p => p.Seller.Id == user.Id)
                .OrderByDescending(m => m.DatePublished)
                .ToList();

            return mechanics;
        }

        public async Task<Product> GetUserProduct(string id)
        {
            var product = await _context.Products.FindAsync(Guid.Parse(id));
            return product;
        }
    }
}