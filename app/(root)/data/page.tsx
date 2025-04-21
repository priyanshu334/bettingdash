"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, Database, TrendingUp, TrendingDown } from "lucide-react";

const data = [
  { id: "Abc102", deposit: "1,000", bet: "500", withdraw: "1000", holding: "1,000", status: "Profit" },
  { id: "Abc102", deposit: "5,000", bet: "500", withdraw: "1000", holding: "1,000", status: "Loss" },
  { id: "Xyz456", deposit: "2,500", bet: "1,200", withdraw: "500", holding: "3,200", status: "Profit" },
  { id: "Pqr789", deposit: "3,000", bet: "2,000", withdraw: "0", holding: "1,000", status: "Loss" },
];

export default function DataTable() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Filter based on search and active tab
  const filteredData = data.filter((row) => {
    const matchesSearch = row.id.toLowerCase().includes(search.toLowerCase());
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "profit" && row.status === "Profit") ||
      (activeTab === "loss" && row.status === "Loss");
    
    return matchesSearch && matchesTab;
  });

  // Pagination
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-700 text-white w-full p-4">
      {/* Cricket ball pattern overlay */}
      <div 
        className="absolute inset-0 bg-repeat opacity-5 pointer-events-none" 
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"1\"><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/><path d=\"M14.5 9.5L12 12m0 0L9.5 14.5m2.5-2.5l2.5 2.5m-5 0L12 12\"/></svg>')" }}
      />

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-6 mt-8 text-gray-800 relative">
        {/* IPL-style header stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500"></div>

        {/* Title with IPL-style flair */}
        <div className="flex items-center justify-between mb-6 p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Transaction History
          </h1>
          <Database className="text-white h-6 w-6 md:h-8 md:w-8" />
        </div>

        {/* Search and Tabs in one row on larger screens */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Input
              type="text"
              placeholder="Search by ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-gray-50 border border-orange-200 text-gray-800 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 w-full md:w-auto">
            <Button 
              variant={activeTab === "all" ? "default" : "outline"}
              onClick={() => setActiveTab("all")}
              className={activeTab === "all" 
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white" 
                : "text-orange-600 border-orange-300 hover:bg-orange-50"}
            >
              All IDs
            </Button>
            <Button 
              variant={activeTab === "profit" ? "default" : "outline"}
              onClick={() => setActiveTab("profit")}
              className={activeTab === "profit" 
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white" 
                : "text-green-600 border-green-300 hover:bg-green-50"}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              Profit
            </Button>
            <Button 
              variant={activeTab === "loss" ? "default" : "outline"}
              onClick={() => setActiveTab("loss")}
              className={activeTab === "loss" 
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white" 
                : "text-red-600 border-red-300 hover:bg-red-50"}
            >
              <TrendingDown className="h-4 w-4 mr-1" />
              Loss
            </Button>
          </div>
        </div>

        {/* Table Wrapper for Horizontal Scroll */}
        <div className="overflow-x-auto rounded-lg shadow border border-orange-200">
          <table className="min-w-full w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-orange-600 to-orange-700 text-white text-sm md:text-base">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-right">Amount Deposit</th>
                <th className="p-3 text-right">Amount on Bet</th>
                <th className="p-3 text-right">Withdrawal</th>
                <th className="p-3 text-right">Amount Holding</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`${index % 2 === 0 ? 'bg-orange-50' : 'bg-white'} hover:bg-orange-100 transition-colors text-sm md:text-base`}
                  >
                    <td className="p-3 font-medium text-orange-800">{row.id}</td>
                    <td className="p-3 text-right">₹{row.deposit}</td>
                    <td className="p-3 text-right">₹{row.bet}</td>
                    <td className="p-3 text-right">₹{row.withdraw}</td>
                    <td className="p-3 text-right">₹{row.holding}</td>
                    <td className="p-3">
                      <div className={`flex items-center justify-center gap-1 rounded-full py-1 px-3 font-medium text-sm ${
                        row.status === "Profit" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {row.status === "Profit" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {row.status}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </Button>
          
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {Math.max(1, totalPages)}
          </span>
          
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage >= totalPages}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 disabled:opacity-50"
          >
            Next
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>

        {/* IPL-style footer */}
        <div className="mt-8 pt-4 border-t border-orange-100 text-center">
          <p className="text-xs text-gray-500">IPL Fan League • Transaction History</p>
        </div>
      </div>
    </div>
  );
}