---
title: "Download"
description: "Download FinLaunch for Windows, macOS, or Linux"
sidebar:
  order: 1
---

## FinLaunch

<p id="detected-os" style="opacity: 0.6; font-size: 14px; margin-bottom: 24px;"></p>

<div id="loading-state" style="padding: 24px 0; opacity: 0.5;">
  Loading latest release...
</div>

<div id="download-links" style="display: none;">

### Recommended for you

<div id="primary-download"></div>

### All platforms

<div id="all-downloads" style="margin-top: 16px;"></div>

</div>

<div id="error-state" style="display: none; padding: 16px; border-radius: 8px; font-size: 14px;">
  Unable to load download information. Please try again later.
</div>

<script type="text/javascript">
(function() {
  var RELEASES_BASE = 'https://finwavepublic.blob.core.windows.net/desktop-releases';

  var PLATFORMS = [
    ['windows-x64', 'Windows (x64)',         '.exe,.msi'],
    ['linux-x64',   'Linux (x64)',           '.AppImage,.deb,.rpm'],
    ['macos-arm64', 'macOS (Apple Silicon)', '.dmg'],
    ['macos-x64',   'macOS (Intel)',         '.dmg']
  ];

  function detectPlatform() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('win') !== -1) return 'windows-x64';
    if (ua.indexOf('mac') !== -1) return 'macos-arm64';
    if (ua.indexOf('linux') !== -1) return 'linux-x64';
    return null;
  }

  function makeFilename(version, key, ext) {
    if (ext === '.exe') return 'finlaunch_' + version + '_x64-setup.exe';
    if (ext === '.msi') return 'finlaunch_' + version + '_x64_en-US.msi';
    if (ext === '.dmg') return 'finlaunch_' + version + '_' + (key.indexOf('arm64') !== -1 ? 'aarch64' : 'x64') + '.dmg';
    if (ext === '.deb') return 'finlaunch_' + version + '_amd64.deb';
    if (ext === '.rpm') return 'finlaunch-' + version + '-1.x86_64.rpm';
    if (ext === '.AppImage') return 'finlaunch_' + version + '_amd64.AppImage';
    return '';
  }

  function loadRelease() {
    var loadingEl  = document.getElementById('loading-state');
    var linksEl    = document.getElementById('download-links');
    var errorEl    = document.getElementById('error-state');
    var primaryEl  = document.getElementById('primary-download');
    var allEl      = document.getElementById('all-downloads');
    var osEl       = document.getElementById('detected-os');
    var userPlatform = detectPlatform();

    fetch(RELEASES_BASE + '/latest.json')
      .then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
      .then(function(release) {
        var version = release.version;

        if (userPlatform) {
          for (var i = 0; i < PLATFORMS.length; i++) {
            if (PLATFORMS[i][0] === userPlatform) {
              osEl.textContent = 'Detected: ' + PLATFORMS[i][1];
              break;
            }
          }
        }

        var primaryHtml = '';
        var tableHtml = '<table><thead><tr><th>Platform</th><th>Downloads</th></tr></thead><tbody>';

        for (var i = 0; i < PLATFORMS.length; i++) {
          var key = PLATFORMS[i][0];
          var label = PLATFORMS[i][1];
          var exts = PLATFORMS[i][2].split(',');
          var baseUrl = release.platforms[key];
          if (!baseUrl) continue;

          var links = '';
          for (var j = 0; j < exts.length; j++) {
            var fn = makeFilename(version, key, exts[j]);
            if (!fn) continue;
            var url = baseUrl + fn;
            var extLabel = exts[j].replace('.', '').toUpperCase();
            links += '<a href="' + url + '" style="display:inline-block;margin:4px 8px 4px 0;padding:6px 14px;border-radius:6px;background:rgba(109,151,207,0.15);color:#6d97cf;text-decoration:none;font-size:13px;border:1px solid rgba(109,151,207,0.3);">' + extLabel + '</a>';
          }

          tableHtml += '<tr><td>' + label + '</td><td>' + links + '</td></tr>';

          if (key === userPlatform) {
            primaryHtml = '<div style="padding:20px;border-radius:10px;border:1px solid rgba(109,151,207,0.3);background:rgba(109,151,207,0.08);margin-bottom:24px;">'
              + '<strong style="font-size:16px;">' + label + '</strong>'
              + '<span style="opacity:0.5;font-size:13px;margin-left:8px;">v' + version + '</span>'
              + '<div style="margin-top:12px;">' + links + '</div>'
              + '</div>';
          }
        }

        tableHtml += '</tbody></table>';

        primaryEl.innerHTML = primaryHtml || '<p style="opacity:0.5;font-size:14px;">Could not detect your platform. Choose from the list below.</p>';
        allEl.innerHTML = tableHtml;
        loadingEl.style.display = 'none';
        linksEl.style.display = 'block';
      })
      .catch(function() {
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadRelease);
  } else {
    loadRelease();
  }
})();
</script>

---

## System requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| OS | Windows 10+, macOS 12+, Ubuntu 20.04+ | Latest stable release |
| RAM | 4 GB | 8 GB+ |
| Disk space | 200 MB | Additional space for local data |
| Network | Required for login | Broadband for sync |

## Next steps

- [Installation guide](/desktop/getting-started/installation/) — platform-specific install instructions
- [Initial setup](/desktop/getting-started/setup/) — first-launch configuration
- [What is FinLaunch?](/desktop/getting-started/what-is-it/) — purpose and design overview
