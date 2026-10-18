// localStorage-backed store with an in-memory fallback and pub/sub.
import { DEFAULT_PROFILE } from "./data.js";

const KEY = "qc_proto_v1";

const memory = { data: null };
let storageAvailable = (() => {
  try {
    const k = "__qc_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
})();

function readRaw() {
  if (storageAvailable) {
    try {
      return window.localStorage.getItem(KEY);
    } catch {
      storageAvailable = false;
    }
  }
  return memory.data;
}

function writeRaw(str) {
  if (storageAvailable) {
    try {
      window.localStorage.setItem(KEY, str);
      return;
    } catch {
      storageAvailable = false;
    }
  }
  memory.data = str;
}

function load() {
  const raw = readRaw();
  if (!raw) return { profile: { ...DEFAULT_PROFILE } };
  try {
    const parsed = JSON.parse(raw);
    return {
      profile: { ...DEFAULT_PROFILE, ...(parsed.profile || {}) },
    };
  } catch {
    return { profile: { ...DEFAULT_PROFILE } };
  }
}

let state = load();
const listeners = new Set();

function emit() {
  for (const fn of listeners) {
    try {
      fn(state);
    } catch (e) {
      console.error(e);
    }
  }
}

function persist() {
  writeRaw(JSON.stringify(state));
}

export const store = {
  getState() {
    return state;
  },
  getProfile() {
    return state.profile;
  },
  update(patch) {
    state = { ...state, profile: { ...state.profile, ...patch } };
    persist();
    emit();
  },
  reset() {
    state = { profile: { ...DEFAULT_PROFILE } };
    persist();
    emit();
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  isPersistent() {
    return storageAvailable;
  },
};
