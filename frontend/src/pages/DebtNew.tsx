import { useState } from "react";
import DebtSummary from "../components/debt/DebtSummary";
import DebtTable from "../components/debt/DebtTable";
import AddDebtDialog from "../components/debt/AddDebtDialog";

// Mock data
const mockDebts = [
  {
    id: "1",
    name: "Credit Card",
    type: "credit_card" as const,
    currentBalance: 5000,
    originalAmount: 8000,
    interestRate: 19.99,
    minimumPayment: 150,
    dueDate: "2024-01-15",
    currency: "USD",
    lender: "Chase Bank",
    description: "Main credit card",
    lastUpdated: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    name: "Auto Loan",
    type: "auto_loan" as const,
    currentBalance: 25000,
    originalAmount: 35000,
    interestRate: 4.5,
    minimumPayment: 450,
    dueDate: "2024-01-20",
    currency: "USD",
    lender: "Toyota Financial",
    description: "2022 Toyota Camry",
    lastUpdated: "2024-01-01T00:00:00Z"
  },
  {
    id: "3",
    name: "Student Loan",
    type: "student_loan" as const,
    currentBalance: 35000,
    originalAmount: 45000,
    interestRate: 6.8,
    minimumPayment: 380,
    dueDate: "2024-01-10",
    currency: "USD",
    lender: "Federal Loan",
    description: "Graduate school loan",
    lastUpdated: "2024-01-01T00:00:00Z"
  }
];

interface Debt {
  id: string;
  name: string;
  type: "credit_card" | "mortgage" | "auto_loan" | "student_loan" | "personal_loan" | "other";
  currentBalance: number;
  originalAmount: number;
  interestRate: number;
  minimumPayment: number;
  dueDate: string;
  currency: string;
  lender: string;
  description?: string;
  lastUpdated: string;
}

export default function Debt() {
  const [debts, setDebts] = useState<Debt[]>(mockDebts);

  const handleAddDebt = (debtData: Omit<Debt, "id" | "lastUpdated">) => {
    const newDebt: Debt = {
      ...debtData,
      id: (debts.length + 1).toString(),
      lastUpdated: new Date().toISOString(),
    };
    setDebts([...debts, newDebt]);
  };

  const handleEditDebt = (debt: Debt) => {
    // TODO: Implement edit functionality
    console.log("Edit debt:", debt);
  };

  const handleDeleteDebt = (debtId: string) => {
    setDebts(debts.filter(debt => debt.id !== debtId));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Debt Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track and manage your debts to accelerate payoff
          </p>
        </div>
        
        <AddDebtDialog onAddDebt={handleAddDebt} />
      </div>

      <DebtSummary debts={debts} />

      <DebtTable 
        debts={debts}
        onEdit={handleEditDebt}
        onDelete={handleDeleteDebt}
      />
    </div>
  );
}
