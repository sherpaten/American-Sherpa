# RipTides Admin Dashboard

The private membership workspace is available at `/admin`.

## Local development

1. Check out this branch: `feature/admin-dashboard`.
2. In the repository root, install dependencies and start the Vite frontend:

   ```powershell
   npm install
   npm run dev
   ```

3. In a second terminal, start the backend:

   ```powershell
   cd backend
   npm install
   npm run dev
   ```

4. Open the Vite URL and visit `/admin` (normally `http://localhost:5173/admin`).
5. Sign in with an existing active Admin or Staff account.

The frontend defaults to `http://localhost:5000` for the API during local development.

## Production configuration

Before deploying the frontend, configure the Vercel environment variable:

- `VITE_API_BASE_URL`: the public HTTPS base URL of the deployed RipTides backend, without a trailing slash.

The backend must be reachable from the public internet over HTTPS. Configure its `FRONTEND_URL` environment variable to the exact deployed frontend origin so the API's CORS policy permits the dashboard.

Do not set `VITE_API_BASE_URL` to `localhost` in a production deployment. A visitor's browser would try to connect to their own computer, not the backend server.

## Access and permissions

- Admin and Staff can sign in using the existing `POST /api/auth/login` endpoint.
- Both roles can view/search members and record cash payments.
- Only Admin can record online payments, confirm payments, activate or renew memberships, schedule cancellations, and create Staff accounts.
- The API remains the authority for permissions; hiding controls in the frontend is not a security boundary.
- The login token is kept in `sessionStorage` and expires according to the backend's existing eight-hour JWT policy.

This change does not modify the MongoDB schema, membership API, reservation AI endpoint, or public navigation.
