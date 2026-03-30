# d-bow.com

Personal site. Built with Vite + React + Tailwind CSS v4, served by Express on Google Cloud App Engine.

## Development

```bash
npm install
npm run dev       # dev server with HMR at localhost:5173
```

## Building

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Deployment

Requires the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) with an authenticated account and the correct project set.

```bash
gcloud auth login
gcloud config set project <project-id>
npm run build
gcloud app deploy
```

App Engine runs `npm run build` automatically on deploy (`gcp-build` script), so `npm run build` is optional if you just want to ship.
