const TOKEN_STORAGE_KEY = "loom_customer_token";

let currentToken: string | null = null;
let initialized = false;
const listeners = new Set<() => void>();

function initialize() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  currentToken = localStorage.getItem(TOKEN_STORAGE_KEY);
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function getToken() {
  initialize();
  return currentToken;
}

export function setToken(token: string) {
  initialize();
  currentToken = token;
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  notify();
}

export function clearToken() {
  initialize();
  currentToken = null;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  notify();
}

export function subscribeToken(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
