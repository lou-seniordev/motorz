using System.Collections.Generic;
using System.Threading.Tasks;
using Application.AdministrationTools;
using Domain;

namespace Application.Administration
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(string id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<bool> SaveAllAsync();
        Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
        Task<MemberDto> GetMemberAsync(string username);
        Task SuspendUser(string username);
        Task ReactivateUser(string username);

        #region Possible Delete User
        // Task<AppUser> DeleteUser(string username);
        #endregion

    }
}