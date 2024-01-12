"use client";

import { FormEvent, useState } from "react";
import { signup } from "@components/Auth/actions/signup";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const test = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signup(email, password);
    console.log("result : ", result);
  };

  return (
    <form className="form" onSubmit={(e) => test(e)}>
      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input name="email" placeholder={"enter your email"} value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="formGroup">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder={"********"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn">Sign Up</button>
    </form>
  );
};

export default SignupForm;
