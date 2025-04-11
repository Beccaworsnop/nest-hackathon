"use client"

import { useState } from "react"
import { ArrowUpDown, AlertTriangle, Package, Search, Plus, Filter, Download, Upload } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WarehouseMap } from "@/components/warehouse-map"

// Mock data for inventory items
const inventoryItems = [
  {
    id: "SKU-1234",
    name: "Wireless Headphones",
    category: "Electronics",
    quantity: 45,
    location: "Zone A2",
    threshold: 20,
    lastUpdated: "Today, 9:30 AM",
  },
  {
    id: "SKU-5678",
    name: "Fitness Tracker",
    category: "Electronics",
    quantity: 12,
    location: "Zone B3",
    threshold: 15,
    lastUpdated: "Today, 10:15 AM",
    lowStock: true,
  },
  {
    id: "SKU-9012",
    name: "Protein Powder",
    category: "Health",
    quantity: 28,
    location: "Zone C1",
    threshold: 10,
    lastUpdated: "Yesterday, 4:45 PM",
  },
  {
    id: "SKU-3456",
    name: "Yoga Mat",
    category: "Fitness",
    quantity: 8,
    location: "Zone A5",
    threshold: 10,
    lastUpdated: "Yesterday, 2:30 PM",
    lowStock: true,
  },
  {
    id: "SKU-7890",
    name: "Water Bottle",
    category: "Accessories",
    quantity: 56,
    location: "Zone B2",
    threshold: 25,
    lastUpdated: "Today, 8:00 AM",
  },
  {
    id: "SKU-2468",
    name: "Smart Watch",
    category: "Electronics",
    quantity: 18,
    location: "Zone C3",
    threshold: 15,
    lastUpdated: "Yesterday, 1:15 PM",
  },
  {
    id: "SKU-1357",
    name: "Bluetooth Speaker",
    category: "Electronics",
    quantity: 32,
    location: "Zone A1",
    threshold: 20,
    lastUpdated: "Today, 11:45 AM",
  },
  {
    id: "SKU-9876",
    name: "Running Shoes",
    category: "Footwear",
    quantity: 24,
    location: "Zone B4",
    threshold: 15,
    lastUpdated: "Yesterday, 3:30 PM",
  },
  {
    id: "SKU-5432",
    name: "Vitamin Supplements",
    category: "Health",
    quantity: 5,
    location: "Zone C2",
    threshold: 10,
    lastUpdated: "Today, 9:15 AM",
    lowStock: true,
  },
  {
    id: "SKU-8765",
    name: "Resistance Bands",
    category: "Fitness",
    quantity: 42,
    location: "Zone A4",
    threshold: 20,
    lastUpdated: "Yesterday, 5:00 PM",
  },
]

export default function WarehousePage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredItems = inventoryItems.filter((item) => {
    // Filter by search term
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by tab
    if (activeTab === "all") {
      return matchesSearch
    } else if (activeTab === "low-stock") {
      return matchesSearch && item.lowStock
    } else {
      return matchesSearch && item.category.toLowerCase() === activeTab.toLowerCase()
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Warehouse</h1>
          <p className="text-muted-foreground">Manage your inventory and warehouse layout</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
                <DialogDescription>Enter the details for the new inventory item.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Enter SKU..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input id="name" placeholder="Enter item name..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="footwear">Footwear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="threshold">Stock Threshold</Label>
                    <Input id="threshold" type="number" placeholder="0" />
                  </div>
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
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Add Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full" onValueChange={(value) => setViewMode(value as "list" | "map")}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
          </div>
        </div>

        <TabsContent value="list" className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
              <TabsTrigger value="electronics">Electronics</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="fitness">Fitness</TabsTrigger>
            </TabsList>
          </Tabs>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("id")}>
                        SKU
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("name")}>
                        Item Name
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>
                      <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => handleSort("quantity")}>
                        Quantity
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No items found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            {item.name}
                          </div>
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {item.quantity}
                            {item.lowStock && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={(item.quantity / item.threshold) * 100}
                              className="h-2 w-[60px]"
                              indicatorClassName={item.lowStock ? "bg-amber-500" : "bg-primary"}
                            />
                            {item.lowStock && (
                              <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                                Low Stock
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{item.lastUpdated}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                              Delete
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
        </TabsContent>

        <TabsContent value="map" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Layout</CardTitle>
              <CardDescription>Visual representation of your warehouse with inventory locations</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <WarehouseMap />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
