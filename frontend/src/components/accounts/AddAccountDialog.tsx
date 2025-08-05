import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Account {
  id: string
  name: string
  type: "checking" | "savings" | "investment" | "credit"
  balance: number
  currency: string
  interestRate?: number
  institution: string
  lastUpdated: string
}

interface AddAccountDialogProps {
  onAddAccount: (account: Omit<Account, "id" | "lastUpdated">) => void
}

export default function AddAccountDialog({ onAddAccount }: AddAccountDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "checking" as "checking" | "savings" | "investment" | "credit",
    balance: "",
    currency: "USD",
    interestRate: "",
    institution: "",
  })

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.balance || !newAccount.institution) return

    onAddAccount({
      name: newAccount.name,
      type: newAccount.type,
      balance: Number.parseFloat(newAccount.balance),
      currency: newAccount.currency,
      interestRate: newAccount.interestRate ? Number.parseFloat(newAccount.interestRate) : undefined,
      institution: newAccount.institution,
    })

    setNewAccount({
      name: "",
      type: "checking",
      balance: "",
      currency: "USD",
      interestRate: "",
      institution: "",
    })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Account Name</Label>
            <Input
              id="name"
              value={newAccount.name}
              onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              placeholder="e.g., Main Checking"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Account Type</Label>
            <Select
              value={newAccount.type}
              onValueChange={(value) => setNewAccount({ ...newAccount, type: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="credit">Credit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="balance">Balance</Label>
            <Input
              id="balance"
              type="number"
              value={newAccount.balance}
              onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
              placeholder="0.00"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="institution">Institution</Label>
            <Input
              id="institution"
              value={newAccount.institution}
              onChange={(e) => setNewAccount({ ...newAccount, institution: e.target.value })}
              placeholder="e.g., Chase Bank"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="interestRate">Interest Rate (optional)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.01"
              value={newAccount.interestRate}
              onChange={(e) => setNewAccount({ ...newAccount, interestRate: e.target.value })}
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddAccount}>Add Account</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
