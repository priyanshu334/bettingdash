"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ArrowRight, Wallet, RefreshCw, CheckCircle, X, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

interface TransactionResponse {
  message: string;
  newBalance?: number;
  error?: string;
}

export default function MoneyTransaction(): React.ReactElement {
  const router = useRouter();
  const [phone, setPhone] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [transactionDetails, setTransactionDetails] = useState<{
    amount: number;
    newBalance: number;
  } | null>(null);

  const handleAddMoney = async (): Promise<void> => {
    setIsProcessing(true);

    if (!phone || !/^\d{10}$/.test(phone)) {
      toast.error("Invalid Phone Number", {
        description: "Please enter a valid 10-digit phone number",
      });
      setIsProcessing(false);
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Invalid Amount", {
        description: "Please enter a positive amount",
      });
      setIsProcessing(false);
      return;
    }

    try {
      toast.promise(
        fetch("https://backend.nurdcells.com/api/users/add-money", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, amount: numericAmount }),
        }).then(async (response) => {
          const data: TransactionResponse = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Failed to add money");
          }

          // Store transaction details for the popup
          setTransactionDetails({
            amount: numericAmount,
            newBalance: data.newBalance || 0,
          });
          
          // Show success popup
          setShowSuccessPopup(true);

          setPhone("");
          setAmount("");
          return data;
        }),
        {
          loading: "Processing transaction...",
          success: () => "Money added successfully!",
          error: (error) => error.message || "Transaction failed",
        }
      );
    } catch (error) {
      console.error("Add Money Error:", error);
      toast.error("Transaction Failed", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-700 text-white w-full p-4">
      {/* Cricket ball pattern overlay */}
      <div className="absolute inset-0 bg-repeat opacity-5 pointer-events-none" 
           style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"1\"><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/><path d=\"M14.5 9.5L12 12m0 0L9.5 14.5m2.5-2.5l2.5 2.5m-5 0L12 12\"/></svg>')" }} />

      {/* Success Popup */}
      {showSuccessPopup && transactionDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-fade-in relative">
            <button 
              onClick={closeSuccessPopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex flex-col items-center mb-4">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Howzat! Money Added!</h2>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-2">Your transaction was successful</p>
              <p className="text-xl font-semibold text-orange-600 mb-1">
                ₹{transactionDetails.amount.toFixed(2)} Added
              </p>
              <p className="text-green-600 font-medium">
                New Balance: ₹{transactionDetails.newBalance.toFixed(2)}
              </p>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              onClick={closeSuccessPopup}
            >
              Done
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-6 mt-8 relative overflow-hidden">
        {/* IPL-style header stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500"></div>

        {/* Top Navigation Buttons */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            onClick={() => router.push("/money")}
            className="text-orange-600 border-orange-300 hover:bg-orange-50 hover:text-orange-700 font-medium"
          >
            Add Money
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/withdraw")}
            className="text-orange-600 border-orange-300 hover:bg-orange-50 hover:text-orange-700 font-medium"
          >
            Withdraw Money
          </Button>
        </div>

        {/* Title with IPL-style flair */}
        <div className="flex items-center justify-between mb-8 p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-white">
            Add Money
          </h1>
          <Wallet className="text-white h-8 w-8" />
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder="Enter 10-digit phone number"
            className="bg-gray-50 border border-orange-200 text-gray-800 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            pattern="\d{10}"
            required
          />
        </div>

        {/* Amount */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            Amount (₹)
          </label>
          <Input
            type="number"
            placeholder="Enter amount"
            min="1"
            className="bg-gray-50 border border-orange-200 text-gray-800 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          onClick={handleAddMoney}
          disabled={isProcessing || !phone || !amount}
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Add Money
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>

        {/* Back Button */}
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full text-orange-600 hover:text-orange-700 border-orange-300 hover:bg-orange-50 flex items-center justify-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* IPL-style footer */}
        <div className="mt-8 pt-4 border-t border-orange-100 text-center">
          <p className="text-xs text-gray-500">IPL Fan League • Secure Transactions</p>
        </div>
      </div>
    </div>
  );
}