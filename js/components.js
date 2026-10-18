// Small DOM-builder helpers for every reusable UI piece. Screens
// compose from these — they never redefine buttons, inputs, chips, etc.

import { iconMarkup } from "./icons.js";

export function h(tag, props = {}, children = []) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === "class" || k === "className") el.className = v;
    else if (k === "style" && typeof v === "object") Object.assign(el.style, v);
    else if (k === "html") el.innerHTML = v;
    else if (k === "dataset") Object.assign(el.dataset, v);
    else if (k === "text") el.textContent = v;
    else if (k.startsWith("on") && typeof v === "function")
      el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k in el && typeof el[k] !== "object") el[k] = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const child of [].concat(children)) {
    if (child == null || child === false) continue;
    if (typeof child === "string") el.appendChild(document.createTextNode(child));
    else el.appendChild(child);
  }
  return el;
}

export function iconButton(name, { label, onClick, variant } = {}) {
  const btn = h(
    "button",
    {
      class: "icon-btn" + (variant ? ` icon-btn--${variant}` : ""),
      type: "button",
      "aria-label": label || name,
      onClick,
    },
    []
  );
  btn.innerHTML = iconMarkup(name, { size: 20 });
  return btn;
}

export function titleStack({ hey = "Hey,", line }) {
  return h("div", { class: "title-stack" }, [
    h("div", { class: "title-stack__hey", text: hey }),
    h("div", { class: "title-stack__line", text: line }),
  ]);
}

export function textInput({
  id,
  type = "text",
  placeholder = "",
  value = "",
  autocomplete,
  inputmode,
  pattern,
  maxlength,
  ariaLabel,
  oninput,
  onenter,
}) {
  const input = h("input", {
    class: "input",
    id,
    type,
    placeholder,
    value,
    autocomplete: autocomplete || "off",
    inputmode,
    pattern,
    maxlength,
    "aria-label": ariaLabel || placeholder,
    oninput: (e) => oninput && oninput(e.target.value, e),
    onkeydown: (e) => {
      if (e.key === "Enter" && onenter) onenter(e);
    },
  });
  return input;
}

export function phoneField({
  value = "",
  oninput,
  countryCode = "+91",
  placeholder = "Enter Phone No.",
  autofocus = false,
}) {
  const row = h("div", { class: "field__row" }, [
    h("div", { class: "input input--prefix", "aria-hidden": "true" }, [
      countryCode,
    ]),
    textInput({
      type: "tel",
      inputmode: "numeric",
      pattern: "[0-9]*",
      maxlength: 10,
      placeholder,
      value,
      oninput,
      ariaLabel: "Phone number",
    }),
  ]);
  const field = h("div", { class: "field" }, [row]);
  if (autofocus)
    requestAnimationFrame(() => {
      const inp = field.querySelector("input");
      inp && inp.focus();
    });
  return field;
}

export function emailField({ value = "", oninput, placeholder = "Enter Email" }) {
  return h("div", { class: "field" }, [
    textInput({
      type: "email",
      inputmode: "email",
      autocomplete: "email",
      placeholder,
      value,
      oninput,
      ariaLabel: "Email address",
    }),
  ]);
}

export function textField({
  placeholder,
  value = "",
  oninput,
  type = "text",
  inputmode,
  maxlength,
  ariaLabel,
}) {
  return h("div", { class: "field" }, [
    textInput({
      placeholder,
      value,
      oninput,
      type,
      inputmode,
      maxlength,
      ariaLabel,
    }),
  ]);
}

export function primaryButton({ label, onClick, disabled, type = "button" }) {
  return h("button", {
    class: "btn",
    type,
    disabled: !!disabled,
    "aria-disabled": disabled ? "true" : null,
    onClick,
    text: label,
  });
}

export function googleButton({ onClick }) {
  const btn = h("button", {
    class: "btn btn--google",
    type: "button",
    onClick,
    "aria-label": "Continue with Google",
  });
  btn.innerHTML = `${iconMarkup("google-mark")}<span>Google</span>`;
  return btn;
}

export function orDivider() {
  return h("div", { class: "or-divider", text: "or" });
}

export function sectionLabel(text) {
  return h("div", { class: "section-label", text });
}

export function inlineLink({ before, cta, onClick }) {
  const el = h("div", { class: "inline-link" }, [
    document.createTextNode(before + " "),
    h("button", {
      class: "inline-link__cta",
      type: "button",
      onClick,
      text: cta,
    }),
  ]);
  return el;
}

