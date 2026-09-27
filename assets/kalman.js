window.K3CHKalman = (function () {
  function unidim() {
    var x = 0, v = 0, p00 = 1, p01 = 0, p10 = 0, p11 = 1;
    var init = false;
    return function (z, dt, q, r) {
      dt = dt || 0.016;
      q = q == null ? 8 : q;
      r = r == null ? 40 : r;
      if (!init) { init = true; x = z; v = 0; return { x: x, v: v, k: 1 }; }
      x = x + v * dt;
      p00 += dt * (p10 + p01) + dt * dt * p11 + q * dt;
      p01 += dt * p11;
      p10 += dt * p11;
      p11 += q * dt;
      var s = p00 + r;
      var k0 = p00 / s;
      var k1 = p10 / s;
      var y = z - x;
      x += k0 * y;
      v += k1 * y;
      var p00n = (1 - k0) * p00;
      var p01n = (1 - k0) * p01;
      var p10n = p10 - k1 * p00;
      var p11n = p11 - k1 * p01;
      p00 = p00n; p01 = p01n; p10 = p10n; p11 = p11n;
      return { x: x, v: v, k: k0 };
    };
  }
  return { unidim: unidim };
})();
