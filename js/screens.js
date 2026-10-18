// Each screen is a factory that returns a <section class="screen"> element.
import {
  h,
  titleStack,
  phoneField,
  emailField,
  textField,
  primaryButton,
  googleButton,
  orDivider,
  sectionLabel,
  inlineLink,
  otpGroup,
  resendRow,
  countdown,
  screenHeader,
  tabs,
  uploadCard,
  uploadNote,
  amountField,
  subhead,
  helper,
  toast,
  overlay,
  congratsModal,
} from "./components.js";
import { iconMarkup } from "./icons.js";
import { APP } from "./data.js";
import { store } from "./store.js";
import { go, back, replace, reset } from "./router.js";

/* ---------- helpers ---------- */

function screen(className, extraClass) {
  return h("section", {
    class: `screen ${className}${extraClass ? " " + extraClass : ""}`,
    role: "region",
  });
}

function logoPill(text = APP.logoShort) {
  return h("div", { class: "logo-pill", "aria-label": "App logo" }, [text]);
}

function fullName() {
  const p = store.getProfile();
  const n = [p.firstName, p.lastName].filter(Boolean).join(" ").trim();
  return n || "there";
}

/* ---------- LOGIN flow ---------- */

export function loginPhone() {
  const root = screen("screen-login");
  const inner = h("div", { class: "screen__inner" });
  const profile = store.getProfile();

  let phone = profile.phone || "";

  const bodyEls = [
    logoPill(),
    titleStack({ hey: "Hey,", line: "Login Now" }),
    phoneField({
      value: phone,
      autofocus: true,
      oninput: (v) => {
        phone = v.replace(/\D/g, "").slice(0, 10);
      },
    }),
  ];

  const sendBtn = primaryButton({
    label: "Send OTP",
    onClick: () => {
      if (phone.length < 10) {
        toast("Enter a 10-digit phone number", { kind: "error" });
        return;
      }
      store.update({ phone });
      go("login-otp");
    },
  });

  const footer = h("div", { class: "screen__footer" }, [
    sendBtn,
    inlineLink({
      before: "Don't have an account?",
      cta: "Sign up",
      onClick: () => go("signup-info"),
    }),
  ]);

  inner.append(...bodyEls);
  inner.appendChild(footer);
  root.appendChild(inner);
  return root;
}

export function loginOtp() {
  const root = screen("screen-login", "screen--with-back");
  const inner = h("div", { class: "screen__inner" });
  const profile = store.getProfile();

  const header = screenHeader({ onBack: back });
  const title = titleStack({ hey: "Hey,", line: "Login Now" });
  const phoneRow = phoneField({
    value: profile.phone,
    oninput: () => {},
  });
  phoneRow.querySelector("input").readOnly = true;

  const label = sectionLabel("Enter OTP");

  let otpValue = "";
  const otp = otpGroup({
    length: APP.otpLength,
    onChange: (v) => {
      otpValue = v;
      submit.textContent = v.length === APP.otpLength ? "Submit" : "Enter OTP";
    },
    onComplete: () => {
      submit.textContent = "Submit";
    },
  });

  const timer = countdown({ seconds: APP.resendSeconds });

  const submit = primaryButton({
    label: "Enter OTP",
    onClick: () => {
      if (otpValue.length < APP.otpLength) {
        toast("Enter the full OTP", { kind: "error" });
        otp.focus();
        return;
      }
      timer.stop();
      resend.stop();
      toast("Logged in", { kind: "success" });
      setTimeout(() => reset("home"), 500);
    },
  });

  const resend = resendRow({
    seconds: APP.resendSeconds,
    onResend: () => {
      toast("OTP resent");
      timer.reset(APP.resendSeconds);
      resend.reset(APP.resendSeconds);
    },
  });

  const footer = h("div", { class: "screen__footer" }, [submit, resend.el]);

  inner.append(header, title, phoneRow, label, otp.el, timer.el, footer);
  root.appendChild(inner);

  requestAnimationFrame(() => otp.focus());
  return root;
}

/* ---------- SIGN UP flow ---------- */

