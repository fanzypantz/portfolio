"use client";

import { FormEvent, useContext, useState } from "react";
import { loginAction } from "@lib/Auth/actions/loginActions";
import { useRouter } from "next/navigation";
import { UserContext } from "@components/Auth/UserProvider";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const test = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await loginAction(email, password);

    if (result.error) {
      console.log(result.error);
      return;
    }

    setUser(result.user);

    push("/");
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
