'use client';
import { urls } from '@/utils/constants';
import classes from './SignUp.module.scss';
import Link from "next/link";
import React, { useState } from 'react';

const SignUp = () => {
  const [idproof, setIdproof] = useState("");

  return (
    <div className={classes.w}>
      <div className={classes.w1 +'  d-none d-md-flex  flex-column justify-content-center'}>
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
        <form className=''>
          <label className='form-label fw-medium m-0'>Email</label>
          <input type="email" className="form-control border outline-0 shadow-none"  placeholder="Enter your email" required />

          <label className='form-label fw-medium m-0'>Mobile Number</label>
          <input type="tel" className="form-control border outline-0 shadow-none" placeholder="Enter 10-digit Mobile Number" required />

          <label className='form-label fw-medium m-0'>Age</label>
          <input type="number" className="form-control border outline-0 shadow-none fw-small" placeholder="Enter your Age" required />

          <hr />

          <label className='form-label fw-medium m-0'>Id Proof type</label>
          <select className="form-control border outline-0 shadow-none" value={idproof} onChange={(e) => setIdproof(e.target.value)} required>
            <option value="">Select</option>
            <option value="Aadhar Card">Aadhar Card</option>
            <option value="Voter Id">Voter Id</option>
            <option value="Driving License">Driving License</option>
            <option value="Passport">Passport</option>
          </select>

          <label className='form-label fw-medium m-0'>{idproof === "" ? "Id" : idproof} Number</label>
          <input className="form-control border outline-0 shadow-none" type="text" placeholder={`Enter Your ${idproof || "Id"} number`} required />

          <hr />

          <label className='form-label fw-medium m-0'>Password</label>
          <input className="form-control border outline-0 shadow-none" type="password" placeholder="Create a password" required />

          <label className='form-label fw-medium m-0'>Confirm Password</label>
          <input className="form-control border outline-0 shadow-none" type="password" placeholder="Confirm your password" required />

          <button type="submit" className={classes.loginBtn +  ' fw-medium'}>Create Account</button>

          <p className={classes.registerText}>
            Already have an account? <Link href={urls?.signin}>Sign in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
