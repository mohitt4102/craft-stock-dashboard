
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatsCard } from "@/components/ui/StatsCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { mockCategories, mockMonthlyData, mockOrders } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Download } from "lucide-react";
import { useState, useMemo } from "react";
import { ChartData, Order, OrderItem } from "@/types";

type DateRange = "week" | "month" | "quarter" | "year" | "all";

export default function Reports() {
  const [dateRange, setDateRange] = useState<DateRange>("year");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Filter orders based on selected date range and category
  const filteredOrders = useMemo(() => {
    const now = new Date();
    let minDate = new Date();
    
    // Calculate min date based on selected date range
    switch(dateRange) {
      case "week":
        minDate.setDate(now.getDate() - 7);
        break;
      case "month":
        minDate.setMonth(now.getMonth() - 1);
        break;
      case "quarter":
        minDate.setMonth(now.getMonth() - 3);
        break;
      case "year":
        minDate.setFullYear(now.getFullYear() - 1);
        break;
      case "all":
      default:
        minDate = new Date(0); // Beginning of time
    }
    
    return mockOrders.filter(order => {
      // Check date filter
      const orderDate = new Date(order.date);
      const isInDateRange = orderDate >= minDate && orderDate <= now;
      
      // Check category filter
      const isInCategory = categoryFilter === "all" || 
        order.items.some(item => {
          // Find matching category for this item
          const itemCategory = mockCategories.find(cat => 
            cat.name === item.itemName.split(' ')[0]
          );
          return itemCategory && (categoryFilter === "all" || itemCategory.id === categoryFilter);
        });
      
      return isInDateRange && isInCategory;
    });
  }, [dateRange, categoryFilter]);
  
  // Calculate statistics from filtered orders
  const { totalRevenue, totalCost, totalProfit, totalUnitsSold, bestSellingItems, chartData } = useMemo(() => {
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalCost = filteredOrders.reduce((sum, order) => sum + order.totalCost, 0);
    const totalProfit = filteredOrders.reduce((sum, order) => sum + order.profit, 0);
    
    // Calculate total units sold
    const totalUnitsSold = filteredOrders.reduce((sum, order) => {
      return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
    }, 0);
    
    // Find best selling items
    const itemSales: Record<string, {name: string, quantity: number}> = {};
    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        if (itemSales[item.itemId]) {
          itemSales[item.itemId].quantity += item.quantity;
        } else {
          itemSales[item.itemId] = {
            name: item.itemName,
            quantity: item.quantity
          };
        }
      });
    });
    
    // Sort by quantity sold and take top 5
    const bestSellingItems = Object.values(itemSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
    
    // Generate chart data based on filtered orders
    // For this demo, we'll use the mock data but in a real app this would be calculated
    const chartData = mockMonthlyData;
    
    return {
      totalRevenue,
      totalCost,
      totalProfit,
      totalUnitsSold,
      bestSellingItems,
      chartData
    };
  }, [filteredOrders]);

  const handleGenerateReport = () => {
    // In a real app, this would update the report data
    // but our data is already reactive
  };

  return (
    <AppLayout>
      <PageHeader
        heading="Reports"
        text="Analyze your business performance with detailed reports."
        actions={
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export PDF
            </Button>
          </div>
        }
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Report Filters</CardTitle>
          <CardDescription>Filter your report data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select value={dateRange} onValueChange={(value: DateRange) => setDateRange(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last 7 days</SelectItem>
                  <SelectItem value="month">Last 30 days</SelectItem>
                  <SelectItem value="quarter">Last 90 days</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={handleGenerateReport}>
                <BarChart className="mr-2 h-4 w-4" /> Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatsCard
          title="Total Units Sold"
          value={totalUnitsSold.toString()}
          description="Across all categories"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          description="Gross sales"
        />
        <StatsCard
          title="Total Cost"
          value={formatCurrency(totalCost)}
          description="Cost of goods"
        />
        <StatsCard
          title="Total Profit"
          value={formatCurrency(totalProfit)}
          description="Net profit"
          className="border-success/20 bg-success/10"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
        <SalesChart
          data={chartData}
          title="Sales Performance"
          description="Revenue and profit by month"
        />

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Best Selling Items</CardTitle>
            <CardDescription>Top 5 items by quantity sold</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {bestSellingItems.length > 0 ? (
                bestSellingItems.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium">{item.name}</span>
                    <span>{item.quantity} units</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No sales data available for the selected filters.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
