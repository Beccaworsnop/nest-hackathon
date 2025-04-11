"use client"

import { useState } from "react"
import { Check, Save, Upload, Users, Warehouse, BotIcon as Robot, Bell, Shield, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [warehouseMapFile, setWarehouseMapFile] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your warehouse and robot settings</p>
      </div>

      <Tabs defaultValue="warehouse" className="w-full">
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="warehouse">
            <Warehouse className="h-4 w-4 mr-2" />
            Warehouse
          </TabsTrigger>
          <TabsTrigger value="robots">
            <Robot className="h-4 w-4 mr-2" />
            Robots
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="warehouse" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Configuration</CardTitle>
              <CardDescription>Configure your warehouse layout and zones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="warehouse-name">Warehouse Name</Label>
                  <Input id="warehouse-name" defaultValue="Main Distribution Center" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warehouse-id">Warehouse ID</Label>
                  <Input id="warehouse-id" defaultValue="WH-001" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="warehouse-address">Address</Label>
                <Textarea id="warehouse-address" defaultValue="123 Logistics Way, Warehouse District, CA 90210" />
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label>Warehouse Map</Label>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-center h-40 bg-muted rounded-md mb-4">
                    {warehouseMapFile ? (
                      <div className="text-center">
                        <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="text-sm font-medium">{warehouseMapFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(warehouseMapFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Upload your warehouse map</p>
                        <p className="text-xs text-muted-foreground">SVG, PNG or JPG (max. 10MB)</p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <Input
                      id="warehouse-map"
                      type="file"
                      className="hidden"
                      accept=".svg,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setWarehouseMapFile(e.target.files[0])
                        }
                      }}
                    />
                    <Label
                      htmlFor="warehouse-map"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                      {warehouseMapFile ? "Replace Map" : "Upload Map"}
                    </Label>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <Label>Zone Configuration</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Zone A</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Shelves</span>
                        <span className="text-sm font-medium">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Items</span>
                        <span className="text-sm font-medium">156</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        Configure
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Zone B</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Shelves</span>
                        <span className="text-sm font-medium">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Items</span>
                        <span className="text-sm font-medium">98</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        Configure
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Zone C</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Shelves</span>
                        <span className="text-sm font-medium">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Items</span>
                        <span className="text-sm font-medium">112</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        Configure
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Zone
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="robots" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Robot Configuration</CardTitle>
              <CardDescription>Configure robot behavior and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">General Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="max-speed">Maximum Speed (m/s)</Label>
                    <Input id="max-speed" type="number" defaultValue="1.5" min="0.5" max="3.0" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="battery-threshold">Battery Threshold (%)</Label>
                    <Input id="battery-threshold" type="number" defaultValue="20" min="10" max="50" />
                    <p className="text-xs text-muted-foreground">
                      Robots will return to charging station when battery falls below this level
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="task-timeout">Task Timeout (minutes)</Label>
                    <Input id="task-timeout" type="number" defaultValue="15" min="5" max="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-interval">Maintenance Interval (days)</Label>
                    <Input id="maintenance-interval" type="number" defaultValue="30" min="7" max="90" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="collision-avoidance">Collision Avoidance</Label>
                    <p className="text-sm text-muted-foreground">Enable advanced collision detection and avoidance</p>
                  </div>
                  <Switch id="collision-avoidance" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-charging">Automatic Charging</Label>
                    <p className="text-sm text-muted-foreground">
                      Robots will automatically return to charging station when idle
                    </p>
                  </div>
                  <Switch id="auto-charging" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Task Prioritization</h3>
                <div className="space-y-2">
                  <Label htmlFor="priority-algorithm">Priority Algorithm</Label>
                  <Select defaultValue="nearest-first">
                    <SelectTrigger id="priority-algorithm">
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nearest-first">Nearest First</SelectItem>
                      <SelectItem value="fifo">First In, First Out</SelectItem>
                      <SelectItem value="priority-based">Priority Based</SelectItem>
                      <SelectItem value="energy-efficient">Energy Efficient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Task Priority Levels</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-red-500">High</Badge>
                      <Input type="number" defaultValue="1" className="w-16" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-amber-500">Medium</Badge>
                      <Input type="number" defaultValue="2" className="w-16" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-500">Low</Badge>
                      <Input type="number" defaultValue="3" className="w-16" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Lower numbers indicate higher priority (1 is highest priority)
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Robot Firmware</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-version">Current Version</Label>
                    <div className="flex items-center gap-2">
                      <Input id="current-version" value="v2.4.1" readOnly />
                      <Badge className="bg-green-500">Up to date</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auto-update">Automatic Updates</Label>
                    <div className="flex items-center gap-4">
                      <Switch id="auto-update" defaultChecked />
                      <span className="text-sm text-muted-foreground">Update during off-hours only</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Users</h3>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>

                <div className="border rounded-md">
                  <div className="grid grid-cols-5 gap-4 p-4 border-b font-medium">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium">John Smith</div>
                      <div className="text-muted-foreground">john.smith@example.com</div>
                      <div>
                        <Badge>Admin</Badge>
                      </div>
                      <div>
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                          Active
                        </Badge>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-muted-foreground">sarah.johnson@example.com</div>
                      <div>
                        <Badge variant="outline">Operator</Badge>
                      </div>
                      <div>
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                          Active
                        </Badge>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium">Michael Brown</div>
                      <div className="text-muted-foreground">michael.brown@example.com</div>
                      <div>
                        <Badge variant="outline">Viewer</Badge>
                      </div>
                      <div>
                        <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                          Invited
                        </Badge>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Role Permissions</h3>
                <div className="border rounded-md">
                  <div className="grid grid-cols-4 gap-4 p-4 border-b font-medium">
                    <div>Permission</div>
                    <div>Admin</div>
                    <div>Operator</div>
                    <div>Viewer</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-4 gap-4 p-4 items-center">
                      <div className="font-medium">View Dashboard</div>
                      <div>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 items-center">
                      <div className="font-medium">Manage Robots</div>
                      <div>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <X className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 items-center">
                      <div className="font-medium">Assign Tasks</div>
                      <div>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <X className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 items-center">
                      <div className="font-medium">Manage Inventory</div>
                      <div>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <X className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 items-center">
                      <div className="font-medium">Configure System</div>
                      <div>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <X className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <X className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 items-center">
                      <div className="font-medium">Manage Users</div>
                      <div>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <X className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <X className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <Switch id="sms-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications in the browser</p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="robot-alerts">Robot Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications about robot errors, low battery, or maintenance needs
                      </p>
                    </div>
                    <Switch id="robot-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="task-notifications">Task Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications about task assignments, completions, or failures
                      </p>
                    </div>
                    <Switch id="task-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inventory-alerts">Inventory Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications about low stock or inventory discrepancies
                      </p>
                    </div>
                    <Switch id="inventory-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-notifications">System Notifications</Label>
                      <p className="text-sm text-muted-foreground">Notifications about system updates or maintenance</p>
                    </div>
                    <Switch id="system-notifications" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Schedule</h3>
                <div className="space-y-2">
                  <Label htmlFor="quiet-hours">Quiet Hours</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-time" className="text-sm text-muted-foreground">
                        Start Time
                      </Label>
                      <Input id="start-time" type="time" defaultValue="22:00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time" className="text-sm text-muted-foreground">
                        End Time
                      </Label>
                      <Input id="end-time" type="time" defaultValue="07:00" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Only critical notifications will be sent during quiet hours
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and access control settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require two-factor authentication for all admin users
                      </p>
                    </div>
                    <Switch id="two-factor" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="password-expiry">Password Expiry</Label>
                      <p className="text-sm text-muted-foreground">Force password reset every 90 days</p>
                    </div>
                    <Switch id="password-expiry" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" min="5" max="120" />
                    <p className="text-xs text-muted-foreground">
                      Automatically log out users after period of inactivity
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Access</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="api-access">Enable API Access</Label>
                      <p className="text-sm text-muted-foreground">Allow external systems to access the API</p>
                    </div>
                    <Switch id="api-access" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        id="api-key"
                        type="password"
                        value="sk_live_51NZVYHJkMPTdQlGwV8GMaFECvV"
                        readOnly
                        className="font-mono"
                      />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Keep this key secret. Regenerating will invalidate the old key.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Access Logs</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-logs">Enable Access Logging</Label>
                      <p className="text-sm text-muted-foreground">Log all user actions for security auditing</p>
                    </div>
                    <Switch id="enable-logs" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="log-retention">Log Retention Period (days)</Label>
                    <Input id="log-retention" type="number" defaultValue="90" min="30" max="365" />
                  </div>
                  <Button variant="outline" size="sm">
                    View Access Logs
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
