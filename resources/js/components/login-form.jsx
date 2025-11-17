"use client";

import { useState } from "react";  // 👈 your API file
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Login } from "@/lib/apis";
import { router } from "@inertiajs/react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password
    };

    try {
      const res = await Login(data);  // 👈 sending data to API
      console.log("Login Success:", res.data);
      // alert(res.data.message);

      // Redirect if needed
      router.visit('/dashboard');

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label>Email</Label>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="grid gap-2">
                <Label>Password</Label>
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>

            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}