export function signupInfo() {
  const root = screen("screen-signup", "screen--with-back");
  const inner = h("div", { class: "screen__inner" });
  const profile = store.getProfile();

  const draft = {
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    email: profile.email || "",
    phone: profile.phone || "",
  };

  const header = screenHeader({ onBack: back });
  const title = titleStack({ hey: "Hey,", line: "Sign Up Now" });

  const firstName = textField({
    placeholder: "First Name",
    value: draft.firstName,
    oninput: (v) => (draft.firstName = v),
    ariaLabel: "First name",
  });
  const lastName = textField({
    placeholder: "Last Name",
    value: draft.lastName,
    oninput: (v) => (draft.lastName = v),
    ariaLabel: "Last name",
  });
  const email = emailField({
    value: draft.email,
    oninput: (v) => (draft.email = v),
  });
  const phone = phoneField({
    value: draft.phone,
    oninput: (v) => (draft.phone = v.replace(/\D/g, "").slice(0, 10)),
  });

  const btn = primaryButton({
    label: "Send OTP",
    onClick: () => {
      if (!draft.firstName.trim()) {
        toast("First name is required", { kind: "error" });
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(draft.email)) {
        toast("Enter a valid email", { kind: "error" });
        return;
      }
      if (draft.phone.length < 10) {
        toast("Enter a 10-digit phone", { kind: "error" });
        return;
      }
      store.update(draft);
      go("signup-email-otp");
    },
  });

  const footer = h("div", { class: "screen__footer" }, [btn]);

  inner.append(header, title, firstName, lastName, email, phone);
  inner.appendChild(footer);
  root.appendChild(inner);
  return root;
}

function makeOtpVerificationScreen({
  valueLabel,
  valueDisplay,
  readonlyField,
  primaryLabel,
  onSuccess,
}) {
  const root = screen("screen-signup", "screen--with-back");
  const inner = h("div", { class: "screen__inner" });

  const header = screenHeader({ onBack: back });
  const title = titleStack({ hey: "Hey,", line: "Sign Up Now" });

  const field = readonlyField;

  const label = sectionLabel("Enter OTP");

  let otpValue = "";
  const submit = primaryButton({
    label: primaryLabel,
    onClick: () => {
      if (otpValue.length < APP.otpLength) {
        toast("Enter the full OTP", { kind: "error" });
        otp.focus();
        return;
      }
      timer.stop();
      resend.stop();
      onSuccess();
    },
  });

  const otp = otpGroup({
    length: APP.otpLength,
    onComplete: () => {
      submit.textContent = primaryLabel;
    },
    onChange: (v) => {
      otpValue = v;
    },
  });

  const timer = countdown({ seconds: APP.resendSeconds });

  const resend = resendRow({
    seconds: APP.resendSeconds,
    onResend: () => {
      toast("OTP resent");
      timer.reset(APP.resendSeconds);
      resend.reset(APP.resendSeconds);
    },
  });

  const footer = h("div", { class: "screen__footer" }, [submit, resend.el]);

  inner.append(header, title, field, label, otp.el, timer.el, footer);
  root.appendChild(inner);

  requestAnimationFrame(() => otp.focus());
  return root;
}

export function signupEmailOtp() {
  const profile = store.getProfile();
  const field = textField({
    placeholder: "Email",
    value: profile.email || "monkeydluffy@gmail.com",
    ariaLabel: "Email address",
    oninput: () => {},
  });
  field.querySelector("input").readOnly = true;

  return makeOtpVerificationScreen({
    readonlyField: field,
    primaryLabel: "Continue",
    onSuccess: () => go("signup-phone-otp"),
  });
}

export function signupPhoneOtp() {
  const profile = store.getProfile();
  const field = phoneField({
    value: profile.phone || "9876543210",
    oninput: () => {},
  });
  field.querySelector("input").readOnly = true;

  return makeOtpVerificationScreen({
    readonlyField: field,
    primaryLabel: "Continue",
    onSuccess: () => go("signup-aadhar"),
  });
}

/* ---------- Document upload screens ---------- */

