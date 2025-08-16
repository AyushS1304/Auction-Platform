import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-6 relative overflow-hidden">
      {/* Cosmic background glows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.15),_transparent_70%)] animate-pulse"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,255,255,0.15),_transparent_70%)] animate-pulse"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="rounded-3xl shadow-2xl border border-indigo-500 bg-gray-900/70 backdrop-blur-2xl hover:shadow-indigo-500/50 transition">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold text-indigo-400 drop-shadow-lg">
              Create Account 🌌
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Name */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 bg-gray-800/70 border-indigo-600 text-white placeholder-gray-400 focus:ring-indigo-500"
              />
            </motion.div>

            {/* Role Selection */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Label htmlFor="role" className="text-gray-300">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="mt-1 bg-gray-800/70 border-indigo-600 text-white placeholder-gray-400 focus:ring-indigo-500">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Email */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-gray-800/70 border-indigo-600 text-white placeholder-gray-400 focus:ring-indigo-500"
              />
            </motion.div>

            {/* Password */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-gray-800/70 border-indigo-600 text-white placeholder-gray-400 focus:ring-indigo-500"
              />
            </motion.div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Button
                onClick={handleSignup}
                className="w-full py-3 text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg rounded-xl"
              >
                Sign Up
              </Button>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-indigo-400 hover:underline">
                Login
              </a>
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
