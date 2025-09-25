'use client';
import Link from "next/link";
import classes from './SignIn.module.scss';

const SignIn = () => {
  return (
    <div className={classes.w + ' m-0'}>
      <div className={classes.w1 +' d-none d-md-flex flex-column justify-content-center'}>
        <h2>Welcome to BusBook</h2>
        <h3>Book your perfect bus journey with ease and comfort</h3>
        <ul>
          <li><h4>🚌</h4><p>500+ Buses</p></li>
          <li><h4>🏆</h4><p>Best Prices</p></li>
          <li><h4>⚡</h4><p>Instant Booking</p></li>
        </ul>
      </div>

      <div className={classes.w2 + ' bg-light m-0 '}>
        <h2 className="mt-4">🚌 BusBook</h2>
        <p>Sign in to your account to book bus tickets</p>

        <form>
          <label className="form-label fw-medium m-0">Email</label>
          <input type="email" className="form-control border outline-0 shadow-none" placeholder="Enter your email" required />

          <label className="form-label fw-medium m-0">Password</label>
          <input type="password" className="form-control border outline-0 shadow-none" placeholder="Enter your password" required />

          <button type="submit" className={classes.loginBtn + '  fw-medium m-0'}>Sign In</button>

        
          <div className={classes.divider + '  fw-medium m-0'}>
            <hr /> <span>Or Continue as</span> <hr />
          </div>

          <button type="button" className={classes.guestBtn + ' border outline-0 shadow-none fw-medium m-0'}>Continue as Guest</button>

          <p className={classes.registerText}>
            Don’t have an account? <Link href="/signup">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
