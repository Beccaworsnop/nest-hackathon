"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for robots and shelves
const robots = [
  { id: 1, x: 150, y: 100, status: "active", battery: 85, task: "Picking SKU-1234" },
  { id: 2, x: 300, y: 200, status: "active", battery: 72, task: "Delivering to Zone B" },
  { id: 3, x: 450, y: 150, status: "active", battery: 64, task: "Retrieving SKU-5678" },
  { id: 4, x: 200, y: 300, status: "active", battery: 91, task: "Moving to charging station" },
  { id: 5, x: 500, y: 350, status: "charging", battery: 30, task: "Charging" },
]

const shelves = [
  { id: 1, x: 100, y: 50, width: 80, height: 30, items: 24, zone: "A1" },
  { id: 2, x: 100, y: 100, width: 80, height: 30, items: 18, zone: "A2" },
  { id: 3, x: 100, y: 150, width: 80, height: 30, items: 32, zone: "A3" },
  { id: 4, x: 100, y: 200, width: 80, height: 30, items: 15, zone: "A4" },
  { id: 5, x: 100, y: 250, width: 80, height: 30, items: 27, zone: "A5" },

  { id: 6, x: 250, y: 50, width: 80, height: 30, items: 19, zone: "B1" },
  { id: 7, x: 250, y: 100, width: 80, height: 30, items: 22, zone: "B2" },
  { id: 8, x: 250, y: 150, width: 80, height: 30, items: 8, zone: "B3", lowStock: true },
  { id: 9, x: 250, y: 200, width: 80, height: 30, items: 31, zone: "B4" },
  { id: 10, x: 250, y: 250, width: 80, height: 30, items: 14, zone: "B5" },

  { id: 11, x: 400, y: 50, width: 80, height: 30, items: 26, zone: "C1" },
  { id: 12, x: 400, y: 100, width: 80, height: 30, items: 5, zone: "C2", lowStock: true },
  { id: 13, x: 400, y: 150, width: 80, height: 30, items: 29, zone: "C3" },
  { id: 14, x: 400, y: 200, width: 80, height: 30, items: 17, zone: "C4" },
  { id: 15, x: 400, y: 250, width: 80, height: 30, items: 23, zone: "C5" },
]

const chargingStation = { x: 500, y: 350, width: 60, height: 60 }

