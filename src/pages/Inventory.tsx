
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryFilter } from "@/components/inventory/CategoryFilter";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { InventoryDialog } from "@/components/inventory/InventoryDialog";
import { useState } from "react";
import { Item } from "@/types";
import { mockItems, mockCategories } from "@/lib/mockData";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Inventory() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);

  // Filter items by category and search query
  const filteredItems = mockItems.filter(
    (item) =>
      (selectedCategory === "" || item.category === selectedCategory) &&
      (searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddItem = () => {
    setSelectedItem(undefined);
    setDialogOpen(true);
  };

  const handleEditItem = (item: Item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleDeleteItem = (item: Item) => {
    // In a real app, this would delete from the database
    toast({
      title: "Item Deleted",
      description: `${item.name} has been removed from inventory.`,
    });
  };

  const handleSaveItem = (item: Partial<Item>) => {
    // In a real app, this would save to the database
    if (selectedItem) {
      toast({
        title: "Item Updated",
        description: `${item.name} has been updated.`,
      });
    } else {
      toast({
        title: "Item Added",
        description: `${item.name} has been added to inventory.`,
      });
    }
  };

  return (
    <AppLayout>
      <PageHeader
        heading="Inventory"
        text="Manage your inventory items and stock levels."
        actions={
          <Button onClick={handleAddItem}>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <CategoryFilter
          categories={mockCategories}
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      <InventoryTable
        items={filteredItems}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />

      <InventoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={selectedItem}
        categories={mockCategories}
        onSave={handleSaveItem}
      />
    </AppLayout>
  );
}
