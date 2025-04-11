"use client"

import { useState } from "react"
import { ArrowUpDown, CheckCircle2, Clock, Package, User } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Mock data for orders
const orders = [
  {
    id: "ORD-1234",
    customer: "John Smith",
    items: 3,
    status: "fulfilled",
    progress: 100,
    date: "Today, 9:30 AM",
    total: "$125.99",
  },
  {
    id: "ORD-1235",
    customer: "Sarah Johnson",
    items: 2,
    status: "processing",
    progress: 60,
    date: "Today, 10:15 AM",
    total: "$89.50",
  },
  {
    id: "ORD-1236",
    customer: "Michael Brown",
    items: 5,
    status: "processing",
    progress: 40,
    date: "Today, 11:00 AM",
    total: "$210.75",
  },
  {
    id: "ORD-1237",
    customer: "Emily Davis",
    items: 1,
    status: "fulfilled",
    progress: 100,
    date: "Yesterday, 3:45 PM",
    total: "$45.99",
  },
  {
    id: "ORD-1238",
    customer: "David Wilson",
    items: 4,
    status: "processing",
    progress: 20,
    date: "Today, 11:30 AM",
    total: "$175.25",
  },
]

export function OrdersChart() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "fulfilled":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Fulfilled
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
            <Clock className="mr-1 h-3 w-3" />
            Processing
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("id")}>
                Order ID
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("date")}>
                Date
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {order.customer}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  {order.items} items
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>
                <div className="w-[100px]">
                  <Progress
                    value={order.progress}
                    className="h-2"
                    indicatorClassName={order.status === "fulfilled" ? "bg-green-500" : "bg-blue-500"}
                  />
                </div>
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell className="text-right font-medium">{order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
