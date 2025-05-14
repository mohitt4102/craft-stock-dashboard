
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatsCard } from "@/components/ui/StatsCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { LowStockAlert } from "@/components/dashboard/LowStockAlert";
import { formatCurrency } from "@/lib/utils";
import { calculateDashboardStats, getLowStockItems, mockMonthlyData } from "@/lib/mockData";
import { ShoppingCart, DollarSign, TrendingUp, Package } from "lucide-react";

export default function Dashboard() {
  const stats = calculateDashboardStats();
  const lowStockItems = getLowStockItems();

  return (
    <AppLayout>
      <PageHeader
        heading="Dashboard"
        text="Your business overview and key metrics."
      />
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          icon={<ShoppingCart className="h-4 w-4" />}
          trend={5}
          description="vs. last month"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={<DollarSign className="h-4 w-4" />}
          trend={12}
          description="vs. last month"
        />
        <StatsCard
          title="Total Profit"
          value={formatCurrency(stats.totalProfit)}
          icon={<TrendingUp className="h-4 w-4" />}
          trend={8}
          description="vs. last month"
        />
        <StatsCard
          title="Items in Stock"
          value={getLowStockItems().length.toString()}
          icon={<Package className="h-4 w-4" />}
          trend={-3}
          description="low stock items"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
        <SalesChart
          data={mockMonthlyData}
          title="Monthly Performance"
          description="Revenue and profit over the past year"
        />
        <div className="lg:col-span-1">
          <LowStockAlert items={lowStockItems} />
        </div>
      </div>
    </AppLayout>
  );
}
