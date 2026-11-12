---
name: react-component
description: 'Creates or refactors a React component the way this project does it: typed props, accessible markup, state kept minimal, styling in the project''s system, a Testing Library test and (if the project uses it) a Storybook story. Use when the user asks for a new React component or to clean up an existing one.'
---

# React component

## 1. Match the project
Look at 2–3 existing components and copy: file layout (`Button/Button.tsx` + `index.ts` vs single file), naming, export style, styling (CSS Modules / Tailwind / styled-components / MUI), test runner (Vitest/Jest), Storybook presence, and data fetching (TanStack Query, SWR, RTK Query, server components).

## 2. Design the API first
Write the props type before the JSX:
```tsx
type PayslipCardProps = {
  employeeName: string;
  period: string;            // "2026-10"
  netPay: number;
  currency?: string;         // default "MUR"
  onDownload?: () => void;
};
```
- Few props; group related values; callbacks named `onX`.
- No boolean prop explosion: use a `variant` union instead.
- Accept `className` / rest props only if other components do.

## 3. Build it
- Semantic HTML first (`button`, `nav`, `ul`, `label`), ARIA only when needed; keyboard works.
- State: derive instead of storing (`const total = items.reduce(...)`, not `useState` + `useEffect`). Lift state only when siblings need it.
- `useEffect` only for syncing with something outside React. Fetching uses the project's data library.
- Format numbers/dates with `Intl` (`new Intl.NumberFormat(locale, { style: 'currency', currency })`).
- Memoise only after a measured problem.

## 4. Test it
```tsx
it('calls onDownload when the download button is clicked', async () => {
  const onDownload = vi.fn();
  render(<PayslipCard employeeName="A. Rao" period="2026-10" netPay={42000} onDownload={onDownload} />);
  await userEvent.click(screen.getByRole('button', { name: /download/i }));
  expect(onDownload).toHaveBeenCalledOnce();
});
```
Query by role/label/text, not class names or test ids (unless the project standard is test ids).

## 5. Story (if Storybook exists)
Default, empty/edge state, loading and error variants.

## Done when
Types pass (`tsc`), lint passes, test passes, component is exported where others are.
