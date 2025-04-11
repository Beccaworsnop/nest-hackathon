"use client"

import { useState } from "react"
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Package,
  Plus,
  RefreshCcw,
  BotIcon as Robot,
  Truck,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WarehouseMap } from "@/components/warehouse-map"
import { RecentTasks } from "@/components/recent-tasks"
import { InventorySummary } from "@/components/inventory-summary"
import { RobotStatusChart } from "@/components/robot-status-chart"
import { OrdersChart } from "@/components/orders-chart"

export default function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const handleRefresh = () => {
    setLastUpdated(new Date())
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your warehouse operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Robots</CardTitle>
            <Robot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/5</div>
            <p className="text-xs text-muted-foreground">1 robot charging (80%)</p>
            <Progress value={80} className="mt-2 h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                18 Completed
              </Badge>
              <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                <Clock className="mr-1 h-3 w-3" />6 In Progress
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                <AlertTriangle className="mr-1 h-3 w-3" />
                12 Low Stock
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                <CheckCircle2 className="mr-1 h-3 w-3" />5 Fulfilled
              </Badge>
              <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                <Clock className="mr-1 h-3 w-3" />3 Processing
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Warehouse Overview</CardTitle>
            <CardDescription>Real-time visualization of warehouse layout and robot positions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <WarehouseMap />
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </CardFooter>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Robot Status</CardTitle>
            <CardDescription>Current state of all robots in the warehouse</CardDescription>
          </CardHeader>
          <CardContent>
            <RobotStatusChart />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Recent Tasks</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Summary</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="mt-4">
          <RecentTasks />
        </TabsContent>
        <TabsContent value="inventory" className="mt-4">
          <InventorySummary />
        </TabsContent>
        <TabsContent value="orders" className="mt-4">
          <OrdersChart />
        </TabsContent>
      </Tabs>
    </div>
  )
}
