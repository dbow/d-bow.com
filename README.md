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

## Redesign

- **Color palette:** https://color.adobe.com/d-bow.com-theme-color-theme-f5602028-db3d-4e57-8af8-839c4417c05f/
- **Design inspiration:** 80s retro stripes
- **Fonts:** Mr Eaves XL and Yorkten Slab via Adobe Fonts
- **Landing page:** Knockout text effect with a dark tropical forest wallpaper pattern and ethereal fireflies/particles floating in the background
- **Fully responsive** with light and dark mode themes
