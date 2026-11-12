# PayFlow HR: Claude instructions

Payroll and HR web app. Spring Boot 3 + JSF (PrimeFaces) front end, Oracle database.

## Commands
- Build: `./mvnw -q compile`
- Test: `./mvnw -q test` · one test: `./mvnw -q test -Dtest=PayslipServiceTest`
- Run locally: `./mvnw spring-boot:run -Dspring-boot.run.profiles=local`
- Package: `./mvnw -q package` → `target/payflow.war`

## Stack
- Java 17, Spring Boot 3.x, Jakarta EE (`jakarta.*`, never `javax.*`)
- JSF 4 + PrimeFaces 13, pages in `src/main/webapp/pages/**.xhtml`
- Oracle 19c, Flyway migrations in `src/main/resources/db/migration`
- JUnit 5, AssertJ, Mockito, Testcontainers (Oracle XE)

## Layout
`com.payflow.<module>.{web,service,repository,domain,dto}`. Modules: employee, payroll, leave, reporting.

## Rules
- Business logic in services only. JSF beans call one service method per action.
- `@ViewScoped` for page beans; `Serializable` for anything in session.
- Money is `BigDecimal`, scale 2, `RoundingMode.HALF_UP`. Never `double`.
- Every new label goes into **both** `messages_en.properties` and `messages_fr.properties`.
- Schema changes: new Flyway file only. Never edit an applied migration.
- No salaries, national IDs or bank details in logs.

## Before you finish
Run `./mvnw -q test`. For `.xhtml` changes, use the `jsf-page-review` skill.

## Don't
- Don't touch `src/main/resources/application-prod.yml`.
- Don't commit or push; the developer does.
