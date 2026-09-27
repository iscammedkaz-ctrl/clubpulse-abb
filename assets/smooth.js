window.K3CHSmooth = (function () {
  function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smoothstep(t) { t = clamp01(t); return t * t * (3 - 2 * t); }
  function smootherstep(t) { t = clamp01(t); return t * t * t * (t * (t * 6 - 15) + 10); }
  function ema(prev, next, a) { return prev + (next - prev) * a; }

  function movingAvg(size) {
    var buf = [], i = 0, sum = 0, n = 0;
    return function (v) {
      if (n < size) { buf.push(v); sum += v; n++; }
      else { sum -= buf[i]; buf[i] = v; sum += v; i = (i + 1) % size; }
      return sum / n;
    };
  }

  function oneEuro(minCutoff, beta) {
    minCutoff = minCutoff || 1.2;
    beta = beta || 0.007;
    var xHat, dxHat = 0, last = 0, init = false;
    function alpha(cut, dt) {
      var tau = 1 / (2 * Math.PI * cut);
      return 1 / (1 + tau / dt);
    }
    return function (x, now) {
      now = now || performance.now();
      if (!init) { init = true; last = now; xHat = x; return x; }
      var dt = Math.max(0.001, (now - last) / 1000);
      last = now;
      var dx = (x - xHat) / dt;
      dxHat = ema(dxHat, dx, alpha(1, dt));
      var cut = minCutoff + beta * Math.abs(dxHat);
      xHat = ema(xHat, x, alpha(cut, dt));
      return xHat;
    };
  }

  function catmull(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }

  return {
    lerp: lerp, ema: ema, smoothstep: smoothstep, smootherstep: smootherstep,
    movingAvg: movingAvg, oneEuro: oneEuro, catmull: catmull
  };
})();
