"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, Lock, Gift, DollarSign, Fingerprint, AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";

export default function AddMemberForm() {
  const [formData, setFormData] = useState({
    memberId: "",
    fullName: "",
    phone: "",
    password: "",
    referralCode: "",
    money: "", 
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("https://backend.nurdcells.com/api/members/signup", {
        memberId: formData.memberId,
        fullName: formData.fullName,
        phone: formData.phone,
        password: formData.password,
        referralCode: formData.referralCode,
        money: formData.money || "0",
      });

      setMessage(res.data.message || "Member added successfully!");
      setIsError(false);
      setFormData({
        memberId: "",
        fullName: "",
        phone: "",
        password: "",
        referralCode: "",
        money: "",
      });
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to add member";
      setMessage(errorMsg);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-700 text-white w-full p-4">
      {/* Cricket ball pattern overlay */}
      <div className="absolute inset-0 bg-repeat opacity-5 pointer-events-none" 
           style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"1\"><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/><path d=\"M14.5 9.5L12 12m0 0L9.5 14.5m2.5-2.5l2.5 2.5m-5 0L12 12\"/></svg>')" }} />

      <div className="max-w-md mx-auto relative">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-orange-100 rounded-full p-2 mb-2">
            <span className="text-3xl">🏏</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Saffron Exch</h1>
        </div>
        
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 p-5 rounded-t-lg">
            <CardTitle className="text-xl font-bold text-white flex items-center">
              <User size={20} className="mr-2" /> Add New Member
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {/* Status banner */}
            {message && (
              <div className={`mb-6 p-3 rounded-lg flex items-center ${
                isError ? "bg-red-50 text-red-700 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"
              }`}>
                {isError ? 
                  <AlertCircle size={18} className="mr-2 flex-shrink-0" /> : 
                  <CheckCircle size={18} className="mr-2 flex-shrink-0" />
                }
                <p className="text-sm">{message}</p>
              </div>
            )}
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Fingerprint size={16} className="mr-2 text-orange-500" /> 
                  Member ID
                </label>
                <div className="relative">
                  <Input 
                    name="memberId" 
                    placeholder="Enter unique ID (e.g. IPL2025)" 
                    value={formData.memberId} 
                    onChange={handleChange}
                    className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Fingerprint size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <User size={16} className="mr-2 text-orange-500" />
                  Full Name
                </label>
                <div className="relative">
                  <Input 
                    name="fullName" 
                    placeholder="Enter member's full name" 
                    value={formData.fullName} 
                    onChange={handleChange}
                    className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Phone size={16} className="mr-2 text-orange-500" />
                  Phone Number <span className="text-xs text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Input 
                    name="phone" 
                    placeholder="Enter 10-digit mobile number" 
                    type="tel" 
                    value={formData.phone} 
                    onChange={handleChange}
                    className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Lock size={16} className="mr-2 text-orange-500" />
                  Password
                </label>
                <div className="relative">
                  <Input 
                    name="password" 
                    placeholder="Create a secure password" 
                    type="password" 
                    value={formData.password} 
                    onChange={handleChange}
                    className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Gift size={16} className="mr-2 text-orange-500" />
                  Referral Code <span className="text-xs text-gray-500 ml-1">(Optional)</span>
                </label>
                <div className="relative">
                  <Input 
                    name="referralCode" 
                    placeholder="Enter referral code if available" 
                    value={formData.referralCode} 
                    onChange={handleChange}
                    className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Gift size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <DollarSign size={16} className="mr-2 text-orange-500" />
                  Initial Balance <span className="text-xs text-gray-500 ml-1">(Optional)</span>
                </label>
                <div className="relative">
                  <Input 
                    name="money" 
                    placeholder="Enter initial account balance" 
                    type="number" 
                    value={formData.money} 
                    onChange={handleChange}
                    className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 rounded-lg" 
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Member...
                    </span>
                  ) : (
                    "Add Member"
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-orange-600 mr-1">🏏</span>
                  <span className="text-sm font-medium text-orange-600">IPL 2025</span>
                </div>
                <span className="text-xs text-gray-500">Season 18</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <p className="mt-4 text-center text-xs text-white">
          © 2025 Saffron Exch. All rights reserved.
        </p>
      </div>
    </div>
  );
}