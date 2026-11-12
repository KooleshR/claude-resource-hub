# PayFlow API (.NET): Claude instructions

REST API for payroll calculation and payslip generation.

## Commands
- Build: `dotnet build`
- Test: `dotnet test` · one test: `dotnet test --filter "FullyQualifiedName~PayslipCalculatorTests"`
- Run: `dotnet run --project src/PayFlow.Api` (https://localhost:7080/swagger)
- Format: `dotnet format`
- Migration: `dotnet ef migrations add <Name> -p src/PayFlow.Infrastructure -s src/PayFlow.Api`

## Stack
.NET 9, ASP.NET Core minimal APIs, EF Core 9 (SQL Server), FluentValidation, Serilog, xUnit + FluentAssertions + NSubstitute, Testcontainers.

## Layout
`src/PayFlow.Api` (endpoints), `src/PayFlow.Application` (use cases), `src/PayFlow.Domain` (entities, rules, no dependencies), `src/PayFlow.Infrastructure` (EF, external services), `tests/*`.

## Rules
- Nullable reference types on; no `!` to silence warnings without a comment.
- `async` all the way, pass `CancellationToken`.
- Money is `decimal`. Rounding rules live in `Domain/Payroll/Rounding.cs` only.
- Errors return `ProblemDetails`. Validation via FluentValidation, not in endpoints.
- Config via `IOptions<T>`; secrets from user-secrets locally, environment in deployed envs.
- Structured logging: `logger.LogInformation("Payslip {PayslipId} generated", id)`. No personal data.

## Before you finish
`dotnet build -warnaserror && dotnet test` must pass.

## Don't
- Don't edit existing migrations or `appsettings.Production.json`.
