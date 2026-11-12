---
name: build-and-package
description: 'Builds, tests and packages the project with its own tool (Maven, Gradle, npm/pnpm, dotnet, Python) and explains failures: JAR/WAR, Docker image, front-end bundle, NuGet or wheel. Use when the user asks to "build", "package", "make the WAR/JAR", "prepare a release build", or a build is failing.'
---

# Build & package

## 1. Detect
| Found | Tool | Build | Test | Package |
|---|---|---|---|---|
| `pom.xml` (+ `mvnw`) | Maven | `mvn -q compile` | `mvn -q test` | `mvn -q -DskipTests=false package` → `target/*.jar` or `*.war` |
| `build.gradle(.kts)` | Gradle | `./gradlew compileJava` | `./gradlew test` | `./gradlew build` / `bootJar` / `war` |
| `package.json` | npm/pnpm/yarn (check lock file) | `npm run build` | `npm test` | `dist/` / `.next/` / `build/` |
| `*.sln` / `*.csproj` | dotnet | `dotnet build -c Release` | `dotnet test` | `dotnet publish -c Release -o out` |
| `pyproject.toml` | uv/poetry/pip | `python -m build` | `pytest` | `dist/*.whl` |
| `Dockerfile` | Docker | `docker build -t <name>:<tag> .` | | |
Prefer the wrapper (`mvnw`, `gradlew`) and the scripts in `package.json` / CLAUDE.md over generic commands.

## 2. Check the environment first
- Java: `java -version` and `mvn -v` show the **same** JDK the project targets (`maven.compiler.release`, `java.version`, toolchains). Wrong JDK is the #1 cause of "works on my machine".
- Node: `node -v` vs `.nvmrc` / `engines`. .NET: `dotnet --list-sdks` vs `global.json`.

## 3. Build in order
compile → test → package. Stop at the first failure and explain it; don't skip tests to get a green build unless the user explicitly asks (and say so in the result).

## 4. Common failures
| Symptom | Likely cause |
|---|---|
| `invalid target release: 17` | Maven running on an older JDK |
| `Could not resolve dependencies` | Offline/proxy/settings.xml mirror; private repo credentials |
| `package javax.* does not exist` | javax → jakarta migration (Spring Boot 3 / Jakarta EE 9+) |
| `ERR_PNPM_OUTDATED_LOCKFILE` / `npm ci` fails | Lock file out of sync: run install locally, commit lock |
| `NETSDK1045` | Project needs a newer .NET SDK |
| Tests pass alone, fail together | Shared state / order dependence |

## 5. Report
Artifact path and size, build time, test summary (passed/failed/skipped), and any warnings worth fixing.
