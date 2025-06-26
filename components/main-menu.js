"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  GraduationCap,
  Layers,
  UserPlus,
  UserMinus,
  Shield,
  FolderPlus,
  FolderMinus,
  Users,
  UserCog,
  Lock,
  FileText,
  ChevronDown,
  Settings,
} from "lucide-react"

const MenuItem = ({ href, icon: Icon, children }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground ${
        isActive ? "bg-accent text-accent-foreground" : ""
      }`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{children}</span>
    </Link>
  )
}

// Custom hover dropdown component
const HoverDropdown = ({ trigger, children, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef(null)
  const dropdownRef = useRef(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 100) // Small delay to make interaction smoother
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={dropdownRef}
      className={`relative ${className || ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cursor-pointer">{trigger}</div>
      {isOpen && (
        <div className="absolute left-0 mt-1 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none z-50 animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1">
          {children}
        </div>
      )}
    </div>
  )
}

export function MainMenu() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="mr-6 flex items-center">
          <Image
            src="/razor-sparrow-logo.png"
            alt="Razor Sparrow Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </div>
        <div className="flex items-center space-x-4 ml-20">
          {/* Teachers Dropdown */}
          <HoverDropdown
            trigger={
              <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>Teachers</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
            }
          >
            <div className="py-1">
              <MenuItem href="/teachers/add" icon={UserPlus}>
                Add Teacher
              </MenuItem>
              <MenuItem href="/teachers/remove" icon={UserMinus}>
                Remove Teacher
              </MenuItem>
              <MenuItem href="/teachers/access" icon={Shield}>
                Manage Access
              </MenuItem>
            </div>
          </HoverDropdown>

          {/* Portals Dropdown */}
          <HoverDropdown
            trigger={
              <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                <Layers className="h-4 w-4" />
                <span>Portals</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
            }
          >
            <div className="py-1">
              <MenuItem href="/portals/add" icon={FolderPlus}>
                Add Portal
              </MenuItem>
              <MenuItem href="/portals/remove" icon={FolderMinus}>
                Remove Portal
              </MenuItem>
              <MenuItem href="/portals/admins" icon={Users}>
                Manage Admins
              </MenuItem>
              <MenuItem href="/portals/teachers" icon={UserCog}>
                Manage Teachers
              </MenuItem>
              <MenuItem href="/portals/access" icon={Lock}>
                Manage Access
              </MenuItem>
            </div>
          </HoverDropdown>

          {/* Utilities Dropdown */}
          <HoverDropdown
            trigger={
              <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                <Settings className="h-4 w-4" />
                <span>Utilities</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
            }
          >
            <div className="py-1">
              <MenuItem href="/portals/invoice-utility" icon={FileText}>
                Invoice Item Description
              </MenuItem>
            </div>
          </HoverDropdown>
        </div>
      </div>
    </div>
  )
}
