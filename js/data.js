// Dummy data for the prototype. All values here are seed-only; mutations
// go through store.js so screens stay in sync.

export const APP = {
  name: "Quick Commerce",
  logoShort: "Logo",
  countryCode: "+91",
  otpLength: 4,
  resendSeconds: 30,
  // Any OTP works for the demo; a short-circuit value for quick clicking:
  demoOtp: "1234",
  platformFee: 699,
};

export const SIGNUP_STEPS = [
  { id: "signup-info", label: "Your details" },
  { id: "signup-email-otp", label: "Verify email" },
  { id: "signup-phone-otp", label: "Verify phone" },
  { id: "signup-aadhar", label: "Aadhaar" },
  { id: "signup-pan", label: "PAN" },
  { id: "signup-dl", label: "Driving licence" },
  { id: "signup-pay", label: "Platform fee" },
];

export const DEFAULT_PROFILE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  aadhar: "",
  aadharFront: null,
  aadharBack: null,
  pan: "",
  panCard: null,
  dl: "",
  dlFront: null,
  dlBack: null,
  feePaid: false,
};
