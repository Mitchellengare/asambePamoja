import Link from "next/link"
import { Compass } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Wanderly</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Plan your next adventure together. Discover, collaborate, and create unforgettable travel experiences.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/discover" className="text-muted-foreground hover:text-foreground transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/trips" className="text-muted-foreground hover:text-foreground transition-colors">
                  Trending Trips
                </Link>
              </li>
              <li>
                <Link href="/ai-planner" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Planner
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-muted-foreground hover:text-foreground transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-foreground transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Wanderly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
