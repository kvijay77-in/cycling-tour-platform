// Click-to-open pan/zoom viewer for Mermaid diagrams rendered by Material for MkDocs.
(function () {
  "use strict";

  const SELECTOR = "pre.mermaid, div.mermaid";
  // Material renders each diagram into a closed shadow root, so keep the sources to re-render them.
  const sources = Array.from(document.querySelectorAll(SELECTOR), (el) => el.textContent);
  if (sources.length === 0) return;

  const MIN_SCALE = 0.1;
  const MAX_SCALE = 10;
  const STEP = 1.25;

  let dialog, viewport, canvas;
  let scale = 1;
  let x = 0;
  let y = 0;
  let renderCount = 0;
  let pinchDistance = 0;
  const pointers = new Map();

  function apply() {
    canvas.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  function zoomAt(factor, clientX, clientY) {
    const rect = viewport.getBoundingClientRect();
    const cx = clientX - rect.left;
    const cy = clientY - rect.top;
    const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * factor));
    const k = next / scale;
    x = cx - (cx - x) * k;
    y = cy - (cy - y) * k;
    scale = next;
    apply();
  }

  function zoomCentre(factor) {
    const rect = viewport.getBoundingClientRect();
    zoomAt(factor, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  function fit() {
    const svg = canvas.querySelector("svg");
    if (!svg) return;
    const vb = svg.viewBox.baseVal;
    const w = (vb && vb.width) || svg.getBoundingClientRect().width;
    const h = (vb && vb.height) || svg.getBoundingClientRect().height;
    svg.setAttribute("width", w);
    svg.setAttribute("height", h);
    svg.style.maxWidth = "none";
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.min(vw / w, vh / h) * 0.95));
    x = (vw - w * scale) / 2;
    y = (vh - h * scale) / 2;
    apply();
  }

  function pinchMetrics() {
    const [a, b] = Array.from(pointers.values());
    return {
      distance: Math.hypot(a.x - b.x, a.y - b.y),
      midX: (a.x + b.x) / 2,
      midY: (a.y + b.y) / 2,
    };
  }

  function releasePointer(e) {
    pointers.delete(e.pointerId);
    pinchDistance = pointers.size === 2 ? pinchMetrics().distance : 0;
  }

  function build() {
    dialog = document.createElement("dialog");
    dialog.className = "mermaid-zoom";
    dialog.setAttribute("aria-label", "Diagram viewer");
    dialog.innerHTML = `
      <div class="mermaid-zoom__toolbar">
        <button type="button" data-action="in" title="Zoom in (+)" aria-label="Zoom in">+</button>
        <button type="button" data-action="out" title="Zoom out (-)" aria-label="Zoom out">&minus;</button>
        <button type="button" data-action="fit" title="Fit to screen (0)" aria-label="Fit to screen">Fit</button>
        <button type="button" data-action="close" title="Close (Esc)" aria-label="Close">&times;</button>
      </div>
      <div class="mermaid-zoom__viewport"><div class="mermaid-zoom__canvas"></div></div>
      <p class="mermaid-zoom__hint">Scroll or pinch to zoom &middot; drag to pan</p>`;
    viewport = dialog.querySelector(".mermaid-zoom__viewport");
    canvas = dialog.querySelector(".mermaid-zoom__canvas");

    dialog.addEventListener("click", (e) => {
      const button = e.target.closest("button[data-action]");
      if (!button) return;
      const action = button.dataset.action;
      if (action === "in") zoomCentre(STEP);
      else if (action === "out") zoomCentre(1 / STEP);
      else if (action === "fit") fit();
      else if (action === "close") dialog.close();
    });

    dialog.addEventListener("keydown", (e) => {
      if (e.key === "+" || e.key === "=") zoomCentre(STEP);
      else if (e.key === "-") zoomCentre(1 / STEP);
      else if (e.key === "0") fit();
      else return;
      e.preventDefault();
    });

    dialog.addEventListener("close", () => {
      canvas.innerHTML = "";
      pointers.clear();
    });

    viewport.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
        zoomAt(Math.pow(1.0015, -delta), e.clientX, e.clientY);
      },
      { passive: false }
    );

    viewport.addEventListener("pointerdown", (e) => {
      viewport.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) pinchDistance = pinchMetrics().distance;
    });

    viewport.addEventListener("pointermove", (e) => {
      const prev = pointers.get(e.pointerId);
      if (!prev) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1) {
        x += e.clientX - prev.x;
        y += e.clientY - prev.y;
        apply();
      } else if (pointers.size === 2) {
        const { distance, midX, midY } = pinchMetrics();
        if (pinchDistance) zoomAt(distance / pinchDistance, midX, midY);
        pinchDistance = distance;
      }
    });

    viewport.addEventListener("pointerup", releasePointer);
    viewport.addEventListener("pointercancel", releasePointer);

    document.body.appendChild(dialog);
  }

  async function open(host) {
    const index = Array.prototype.indexOf.call(document.querySelectorAll(SELECTOR), host);
    const source = sources[index];
    if (source === undefined || !window.mermaid) return;
    if (!dialog) build();
    try {
      const { svg } = await window.mermaid.render(`__mermaid_zoom_${renderCount++}`, source);
      canvas.innerHTML = svg;
    } catch (err) {
      console.error("Unable to open diagram viewer", err);
      return;
    }
    dialog.showModal();
    fit();
  }

  document.addEventListener("click", (e) => {
    const host = e.target instanceof Element && e.target.closest("div.mermaid");
    if (host) open(host);
  });

  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target instanceof Element && e.target.matches("div.mermaid")) {
      e.preventDefault();
      open(e.target);
    }
  });

  // Diagram hosts are created asynchronously; make each one keyboard accessible as it appears.
  const observer = new MutationObserver(() => {
    const hosts = document.querySelectorAll("div.mermaid:not([tabindex])");
    hosts.forEach((host) => {
      host.setAttribute("tabindex", "0");
      host.setAttribute("role", "button");
      host.setAttribute("aria-label", "Open diagram in zoomable viewer");
      host.title = "Click to zoom";
    });
    if (document.querySelectorAll("pre.mermaid").length === 0) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
