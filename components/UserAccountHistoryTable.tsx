"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

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

export default function UserAccountHistoryTable() {
  const [data, setData] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("backend.nurdcells.com/api/users/account-history") // replace with your actual API endpoint
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-4">Loading...</p>;

  return (
    <Card className="mt-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">User Account History</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.userId}</TableCell>
                  <TableCell>{entry.fullName}</TableCell>
                  <TableCell>{entry.phone}</TableCell>
                  <TableCell>{entry.transaction.type}</TableCell>
                  <TableCell>₹{entry.transaction.amount}</TableCell>
                  <TableCell>{new Date(entry.transaction.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
