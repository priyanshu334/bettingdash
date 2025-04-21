"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, History, ChevronLeft, ChevronRight, Trophy, XCircle, RefreshCw, Clock } from "lucide-react";

const BetHistory = () => {
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const data = [
    { id: "Abc102", sport: "Cricket", event: "IPL 2025", option: "Mumbai Indians win", amount: "1,000", status: "Current" },
    { id: "Def456", sport: "Cricket", event: "IPL 2025", option: "Chennai Super Kings win", amount: "500", status: "Won" },
    { id: "Ghi789", sport: "Cricket", event: "IPL 2025", option: "Top Scorer: Virat Kohli", amount: "300", status: "Lost" },
    { id: "Jkl012", sport: "Cricket", event: "IPL 2025", option: "Total Runs Over 180", amount: "750", status: "Refunded" }
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const filteredData = data.filter((item) => 
    item.id.toLowerCase().includes(searchId.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'won': return <Trophy className="h-4 w-4" />;
      case 'lost': return <XCircle className="h-4 w-4" />;
      case 'refunded': return <RefreshCw className="h-4 w-4" />;
      case 'current': return <Clock className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'won': return "bg-green-100 text-green-700 border-green-200";
      case 'lost': return "bg-red-100 text-red-700 border-red-200";
      case 'refunded': return "bg-blue-100 text-blue-700 border-blue-200";
      case 'current': return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-700 text-white w-full p-4">
      {/* Cricket ball pattern overlay */}
      <div 
        className="absolute inset-0 bg-repeat opacity-5 pointer-events-none" 
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"1\"><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/><path d=\"M14.5 9.5L12 12m0 0L9.5 14.5m2.5-2.5l2.5 2.5m-5 0L12 12\"/></svg>')" }}
      />

      <div className="max-w-5xl mx-auto">
        <Card className="rounded-xl shadow-2xl overflow-hidden border-0 bg-white text-gray-800 relative">
          {/* IPL-style header stripe */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500"></div>

          <CardHeader className="p-0">
            {/* Title with IPL-style flair */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md">
              <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <History className="h-6 w-6 md:h-8 md:w-8" />
                Bet History
              </CardTitle>
              <p className="text-orange-100 text-xs md:text-sm">Track your betting journey</p>
            </div>
          </CardHeader>

          <CardContent className="p-4 md:p-6">
            <div className="relative w-full max-w-md mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search by ID..." 
                value={searchId} 
                onChange={handleSearchChange} 
                className="pl-10 bg-gray-50 border border-orange-200 text-gray-800 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-orange-200 shadow">
              <Table className="w-full">
                <TableHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                  <TableRow className="border-b-0">
                    <TableHead className="px-3 py-3 text-sm font-semibold text-white">ID</TableHead>
                    <TableHead className="px-3 py-3 text-sm font-semibold text-white">Sports</TableHead>
                    <TableHead className="px-3 py-3 text-sm font-semibold text-white hidden sm:table-cell">Event</TableHead>
                    <TableHead className="px-3 py-3 text-sm font-semibold text-white hidden md:table-cell">Option</TableHead>
                    <TableHead className="px-3 py-3 text-sm font-semibold text-white">Amount</TableHead>
                    <TableHead className="px-3 py-3 text-sm font-semibold text-white">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-orange-100">
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item, index) => (
                      <TableRow 
                        key={index} 
                        className={`${index % 2 === 0 ? 'bg-orange-50' : 'bg-white'} hover:bg-orange-100 transition-colors`}
                      >
                        <TableCell className="px-3 py-3 text-sm font-medium text-orange-800">{item.id}</TableCell>
                        <TableCell className="px-3 py-3 text-sm text-gray-700">{item.sport}</TableCell>
                        <TableCell className="px-3 py-3 text-sm text-gray-700 hidden sm:table-cell">{item.event}</TableCell>
                        <TableCell className="px-3 py-3 text-sm text-gray-700 hidden md:table-cell">{item.option}</TableCell>
                        <TableCell className="px-3 py-3 text-sm font-medium text-gray-900">₹{item.amount}</TableCell>
                        <TableCell className="px-3 py-3 text-sm">
                          <div className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            {item.status}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="px-4 py-8 text-center text-gray-500 text-sm">
                        No records found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <Button 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                disabled={currentPage === 1}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Previous
              </Button>
              
              <div className="flex items-center justify-center space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                      currentPage === page 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                        : 'bg-white text-orange-700 border border-orange-200 hover:bg-orange-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <Button 
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                disabled={currentPage === totalPages}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </div>

            {/* IPL-style footer */}
            <div className="mt-8 pt-4 border-t border-orange-100 text-center">
              <p className="text-xs text-gray-500">IPL Fan League • Bet History</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BetHistory;