using System.Threading.Tasks;
using Application.Products;
using Coravel.Invocable;
using MediatR;
using Microsoft.Extensions.Logging;

namespace API.Workers
{
    public class ProcessExpiredProducts : IInvocable
    {
        private readonly ILogger<ProcessExpiredProducts> _logger;
        public readonly IMediator _mediator;

        public ProcessExpiredProducts(ILogger<ProcessExpiredProducts> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;

        }
        public async Task Invoke()
        {
            await ProcessExpired(new RunServiceDeactivateExpiredProducts.Command {});
        }

        public async Task ProcessExpired(RunServiceDeactivateExpiredProducts.Command command)
        {
            await _mediator.Send(command);

            _logger.LogInformation($"Processed Expired Product is complete");
        }
    }
}