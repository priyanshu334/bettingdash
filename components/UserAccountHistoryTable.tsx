"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpCircle, ArrowDownCircle, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Define TypeScript interfaces
interface Transaction {
  type: string;
  amount: number;
  createdAt: string;
}

interface UserAccount {
  userId: string;
  fullName: string;
  phone: string;
  transaction: Transaction;
}

export default function UserAccountHistoryTable(): React.ReactElement {
  const [data, setData] = useState<UserAccount[]>([]);
  const [filteredData, setFilteredData] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    axios.get<UserAccount[]>("https://backend.nurdcells.com/api/users/account-history")
      .then(res => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const results = data.filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getTransactionIcon = (type: string): React.ReactNode => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('credit') || lowerType.includes('deposit')) {
      return <ArrowUpCircle className="text-green-500 w-5 h-5" />;
    } else if (lowerType.includes('debit') || lowerType.includes('withdrawal')) {
      return <ArrowDownCircle className="text-red-500 w-5 h-5" />;
    }
    return <Clock className="text-blue-500 w-5 h-5" />;
  };

  const getTransactionBadge = (type: string): React.ReactNode => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('credit') || lowerType.includes('deposit')) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{type}</Badge>;
    } else if (lowerType.includes('debit') || lowerType.includes('withdrawal')) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{type}</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{type}</Badge>;
  };

  const getAmountColor = (type: string): string => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('credit') || lowerType.includes('deposit')) {
      return "text-green-600 font-medium";
    } else if (lowerType.includes('debit') || lowerType.includes('withdrawal')) {
      return "text-red-600 font-medium";
    }
    return "text-gray-800 font-medium";
  };

  if (loading) {
    return (
      <Card className="mt-6 shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 shadow-lg border-0">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">User Account History</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto rounded-lg">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">User ID</TableHead>
                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                <TableHead className="font-semibold text-gray-600">Phone</TableHead>
                <TableHead className="font-semibold text-gray-600">Type</TableHead>
                <TableHead className="font-semibold text-gray-600">Amount</TableHead>
                <TableHead className="font-semibold text-gray-600">Date & Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((entry, index) => (
                  <TableRow 
                    key={index} 
                    className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <TableCell className="font-medium text-gray-700">{entry.userId}</TableCell>
                    <TableCell className="font-medium">{entry.fullName}</TableCell>
                    <TableCell>{entry.phone}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTransactionIcon(entry.transaction.type)}
                        {getTransactionBadge(entry.transaction.type)}
                      </div>
                    </TableCell>
                    <TableCell className={getAmountColor(entry.transaction.type)}>
                      ₹{entry.transaction.amount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {formatDate(entry.transaction.createdAt)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}