(function () {
  "use strict";

  var REPOS = {
    desktop: "Kevcar98/Spinet-Desktop",
    mobile: "Kevcar98/Spinet-Mobile"
  };

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
        var label = document.querySelector('[data-version="' + key + '"]');
        if (label) label.textContent = "Latest release";
      });
  }

  Object.keys(REPOS).forEach(function (key) {
    load(key, REPOS[key]);
  });

  var video = document.querySelector("[data-youtube]");
  if (video) {
    video.addEventListener("click", function (event) {
      event.preventDefault();
      var frame = document.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" +
        video.getAttribute("data-youtube") + "?autoplay=1&rel=0";
      frame.title = "Setting up a Spinet server";
      frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      frame.allowFullscreen = true;
      var box = document.createElement("div");
      box.className = "video";
      box.appendChild(frame);
      video.parentNode.replaceChild(box, video);
    });
  }
})();
