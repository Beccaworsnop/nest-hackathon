"use client"

import { useState } from "react"
import { ArrowUpDown, AlertTriangle, Package, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

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
]

export function InventorySummary() {
  const [searchTerm, setSearchTerm] = useState("")
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

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
