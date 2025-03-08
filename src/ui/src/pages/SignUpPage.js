import React from "react";

function SignUpPage() {
  return (
    
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
  <h1 className="mb-4 text-center col-md-6">Welcome, Let’s Sign You Up!</h1>
      {/* <div className=""> */}
      
      <form className="p-4 col-md-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">Your email will be used to sign you in.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="text"
          />
          <div id="emailHelp" class="form-text">Your username will be visible to other users.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />

          <label htmlFor="exampleInputPassword1" className="form-label">
            Repeat Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
      {/* //   </div> */}
    </div>
  );
}

export default SignUpPage;
