"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, User, Phone, Lock, Gift, ArrowLeft, Loader2 } from "lucide-react";

export default function AddPlayerForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    referralCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
  
    try {
      const response = await fetch("https://backend.nurdcells.com/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
  
      setSuccess("Player added successfully!");
      setFormData({ fullName: "", phone: "", password: "", referralCode: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-700 text-white w-full p-4">
      {/* Cricket ball pattern overlay */}
      <div 
        className="absolute inset-0 bg-repeat opacity-5 pointer-events-none" 
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"1\"><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/><path d=\"M14.5 9.5L12 12m0 0L9.5 14.5m2.5-2.5l2.5 2.5m-5 0L12 12\"/></svg>')" }}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <Card className="shadow-2xl border-0 overflow-hidden rounded-xl">
          {/* IPL-style header stripe */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500"></div>
          
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 border-b pb-5">
            <CardTitle className="text-xl text-white flex items-center">
              <User size={20} className="mr-2" /> Player Registration Form
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6 px-6 bg-white text-gray-800">
            {/* IPL Season Info Banner */}
            <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center">
              <div className="mr-4 bg-orange-100 rounded-full p-2">
                <span className="text-2xl">🏏</span>
              </div>
              <div>
                <h3 className="font-semibold text-orange-800">IPL 2025 Registration</h3>
                <p className="text-sm text-orange-600">Add players to participate in the upcoming IPL season</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <User size={16} className="mr-2 text-orange-500" />
                  Full Name
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter player's full name"
                    required
                    className="w-full pl-10 py-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Phone size={16} className="mr-2 text-orange-500" />
                  Phone Number
                </label>
                <div className="relative">
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit mobile number"
                    required
                    className="w-full pl-10 py-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
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
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a secure password"
                    required
                    className="w-full pl-10 py-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Gift size={16} className="mr-2 text-orange-500" />
                  Referral Code (Optional)
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleChange}
                    placeholder="Enter referral code if available"
                    className="w-full pl-10 py-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Gift size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Error and success messages */}
              {error && (
                <div className="flex items-center text-red-600 text-sm p-3 bg-red-50 rounded-lg border border-red-100">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              
              {success && (
                <div className="flex items-center text-green-600 text-sm p-3 bg-green-50 rounded-lg border border-green-100">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p>{success}</p>
                </div>
              )}

              <div className="pt-6 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto order-2 sm:order-1 flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium w-full sm:w-auto order-1 sm:order-2" 
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                      Adding Player...
                    </span>
                  ) : (
                    <span>Add Player</span>
                  )}
                </Button>
              </div>
            </form>
            
            {/* IPL-style footer */}
            <div className="mt-8 pt-4 border-t border-orange-100 text-center">
              <p className="text-xs text-gray-500">IPL Fan League • Player Management</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}