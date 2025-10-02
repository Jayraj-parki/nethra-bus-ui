'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import classes from './SignIn.module.scss';
import { urls } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useRef, useState } from 'react';

const SignIn = () => {
  const { isAuthed, isGuest, login, continueAsGuest, auth } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState('');

  // Optional: prefill email coming from register redirect (?email=...)
  useEffect(() => {
    const pre = params?.get('email');
    if (pre && emailRef.current) emailRef.current.value = pre;
  }, [params]);

  // Redirect once authenticated or guest
  useEffect(() => {
    if (isAuthed || isGuest) {
      const next = params?.get('next') || '/';
      router.replace(next);
    }
  }, [isAuthed, isGuest, router, params]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    await login(email, password); // thunk handles pending/fulfilled/rejected
  };

  const onGuest = async () => {
    continueAsGuest();
    // redirect will happen in the useEffect above
  };

  return (
    <div className={classes.w + ' m-0'}>
      <div className={classes.w1 + ' d-none d-md-flex flex-column justify-content-center'}>
        <h2>Welcome to BusBook</h2>
        <h3>Book your perfect bus journey with ease and comfort</h3>
        <ul>
          <li><h4>🚌</h4><p>500+ Buses</p></li>
          <li><h4>🏆</h4><p>Best Prices</p></li>
          <li><h4>⚡</h4><p>Instant Booking</p></li>
        </ul>
      </div>

      <div className={classes.w2 + ' bg-light m-0'}>
        <h2 className="mt-4">🚌 BusBook</h2>
        <p>Sign in to your account to book bus tickets</p>

        <form onSubmit={onSubmit} noValidate>
          <label className="form-label fw-medium m-0">Email</label>
          <input
            ref={emailRef}
            type="email"
            className="form-control border outline-0 shadow-none"
            placeholder="Enter your email"
            required
            autoComplete="email"
          />

          <label className="form-label fw-medium m-0 mt-3">Password</label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control border outline-0 shadow-none"
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />

          {error && <div className="text-danger small mt-2">{error}</div>}

          <button
            type="submit"
            disabled={auth.loading}
            className={classes.loginBtn + ' fw-medium m-0 mt-3'}
          >
            {auth.loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className={classes.divider + ' fw-medium m-0'}>
            <hr /> <span>Or Continue as</span> <hr />
          </div>

          <button
            onClick={onGuest}
            type="button"
            className={classes.guestBtn + ' border outline-0 shadow-none fw-medium m-0'}
          >
            Continue as Guest
          </button>

          <p className={classes.registerText}>
            Don’t have an account? <Link href={urls?.signup}>Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
