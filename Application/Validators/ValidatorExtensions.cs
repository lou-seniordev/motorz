using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty()
                    .MinimumLength(6).WithMessage("Minimum length is 6 characters")
                    .Matches("[A-Z]").WithMessage("Pasword must contain one uppercase letter")
                    .Matches("[a-z]").WithMessage("Pasword must contain one lowercase letter")
                    .Matches("[0-9]").WithMessage("Pasword must contain a number")
                    .Matches("[^a-zA-Z0-9 ]").WithMessage("Pasword must contain non alphanumeric");

                return options;
            }
    }

}
