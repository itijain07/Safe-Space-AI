import { Link, useLocation } from 'wouter';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isHome = location === ROUTES.HOME;
  const isDashboard = location.startsWith('/dashboard') || location.startsWith('/journal') || location.startsWith('/analysis') || location.startsWith('/history') || location.startsWith('/insights') || location.startsWith('/settings');

  const navItems = isDashboard ? [
    { label: 'Dashboard', href: ROUTES.DASHBOARD },
    { label: 'History', href: ROUTES.HISTORY },
    { label: 'Insights', href: ROUTES.INSIGHTS },
    { label: 'Settings', href: ROUTES.SETTINGS },
  ] : [];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16">
        <Link href={ROUTES.HOME}>
          <a className="flex items-center gap-3 font-display font-bold text-xl hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg">
  <span className="text-white text-lg">🛡</span>
</div>
            <span className="hidden sm:inline">Safe Space AI</span>
          </a>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}>
              <a className={`text-sm font-medium transition-colors ${
                location === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}>
                {item.label}
              </a>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-lg"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {isDashboard && (
            <Button
              variant="default"
              size="sm"
              asChild
              className="hidden sm:flex"
            >
              <Link href={ROUTES.JOURNAL}>
                <a>New Journal</a>
              </Link>
            </Button>
          )}

          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && isDashboard && (
        <div className="md:hidden border-t border-border/40 bg-card">
          <div className="container py-4 space-y-3">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`block text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                    location === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <Link href={ROUTES.JOURNAL}>
              <a
                className="block text-sm font-medium py-2 px-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                onClick={() => setIsOpen(false)}
              >
                New Journal
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
