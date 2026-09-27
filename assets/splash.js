(function () {
  var root = document.getElementById("splash");
  if (!root) return;
  var club = root.querySelector('[data-scene="club"]');
  var ad = root.querySelector('[data-scene="ad"]');
  var wait = root.getAttribute("data-wait");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    setTimeout(function () { if (root.parentNode) root.remove(); }, 520);
  }
  show(club);
  setTimeout(function () { show(ad); }, reduce ? 400 : 1600);
  if (wait === "flutter") {
    var frame = false;
    var min = false;
    function maybe() { if (frame && min) close(); }
    window.addEventListener("flutter-first-frame", function () { frame = true; maybe(); });
    setTimeout(function () { min = true; maybe(); }, reduce ? 1100 : 3000);
    setTimeout(function () { frame = true; min = true; maybe(); }, 12000);
    return;
  }
  setTimeout(close, reduce ? 1100 : 3000);
})();
