---
name: spring-boot-conventions
description: 'Conventions for writing and reviewing Java / Spring Boot (and Spring + JSF) code: layering, transactions, validation, DTOs, exceptions, JPA, configuration, logging and tests. Use when writing or changing Java code in a Spring project, or when asked to check code against Spring best practices.'
---

# Spring Boot conventions

Apply these unless the project's CLAUDE.md says otherwise. The project's rules win.

## Layering
`web (controller / JSF bean) → service → repository → entity`
- Controllers/beans: HTTP/UI only: map input, call one service method, map output. No business logic, no repositories.
- Services: business rules and **transactions** (`@Transactional` on public service methods; `readOnly = true` for queries).
- Repositories: Spring Data interfaces; custom queries with named parameters only.
- Never return entities from REST controllers: use DTOs (Java `record` on 17+).

## Dependency injection
- Constructor injection with `final` fields (Lombok `@RequiredArgsConstructor` if the project uses Lombok). No field `@Autowired`.
- JSF + Spring: bean names must match EL (`#{payslipBean}` ↔ `@Component("payslipBean")`); choose scope deliberately (`@ViewScoped` for page state, never store per-user state in singletons).

## Validation & errors
- Validate at the edge: `@Valid` + Jakarta Bean Validation on DTOs (`@NotBlank`, `@Positive`, `@Email`).
- Business errors: specific exceptions (`EmployeeNotFoundException`) mapped once in `@RestControllerAdvice` → `ProblemDetail` (RFC 9457).
- Never swallow exceptions; never return `null` for "not found" from services: use `Optional` or throw.

## JPA
- `FetchType.LAZY` on associations; fetch what a use case needs with `JOIN FETCH` / entity graphs (avoid N+1).
- Money: `BigDecimal` with explicit scale and `RoundingMode.HALF_UP` (or the rule finance specifies). Dates: `LocalDate` / `Instant`, never `java.util.Date` in new code.
- Schema changes only via Flyway/Liquibase migrations; never `ddl-auto=update` outside local dev.
- Register entities where the project expects (`persistence.xml` in non-Boot setups).

## Configuration
- `@ConfigurationProperties` classes over scattered `@Value`. Secrets from env vars: `${DB_PASSWORD}`.
- Profiles: `application-local.yml`, `-test`, `-prod`; nothing environment-specific in the default file.

## Logging
SLF4J with parameters: `log.info("Payslip generated for employee {}", employeeId)`. No string concatenation, no personal data (salary, national ID, bank account), no `System.out`.

## Tests
- JUnit 5 + AssertJ + Mockito. Slices: `@WebMvcTest`, `@DataJpaTest`; `@SpringBootTest` only for a few end-to-end paths.
- Testcontainers for real DB behaviour when the project has it.
- Name: `method_expectedResult_whenCondition`.

## Review checklist
- [ ] No business logic in controllers/beans
- [ ] `@Transactional` at service level, not on repositories/controllers
- [ ] DTOs at the API boundary, validated
- [ ] No N+1 queries introduced
- [ ] `BigDecimal` for money
- [ ] Migration added for schema change
- [ ] Tests for the new rule
