
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface LowStockAlertProps {
  items: Item[];
}

export function LowStockAlert({ items }: LowStockAlertProps) {
  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-success" />
            Stock Status
          </CardTitle>
          <CardDescription>All items have sufficient stock</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-warning" />
          Low Stock Alert
        </CardTitle>
        <CardDescription>
          {items.length} {items.length === 1 ? "item" : "items"} running low
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">
                  {formatCurrency(item.sellingPrice)}
                </div>
              </div>
              <Badge variant={item.quantity <= 5 ? "destructive" : "default"} className="ml-auto">
                {item.quantity} left
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
