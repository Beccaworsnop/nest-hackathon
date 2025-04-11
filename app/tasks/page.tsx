"use client"

import { useState } from "react"
import { ArrowUpDown, CheckCircle2, Clock, Package, Plus, RefreshCcw, Truck, XCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for tasks
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
  {
    id: "T-1239",
    type: "pickup",
    status: "pending",
    robot: null,
    item: "SKU-2468",
    location: "Zone C3",
    timestamp: "10:45 AM",
    duration: "-",
  },
  {
    id: "T-1240",
    type: "retrieval",
    status: "pending",
    robot: null,
    item: "SKU-1357",
    location: "Zone A1",
    timestamp: "10:48 AM",
    duration: "-",
  },
]

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredTasks = tasks.filter((task) => {
    // Filter by search term
    const matchesSearch =
      task.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by tab
    if (activeTab === "all") {
      return matchesSearch
    } else {
      return matchesSearch && task.status === activeTab
    }
  })

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
      case "pending":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
            <Clock className="mr-1 h-3 w-3" />
            Pending
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage and assign tasks to robots</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Assign a new task to a robot in your warehouse.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task-type">Task Type</Label>
                <Select defaultValue="pickup">
                  <SelectTrigger id="task-type">
                    <SelectValue placeholder="Select task type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Pickup</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="retrieval">Retrieval</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="item-sku">Item SKU</Label>
                <Input id="item-sku" placeholder="Enter SKU..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Select>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zone-a1">Zone A1</SelectItem>
                    <SelectItem value="zone-a2">Zone A2</SelectItem>
                    <SelectItem value="zone-b1">Zone B1</SelectItem>
                    <SelectItem value="zone-b2">Zone B2</SelectItem>
                    <SelectItem value="zone-c1">Zone C1</SelectItem>
                    <SelectItem value="zone-c2">Zone C2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="robot">Assign Robot</Label>
                <Select>
                  <SelectTrigger id="robot">
                    <SelectValue placeholder="Select robot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-assign</SelectItem>
                    <SelectItem value="1">Robot 1</SelectItem>
                    <SelectItem value="2">Robot 2</SelectItem>
                    <SelectItem value="3">Robot 3</SelectItem>
                    <SelectItem value="4">Robot 4</SelectItem>
                    <SelectItem value="5">Robot 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="normal">
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
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
                {filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No tasks found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
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
                        {task.robot ? (
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-primary w-6 h-6 flex items-center justify-center text-xs text-primary-foreground">
                              {task.robot}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>{task.item}</TableCell>
                      <TableCell>{task.location}</TableCell>
                      <TableCell>{task.timestamp}</TableCell>
                      <TableCell>{task.duration}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {task.status === "pending" && (
                            <Button variant="outline" size="sm">
                              Assign
                            </Button>
                          )}
                          {task.status === "in-progress" && (
                            <Button variant="outline" size="sm">
                              Track
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
