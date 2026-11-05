# DevOps and deployment guide

## Architecture overview

This project is a Next.js 16 application deployed to Vercel. The application is also designed to run in a local Docker environment for service emulation and smoke testing.

```text
Developer
  -> Feature branch
  -> Pull request
  -> GitHub Actions CI
      -> npm ci
      -> npm run lint
      -> npx tsc --noEmit
      -> npm test
      -> npm run build
  -> Vercel preview deployment
  -> Review + protected branch
  -> Merge to main
  -> Production CI gate
  -> Vercel production deployment
  -> Post-deployment checks
```

## Branching strategy

- `main` is the production branch.
- Feature work is done in short-lived branches.
- Pull requests should target `main` only.
- Production deployments are gated by GitHub Actions and Vercel production settings.

## Required GitHub secrets and variables

Repository administrators should configure these in GitHub repository or environment secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Optional environment variables for local app execution:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Never commit secrets to the repository.

## Vercel configuration

- Connect the GitHub repository to Vercel.
- Enable GitHub integration for production and preview deployments.
- Configure environment variables explicitly for each environment.
- Mark production as a protected environment if GitHub Environment protection is used.
- Keep preview variables separate from production variables.

## Pull request validation flow

1. Open or update a PR against `main`.
2. GitHub Actions runs the CI workflow.
3. Lint, type checks, tests, and production build must pass.
4. Preview deployment runs after validation for non-fork pull requests.
5. Reviewer approves changes and protects the branch.
6. Merge to `main`.

## Production release process

1. Confirm the commit passed CI.
2. Ensure `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` are configured.
3. Trigger production deployment from the validated commit.
4. Check the preview or production deployment in Vercel.
5. Verify health and route checks.
6. Monitor logs for failed email submissions or DB issues.

## Monitoring and alerting

- Monitor Vercel deployment status, build logs, and runtime logs.
- Review `/api/health` during smoke checks after deployment.
- Use application logs for enquiry failures and validation problems.
- Monitor email provider delivery issues and database connectivity separately.

## Incident response

1. Validate the deployment status in GitHub Actions and Vercel.
2. Review the failing logs for type errors, build failures, or HTTP errors.
3. Use the latest verified commit or rollback to the prior stable deployment if necessary.
4. Avoid making unverified database changes during incident response.
5. Capture a summary of the issue and mitigation for postmortem review.

## Rollback

- Roll back only after confirming the problem with logs and deployment status.
- Use the previous verified Vercel deployment or revert the offending Git commit in a controlled manner.
- Verify `/api/health` and public route checks after rollback.
- Treat database changes as separate recovery tasks when migrations are involved.

## Security practices

- Keep GitHub Actions permissions minimal.
- Pin third-party actions to immutable SHAs when possible.
- Never run untrusted pull request code with production secrets.
- Do not log API keys or guest enquiry data in production logs.
- Keep a dependency update flow via Dependabot and security review.

## Troubleshooting common failures

### Build fails with TypeScript errors

- Run `npx tsc --noEmit` locally.
- Review the exact file and line reported by the compiler.
- Fix the offending type mismatch before pushing.

### Enquiry API fails

- Check that `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `RESEND_TO_EMAIL` are set.
- Confirm that the sender address is valid for your Resend domain.
- Review the application logs for delivery errors.
- Ensure the API still returns a 503 if no delivery channel is available.

### Production deployment is not triggered

- Confirm the CI workflow passed successfully.
- Confirm the repository secrets are configured in GitHub.
- Confirm the Vercel project ID and org ID match the target project.

### Health checks fail

- Verify the app is running and `/api/health` responds with `200` and `status: "ok"`.
- Check runtime logs for application errors.
