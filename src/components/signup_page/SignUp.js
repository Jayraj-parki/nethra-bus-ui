'use client';
import { urls } from '@/utils/constants';
import classes from './SignUp.module.scss';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useRegisterRedirect } from '@/hooks/useRegisterRedirect';

const SignUp = () => {
  const [idproof, setIdproof] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useRegisterRedirect();

  const emailRef = useRef();
  const phoneRef = useRef();
  const ageRef = useRef();
  const idNumberRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const validate = () => {
    const email = emailRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const age = Number(ageRef.current.value);
    const idnumber = idNumberRef.current.value.trim();
    const pwd = passwordRef.current.value;
    const cpwd = confirmPasswordRef.current.value;

    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email address';
    if (!/^\d{10}$/.test(phone)) return 'Enter a 10-digit mobile number';
    if (!idproof) return 'Please select an ID proof type';
    if (idnumber.length < 4) return `Please enter a valid ${idproof} number`;
    if (!age || age < 12) return 'Age must be 12 or above';
    if (pwd.length < 6) return 'Password must be at least 6 characters';
    if (pwd !== cpwd) return 'Passwords do not match';
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError('');

    // Build payload for your API. Keep only supported fields.
    const payload = {
      email: emailRef.current.value.trim(),
      phone: phoneRef.current.value.trim(),
      password: passwordRef.current.value,
      // Include additional fields only if your backend expects them:
      age: Number(ageRef.current.value),
      idProofType: idproof,
      idNumber: idNumberRef.current.value.trim(),
    };

    // This hook will redirect to /login?email=... on success
    await register(payload);
  };

  return (
    <div className={classes.w}>
      <div className={classes.w1 + ' d-none d-md-flex flex-column justify-content-center'}>
        <h2>Join BusBook Today</h2>
        <h3>Create your account and start your comfortable journey with us</h3>
        <ul>
          <li><h4>🔒</h4><p>Secure & Safe</p></li>
          <li><h4>⚡</h4><p>Quick Booking</p></li>
          <li><h4>🎫</h4><p>Digital Tickets</p></li>
        </ul>
      </div>

      <div className={classes.w2 + ' bg-light'}>
        <h2>🚌 BusBook</h2>

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

          <label className="form-label fw-medium m-0 mt-3">Mobile Number</label>
          <input
            ref={phoneRef}
            type="tel"
            inputMode="numeric"
            pattern="\d{10}"
            className="form-control border outline-0 shadow-none"
            placeholder="Enter 10-digit Mobile Number"
            required
            autoComplete="tel"
          />

          <label className="form-label fw-medium m-0 mt-3">Age</label>
          <input
            ref={ageRef}
            type="number"
            min={12}
            className="form-control border outline-0 shadow-none fw-small"
            placeholder="Enter your Age"
            required
          />

          <hr />

          <label className="form-label fw-medium m-0">Id Proof type</label>
          <select
            className="form-select border outline-0 shadow-none"
            value={idproof}
            onChange={(e) => setIdproof(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="Aadhar Card">Aadhar Card</option>
            <option value="Voter Id">Voter Id</option>
            <option value="Driving License">Driving License</option>
            <option value="Passport">Passport</option>
          </select>

          <label className="form-label fw-medium m-0 mt-3">{idproof === '' ? 'Id' : idproof} Number</label>
          <input
            ref={idNumberRef}
            className="form-control border outline-0 shadow-none"
            type="text"
            placeholder={`Enter Your ${idproof || 'Id'} number`}
            required
          />

          <hr />

          <label className="form-label fw-medium m-0">Password</label>
          <input
            ref={passwordRef}
            className="form-control border outline-0 shadow-none"
            type="password"
            placeholder="Create a password"
            required
            autoComplete="new-password"
            minLength={6}
          />

          <label className="form-label fw-medium m-0 mt-3">Confirm Password</label>
          <input
            ref={confirmPasswordRef}
            className="form-control border outline-0 shadow-none"
            type="password"
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
            minLength={6}
          />

          {error && <div className="text-danger small mt-2">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={classes.loginBtn + ' fw-medium mt-3'}
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>

          <p className={classes.registerText}>
            Already have an account? <Link href={urls?.signin}>Sign in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
