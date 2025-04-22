'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Phone, Lock } from "lucide-react";

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Store token
      localStorage.setItem('admin_token', data.token);

      // Redirect to admin dashboard
      router.push('/');
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 text-black bg-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500 to-orange-700 opacity-90"></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-12 text-white">
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mb-8">
            <span className="text-6xl">🏏</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">Saffron Exch</h1>
          <p className="text-xl text-center mb-8">Your premier IPL cricket betting platform</p>
          <div className="space-y-6 max-w-md">
            <div className="flex items-center bg-white text-black bg-opacity-20 p-4 rounded-lg">
              <div className="mr-4 text-3xl">🔥</div>
              <div>
                <h3 className="font-bold">Live IPL Betting</h3>
                <p className="text-sm">Bet on matches as they happen with our real-time platform</p>
              </div>
            </div>
            <div className="flex items-center bg-white text-black bg-opacity-20 p-4 rounded-lg">
              <div className="mr-4 text-3xl">💰</div>
              <div>
                <h3 className="font-bold">Instant Payouts</h3>
                <p className="text-sm">Withdraw your winnings instantly to your account</p>
              </div>
            </div>
            <div className="flex items-center bg-white text-black bg-opacity-20 p-4 rounded-lg">
              <div className="mr-4 text-3xl">🔒</div>
              <div>
                <h3 className="font-bold">Secure Platform</h3>
                <p className="text-sm">Your data and transactions are always protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          {/* Mobile Logo - Only visible on small screens */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div className="w-20 h-20 rounded-full bg-orange-600 flex items-center justify-center mb-2">
              <span className="text-3xl text-white">🏏</span>
            </div>
            <h1 className="text-2xl font-bold text-orange-600">Saffron Exch</h1>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 py-3 bg-gray-50 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 py-3 bg-gray-50 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={remember} 
                    onCheckedChange={() => setRemember(!remember)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm font-medium text-orange-600 hover:text-orange-800">
                  Forgot password?
                </a>
              </div>

              {error && <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded">{error}</p>}

              <Button 
                type="submit" 
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg"
              >
                Login to Dashboard
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or contact support</span>
                </div>
              </div>

              <div className="mt-6">
                <a href="tel:+911234589623" className="flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Phone className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-gray-700">+91-1234589623</span>
                </a>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            © 2025 Saffron Exch. All rights reserved. |{" "}
            <a href="#" className="text-orange-600 hover:text-orange-800">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;