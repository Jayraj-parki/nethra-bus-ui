// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@/services/authApi";
import { setTokenProvider } from "@/services/https";

const AUTH_STORAGE_KEY = "auth:v1";

const getStoredAuth = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const initialState = {
  status: "anonymous", // 'anonymous' | 'guest' | 'authenticated'
  user: null,
  token: null,
  loading: false,
  error: null,
};

// REGISTER (just create account; do NOT sign-in; UI will redirect to login)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password, phone }) => {
    // shape depends on your API
    const resp = await authApi.register({ name, email, password, phone });
    return resp; // expect {message} or created user id
  }
);

// LOGIN (example already provided earlier, but now calling real API)
export const loginWithCredentials = createAsyncThunk(
  "auth/loginWithCredentials",
  async ({ email, password }) => {
    const resp = await authApi.login({ email, password });
    // Expect: { user, token } or cookies-based session
    return resp;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    continueAsGuest(state) {
      state.status = "guest";
      state.user = null;
      state.token = null;
      state.error = null;
    },
    signOut(state) {
      state.status = "anonymous";
      state.user = null;
      state.token = null;
      state.error = null;
    },
    restoreSession(state, action) {
      const { status, user, token } = action.payload || {};
      if (!status) return;
      state.status = status;
      state.user = user || null;
      state.token = token || null;
      state.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(registerUser.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(registerUser.fulfilled, (s) => {
      s.loading = false;
      // stay unauthenticated; UI will redirect to login
    });
    b.addCase(registerUser.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error?.message || "Registration failed";
    });

    b.addCase(loginWithCredentials.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(loginWithCredentials.fulfilled, (s, a) => {
      s.loading = false;
      s.status = "authenticated";
      s.user = a.payload.user || null;
      s.token = a.payload.token || null; // if using cookies, token may be null
    });
    b.addCase(loginWithCredentials.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error?.message || "Login failed";
    });
  },
});

export const { continueAsGuest, signOut, restoreSession } = authSlice.actions;

// Selectors
export const selectAuth = (s) => s.auth;
export const selectIsAuthenticated = (s) => s.auth.status === "authenticated";
export const selectIsGuest = (s) => s.auth.status === "guest";
export const selectUser = (s) => s.auth.user;
export const selectAuthToken = (s) => s.auth.token;

// Persistence
export const persistAuthSubscriber = (store) => {
  if (typeof window === "undefined") return;
  store.subscribe(() => {
    const { status, user, token } = store.getState().auth;
    try {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ status, user, token })
      );
    } catch {}
  });
};

export const restoreAuthOnClient = (store) => {
  const saved = getStoredAuth();
  if (saved?.status) {
    store.dispatch(restoreSession(saved));
  }
  // Provide token to HTTP client
  setTokenProvider(() => store.getState().auth.token);
};

export default authSlice.reducer;
