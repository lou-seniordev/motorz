using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Administration;
using Application.AdministrationTools;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize(Policy = "RequireAdminRole")]
    public class AdminController : BaseController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public AdminController(
            IUserRepository userRepository, IUserAccessor userAccessor,
            IMapper mapper, UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _userManager = userManager;
            _userAccessor = userAccessor;
        }

        [HttpGet("get-all-users")]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
        {
            userParams.CurrentUsername = _userAccessor.GetCurrentUsername();

            var users = await _userRepository.GetMembersAsync(userParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);
        }

        [HttpGet("get-user-by-id/{id}")]
        public async Task<ActionResult<MemberDto>> GetUserById(string id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            
            return  _mapper.Map<MemberDto>(user);
        }

        [HttpGet("get-user-by-username/{username}")]
        public async Task<ActionResult<MemberDto>> GetUserByUsername(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .OrderBy(u => u.UserName)
                .Select(u => new
                {
                    u.Id,
                    Username = u.UserName,
                    Roles = u.UserRoles
                        .Select(r => r.Role.Name)
                        .ToList()
                })
                .ToListAsync();

            return Ok(users);
        }

        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditRoles(string username, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Could not find user");

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));

        }

        [HttpPost("suspend-user/{username}")]
        public async Task<ActionResult> SuspendUser(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
                        
            if (user == null) return NotFound("Could not find user");

            user.Suspended = true;

            var success = _userRepository.SaveAllAsync();

            return Ok("User suspended");


            // var lockoutEndDate = DateTime.Now.AddDays(7);

            // return await LockoutOptions(username, lockoutEndDate);
        }



        [HttpPost("reactivate-user/{username}")]
        public async Task<ActionResult> ReactivateUser(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
                        
            if (user == null) return NotFound("Could not find user");

            user.Suspended = false;

            var success = _userRepository.SaveAllAsync();

            return Ok("User account reactivated");
            // var lockoutEndDate = DateTime.Now;

            // return await LockoutOptions(username, lockoutEndDate);

        }

        private async Task<ActionResult> LockoutOptions(string username, DateTime lockoutEndDate)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Could not find user");

            var status = await _userManager.GetLockoutEnabledAsync(user);

            if (status == false) return BadRequest("Lockout not enabled for this user");

            await _userManager.SetLockoutEndDateAsync(user, lockoutEndDate);

            return Ok(await _userManager.GetLockoutEndDateAsync(user));
        }
    }

}