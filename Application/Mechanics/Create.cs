using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.Mechanics
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string PhotoUrl { get; set; }
            public string Description { get; set; }
            public string YearOfStart { get; set; }
            public DateTime DatePublished { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
            public string Address { get; set; }

        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.PhotoUrl).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.YearOfStart).NotEmpty();
                RuleFor(x => x.DatePublished).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Country).NotEmpty();
                RuleFor(x => x.Address).NotEmpty();
            
            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());

                var mechanic = new Mechanic
                {
                    Id = request.Id,
                    Name = request.Name,
                    Description = request.Description,
                    YearOfStart = request.YearOfStart,
                    DatePublished = DateTime.Now,
                    Country = request.Country,
                    City = request.City,
                    Address = request.Address

                };

                _context.Mechanics.Add(mechanic);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}