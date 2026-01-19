import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await login(email, password).unwrap();
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err: any) {
      setMsg(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <section>
        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-green-500">Circle</h1>
          <h2 className="text-4xl font-bold">Login to Circle</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-100 space-y-3">
          <div className="h-10 flex items-center justify-center">
            {msg && <p>{msg}</p>}
          </div>

          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-lg"
          />
          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-lg"
          />

          <Button
            type="submit"
            className="h-10 w-full rounded-2xl bg-green-500 font-bold text-xl text-white hover:text-black"
          >
            Login
          </Button>
          <p>
            <span>Don't have an account yet?</span>
            <Link
              to="/register"
              className="font-semibold text-green-500 hover:text-white"
            >
              {" "}
              Create account
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
