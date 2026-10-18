// Screen stack router with forward/back slide transitions.
// Screens register as factories returning a DOM node (the root <section>).

const routes = new Map();
let viewport = null;
const stack = []; // [{ name, params, el }]

export function registerRoutes(map) {
  for (const [name, factory] of Object.entries(map)) routes.set(name, factory);
}

export function mountRouter(el) {
  viewport = el;
}

function build(name, params) {
  const factory = routes.get(name);
  if (!factory) throw new Error(`No route: ${name}`);
  const el = factory(params || {});
  if (!el.classList.contains("screen")) el.classList.add("screen");
  return el;
}

function pageEnterForward(oldEl, newEl, { fade = false } = {}) {
  if (!oldEl) {
    newEl.classList.add("screen--enter-fade");
    viewport.appendChild(newEl);
    newEl.addEventListener("animationend", () => {
      newEl.classList.remove("screen--enter-fade");
    }, { once: true });
    return;
  }
  if (fade) {
    newEl.classList.add("screen--enter-fade");
  } else {
    newEl.classList.add("screen--enter-forward");
    oldEl.classList.add("screen--exit-back");
  }
  viewport.appendChild(newEl);
  newEl.addEventListener("animationend", () => {
    newEl.classList.remove("screen--enter-forward", "screen--enter-fade");
  }, { once: true });
  if (oldEl) {
    oldEl.addEventListener("animationend", () => {
      oldEl.remove();
    }, { once: true });
  }
}

function pageEnterBack(oldEl, newEl) {
  newEl.classList.add("screen--enter-back");
  oldEl.classList.add("screen--exit-forward");
  viewport.appendChild(newEl);
  newEl.addEventListener("animationend", () => {
    newEl.classList.remove("screen--enter-back");
  }, { once: true });
  oldEl.addEventListener("animationend", () => {
    oldEl.remove();
  }, { once: true });
}

export function go(name, params = {}, opts = {}) {
  const el = build(name, params);
  const prev = stack[stack.length - 1];
  stack.push({ name, params, el });
  pageEnterForward(prev ? prev.el : null, el, opts);
}

export function replace(name, params = {}, opts = {}) {
  const el = build(name, params);
  const prev = stack.pop();
  stack.push({ name, params, el });
  pageEnterForward(prev ? prev.el : null, el, opts);
}

export function back() {
  if (stack.length <= 1) return;
  const current = stack.pop();
  const prev = stack[stack.length - 1];
  // Re-mount the previous screen since it was removed from the DOM.
  const freshEl = build(prev.name, prev.params);
  prev.el = freshEl;
  pageEnterBack(current.el, freshEl);
}

export function reset(name, params = {}) {
  stack.length = 0;
  if (viewport) viewport.innerHTML = "";
  go(name, params);
}

export function current() {
  return stack[stack.length - 1] || null;
}
