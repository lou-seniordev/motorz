using System.Threading.Tasks;
using Application.Products;
using Coravel.Invocable;
using MediatR;
using Microsoft.Extensions.Logging;

namespace API.Workers
{
    public class ProcessInactiveProducts : IInvocable
    {
        private readonly ILogger<ProcessInactiveProducts> _logger;
        public readonly IMediator _mediator;
        public ProcessInactiveProducts(ILogger<ProcessInactiveProducts> logger, IMediator mediator)
        {
            _mediator = mediator;
            _logger = logger;
            
        }
        public async Task Invoke()
        {
            await ProcessInactive(new RunServiceDeleteInactiveProducts.Command {});
        }

        public async Task ProcessInactive (RunServiceDeleteInactiveProducts.Command command)
        {
            await _mediator.Send(command);

            _logger.LogInformation($"Processed Inactive Product is complete");
        }
    }
}