# Repository Guidelines

## Project Structure & Module Organization

This is an Expo SDK 54 React Native app using Expo Router. Route files live in `app/`, including `app/(auth)` for authentication screens and `app/(tabs)` for the main tab UI. Shared code lives in `src/`: UI components in `src/components`, features in `src/features`, mock data in `src/data`, theme tokens in `src/theme`, and types in `src/types`. Static images and icons are in `src/assets`; keep existing filenames stable because screens import them directly.

## Build, Test, and Development Commands

- `npm install` installs dependencies from `package-lock.json`.
- `npm run start` starts the Expo development server.
- `npm run android`, `npm run ios`, and `npm run web` start Expo for the target platform.
- `npm run typecheck` runs `tsc --noEmit` with strict TypeScript settings.
- `npx expo start --clear` clears Metro cache when UI or assets look stale.

There is no lint, test, or production build script yet; add scripts before relying on them in automation.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Prefer `.tsx` for screens/components and `.ts` for data, services, types, and helpers. Import shared code with `@/...` for paths under `src/`. Use PascalCase for component files, lowercase or Expo dynamic notation for routes such as `[id].tsx`, and keep theme constants under `src/theme`. Preserve strict typing; avoid `any` unless the boundary is genuinely untyped.

## Testing Guidelines

No test framework is configured yet. Run `npm run typecheck` before each PR and manually verify auth screens, tab navigation, product/news detail routes, scanner access, chat, and local notifications in Expo. When adding tests, place them near the covered feature or component as `*.test.ts` or `*.test.tsx`, and add the matching npm script.

## Commit & Pull Request Guidelines

Recent commits use short imperative summaries, for example `Improve branded UI and add local notifications`. Keep subjects concise and focused. PRs should include a description, linked issue when available, screenshots or recordings for UI changes, commands run, and manual Expo device checks.

## Security & Configuration Tips

Do not commit real secrets, service keys, or production API URLs. Keep environment-specific values outside source control and document placeholders in an example env file if configuration is added. Treat client-side code as public: authorization, ownership checks, and sensitive validation belong on the backend or trusted API layer.
