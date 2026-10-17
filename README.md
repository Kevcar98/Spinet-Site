# Spinet website

The website for [Spinet](https://spinet.dev): one HTML page, one stylesheet and
one small script, with no build step.

```
index.html          the page
assets/style.css    the styling
assets/app.js       download links and the setup video
assets/*.png        logo and icons
```

## Preview it

Open `index.html` in a browser. The download buttons look up the latest release
on GitHub, which browsers block for pages opened from a file, so to check those
too, serve the folder:

```bash
python -m http.server 8777
```

Then open <http://127.0.0.1:8777>.

## Setup video

The server section shows the setup video from YouTube. Nothing is loaded from
YouTube until the visitor presses play. To change the video, replace the video
id in `index.html` (it appears twice, in the `href` and in `data-youtube`).

When you change `style.css` or `app.js`, raise the `?v=` number on their links
in `index.html` so returning visitors get the new files.

## Publish it

The site is published with GitHub Pages:

1. Push this folder to a repository.
2. Open **Settings > Pages**, set the source to deploy from the `main` branch
   and the `/` folder.
3. It appears at `https://<user>.github.io/<repo>/` within a minute or two.

### Your own domain

1. Put the domain in a file called `CNAME` at the root, on one line, with no
   `https://` and no trailing slash:

   ```
   spinet.dev
   ```

2. At your domain registrar, add these records:

   | Record | Name | Value |
   |--------|------|-------|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `<user>.github.io` |

3. In **Settings > Pages > Custom domain**, enter the domain, then tick
   **Enforce HTTPS** once the certificate is ready (a few minutes).

## Keeping it up to date

The download links and version numbers come from GitHub when the page loads, so
a new release needs no change here. If GitHub can't be reached, the buttons
link to the releases page instead.

When the apps change, check the feature list, the FAQ and the four server setup
steps.
