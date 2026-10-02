# Spinet — website

The landing page for [Spinet](https://github.com/Kevcar98/Spinet-Desktop): one
HTML file, one stylesheet, one small script. No build step, no framework, no
dependencies to keep up to date.

```
index.html          the page
assets/style.css    the styling
assets/app.js       download links + the video embed
assets/*.png        logo and icons
```

## Look at it

Open `index.html` in a browser. That is the whole workflow — nothing to compile.

The download buttons ask GitHub for the latest release when the page loads, so
the one thing that will not work from a `file://` page is that lookup (the
browser blocks the request). Serve it instead if you want to check that part:

```bash
python -m http.server 8777
```

Then open <http://127.0.0.1:8777>.

## Put the video in

The server section has a placeholder where the walkthrough goes. Upload the
video to YouTube, take the id from its URL — the part after `v=` — and put it in
`index.html`:

```html
<div class="video" data-youtube="dQw4w9WgXcQ">
```

The embed replaces the placeholder on its own. It only loads once a real id is
there, so the page never pulls in a YouTube player (or its cookies) for a
placeholder. The embed uses `youtube-nocookie.com`.

## Publish it

GitHub Pages, free:

1. Push this folder to a repository.
2. **Settings → Pages → Source: deploy from branch**, branch `main`, folder `/`.
3. It appears at `https://<user>.github.io/<repo>/` within a minute or two.

### A domain of your own

1. Put the bare hostname in a file called `CNAME` at the root — one line, no
   protocol, no trailing slash:

   ```
   spinet.uk
   ```

2. At your registrar, point the name at GitHub:

   | Record | Name | Value |
   |--------|------|-------|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `<user>.github.io` |

3. **Settings → Pages → Custom domain**, enter it, then tick **Enforce HTTPS**
   once the certificate is issued (a few minutes).

## Keeping it current

Release links and version numbers come from the GitHub API at page load, so
publishing a new release updates the site with no edit here. If that call fails —
a private repo, a rate limit, someone offline — the buttons fall back to the
releases page, which is why they point there in the markup.

Written content worth revisiting when the apps change: the feature grid, the FAQ
and the four setup steps.
