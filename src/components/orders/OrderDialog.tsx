
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Printer } from "lucide-react";

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

export function OrderDialog({ open, onOpenChange, order }: OrderDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <div>Order #{order.id}</div>
            <div className="text-sm text-muted-foreground">
              {formatDate(order.date)}
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              {order.tags?.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print Invoice
            </Button>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.itemId}>
                    <TableCell className="font-medium">
                      {item.itemName}
                    </TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.sellingPrice)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.totalPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <div className="text-muted-foreground">Subtotal</div>
              <div>{formatCurrency(order.totalAmount)}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground">Cost</div>
              <div>{formatCurrency(order.totalCost)}</div>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <div>Profit</div>
              <div className="text-success">
                {formatCurrency(order.profit)}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Internal table components for the order items
function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full">{children}</table>;
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>;
}

function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }: { children: React.ReactNode }) {
  return <tr>{children}</tr>;
}

function TableHead({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`p-2 text-left text-xs font-medium text-muted-foreground ${className}`}>
      {children}
    </th>
  );
}

function TableCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`p-2 text-sm ${className}`}>{children}</td>;
}
