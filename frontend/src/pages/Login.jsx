import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const nav = useNavigate();

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    nav("/auctions");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-6">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-white/20 bg-white/90 backdrop-blur-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">Login</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Email Input */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Password Input with Toggle */}
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button onClick={handleLogin} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
            Login
          </Button>
          <p className="text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="font-medium text-indigo-600 hover:underline">
              Register
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
