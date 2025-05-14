
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderTable } from "@/components/orders/OrderTable";
import { OrderDialog } from "@/components/orders/OrderDialog";
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";
import { useState } from "react";
import { mockOrders } from "@/lib/mockData";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Order } from "@/types";

export default function Orders() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  // Filter orders by search query (order ID or items)
  const filteredOrders = orders.filter(
    (order) =>
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleAddOrder = () => {
    setCreateDialogOpen(true);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewDialogOpen(true);
  };
  
  const handleSaveOrder = (order: Order) => {
    setOrders([order, ...orders]);
  };

  return (
    <AppLayout>
      <PageHeader
        heading="Orders"
        text="View and manage your sales orders."
        actions={
          <Button onClick={handleAddOrder}>
            <Plus className="mr-2 h-4 w-4" /> Add Order
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <OrderTable orders={filteredOrders} onView={handleViewOrder} />

      <OrderDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        order={selectedOrder}
      />
      
      <CreateOrderDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSave={handleSaveOrder}
      />
    </AppLayout>
  );
}
