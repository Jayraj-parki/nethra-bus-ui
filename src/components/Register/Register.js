

'use client';
import classes from './Register.module.css';
import Link from "next/link";
// import { useState } from 'react';
import React, { useState } from 'react';
const Register=()=>{

    const [idproof,setIdproof]=useState("");



    return(<>
    


    <div className={classes.w}>
      <div className={classes.w1}>
        <h2>Join BusBook Today</h2>
        <h3>Create your account and start your comfortable journey with us</h3>
        <ul>
          <li><h4>🔒</h4><p>Secure & Safe</p></li>
          <li><h4>⚡</h4><p>Quick Booking</p></li>
          <li><h4>🎫</h4><p>Digital Tickets</p></li>
        </ul>
      </div>

      <div className={classes.w2}>
        <h2>🚌 BusBook</h2>
        

        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Mobile Number</label>
          <input type="tel" placeholder="Enter 10-digit Mobile Number" required />

           <label>Age</label>
          <input type="number" placeholder="Enter your Age" required />
          <hr/>

          <label >Id Proof type</label>
          <select value={idproof} onChange={(e)=>setIdproof(e.target.value)} required>
            
            <option value="Aadhar Card">Aadhar Card</option>
            <option value="Voter Id">Voter Id</option>
            <option value="Driving License">Driving License</option>
            <option value="Passport">Passport</option>
          </select>
          {/* <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
    Select Option
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Option 1</a></li>
    <li><a class="dropdown-item" href="#">Option 2</a></li>
    <li><a class="dropdown-item" href="#">Option 3</a></li>
  </ul>
</div> */}

            <label >{idproof =="" ? "Id":idproof} Number</label>
            <input type="number" placeholder={`Enter Your ${idproof} number`} required />
      
      <hr/>
          <label>Password</label>
          <input type="password" placeholder="Create a password" required />
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" required />

          <button type="submit" className={classes.loginBtn}>Create Account</button>

        
         

          <p className={classes.registerText}>
            Already have an account? <Link href="/">Sign in here</Link>
          </p>
        </form>
      </div>
    </div>
  


    </>)
}
export default Register;