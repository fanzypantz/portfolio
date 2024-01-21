"use client";

import { FormEvent, useState } from "react";
import { login } from "@components/Auth/actions/login";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const test = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await login(email, password);
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
      <button className="btn">Sign In</button>
    </form>
  );
};

export default LoginForm;