// OTP — a group of N cells with keyboard navigation and auto-advance.
export function otpGroup({ length = 4, onComplete, onChange }) {
  const inputs = [];
  const group = h("div", {
    class: "otp",
    role: "group",
    "aria-label": `${length}-digit OTP`,
  });

  function value() {
    return inputs.map((i) => i.value).join("");
  }

  function emit() {
    const v = value();
    if (onChange) onChange(v);
    if (v.length === length && onComplete) onComplete(v);
  }

  for (let i = 0; i < length; i++) {
    const inp = h("input", {
      class: "otp__cell",
      type: "tel",
      inputmode: "numeric",
      pattern: "[0-9]*",
      maxlength: 1,
      "aria-label": `Digit ${i + 1}`,
      autocomplete: "one-time-code",
    });
    inp.addEventListener("input", (e) => {
      inp.value = inp.value.replace(/\D/g, "").slice(0, 1);
      inp.dataset.filled = inp.value ? "true" : "false";
      if (inp.value && i < length - 1) inputs[i + 1].focus();
      emit();
    });
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !inp.value && i > 0) {
        inputs[i - 1].focus();
        inputs[i - 1].value = "";
        inputs[i - 1].dataset.filled = "false";
        emit();
      } else if (e.key === "ArrowLeft" && i > 0) {
        inputs[i - 1].focus();
      } else if (e.key === "ArrowRight" && i < length - 1) {
        inputs[i + 1].focus();
      }
    });
    inp.addEventListener("paste", (e) => {
      const text = (e.clipboardData || window.clipboardData).getData("text");
      const digits = text.replace(/\D/g, "").slice(0, length);
      if (!digits) return;
      e.preventDefault();
      for (let j = 0; j < length; j++) {
        inputs[j].value = digits[j] || "";
        inputs[j].dataset.filled = inputs[j].value ? "true" : "false";
      }
      const focusIdx = Math.min(digits.length, length - 1);
      inputs[focusIdx].focus();
      emit();
    });
    inputs.push(inp);
    group.appendChild(inp);
  }

  return {
    el: group,
    focus() {
      inputs[0].focus();
    },
    value,
    fill(v) {
      const digits = String(v).replace(/\D/g, "").slice(0, length);
      for (let j = 0; j < length; j++) {
        inputs[j].value = digits[j] || "";
        inputs[j].dataset.filled = inputs[j].value ? "true" : "false";
      }
      emit();
    },
    clear() {
      this.fill("");
    },
  };
}