function documentScreen({
  nameTitle,
  subheadText,
  inputPlaceholder,
  inputValue,
  onInputChange,
  frontIllusName,
  backIllusName,
  frontLabel = "Upload Front Side of the Aadhar",
  backLabel = "Upload Back Side of the Aadhar",
  nextRoute,
  tabsEnabled = true,
  savedKeys = {},
}) {
  const root = screen("screen-signup screen-document", "screen--with-back");
  const inner = h("div", { class: "screen__inner" });

  const header = screenHeader({ onBack: back });
  const title = titleStack({ hey: "Hey,", line: nameTitle });

  const sub = subhead(subheadText);

  const idInput = textField({
    placeholder: inputPlaceholder,
    value: inputValue,
    oninput: onInputChange,
    ariaLabel: subheadText,
  });

  const guidance = helper({
    html:
      tabsEnabled
        ? `Take a Picture of <strong>Front &amp; Back side of ID</strong> or Upload it from your device`
        : `Take a Picture of  <strong>${
            backIllusName === "pan-card" ? "PAN Card" : "ID"
          }</strong> or Upload it from your device`,
  });

  let side = "front";

  const tabEl = tabsEnabled
    ? tabs({
        options: [
          { value: "front", label: "Front" },
          { value: "back", label: "Back" },
        ],
        selected: "front",
        onChange: (v) => {
          side = v;
          render();
        },
      })
    : null;

  const cardSlot = h("div");

  function render() {
    cardSlot.innerHTML = "";
    const profile = store.getProfile();
    const key = tabsEnabled
      ? side === "front"
        ? savedKeys.front
        : savedKeys.back
      : savedKeys.single;
    const isFilled = Boolean(key && profile[key]);
    const illusName = tabsEnabled
      ? side === "front"
        ? frontIllusName
        : backIllusName
      : backIllusName;
    const label = tabsEnabled
      ? side === "front"
        ? frontLabel
        : backLabel
      : frontLabel;

    const card = uploadCard({
      label,
      state: isFilled ? "filled" : "empty",
      illusName,
      previewSvg: isFilled ? iconMarkup(illusName) : null,
      onPick: () => {
        if (isFilled) return;
        store.update({ [key]: true });
        toast("Image attached", { kind: "success" });
        // Auto-advance to the Back tab after Front upload for guided feel
        if (tabsEnabled && side === "front" && !store.getProfile()[savedKeys.back]) {
          side = "back";
          if (tabEl) tabEl.select("back");
        }
        render();
        syncButton();
      },
    });
    cardSlot.appendChild(card.el);
  }

  const note = uploadNote();

  // Button label: "Upload" when the current side is empty, "Continue" when filled.
  const btn = primaryButton({
    label: "Upload",
    onClick: () => {
      const profile = store.getProfile();
      const needed = tabsEnabled
        ? [savedKeys.front, savedKeys.back]
        : [savedKeys.single];
      const allUploaded = needed.every((k) => profile[k]);
      if (!allUploaded) {
        toast("Attach the required image", { kind: "error" });
        return;
      }
      go(nextRoute);
    },
  });

  function syncButton() {
    const p = store.getProfile();
    const needed = tabsEnabled
      ? [savedKeys.front, savedKeys.back]
      : [savedKeys.single];
    const allUploaded = needed.every((k) => p[k]);
    btn.textContent = allUploaded ? "Continue" : "Upload";
  }

  render();
  syncButton();

  const footer = h("div", { class: "screen__footer" }, [btn]);

  inner.append(header, title, sub, idInput);
  if (tabEl) inner.appendChild(h("div", {}, []));
  inner.appendChild(guidance);
  if (tabEl) inner.appendChild(tabEl.el);
  inner.appendChild(cardSlot);
  inner.appendChild(note);
  inner.appendChild(footer);
  root.appendChild(inner);

  return root;
}

export function signupAadhar() {
  const profile = store.getProfile();
  let aadhar = profile.aadhar || "";
  return documentScreen({
    nameTitle: fullName(),
    subheadText: "Enter Aadhar Number",
    inputPlaceholder: "Aadhar no.",
    inputValue: aadhar,
    onInputChange: (v) => {
      aadhar = v.replace(/\D/g, "").slice(0, 12);
      store.update({ aadhar });
    },
    frontIllusName: "aadhar-front",
    backIllusName: "aadhar-back",
    frontLabel: "Upload Front Side of the Aadhar",
    backLabel: "Upload Back Side of the Aadhar",
    savedKeys: { front: "aadharFront", back: "aadharBack" },
    nextRoute: "signup-pan",
    tabsEnabled: true,
  });
}

