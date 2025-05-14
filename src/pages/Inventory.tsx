
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Inventory() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
  const [items, setItems] = useState<Item[]>(mockItems);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  // Filter items by category and search query
  const filteredItems = items.filter(
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
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    
    const newItems = items.filter((item) => item.id !== itemToDelete.id);
    setItems(newItems);
    
    toast({
      title: "Item Deleted",
      description: `${itemToDelete.name} has been removed from inventory.`,
    });
    
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleSaveItem = (itemData: Partial<Item>) => {
    // If editing existing item
    if (selectedItem) {
      const updatedItems = items.map((item) =>
        item.id === selectedItem.id
          ? { ...item, ...itemData, updatedAt: new Date() }
          : item
      );
      setItems(updatedItems);
      
      toast({
        title: "Item Updated",
        description: `${itemData.name} has been updated.`,
      });
    } 
    // If adding new item
    else {
      const newItem: Item = {
        id: `item-${Date.now()}`,
        name: itemData.name || "",
        category: itemData.category || "",
        quantity: itemData.quantity || 0,
        purchasePrice: itemData.purchasePrice || 0,
        sellingPrice: itemData.sellingPrice || 0,
        description: itemData.description || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setItems([newItem, ...items]);
      
      toast({
        title: "Item Added",
        description: `${newItem.name} has been added to inventory.`,
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
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {itemToDelete?.name} from your inventory.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
