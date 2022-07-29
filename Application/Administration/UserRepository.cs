using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using Application.AdministrationTools;

namespace Application.Administration
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<AppUser> GetUserByIdAsync(string id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
            .Where(u => u.UserName == username)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query =  _context.Users
            
            .AsQueryable();

            if(!string.IsNullOrEmpty(userParams.CurrentUsername))
                query = query.Where(u => u.UserName != userParams.CurrentUsername);
            if(!string.IsNullOrEmpty(userParams.Gender))
                query = query.Where(u => u.Gender == userParams.Gender);
            if(!string.IsNullOrEmpty(userParams.Country))
                query = query.Where(u => u.Country == userParams.Country);
            if(!string.IsNullOrEmpty(userParams.City))
                query = query.Where(u => u.City == userParams.City);

            query = userParams.OrderBy switch 
            {
                "joined" => query.OrderByDescending(u => u.JoinedUs),
                "displayName" => query.OrderByDescending(u => u.DisplayName),
                _ => query.OrderByDescending(u => u.LastActive)
            };
            

            return await PagedList<MemberDto>.CreateAsync(query.ProjectTo<MemberDto>(_mapper
            .ConfigurationProvider).AsNoTracking(), 
                userParams.PageNumber, userParams.PageSize);
            
        }

        public Task SuspendUser(string username)
        {
            throw new System.NotImplementedException();
        }

        public Task ReactivateUser(string username)
        {
            throw new System.NotImplementedException();
        }

        #region Possible Delete User
        // public async Task<AppUser> DeleteUser(string id)
        // {
        //     var user = await _context.Users.SingleOrDefaultAsync(x => x.Id == id);

        //     _context.Remove(user);

        //      var success = await _context.SaveChangesAsync() > 0;

        //     if (success) return user;

        //     throw new System.NullReferenceException();
        // }
        #endregion          
    }
}