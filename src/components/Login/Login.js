'use client';
import Link from "next/link";
import classes from './Login.module.css';

const Login = () => {
  return (
    <div className={classes.w}>
      <div className={classes.w1}>
        <h2>Welcome to BusBook</h2>
        <h3>Book your perfect bus journey with ease and comfort</h3>
        <ul>
          <li><h4>🚌</h4><p>500+ Buses</p></li>
          <li><h4>🏆</h4><p>Best Prices</p></li>
          <li><h4>⚡</h4><p>Instant Booking</p></li>
        </ul>
      </div>

      <div className={classes.w2}>
        <h2>🚌 BusBook</h2>
        <p>Sign in to your account to book bus tickets</p>

        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />

          <button type="submit" className={classes.loginBtn}>Sign In</button>

        
          <div className={classes.divider}>
            <hr /> <span>Or Continue as</span> <hr />
          </div>

          <button type="button" className={classes.guestBtn}>Continue as Guest</button>

          <p className={classes.registerText}>
            Don’t have an account? <Link href="/Register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
