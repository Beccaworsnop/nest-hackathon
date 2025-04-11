"use client"

import { useState } from "react"
import { Battery, CheckCircle2, Clock, Settings, XCircle, AlertTriangle, BarChart3, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for robots
const robots = [
  {
    id: 1,
    status: "active",
    battery: 85,
    task: "Picking SKU-1234",
    location: "Zone A2",
    uptime: "8h 45m",
    tasksCompleted: 24,
    model: "RW-1000",
    lastMaintenance: "2 days ago",
    efficiency: 94,
  },
  {
    id: 2,
    status: "active",
    battery: 72,
    task: "Delivering to Zone B",
    location: "Zone B4",
    uptime: "6h 30m",
    tasksCompleted: 18,
    model: "RW-1000",
    lastMaintenance: "5 days ago",
    efficiency: 91,
  },
  {
    id: 3,
    status: "active",
    battery: 64,
    task: "Retrieving SKU-5678",
    location: "Zone C1",
    uptime: "5h 15m",
    tasksCompleted: 15,
    model: "RW-1000",
    lastMaintenance: "1 week ago",
    efficiency: 88,
    warning: "Battery low",
  },
  {
    id: 4,
    status: "active",
    battery: 91,
    task: "Moving to charging station",
    location: "Zone A3",
    uptime: "9h 20m",
    tasksCompleted: 27,
    model: "RW-2000",
    lastMaintenance: "3 days ago",
    efficiency: 96,
  },
  {
    id: 5,
    status: "charging",
    battery: 30,
    task: "Charging",
    location: "Charging Station",
    uptime: "4h 10m",
    tasksCompleted: 12,
    model: "RW-2000",
    lastMaintenance: "1 day ago",
    efficiency: 92,
    warning: "Maintenance due",
  },
]

export default function RobotsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedRobot, setSelectedRobot] = useState<number | null>(null)

  const filteredRobots = activeTab === "all" ? robots : robots.filter((robot) => robot.status === activeTab)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )
      case "charging":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
            <Battery className="mr-1 h-3 w-3" />
            Charging
          </Badge>
        )
      case "idle":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
            <Clock className="mr-1 h-3 w-3" />
            Idle
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            Error
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getBatteryColor = (level: number) => {
    if (level > 70) return "bg-green-500"
    if (level > 30) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Robots</h1>
          <p className="text-muted-foreground">Monitor and manage your warehouse robots</p>
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              <SelectItem value="rw-1000">RW-1000</SelectItem>
              <SelectItem value="rw-2000">RW-2000</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Robots</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="charging">Charging</TabsTrigger>
          <TabsTrigger value="idle">Idle</TabsTrigger>
          <TabsTrigger value="error">Error</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRobots.map((robot) => (
          <Card
            key={robot.id}
            className={selectedRobot === robot.id ? "border-primary" : ""}
            onClick={() => setSelectedRobot(robot.id === selectedRobot ? null : robot.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {robot.id}
                  </div>
                  <CardTitle>Robot {robot.id}</CardTitle>
                </div>
                {getStatusBadge(robot.status)}
              </div>
              <CardDescription>{robot.model} Series</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Battery</span>
                    <span className="font-medium">{robot.battery}%</span>
                  </div>
                  <Progress value={robot.battery} className="h-2" indicatorClassName={getBatteryColor(robot.battery)} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Task</p>
                    <p className="font-medium">{robot.task}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{robot.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-md bg-muted p-2">
                    <p className="text-xs text-muted-foreground">Uptime</p>
                    <p className="font-medium">{robot.uptime}</p>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <p className="text-xs text-muted-foreground">Tasks</p>
                    <p className="font-medium">{robot.tasksCompleted}</p>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <p className="text-xs text-muted-foreground">Efficiency</p>
                    <p className="font-medium">{robot.efficiency}%</p>
                  </div>
                </div>

                {robot.warning && (
                  <div className="flex items-center gap-2 text-amber-500 bg-amber-50 p-2 rounded-md">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">{robot.warning}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex justify-between w-full">
                <Button variant="ghost" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Performance
                </Button>
                <Button variant="ghost" size="sm">
                  <Zap className="mr-2 h-4 w-4" />
                  Control
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedRobot && (
        <Card>
          <CardHeader>
            <CardTitle>Robot {selectedRobot} Details</CardTitle>
            <CardDescription>Detailed information and controls for Robot {selectedRobot}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Status Information</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Model</p>
                        <p className="font-medium">{robots.find((r) => r.id === selectedRobot)?.model}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Maintenance</p>
                        <p className="font-medium">{robots.find((r) => r.id === selectedRobot)?.lastMaintenance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Efficiency Rating</p>
                        <p className="font-medium">{robots.find((r) => r.id === selectedRobot)?.efficiency}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tasks Completed</p>
                        <p className="font-medium">{robots.find((r) => r.id === selectedRobot)?.tasksCompleted}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Quick Actions</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        Send to Charging
                      </Button>
                      <Button variant="outline" size="sm">
                        Pause Tasks
                      </Button>
                      <Button variant="outline" size="sm">
                        Run Diagnostics
                      </Button>
                      <Button variant="outline" size="sm">
                        Update Firmware
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Performance Metrics</h3>
                    <div className="space-y-2 mt-2">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Battery Health</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Task Completion Rate</span>
                          <span>96%</span>
                        </div>
                        <Progress value={96} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Navigation Accuracy</span>
                          <span>98%</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Error Rate</span>
                          <span>2%</span>
                        </div>
                        <Progress value={2} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Maintenance</h3>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Next scheduled maintenance</p>
                      <p className="font-medium">In 12 days (May 22, 2023)</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Schedule Maintenance
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
