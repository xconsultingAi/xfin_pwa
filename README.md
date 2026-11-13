# XFin (xfin_pwa)

Installable web app (PWA) for recording **Expense** and **Income** as Journal Entries in ERPNext v16.
It is the Frappe-app version of the `xfin` Android app: same screens, but it runs inside the
ERPNext site, so there is no server URL to enter and it uses the normal ERPNext login.

- Opens at `https://<your-site>/xfin` and from the ERPNext apps screen
- On a phone, use the browser's **Install app** / **Add to Home screen** to install it like an app
- Entries are saved as **draft** Journal Entries for the selected company

## Install

```bash
cd ~/frappe-bench
bench get-app <repo-url>            # or the local folder apps/xfin_pwa
bench build --app xfin_pwa
bench --site <site> install-app xfin_pwa
```

ERPNext must be installed on the site.

## Who can use it

Desk users with **create** permission on Journal Entry (e.g. Accounts User). The company list
comes from the companies the user can read; the default is the user's default Company.

| Entry   | Debit                 | Credit                |
|---------|-----------------------|-----------------------|
| Expense | Expense account       | Cash / Bank account   |
| Income  | Cash / Bank account   | Income account        |

The optional Cost Center is set on the expense or income row.

## Develop

```bash
cd apps/xfin_pwa/frontend
yarn install
yarn dev            # http://<site>:8080/xfin, proxies /api to bench (port 8000)
```

`yarn dev` does not render the CSRF token, so set `"ignore_csrf": 1` in the site's
`site_config.json` while developing (never in production).

`yarn build` (or `bench build --app xfin_pwa`) writes the app to `xfin_pwa/public/frontend`
and copies `index.html` to `xfin_pwa/www/xfin.html`.

## Code

- `xfin_pwa/api.py` – whitelisted methods: boot data, account lists, `create_entry`
- `xfin_pwa/www/xfin.py` – serves the app; guests are sent to `/login`
- `frontend/` – Vue 3 + Ionic 8 + Pinia, PWA via `vite-plugin-pwa`