export function WarehouseMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredRobot, setHoveredRobot] = useState<number | null>(null)
  const [hoveredShelf, setHoveredShelf] = useState<number | null>(null)
  const [mapDimensions, setMapDimensions] = useState({ width: 600, height: 400 })

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const container = canvasRef.current?.parentElement
      if (container) {
        const { width } = container.getBoundingClientRect()
        // Maintain aspect ratio
        const height = width * 0.67
        setMapDimensions({ width, height })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Draw the warehouse map
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = mapDimensions.width
    canvas.height = mapDimensions.height

    // Scale factor for responsive drawing
    const scaleX = mapDimensions.width / 600
    const scaleY = mapDimensions.height / 400

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background grid
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Draw vertical grid lines
    for (let x = 0; x <= canvas.width; x += 50 * scaleX) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= canvas.height; y += 50 * scaleY) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw shelves
    shelves.forEach((shelf) => {
      ctx.fillStyle = shelf.lowStock ? "rgba(251, 191, 36, 0.3)" : "rgba(209, 213, 219, 0.5)"
      ctx.strokeStyle = shelf.lowStock ? "#f59e0b" : "#9ca3af"
      ctx.lineWidth = 1

      ctx.fillRect(shelf.x * scaleX, shelf.y * scaleY, shelf.width * scaleX, shelf.height * scaleY)
      ctx.strokeRect(shelf.x * scaleX, shelf.y * scaleY, shelf.width * scaleX, shelf.height * scaleY)

      // Draw shelf label
      ctx.fillStyle = "#374151"
      ctx.font = `${12 * Math.min(scaleX, scaleY)}px sans-serif`
      ctx.textAlign = "center"
      ctx.fillText(shelf.zone, (shelf.x + shelf.width / 2) * scaleX, (shelf.y + shelf.height / 2 + 5) * scaleY)
    })

    // Draw charging station
    ctx.fillStyle = "rgba(96, 165, 250, 0.3)"
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.fillRect(
      chargingStation.x * scaleX,
      chargingStation.y * scaleY,
      chargingStation.width * scaleX,
      chargingStation.height * scaleY,
    )
    ctx.strokeRect(
      chargingStation.x * scaleX,
      chargingStation.y * scaleY,
      chargingStation.width * scaleX,
      chargingStation.height * scaleY,
    )

    // Draw charging station label
    ctx.fillStyle = "#1e40af"
    ctx.font = `${14 * Math.min(scaleX, scaleY)}px sans-serif`
    ctx.textAlign = "center"
    ctx.fillText(
      "Charging",
      (chargingStation.x + chargingStation.width / 2) * scaleX,
      (chargingStation.y + chargingStation.height / 2) * scaleY,
    )
    ctx.fillText(
      "Station",
      (chargingStation.x + chargingStation.width / 2) * scaleX,
      (chargingStation.y + chargingStation.height / 2 + 20) * scaleY,
    )

    // Draw robots
    robots.forEach((robot) => {
      // Determine robot color based on status
      let color
      switch (robot.status) {
        case "active":
          color = "#10b981" // Green
          break
        case "charging":
          color = "#3b82f6" // Blue
          break
        case "error":
          color = "#ef4444" // Red
          break
        default:
          color = "#6b7280" // Gray
      }

      // Draw robot circle
      ctx.beginPath()
      ctx.arc(
        robot.x * scaleX,
        robot.y * scaleY,
        (robot.id === hoveredRobot ? 15 : 12) * Math.min(scaleX, scaleY),
        0,
        2 * Math.PI,
      )
      ctx.fillStyle = color
      ctx.fill()

      // Draw robot ID
      ctx.fillStyle = "white"
      ctx.font = `bold ${12 * Math.min(scaleX, scaleY)}px sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(robot.id.toString(), robot.x * scaleX, robot.y * scaleY)

      // Draw battery indicator for hovered robot
      if (robot.id === hoveredRobot) {
        const batteryWidth = 30 * scaleX
        const batteryHeight = 6 * scaleY
        const batteryX = (robot.x - batteryWidth / 2 / scaleX) * scaleX
        const batteryY = (robot.y + 20) * scaleY

        // Battery outline
        ctx.strokeStyle = "white"
        ctx.lineWidth = 1
        ctx.strokeRect(batteryX, batteryY, batteryWidth, batteryHeight)

        // Battery fill
        let batteryColor
        if (robot.battery > 70) batteryColor = "#10b981"
        else if (robot.battery > 30) batteryColor = "#f59e0b"
        else batteryColor = "#ef4444"

        ctx.fillStyle = batteryColor
        ctx.fillRect(batteryX, batteryY, batteryWidth * (robot.battery / 100), batteryHeight)
      }
    })
  }, [mapDimensions, hoveredRobot, hoveredShelf])

  // Handle mouse move to detect hover
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvas.width / rect.width)
    const y = (e.clientY - rect.top) * (canvas.height / rect.height)

    // Scale factors
    const scaleX = mapDimensions.width / 600
    const scaleY = mapDimensions.height / 400

    // Check if hovering over a robot
    let foundRobot = false
    for (const robot of robots) {
      const distance = Math.sqrt(Math.pow(robot.x * scaleX - x, 2) + Math.pow(robot.y * scaleY - y, 2))

      if (distance < 15 * Math.min(scaleX, scaleY)) {
        setHoveredRobot(robot.id)
        foundRobot = true
        break
      }
    }

    if (!foundRobot) {
      setHoveredRobot(null)
    }

    // Check if hovering over a shelf
    let foundShelf = false
    for (const shelf of shelves) {
      if (
        x >= shelf.x * scaleX &&
        x <= (shelf.x + shelf.width) * scaleX &&
        y >= shelf.y * scaleY &&
        y <= (shelf.y + shelf.height) * scaleY
      ) {
        setHoveredShelf(shelf.id)
        foundShelf = true
        break
      }
    }

    if (!foundShelf) {
      setHoveredShelf(null)
    }
  }

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full rounded-md" onMouseMove={handleMouseMove} />

      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                Active
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Robots currently performing tasks</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                Charging
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Robots currently recharging</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                Error
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Robots with issues that need attention</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                Low Stock
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Shelves with low inventory levels</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
