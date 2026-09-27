window.K3CHPhysics = (function () {
  function spring(el, from, to, opt, done) {
    opt = opt || {};
    var m = opt.mass || 1;
    var k = opt.stiff || 180;
    var c = opt.damp || 18;
    var x = from.x || 0, y = from.y || 0, s = from.s == null ? 1 : from.s;
    var vx = from.vx || 0, vy = from.vy || 0, vs = from.vs || 0;
    var tx = to.x || 0, ty = to.y || 0, ts = to.s == null ? 1 : to.s;
    var last = performance.now();
    function pose() {
      el.style.transform = "translate(" + x.toFixed(2) + "px," + y.toFixed(2) + "px) scale(" + s.toFixed(3) + ")";
    }
    function step(now) {
      var dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      var ax = (-k * (x - tx) - c * vx) / m;
      var ay = (-k * (y - ty) - c * vy) / m;
      var as = (-k * (s - ts) - c * vs) / m;
      vx += ax * dt; vy += ay * dt; vs += as * dt;
      x += vx * dt; y += vy * dt; s += vs * dt;
      pose();
      var still = Math.abs(x - tx) < 0.4 && Math.abs(y - ty) < 0.4 && Math.abs(s - ts) < 0.008
        && Math.abs(vx) < 4 && Math.abs(vy) < 4 && Math.abs(vs) < 0.05;
      if (still) {
        x = tx; y = ty; s = ts; pose();
        if (done) done();
        return;
      }
      requestAnimationFrame(step);
    }
    pose();
    requestAnimationFrame(step);
  }
  function tap(el) {
    spring(el, { s: 0.92 }, { s: 1 }, { mass: 0.8, stiff: 260, damp: 14 });
  }
  return { spring: spring, tap: tap };
})();
