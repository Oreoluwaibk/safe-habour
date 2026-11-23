# Safe Harbour — engineering notes

Frontend for a care marketplace: clients hire service workers, workers manage availability and payouts, admins run KYC, jobs, and RBAC. This repo is the Next.js client. The API is a separate ASP.NET service (`/Authentication/*`, `/SuperAdmin/*`). There is no BFF and almost no server rendering.

Read this before changing auth, dashboards, or anything that talks to the API.

## Stack

| Layer | What we use |
| --- | --- |
| App | Next.js 16 App Router, React 19, TypeScript (`strict`) |
| UI | Ant Design 5 (`@ant-design/v5-patch-for-react-19`) + Tailwind 4 |
| Session | Redux Toolkit. One slice: `auth` |
| HTTP | Axios (`utils/axiosConfig.ts`) |
| Payments | Stripe.js (`@stripe/stripe-js`, `@stripe/react-stripe-js`) |
| Realtime | `@microsoft/signalr` |
| Motion | Framer Motion |
| Charts | Recharts |
| Dates | `dayjs` and `moment` are both installed. Prefer `dayjs` in new code. |

`npm run dev` uses Turbopack. `reactStrictMode` is off in `next.config.ts`, so effects do not double-invoke in dev. Do not treat a clean local run as proof an effect is idempotent.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

`postinstall` rebuilds `lightningcss`. If Tailwind classes vanish after a Node upgrade, run `npm rebuild lightningcss`.

There is no test runner.

## Environment

All of these are `NEXT_PUBLIC_*`, so they ship to the browser. Do not put secrets here. Copy `.env` locally; do not commit new keys.

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Axios `baseURL` and unauthenticated auth calls |
| `NEXT_PUBLIC_PROFILE_URL` | Profile and media host. Also the waitlist base URL |
| `NEXT_PUBLIC_PROFILE_URL2` | Notification icon URLs |
| `NEXT_PUBLIC_SIGNALR_URL` | Hub URL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `loadStripe` in `src/lib/stripe.ts` |

`next/image` only allows `https://safeharbour.azurewebsites.net/**`. A new image host needs a `remotePatterns` entry in `next.config.ts` or the image will fail at runtime. SVGs are allowed with a sandboxed CSP.

## Mental model

Routing is App Router. Data loading is not.

`src/app/layout.tsx` is `"use client"`. The root is a client boundary, so:

- `metadata` cannot be exported. The title and description are hardcoded in `<head>`.
- Pages do not fetch on the server. They mount, then call an API function, then `setState`.
- There is no `middleware.ts`. Nothing on the edge checks the session.

Redux is the session, not the domain cache. Jobs, messages, wallets, and admin tables live in component state. `src/redux/action/*` looks like Redux but is mostly plain async functions that return Axios responses. Only `loginAction` is a thunk, and it exists twice (see gotchas).

Shared request and response shapes live in `utils/interface.ts`. That file is large. Add a type next to the call if it is used once; put it in `interface.ts` only when more than one module needs it.

`@/*` maps to `./src/*` only. `utils/`, `assets/`, and `theme/` sit outside `src` and are imported with relative paths.

## Roles and shells

Login reads `roles[0]` and stores it as `loginType`.

| Role | Lands on | Shell |
| --- | --- | --- |
| `ClientUser` | `/dashboard/client`, or `/dashboard/client/deactivated` | `ClientContainer` |
| `ServiceWorker` | `/dashboard/worker` if `isServiceWorkerOnboarded`, else `/dashboard/worker/intro`. Deactivated users go to `/dashboard/worker/deactivated` | `WorkerContainer` |
| `SuperAdmin` | `/dashboard/admin` | `AdminContainer` |

Each dashboard shell redirects to `/auth/login` when the session is missing, and `router.replace`s a user who is authenticated as the wrong role. The marketing shell is `src/components/dashboard/Container.tsx` (header, footer, login/dashboard buttons). Auth pages use `AuthContainer`.

Admin screens are further gated by permission keys (`users.manage`, `kyc.manage`, `rbac.manage`, and the rest in `src/hooks/usePermissions.tsx`). That hook seeds a hardcoded catalog, then replaces it from `getAdminPermissions`. A new admin page needs both a route and a permission key the API actually returns.

## Auth and the token

Session keys in `localStorage`:

- `safehabour_user`
- `safehabour_token`
- `safehabour_token_expiry`
- `safehabour_login_type`

The auth slice hydrates from those keys at module init (`typeof window` guard). Logout clears them and the slice.

`utils/axiosConfig.ts` attaches `Authorization: Bearer <token>`.

1. If `tokenExpiry` is already in the past, it refreshes before the request.
2. On `401`, it refreshes once (`_retry`) and replays the original request.
3. Concurrent callers wait on `refreshQueue` so only one refresh runs.
4. Refresh failure dispatches `logoutUser` and stores `lastRoute` as the current path plus search.

`refreshToken` posts to `/Authentication/refresh` through the same Axios instance. A 401 from refresh can re-enter the interceptor. If you touch this file, keep the queue and the `_retry` flag, and do not call the authed instance from inside the refresh itself without a bypass.

