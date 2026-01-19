import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/register", {
        username,
        fullname,
        email,
        password,
      });

      setMsg(res.data.message);
      setUsername("");
      setFullname("");
      setEmail("");
      setPassword("");
    } catch (err: any) {

      console.log(err.response.data);

      const message = err.response.data.error || err.response.data.message || "Register failed";
      setMsg(message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <section>
        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-green-500">Circle</h1>
          <h2 className="text-4xl font-bold">Create account Circle</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-100 space-y-3">
          <div className="h-10 flex items-center justify-center">{msg && <p>{msg}</p>}</div>

          <Input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 rounded-lg"
          />
          <Input
            type="text"
            placeholder="Fullname"
            required
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="h-12 rounded-lg"
          />
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
            Create
          </Button>
          <p>
            <span>Already have an account?</span>
            <Link
              to="/login"
              className="font-semibold text-green-500 hover:text-white"
            >
              {" "}
              Login
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
