
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Order } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

export function OrderDialog({ open, onOpenChange, order }: OrderDialogProps) {
  const isMobile = useIsMobile();

  if (!order) return null;

  // Calculate totals
  const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] w-[95%] max-w-[95%] sm:w-full">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Order ID: {order.id} | Date: {order.date.toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        
        {isMobile ? (
          <div className="space-y-4 py-4">
            {order.items.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.itemName}</span>
                      <span>{item.quantity} x {formatCurrency(item.sellingPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Unit price</span>
                      <span>{formatCurrency(item.sellingPrice)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{formatCurrency(item.totalPrice)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="pt-4 border-t">
              <div className="flex justify-between font-medium">
                <span>Total Amount:</span>
                <span>{formatCurrency(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-success font-medium">
                <span>Profit:</span>
                <span>{formatCurrency(order.profit)}</span>
              </div>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.itemName}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.sellingPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.totalPrice)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">
                  Total:
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(order.totalAmount)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium text-success">
                  Profit:
                </TableCell>
                <TableCell className="text-right font-medium text-success">
                  {formatCurrency(order.profit)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>Print Invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
