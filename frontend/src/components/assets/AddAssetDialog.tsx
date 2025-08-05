import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

interface Asset {
  id: string;
  name: string;
  type: "real_estate" | "vehicle" | "investment" | "fixed_deposit" | "other";
  currentValue: number;
  purchasePrice: number;
  purchaseDate: string;
  currency: string;
  description?: string;
  appreciationRate?: number;
  lastUpdated: string;
}

interface AddAssetDialogProps {
  onAddAsset: (asset: Omit<Asset, "id" | "lastUpdated">) => void;
}

const assetTypeOptions = [
  { value: "real_estate", label: "Real Estate" },
  { value: "vehicle", label: "Vehicle" },
  { value: "investment", label: "Investment" },
  { value: "fixed_deposit", label: "Fixed Deposit" },
  { value: "other", label: "Other" },
];

export default function AddAssetDialog({ onAddAsset }: AddAssetDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "" as Asset["type"],
    currentValue: "",
    purchasePrice: "",
    purchaseDate: "",
    currency: "USD",
    description: "",
    appreciationRate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Asset name is required";
    }

    if (!formData.type) {
      newErrors.type = "Asset type is required";
    }

    if (!formData.currentValue || parseFloat(formData.currentValue) <= 0) {
      newErrors.currentValue = "Current value must be greater than 0";
    }

    if (!formData.purchasePrice || parseFloat(formData.purchasePrice) <= 0) {
      newErrors.purchasePrice = "Purchase price must be greater than 0";
    }

    if (!formData.purchaseDate) {
      newErrors.purchaseDate = "Purchase date is required";
    }

    if (formData.appreciationRate && (parseFloat(formData.appreciationRate) < -100 || parseFloat(formData.appreciationRate) > 1000)) {
      newErrors.appreciationRate = "Appreciation rate must be between -100% and 1000%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const assetData = {
      name: formData.name.trim(),
      type: formData.type,
      currentValue: parseFloat(formData.currentValue),
      purchasePrice: parseFloat(formData.purchasePrice),
      purchaseDate: formData.purchaseDate,
      currency: formData.currency,
      description: formData.description.trim() || undefined,
      appreciationRate: formData.appreciationRate ? parseFloat(formData.appreciationRate) : undefined,
    };

    onAddAsset(assetData);
    
    // Reset form
    setFormData({
      name: "",
      type: "" as Asset["type"],
      currentValue: "",
      purchasePrice: "",
      purchaseDate: "",
      currency: "USD",
      description: "",
      appreciationRate: "",
    });
    setErrors({});
    setOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      type: "" as Asset["type"],
      currentValue: "",
      purchasePrice: "",
      purchaseDate: "",
      currency: "USD",
      description: "",
      appreciationRate: "",
    });
    setErrors({});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Asset
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Asset</DialogTitle>
          <DialogDescription>
            Enter the details of your new asset. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Asset Name *</Label>
              <Input
                id="name"
                placeholder="e.g. Family Home, Tesla Model 3"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Asset Type *</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {assetTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentValue">Current Value *</Label>
              <Input
                id="currentValue"
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 250000"
                value={formData.currentValue}
                onChange={(e) => handleInputChange("currentValue", e.target.value)}
                className={errors.currentValue ? "border-red-500" : ""}
              />
              {errors.currentValue && (
                <p className="text-sm text-red-500">{errors.currentValue}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Purchase Price *</Label>
              <Input
                id="purchasePrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 200000"
                value={formData.purchasePrice}
                onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
                className={errors.purchasePrice ? "border-red-500" : ""}
              />
              {errors.purchasePrice && (
                <p className="text-sm text-red-500">{errors.purchasePrice}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date *</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => handleInputChange("purchaseDate", e.target.value)}
                className={errors.purchaseDate ? "border-red-500" : ""}
              />
              {errors.purchaseDate && (
                <p className="text-sm text-red-500">{errors.purchaseDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="appreciationRate">Appreciation Rate (%)</Label>
              <Input
                id="appreciationRate"
                type="number"
                step="0.1"
                min="-100"
                max="1000"
                placeholder="e.g. 5.5"
                value={formData.appreciationRate}
                onChange={(e) => handleInputChange("appreciationRate", e.target.value)}
                className={errors.appreciationRate ? "border-red-500" : ""}
              />
              {errors.appreciationRate && (
                <p className="text-sm text-red-500">{errors.appreciationRate}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Additional details about the asset..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Asset
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