export function signupPan() {
  const profile = store.getProfile();
  let pan = profile.pan || "";
  return documentScreen({
    nameTitle: fullName(),
    subheadText: "Enter PAN Number",
    inputPlaceholder: "PAN no.",
    inputValue: pan,
    onInputChange: (v) => {
      pan = v.toUpperCase().slice(0, 10);
      store.update({ pan });
    },
    frontIllusName: "pan-card",
    backIllusName: "pan-card",
    frontLabel: "Upload PAN",
    backLabel: "Upload PAN",
    savedKeys: { single: "panCard" },
    nextRoute: "signup-dl",
    tabsEnabled: false,
  });
}

export function signupDl() {
  const profile = store.getProfile();
  let dl = profile.dl || "";
  return documentScreen({
    nameTitle: fullName(),
    subheadText: "Enter Driving License Number",
    inputPlaceholder: "DL-01-2025-0000000",
    inputValue: dl,
    onInputChange: (v) => {
      dl = v.toUpperCase().slice(0, 20);
      store.update({ dl });
    },
    frontIllusName: "dl-front-ka",
    backIllusName: "dl-back",
    frontLabel: "Upload Front Side of the DL",
    backLabel: "Upload Back Side of the DL",
    savedKeys: { front: "dlFront", back: "dlBack" },
    nextRoute: "signup-pay",
    tabsEnabled: true,
  });
}

export function signupPay() {
  const root = screen("screen-signup screen-pay", "screen--with-back");
  const inner = h("div", { class: "screen__inner" });

  const header = screenHeader({ onBack: back });
  const title = titleStack({ hey: "Hey,", line: fullName() });

  const sub = subhead("Pay Platform Fees");

  const amount = amountField({ value: `${APP.platformFee}/-` });

  const note = helper({
    html: `After Paying Platform Fees, Document Verification Might Take Up To <strong>Few Days!</strong>`,
  });

  const btn = primaryButton({
    label: "Pay Now",
    onClick: () => {
      store.update({ feePaid: true });
      const modalContent = congratsModal({
        title: "Congratulations",
        body: "Payment successful. Redirecting to home soon...",
      });
      const o = overlay({ content: modalContent, dismissible: false });
      document.querySelector(".phone__viewport").appendChild(o.el);
      setTimeout(() => {
        o.close();
        reset("home");
      }, 1800);
    },
  });

  const footer = h("div", { class: "screen__footer" }, [btn]);

  inner.append(header, title, sub, amount, note);
  inner.appendChild(footer);
  root.appendChild(inner);
  return root;
}

/* ---------- Home ---------- */

export function home() {
  const root = screen("screen-home");
  const inner = h("div", { class: "screen__inner" }, [
    h("div", { class: "screen-home__spacer" }),
    h("div", { class: "screen-home__title", text: "Home" }),
    h(
      "div",
      { class: "helper", style: { marginTop: "12px" } },
      ["Signed in as ", h("strong", { text: fullName() })]
    ),
    h("div", { class: "screen-home__spacer" }),
    h("div", { class: "screen__footer" }, [
      primaryButton({
        label: "Log out",
        onClick: () => {
          store.reset();
          toast("Signed out");
          reset("login-phone");
        },
      }),
    ]),
  ]);
  root.appendChild(inner);
  return root;
}

/* ---------- Route table ---------- */

export const ROUTES = {
  "login-phone": loginPhone,
  "login-otp": loginOtp,
  "signup-info": signupInfo,
  "signup-email-otp": signupEmailOtp,
  "signup-phone-otp": signupPhoneOtp,
  "signup-aadhar": signupAadhar,
  "signup-pan": signupPan,
  "signup-dl": signupDl,
  "signup-pay": signupPay,
  home,
};
