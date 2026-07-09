// Release Channel — shared behaviour
// Terminal type-on animation (runs once, respects reduced motion) + copy buttons.

(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeTerminal(el) {
    var lines = JSON.parse(el.getAttribute('data-lines'));
    el.innerHTML = '';

    if (reduce) {
      lines.forEach(function (l) { el.appendChild(renderLine(l, true)); });
      return;
    }

    var li = 0;
    function nextLine() {
      if (li >= lines.length) return;
      var lineDef = lines[li];
      var lineEl = renderLine(lineDef, false);
      el.appendChild(lineEl);
      var target = lineEl.querySelector('.typewrite');

      if (!target) { li++; setTimeout(nextLine, 250); return; }

      var full = target.getAttribute('data-full');
      var i = 0;
      var speed = lineDef.speed || 22;
      (function tick() {
        target.textContent = full.slice(0, i);
        i++;
        if (i <= full.length) {
          setTimeout(tick, speed);
        } else {
          li++;
          setTimeout(nextLine, lineDef.pause || 300);
        }
      })();
    }
    nextLine();
  }

  function renderLine(def, instant) {
    var row = document.createElement('div');
    row.className = 'line';
    if (def.type === 'cmd') {
      var prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = '$ ';
      row.appendChild(prompt);
      var span = document.createElement('span');
      if (instant) {
        span.textContent = def.text;
      } else {
        span.className = 'typewrite';
        span.setAttribute('data-full', def.text);
      }
      row.appendChild(span);
    } else {
      var out = document.createElement('span');
      out.className = def.type === 'ok' ? 'ok' : 'out';
      out.textContent = def.text;
      row.appendChild(out);
    }
    return row;
  }

  document.querySelectorAll('[data-terminal]').forEach(typeTerminal);

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var val = btn.getAttribute('data-copy');
      navigator.clipboard && navigator.clipboard.writeText(val).then(function () {
        var original = btn.textContent;
        btn.textContent = 'copied';
        setTimeout(function () { btn.textContent = original; }, 1400);
      });
    });
  });
})();
