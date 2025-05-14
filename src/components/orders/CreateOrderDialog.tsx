
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Item, OrderItem, Order } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { mockItems } from "@/lib/mockData";

interface CreateOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (order: Order) => void;
}

export function CreateOrderDialog({
  open,
  onOpenChange,
  onSave,
}: CreateOrderDialogProps) {
  const { toast } = useToast();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  
  // Reset form when dialog opens/closes
  const resetForm = () => {
    setOrderItems([]);
  };
  
  // Calculate order totals
  const totalAmount = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalCost = orderItems.reduce((sum, item) => sum + (item.purchasePrice * item.quantity), 0);
  const profit = totalAmount - totalCost;
  
  const handleAddItem = () => {
    setOrderItems([
      ...orderItems,
      {
        itemId: "",
        itemName: "",
        quantity: 1,
        purchasePrice: 0,
        sellingPrice: 0,
        totalPrice: 0,
      },
    ]);
  };
  
  const handleRemoveItem = (index: number) => {
    const newItems = [...orderItems];
    newItems.splice(index, 1);
    setOrderItems(newItems);
  };
  
  const handleItemChange = (index: number, itemId: string) => {
    const selectedItem = mockItems.find((item) => item.id === itemId);
    
    if (selectedItem) {
      const newItems = [...orderItems];
      newItems[index] = {
        itemId: selectedItem.id,
        itemName: selectedItem.name,
        quantity: 1,
        purchasePrice: selectedItem.purchasePrice,
        sellingPrice: selectedItem.sellingPrice,
        totalPrice: selectedItem.sellingPrice,
      };
      setOrderItems(newItems);
    }
  };
  
  const handleQuantityChange = (index: number, quantity: number) => {
    const newItems = [...orderItems];
    newItems[index].quantity = quantity;
    newItems[index].totalPrice = quantity * newItems[index].sellingPrice;
    setOrderItems(newItems);
  };
  
  const handleSave = () => {
    if (orderItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one item to the order",
        variant: "destructive",
      });
      return;
    }
    
    // Check if all items have valid data
    const invalidItem = orderItems.find(item => !item.itemId || item.quantity <= 0);
    if (invalidItem) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Create new order
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: orderItems,
      totalAmount,
      totalCost,
      profit,
      date: new Date(),
    };
    
    onSave(newOrder);
    resetForm();
    onOpenChange(false);
    
    toast({
      title: "Order Created",
      description: `Order #${newOrder.id} has been created successfully.`,
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetForm();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[600px] w-[95%] max-w-[95%] sm:w-full">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>
            Add items to create a new sales order
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4 max-h-[60vh] overflow-y-auto p-1">
          {orderItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No items added yet. Click "Add Item" below to start.
            </div>
          ) : (
            orderItems.map((item, index) => (
              <Card key={index} className="border border-border">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <Label className="text-sm font-medium">Item {index + 1}</Label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid gap-3">
                    <div className="grid grid-cols-1">
                      <Label htmlFor={`item-${index}`} className="text-xs mb-1">
                        Product
                      </Label>
                      <Select
                        value={item.itemId}
                        onValueChange={(value) => handleItemChange(index, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an item" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockItems.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} ({formatCurrency(product.sellingPrice)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`quantity-${index}`} className="text-xs mb-1">
                          Quantity
                        </Label>
                        <Input
                          id={`quantity-${index}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`price-${index}`} className="text-xs mb-1">
                          Price
                        </Label>
                        <div className="h-10 px-3 py-2 border rounded-md flex items-center">
                          {formatCurrency(item.sellingPrice)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-2 font-medium">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(item.totalPrice)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleAddItem}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
        
        {orderItems.length > 0 && (
          <div className="pt-4 border-t space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Total Amount:</span>
              <span className="font-medium">{formatCurrency(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-success">
              <span className="font-medium">Estimated Profit:</span>
              <span className="font-medium">{formatCurrency(profit)}</span>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => {
            resetForm();
            onOpenChange(false);
          }}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Create Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
