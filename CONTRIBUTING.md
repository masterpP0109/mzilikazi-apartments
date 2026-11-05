# Contributing

## Local validation before opening a pull request

Run the following from the repository root:

```bash
npm ci
npm run lint
npx tsc --noEmit
npm test
npm run build
```

## Branching

- Keep the default branch protected and only merge verified changes into `main`.
- Prefer short-lived feature branches for changes.
- Keep pull requests focused on one outcome at a time.

## Required environment variables

Copy `.env.example` and fill in the values for your local environment before running the app or tests:

```bash
cp .env.example .env.local
```

Do not commit real secrets or tokens.

## Pull request checklist

- All required checks pass locally.
- Enquiry API changes are tested with valid and invalid payloads.
- Secrets are not logged or committed.
- Documentation is updated when operational behaviour changes.
