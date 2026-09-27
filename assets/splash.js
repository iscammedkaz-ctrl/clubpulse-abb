(function () {
  function bez3(P, t) {
    var u = 1 - t, uu = u * u, tt = t * t;
    var a = uu * u, b = 3 * uu * t, c = 3 * u * tt, d = tt * t;
    return [
      a*P[0][0]+b*P[1][0]+c*P[2][0]+d*P[3][0],
      a*P[0][1]+b*P[1][1]+c*P[2][1]+d*P[3][1],
      a*P[0][2]+b*P[1][2]+c*P[2][2]+d*P[3][2]
    ];
  }
  function pose(el, p) {
    var f = 220 / (220 + p[2]);
    el.style.transform = "translate(" + (p[0] * f) + "px," + (p[1] * f) + "px) scale(" + f + ")";
    el.style.filter = "drop-shadow(0 " + (12 * f) + "px " + (28 * f) + "px rgba(212,175,55," + (0.2 + 0.25 * f) + "))";
  }
  function runPath(el, path, ms, hold) {
    if (!el) return;
    el.classList.add("bez3-live");
    var t0 = performance.now();
    function tick(now) {
      var t = Math.min(1, (now - t0) / ms);
      var e = t * t * (3 - 2 * t);
      var p = bez3(path, e);
      pose(el, p);
      if (t < 1) requestAnimationFrame(tick);
      else if (window.K3CHPhysics) {
        var f = 220 / (220 + p[2]);
        K3CHPhysics.spring(el, { x: p[0] * f, y: p[1] * f, s: f, vx: 50, vy: -18 }, { x: 0, y: 0, s: 1 }, { mass: 0.9, stiff: 200, damp: 16 });
      } else if (!hold) el.classList.remove("bez3-live");
    }
    requestAnimationFrame(tick);
  }
  function loopPath(el, path, ms) {
    if (!el) return;
    el.classList.add("bez3-live");
    var t0 = performance.now();
    function tick(now) {
      var u = ((now - t0) / ms) % 2;
      var t = u < 1 ? u : 2 - u;
      pose(el, bez3(path, t));
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var root = document.getElementById("splash");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clubPath = [[-70, 40, 160], [40, -50, 40], [-20, 20, -10], [0, 0, 0]];
  var adPath = [[80, 10, 140], [-30, -30, 50], [20, 16, 10], [0, 0, 0]];
  var idlePath = [[0, 0, 8], [14, -10, -6], [-12, 8, 10], [0, 0, 8]];

  if (root) {
    var club = root.querySelector('[data-scene="club"]');
    var ad = root.querySelector('[data-scene="ad"]');
    var wait = root.getAttribute("data-wait");
    var closed = false;

    var crest = root.querySelector(".crest");
    if (crest && !crest.closest(".crest-wrap")) {
      var wrap = document.createElement("div");
      wrap.className = "crest-wrap";
      crest.parentNode.insertBefore(wrap, crest);
      wrap.appendChild(crest);
      var sparks = document.createElement("div");
      sparks.className = "splash-sparks";
      sparks.innerHTML = "<i></i><i></i><i></i><i></i><i></i><i></i>";
      wrap.appendChild(sparks);
    }
    if (!root.querySelector(".splash-bar")) {
      var bar = document.createElement("div");
      bar.className = "splash-bar";
      bar.innerHTML = "<b></b>";
      root.appendChild(bar);
    }

    function show(el) {
      root.querySelectorAll(".splash-scene").forEach(function (s) { s.classList.remove("on"); });
      if (el) el.classList.add("on");
    }
    function close() {
      if (closed) return;
      closed = true;
      root.classList.add("is-out");
      setTimeout(function () {
        if (root.parentNode) root.remove();
        if (!reduce) {
          loopPath(document.querySelector(".hero-logo"), idlePath, 4200);
          loopPath(document.querySelector("header.top .brand img"), idlePath, 3600);
        }
      }, 520);
    }
    show(club);
    if (!reduce) runPath(root.querySelector(".crest"), clubPath, 1500, true);
    setTimeout(function () {
      show(ad);
      if (!reduce) runPath(root.querySelector(".ad-logo"), adPath, 1100, true);
    }, reduce ? 400 : 1600);
    if (wait === "flutter") {
      var frame = false, min = false;
      function maybe() { if (frame && min) close(); }
      window.addEventListener("flutter-first-frame", function () { frame = true; maybe(); });
      setTimeout(function () { min = true; maybe(); }, reduce ? 1100 : 3000);
      setTimeout(function () { frame = true; min = true; maybe(); }, 12000);
      return;
    }
    setTimeout(close, reduce ? 1100 : 3000);
  } else if (!reduce) {
    loopPath(document.querySelector(".hero-logo"), idlePath, 4200);
  }
})();