// Countdown "0:30" timer with resend callback.
export function countdown({ seconds = 30, onDone }) {
  let remaining = seconds;
  const el = h("div", { class: "otp__timer", "aria-live": "polite" });

  function format(s) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, "0")}`;
  }

  el.textContent = format(remaining);

  const tick = setInterval(() => {
    remaining -= 1;
    el.textContent = format(Math.max(0, remaining));
    if (remaining <= 0) {
      clearInterval(tick);
      el.textContent = format(0);
      if (onDone) onDone();
    }
  }, 1000);

  return {
    el,
    stop() {
      clearInterval(tick);
    },
    reset(newSeconds = seconds) {
      remaining = newSeconds;
      el.textContent = format(remaining);
    },
  };
}

// "Didn't receive OTP? Resend in 00:30 sec" row.
export function resendRow({ seconds = 30, onResend }) {
  const timerSpan = h("span", { text: `Resend in ${pad2(seconds)}:${"00"} sec` });
  const label = h("div", { class: "otp__helper" });
  const strong = h("strong", { text: "Resend in 00:" + pad2(seconds) + " sec" });

  const wrap = h("div", { class: "otp__helper" });

  let remaining = seconds;
  function render() {
    if (remaining > 0) {
      wrap.innerHTML = `Didn't receive OTP? <strong aria-disabled="true" style="color:var(--ink-faint)">Resend in 00:${pad2(
        remaining
      )} sec</strong>`;
    } else {
      wrap.innerHTML = "Didn't receive OTP? ";
      const btn = h("button", {
        class: "inline-link__cta",
        type: "button",
        text: "Resend",
        onClick: () => {
          if (onResend) onResend();
        },
      });
      wrap.appendChild(btn);
    }
  }
  render();

  const tick = setInterval(() => {
    remaining = Math.max(0, remaining - 1);
    render();
    if (remaining === 0) clearInterval(tick);
  }, 1000);

  return {
    el: wrap,
    reset(s = seconds) {
      remaining = s;
      render();
      clearInterval(tick);
      const t = setInterval(() => {
        remaining = Math.max(0, remaining - 1);
        render();
        if (remaining === 0) clearInterval(t);
      }, 1000);
    },
    stop() {
      clearInterval(tick);
    },
  };
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

export function screenHeader({ onBack }) {
  return h("header", { class: "screen__header" }, [
    iconButton("arrow-left", { label: "Go back", onClick: onBack }),
  ]);
}

export function uploadCard({ label, state, illusName, previewSvg, onPick }) {
  // state: "empty" | "filled"
  // When filled, show the illustration/preview inside a solid-border card.
  const card = h("div", {
    class: "upload-card",
    role: "button",
    tabindex: "0",
    "aria-label": `${label}. Tap to pick a file.`,
  });
  card.dataset.filled = state === "filled" ? "true" : "false";

  function renderEmpty() {
    card.innerHTML = `
      <div class="upload-card__icon">${iconMarkup("upload-illus")}</div>
      <div class="upload-card__label">${label}</div>
    `;
  }
  function renderFilled() {
    const inner = previewSvg || iconMarkup(illusName || "id-front");
    card.innerHTML = `<div class="id-preview">${inner}</div>`;
  }

  if (state === "filled") renderFilled();
  else renderEmpty();

  const activate = () => {
    if (onPick) onPick(card);
  };

  card.addEventListener("click", activate);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate();
    }
  });

  return {
    el: card,
    setFilled(svgOrIllus) {
      card.dataset.filled = "true";
      if (svgOrIllus) {
        previewSvg = typeof svgOrIllus === "string" ? svgOrIllus : null;
        illusName = typeof svgOrIllus === "string" ? illusName : svgOrIllus;
      }
      renderFilled();
    },
    setEmpty() {
      card.dataset.filled = "false";
      renderEmpty();
    },
  };
}

export function uploadNote() {
  const el = h("div", { class: "upload-note" });
  el.innerHTML = `${iconMarkup("info", { size: 14 })}<span>We Prefer <strong>35mm X 35mm</strong> dimension image</span>`;
  return el;
}

export function tabs({ options, selected, onChange }) {
  const el = h("div", { class: "tabs", role: "tablist" });
  const buttons = options.map((opt) => {
    const btn = h("button", {
      class: "tabs__btn",
      role: "tab",
      type: "button",
      "aria-selected": opt.value === selected ? "true" : "false",
      text: opt.label,
      onClick: () => {
        buttons.forEach((b) => b.setAttribute("aria-selected", "false"));
        btn.setAttribute("aria-selected", "true");
        if (onChange) onChange(opt.value);
      },
    });
    el.appendChild(btn);
    return btn;
  });
  return { el, select(v) {
    buttons.forEach((b, i) =>
      b.setAttribute("aria-selected", options[i].value === v ? "true" : "false")
    );
  }};
}

export function amountField({ value }) {
  return h("div", { class: "amount-field", text: value });
}

// --- Toast system ---
let toastStack = null;
function ensureStack() {
  if (toastStack && document.body.contains(toastStack)) return toastStack;
  const viewport = document.querySelector(".phone__viewport") || document.body;
  toastStack = h("div", { class: "toast-stack", "aria-live": "polite" });
  viewport.appendChild(toastStack);
  return toastStack;
}

export function toast(message, { kind, duration = 2500 } = {}) {
  const stack = ensureStack();
  const t = h("div", {
    class: "toast" + (kind ? ` toast--${kind}` : ""),
    role: "status",
    text: message,
  });
  stack.appendChild(t);
  setTimeout(() => {
    t.dataset.leaving = "true";
    t.addEventListener("animationend", () => t.remove(), { once: true });
  }, duration);
}

// --- Modal / overlay ---
export function overlay({ content, dismissible = false, onClose }) {
  const close = () => {
    el.remove();
    document.removeEventListener("keydown", onKey);
    if (onClose) onClose();
  };
  const onKey = (e) => {
    if (dismissible && e.key === "Escape") close();
  };
  document.addEventListener("keydown", onKey);
  const el = h(
    "div",
    {
      class: "overlay",
      role: "dialog",
      "aria-modal": "true",
      onClick: (e) => {
        if (dismissible && e.target === el) close();
      },
    },
    [content]
  );
  return { el, close };
}

export function congratsModal({ title = "Congratulations", body }) {
  return h("div", { class: "modal", role: "document" }, [
    h("div", { class: "modal__check", "aria-hidden": "true", html: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4 10-10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>` }),
    h("div", { class: "modal__title", text: title }),
    h("div", { class: "modal__body", text: body }),
  ]);
}

export function helper({ html, align = "center" }) {
  const el = h("div", { class: "helper", style: { textAlign: align } });
  el.innerHTML = html;
  return el;
}

export function subhead(text) {
  return h("div", { class: "subhead", text });
}
