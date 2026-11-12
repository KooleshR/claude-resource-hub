# PayFlow Reports (Python): Claude instructions

Reporting service: monthly payroll reports, exports to Excel/PDF, a small FastAPI.

## Commands
- Setup: `uv sync`
- Run API: `uv run fastapi dev src/payflow_reports/main.py`
- Test: `uv run pytest` · one test: `uv run pytest tests/test_payroll_summary.py -k overtime`
- Lint + format: `uv run ruff check --fix . && uv run ruff format .`
- Types: `uv run mypy src`

## Stack
Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2 (async), Alembic, pandas, openpyxl, pytest + pytest-asyncio.

## Layout
`src/payflow_reports/{api,services,repositories,models,schemas}`, `tests/` mirrors `src/`.

## Rules
- Type hints everywhere; Pydantic models at the API edge.
- Money with `decimal.Decimal`, never `float`. Quantize with `ROUND_HALF_UP`.
- DB access only in `repositories/`. Parameterised queries only.
- New migrations: `uv run alembic revision --autogenerate -m "<desc>"`, then review the file.
- Logging via `logging.getLogger(__name__)`; no personal data in logs.

## Before you finish
`uv run ruff check . && uv run mypy src && uv run pytest` must pass.

## Don't
- Don't add packages with pip; use `uv add`. Don't touch `.env`.
