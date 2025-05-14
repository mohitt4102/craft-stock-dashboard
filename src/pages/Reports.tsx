
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
import { mockCategories, mockMonthlyData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Download } from "lucide-react";

export default function Reports() {
  // In a real app, these values would be calculated from filtered data
  const totalRevenue = 35000;
  const totalCost = 15000;
  const totalProfit = 20000;
  const totalUnitsSold = 453;

  return (
    <AppLayout>
      <PageHeader
        heading="Reports"
        text="Analyze your business performance with detailed reports."
        actions={
          <>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export PDF
            </Button>
          </>
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
              <Select defaultValue="year">
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
              <Select defaultValue="all">
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
              <Button className="w-full">
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
          data={mockMonthlyData}
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
              <div className="flex justify-between">
                <span className="font-medium">Leather Tote Bag</span>
                <span>42 units</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Cotton T-Shirt</span>
                <span>38 units</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Silver Bracelet</span>
                <span>32 units</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Scented Candle Set</span>
                <span>28 units</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Wireless Headphones</span>
                <span>25 units</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
