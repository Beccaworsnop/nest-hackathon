"use client"

import { useState } from "react"
import { ArrowUpDown, CheckCircle2, Clock, Package, RefreshCcw, Truck, XCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for recent tasks
const tasks = [
  {
    id: "T-1234",
    type: "pickup",
    status: "completed",
    robot: 1,
    item: "SKU-1234",
    location: "Zone A2",
    timestamp: "10:30 AM",
    duration: "2m 15s",
  },
  {
    id: "T-1235",
    type: "delivery",
    status: "in-progress",
    robot: 2,
    item: "SKU-5678",
    location: "Zone B4",
    timestamp: "10:32 AM",
    duration: "1m 45s",
  },
  {
    id: "T-1236",
    type: "retrieval",
    status: "completed",
    robot: 3,
    item: "SKU-9012",
    location: "Zone C1",
    timestamp: "10:35 AM",
    duration: "3m 20s",
  },
  {
    id: "T-1237",
    type: "pickup",
    status: "failed",
    robot: 4,
    item: "SKU-3456",
    location: "Zone A5",
    timestamp: "10:38 AM",
    duration: "1m 10s",
    error: "Item not found",
  },
  {
    id: "T-1238",
    type: "delivery",
    status: "completed",
    robot: 1,
    item: "SKU-7890",
    location: "Zone B2",
    timestamp: "10:40 AM",
    duration: "2m 30s",
  },
]

export function RecentTasks() {
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
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
            <Clock className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pickup":
        return <Package className="h-4 w-4 text-muted-foreground" />
      case "delivery":
        return <Truck className="h-4 w-4 text-muted-foreground" />
      case "retrieval":
        return <RefreshCcw className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("id")}>
                Task ID
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("robot")}>
                Robot
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("timestamp")}>
                Time
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getTypeIcon(task.type)}
                  <span className="capitalize">{task.type}</span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(task.status)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary w-6 h-6 flex items-center justify-center text-xs text-primary-foreground">
                    {task.robot}
                  </div>
                </div>
              </TableCell>
              <TableCell>{task.item}</TableCell>
              <TableCell>{task.location}</TableCell>
              <TableCell>{task.timestamp}</TableCell>
              <TableCell>{task.duration}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    {task.status === "in-progress" && <DropdownMenuItem>Cancel task</DropdownMenuItem>}
                    {task.status === "failed" && <DropdownMenuItem>Retry task</DropdownMenuItem>}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View robot info</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
