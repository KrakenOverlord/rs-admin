"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserCog, GraduationCap, Globe, UserPlus, KeyRound, PlusCircle, Shield, Trash2 } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function MainNav() {
  const pathname = usePathname()

  return (
    <header className="ml-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Razor Sparrow Admin</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {/* Teachers Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(pathname?.startsWith("/teachers") && "bg-accent text-accent-foreground")}
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Teachers
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-3 p-4">
                  <ListItem href="/teachers/create" title="Add Teacher" icon={<UserPlus className="h-4 w-4 mr-2" />}>
                    Add a new teacher to the system
                  </ListItem>
                  <ListItem href="/teachers/access" title="Manage Access" icon={<Shield className="h-4 w-4 mr-2" />}>
                    Manage teacher access types
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Portals Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(pathname?.startsWith("/portals") && "bg-accent text-accent-foreground")}
              >
                <Globe className="mr-2 h-4 w-4" />
                Portals
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-3 p-4">
                  <ListItem href="/portals/add" title="Add Portal" icon={<PlusCircle className="h-4 w-4 mr-2" />}>
                    Create a new portal
                  </ListItem>
                  <ListItem href="/portals/remove" title="Remove Portal" icon={<Trash2 className="h-4 w-4 mr-2" />}>
                    Remove an existing portal
                  </ListItem>
                  <ListItem href="/portals/access" title="Manage Access" icon={<KeyRound className="h-4 w-4 mr-2" />}>
                    Manage portal access
                  </ListItem>
                  <ListItem
                    href="/teachers/manage"
                    title="Manage Teachers"
                    icon={<GraduationCap className="h-4 w-4 mr-2" />}
                  >
                    Add or remove teachers
                  </ListItem>
                  <ListItem href="/admins/manage" title="Manage Admins" icon={<UserCog className="h-4 w-4 mr-2" />}>
                    Add or remove system administrators
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu */}
        <div className="flex md:hidden ml-auto space-x-2">
          <Link href="/teachers">
            <Button variant="ghost" size="icon">
              <GraduationCap className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/portals">
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

const ListItem = ({ className, title, href, children, icon }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
