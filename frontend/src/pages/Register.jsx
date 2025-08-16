import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Register() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);

    const userId = data.user?.id;
    if (userId) {
      const { error: up } = await supabase.from("users").upsert({ id: userId, name, role });
      if (up) return alert(up.message);
    }

    alert("Signup successful! Check your email to confirm your account.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to-blue-100 p-6">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border border-emerald-200 bg-white/90 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-emerald-700">Create Account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Role Selection */}
          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buyer">Buyer</SelectItem>
                <SelectItem value="seller">Seller</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            onClick={handleSignup}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
          >
            Sign Up
          </Button>
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-emerald-600 hover:underline">
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