Public auth calls (`login`, `register`, `forgot-password`, `confirm-email`) use a bare Axios client against `NEXT_PUBLIC_API_URL`. Everything else should use `axiosInstance`.

## Realtime and payments

`src/lib/signalRConnection.ts` is a singleton. `startConnection(token, userId)` builds the hub with WebSockets, SSE, and long polling, then invokes `JoinUserGroup`. Listeners:

- `ReceiveNotification`
- `ReceiveMessage`

Reconnect delays: immediate, 2s, 10s, then 30s. Call `offNotification` / `offMessage` when a screen unmounts or you will stack handlers on the same connection.

Stripe is loaded once in `StripeProvider` at the root. Payment intents, Connect accounts, payouts, and fees are in `src/redux/action/transaction.ts`. Card UI uses `@stripe/react-stripe-js`. The publishable key is public; secret key work stays on the API.

## Where code goes

```
src/app/                  routes only. Keep pages thin.
src/app/dashboard/        client | worker | admin
src/components/           feature UI (client, wallet, admin, auth, pages, general)
src/components/dashboard/ shells: Container, ClientContainer, WorkerContainer, AdminContainer
src/redux/action/         API modules, grouped by domain
src/redux/reducer/auth/   the only slice
src/lib/                  stripe, signalR
src/hooks/                permissions, geolocation, signalR, debounce
utils/                    axios instance, shared types, converters
theme/themeConfig.ts      Ant Design tokens. Primary is #670316
assets/                   logos, icons, images
```

Marketing pages (`/`, `/about`, `/services`, `/how-it-works`, `/trust-and-safety`, `/faqs`) compose sections under `src/components/pages` and `src/components/general` inside `Container`.

Ant Design theme tokens live in `theme/themeConfig.ts` and are applied by `ConfigProvider` in the root layout. Tailwind is for layout and one-off spacing. When both set the same property, Ant Design's hashed class usually wins. Prefer a token change over a Tailwind override on an Ant component.

Fonts are Inter and Open Sans via `next/font`, exposed as `--font-inter` and `--font-open-sans`.

## Adding a feature

1. Add the route under `src/app/.../page.tsx` and render it inside the right shell.
2. Put the HTTP call in the matching file under `src/redux/action/`, using `axiosInstance`.
3. Keep the response in component state unless it is session data.
4. Type the payload. Reuse `utils/interface.ts` when the shape is already there.
5. For admin, gate the screen with the permission key from `usePermissions`.
6. For a new image host, update `images.remotePatterns`.
7. Surface errors with `App.useApp().message` (the root renders `<AntApp>`). Do not import `message` from `antd` statically or the theme context is missing.

## Gotchas

- **Two `loginAction` thunks.** `src/redux/reducer/auth/auth.ts` defines one and the slice handles it. `src/redux/action/auth.ts` defines another that `JSON.stringify`s the token. The reducer stores the raw string. Import the thunk from the reducer. Do not add a third.
- **Expiry is compared two ways.** The interceptor treats `tokenExpiry` as a number (`expiry < Date.now()`). The marketing shell does `new Date(tokenExpiry).getTime()`. A locale date string and a unix millisecond string do not fail the same way. If you change the refresh contract, update both.
- **No route guard.** A deep link renders, then the shell redirects. Expect a flash. Do not put privileged data in the first render.
- **Client-only layout.** Adding a server component under `src/app` still sits inside a client root. You cannot `await` cookies or fetch in a layout and have it stay on the server.
- **Strict mode is off.** A fetch in `useEffect` with a missing cleanup will look fine locally and double-fire in a future strict build.
- **Interceptor logs the status of every error** (`console.log` in the response interceptor). Remove that before you rely on a quiet production console. `compiler.removeConsole` is `false`.
- **Names lie.** `src/redux/action` is not a set of slices. `useLAnguage.ts`, `wailist/`, `deActviateAccount`, and `ServiceLAnding.tsx` are existing typos. Match the file you import; do not "fix" the path in one callsite.
- **Waitlist uses `NEXT_PUBLIC_PROFILE_URL`, not the API base URL.**
- **Logout reports success on failure.** `Container` still dispatches `logoutUser` and shows a success toast if `/Authentication/logout` throws. The local session is what matters.

## API modules

| File | Domain |
| --- | --- |
| `auth.ts` | login, register, OTP, password, refresh, 2FA, worker onboarding, documents |
| `client.ts` | client profile and hiring |
| `serviceWorker.ts` | worker profile and services |
| `jobs.ts` | jobs, applications, hire, complete |
| `schedules.ts` | weekly availability |
| `messages.ts` | chat REST (live events come from SignalR) |
| `transaction.ts` | Stripe, fees, payouts |
| `review.ts` | ratings |
| `admin.ts` | users, KYC, roles, permissions |
| `superAdmin.ts` | admin users, service categories, platform settings |
| `settings.ts` | account settings |
| `extra.ts` | lookups that do not belong to one domain |
| `waitlist.ts` | public waitlist form |

Paths are relative to `baseURL` (`/Authentication/login`, `/SuperAdmin/roles`, and so on). Match the existing casing. The API is case-sensitive.
