"use client";

import { FormEvent, useContext, useState } from "react";
import { signUpAction } from "@components/Auth/actions/signUpActions";
import { UserContext } from "@components/Auth/UserProvider";
import { redirect } from "next/navigation";

const SignupForm = () => {
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const test = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.length === 0 || email.length === 0 || password.length === 0) {
      return;
    }

    const result = await signUpAction(username, email, password);
    if (result.error) {
      console.error("Error signing up", result.error);
      return;
    }

    setUser(result.user);

    redirect("/");
  };

  return (
    <form className="form" onSubmit={(e) => test(e)}>
      <div className="formGroup">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="formGroup">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="btn">Sign Up</button>
    </form>
  );
};

export default SignupForm;
