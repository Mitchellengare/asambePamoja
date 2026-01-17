"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Compass, Search, Menu, X, Map, Users, Sparkles, User } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Wanderly</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/discover">
              <Button variant="ghost" className="gap-2">
                <Map className="w-4 h-4" />
                Discover
              </Button>
            </Link>
            <Link href="/trips">
              <Button variant="ghost" className="gap-2">
                <Users className="w-4 h-4" />
                My Trips
              </Button>
            </Link>
            <Link href="/ai-planner">
              <Button variant="ghost" className="gap-2">
                <Sparkles className="w-4 h-4" />
                AI Planner
              </Button>
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center gap-2">
                  <Input placeholder="Search destinations..." className="w-64" autoFocus />
                  <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                  <Search className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Link href="/profile">
              <Button variant="outline" size="icon">
                <User className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/auth">
              <Button>Sign In</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              <Input placeholder="Search destinations..." className="mb-2" />
              <Link href="/discover">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Map className="w-4 h-4" />
                  Discover
                </Button>
              </Link>
              <Link href="/trips">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Users className="w-4 h-4" />
                  My Trips
                </Button>
              </Link>
              <Link href="/ai-planner">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Planner
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="w-full mt-2">Sign In</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
