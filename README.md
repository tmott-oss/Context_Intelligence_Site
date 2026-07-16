# Context Intelligence

Production marketing site for Context Intelligence, an independent executive advisory firm focused on Organizational Intelligence, AI transformation strategy, and business independence.

## Project shape

- Sites/Vinext starter and Cloudflare Worker-compatible output
- React 19 and TypeScript
- Responsive semantic marketing site at `/`
- Isolated React Three Fiber experiment at `/graph-lab`
- CSS custom properties based on the supplied Claude Design tokens
- Replaceable lead-capture and scheduling integration boundaries

The production hero intentionally uses a lightweight canvas network. The Three.js graph remains isolated until it passes the visual approval gate.

## Local development

```bash
npm install
npm run dev
npm run build
npm run lint
npx tsc --noEmit
```

## Integration placeholders

Copy `.env.example` to a local environment file when destinations are available:

- `NEXT_PUBLIC_LEAD_ENDPOINT` accepts JSON containing `name`, `email`, and `organization`.
- `NEXT_PUBLIC_SCHEDULING_URL` is reserved for the final calendar destination.
- `NEXT_PUBLIC_SITE_URL` supplies the canonical production URL for metadata and the sitemap.

No form data is transmitted when the lead endpoint is absent.

## Sites configuration

`.openai/hosting.json` is preserved as the source of truth for Sites-owned hosting resources. D1 and R2 remain undeclared because this milestone does not require persistence or uploads.

The supplied design handoff and earlier screenshots are preserved under `references/`.
