"use client"

import { Battery, CheckCircle2, Clock, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

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
  },
  {
    id: 2,
    status: "active",
    battery: 72,
    task: "Delivering to Zone B",
    location: "Zone B4",
    uptime: "6h 30m",
    tasksCompleted: 18,
  },
  {
    id: 3,
    status: "active",
    battery: 64,
    task: "Retrieving SKU-5678",
    location: "Zone C1",
    uptime: "5h 15m",
    tasksCompleted: 15,
  },
  {
    id: 4,
    status: "active",
    battery: 91,
    task: "Moving to charging station",
    location: "Zone A3",
    uptime: "9h 20m",
    tasksCompleted: 27,
  },
  {
    id: 5,
    status: "charging",
    battery: 30,
    task: "Charging",
    location: "Charging Station",
    uptime: "4h 10m",
    tasksCompleted: 12,
  },
]

export function RobotStatusChart() {
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
    <div className="space-y-4">
      {robots.map((robot) => (
        <div key={robot.id} className="flex items-center gap-4 p-2 rounded-lg border">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            {robot.id}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {getStatusBadge(robot.status)}
              <span className="text-sm font-medium truncate">{robot.task}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>Battery</span>
                  <span>{robot.battery}%</span>
                </div>
                <Progress value={robot.battery} className="h-1.5" indicatorClassName={getBatteryColor(robot.battery)} />
              </div>

              <div className="text-xs text-muted-foreground">{robot.location}</div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Button variant="ghost" size="sm">
              Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
