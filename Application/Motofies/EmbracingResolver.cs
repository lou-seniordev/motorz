using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Motofies
{
    public class EmbracingResolver : IValueResolver<UserMotofy, EmbracerDto, bool>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccesor;
        public EmbracingResolver(DataContext context, IUserAccessor userAccesor)
        {
            _userAccesor = userAccesor;
            _context = context;

        }

        public bool Resolve(UserMotofy source, EmbracerDto destination, bool destMember, ResolutionContext context)
        {
            var currentUser = _context.Users.SingleOrDefaultAsync(x => x.UserName == 
                _userAccesor.GetCurrentUsername()).Result;

            if(currentUser.Followings.Any(x => x.TargetId == source.AppUserId))
                return true;

            return false;
        }
    }
}