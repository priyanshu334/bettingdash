"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Phone, Wallet, Calendar,  Users, Loader2, AlertCircle, ChevronRight } from "lucide-react";

interface User {
  _id: string;
  fullName: string;
  phone: string;
  money: number;
  totalBets: number;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://backend.nurdcells.com/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user => 
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.phone.includes(searchTerm) ||
        user._id.includes(searchTerm)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleUserClick = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-700 flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-orange-600 animate-spin mb-4" />
          <p className="text-gray-800 font-semibold">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-700 flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center">
          <AlertCircle className="h-12 w-12 text-red-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Error</h3>
          <p className="text-gray-600">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-700 text-white w-full p-4">
      {/* Cricket ball pattern overlay */}
      <div 
        className="absolute inset-0 bg-repeat opacity-5 pointer-events-none" 
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"1\"><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/><path d=\"M14.5 9.5L12 12m0 0L9.5 14.5m2.5-2.5l2.5 2.5m-5 0L12 12\"/></svg>')" }}
      />

      <div className="max-w-7xl mx-auto">
        <Card className="rounded-xl shadow-2xl overflow-hidden border-0 bg-white text-gray-800 relative">
          {/* IPL-style header stripe */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500"></div>

          <div className="p-4 md:p-6">
            {/* Title with IPL-style flair */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <Users className="h-8 w-8 mr-3" />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Registered Users</h1>
                  <p className="text-orange-100 text-sm md:text-base">
                    Total {filteredUsers.length} of {users.length} users
                  </p>
                </div>
              </div>
              <div className="relative w-full md:w-64">
                <Input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 border-none text-gray-800 rounded-lg focus:ring-2 focus:ring-white"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              </div>
            </div>

            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user._id}
                      onClick={() => handleUserClick(user._id)}
                      className="bg-gradient-to-br from-orange-50 to-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] border border-orange-200"
                    >
                      <div className="h-3 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                              <User className="h-5 w-5 text-orange-600" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800 truncate max-w-[120px]">
                              {user.fullName}
                            </h2>
                          </div>
                          <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded-full">
                            {user._id.slice(-6)}
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-2 text-orange-500" />
                            <span className="text-sm">{user.phone}</span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <Wallet className="w-4 h-4 mr-2 text-orange-500" />
                            <span className="text-sm font-medium">₹{user.money.toFixed(2)}</span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            
                            <span className="text-sm">{user.totalBets} bets placed</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-orange-100">
                          <div className="flex items-center text-gray-500 text-xs">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>Joined: {formatDate(user.createdAt)}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-orange-500" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
                    <Search className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700">No users found</h3>
                    <p className="text-sm">Try a different search term</p>
                  </div>
                )}
              </div>
            </CardContent>

            {/* IPL-style footer */}
            <div className="mt-8 pt-4 border-t border-orange-100 text-center">
              <p className="text-xs text-gray-500">IPL Fan League • User Management</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}