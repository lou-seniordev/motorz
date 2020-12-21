using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
// using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using FluentValidation;

namespace Application.Motofies
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Brand { get; set; }
            public string Model { get; set; }
            public string CubicCentimeters { get; set; }
            // public string PhotoUrl { get; set; }
            public string Description { get; set; }
            public string YearOfProduction { get; set; }
            public DateTime DatePublished { get; set; }
            public string City { get; set; }
            public string Country { get; set; }
            public string PricePaid { get; set; }
            public string EstimatedValue { get; set; }
            public string NumberOfKilometers { get; set; }


        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Brand).NotEmpty();
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Model).NotEmpty();
                RuleFor(x => x.CubicCentimeters).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.YearOfProduction).NotEmpty();
                RuleFor(x => x.DatePublished).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Country).NotEmpty();
                RuleFor(x => x.PricePaid).NotEmpty();
                RuleFor(x => x.EstimatedValue).NotEmpty();
                RuleFor(x => x.NumberOfKilometers).NotEmpty();
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

                var motofy = new Motofy
                {
                    Id = request.Id,
                    Name = request.Name,
                    Brand = request.Brand,
                    Model = request.Model,
                    CubicCentimeters = request.CubicCentimeters,
                    Description = request.Description,
                    YearOfProduction = request.YearOfProduction,
                    NumberOfKilometers = request.NumberOfKilometers,
                    City = request.City,
                    Country = request.Country,
                    PricePaid = request.PricePaid,
                    EstimatedValue = request.EstimatedValue,
                    DatePublished = request.DatePublished

                };

                _context.Motofies.Add(motofy);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}