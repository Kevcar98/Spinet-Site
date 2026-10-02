// Download links and version labels come from GitHub at page load, so a new
// release needs no edit here. Every button already points at the releases page,
// and that is what stays if any of this fails — a stale link is worse than one
// extra click.
(function () {
  "use strict";

  var REPOS = {
    desktop: "Kevcar98/Spinet-Desktop",
    mobile: "Kevcar98/Spinet-Mobile"
  };

  // Which asset each button wants, by the shape of its filename.
  var MATCHERS = {
    msi: function (n) { return /\.msi$/i.test(n); },
    portable: function (n) { return /portable.*\.zip$/i.test(n); },
    apk: function (n) { return /\.apk$/i.test(n); }
  };

  function bytes(n) {
    if (!n) return "";
    var mb = n / (1024 * 1024);
    return mb >= 1 ? mb.toFixed(0) + " MB" : (n / 1024).toFixed(0) + " KB";
  }

  function load(key, repo) {
    fetch("https://api.github.com/repos/" + repo + "/releases/latest", {
      headers: { Accept: "application/vnd.github+json" }
    })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function (release) {
        var version = (release.tag_name || "").replace(/^v/i, "");
        var label = document.querySelector('[data-version="' + key + '"]');
        if (label && version) label.textContent = "Version " + version;

        var assets = release.assets || [];
        Object.keys(MATCHERS).forEach(function (kind) {
          var button = document.querySelector('[data-asset="' + kind + '"]');
          if (!button) return;
          var asset = assets.filter(function (a) {
            return MATCHERS[kind](a.name || "");
          })[0];
          if (!asset) return;
          button.href = asset.browser_download_url;
          var size = bytes(asset.size);
          if (size) button.textContent = button.textContent.trim() + " · " + size;
        });
      })
      .catch(function () {
        // Private repo, rate limit, offline: leave the releases-page links be.
        var label = document.querySelector('[data-version="' + key + '"]');
        if (label) label.textContent = "Latest release";
      });
  }

  Object.keys(REPOS).forEach(function (key) {
    load(key, REPOS[key]);
  });

  // The video embed is only created once a real id is in the markup, so the
  // page never loads a YouTube player (or its cookies) for a placeholder.
  var video = document.querySelector(".video");
  if (video) {
    var id = video.getAttribute("data-youtube");
    if (id && id !== "VIDEO_ID") {
      var frame = document.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + id;
      frame.title = "Setting up a Spinet server";
      frame.allow = "accelerometer; clipboard-write; encrypted-media; picture-in-picture";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frame.allowFullscreen = true;
      video.innerHTML = "";
      video.appendChild(frame);
    }
  }
})();
