# PrompDojo Project Page

Static project page for PrompDojo.

## Local Preview

```bash
python3 -m http.server 3001
```

Open `http://localhost:3001`.

## Deploy

This project has no build step. GitHub Pages is deployed by GitHub Actions from
the repository root whenever `main` is pushed.

1. In GitHub, open **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Push to `main`.

The Pages URL will be:

```text
https://haruk1y.github.io/prompdojo-project-page/
```

You can still deploy the same static site on Vercel if needed.

```bash
npx vercel
```

Run production deploy only when ready:

```bash
npx vercel --prod
```
