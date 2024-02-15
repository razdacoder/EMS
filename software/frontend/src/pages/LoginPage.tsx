import { FormEvent, useState } from "react";
import { useAppDispatch } from "../hooks";
import { authLogin } from "../slices/authSlice";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import { useNavigate, Navigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const disptach = useAppDispatch();
  const navigate = useNavigate();

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };
    await disptach(authLogin(credentials));
    window.location.replace("/dashboard");
  };

  const auth = useAppSelector((state: RootState) => state.auth.token);

  if (auth) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return (
    <main className="w-full flex h-screen">
      <div className="w-1/2 bg-gray-200 h-full flex justify-center items-center">
        <form className="w-2/3" onSubmit={submitForm}>
          <h3 className="text-3xl mb-5">Login</h3>
          <p className="mb-5 text-[#333333]">Enter your credentials here.</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="w-full p-3 rounded mb-5 outline-none"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full p-3 rounded mb-5 outline-none"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full p-3 rounded mb-5 outline-none bg-green-900 text-white"
          >
            Login
          </button>
          <p className="text-sm text-[#333333]">Forgot Password?</p>
        </form>
      </div>
      <div className="flex justify-center items-center w-full h-full">
        <img src="/logo.jpeg" width={200} height={200} alt="FPI LOGO" />
      </div>
    </main>
  );
};

export default LoginPage;
