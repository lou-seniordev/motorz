using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using FluentValidation;

namespace Application.Motofies
{
    public class Rate
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public int Score { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Score).NotEmpty();

            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            // private readonly IMapper _mapper;
            // private readonly IEntityPhotoAccessor __entityPhotoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor//, 
            // IMapper mapper, IEntityPhotoAccessor _entityPhotoAccessor
            )
            {
                // __entityPhotoAccessor = _entityPhotoAccessor;
                // _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {


                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());

                var motofy = await _context.Motofies.SingleOrDefaultAsync(x => x.Id == request.Id);

                motofy.MotofyScores.Add(new MotofyScore
                {
                    User = user,
                    Score = request.Score
                });

                int count = 0;
                double sum = 0;
                double result = 0;

                foreach (var score in motofy.MotofyScores)
                {
                    sum += score.Score;
                    count++;
                }
                result = sum / count;
                motofy.AverageRating.Count = count;
                motofy.AverageRating.Average = Math.Round(result, 2);
                
                // motofy.AverageRating = new AverageRating
                // {
                //     Id = new Guid(),
                //     Count = count,
                //     Average = Math.Round(result, 2)
                // };

                // count = 0;
                // sum = 0;
                // result = 0;

                _context.Motofies.Update(motofy);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}