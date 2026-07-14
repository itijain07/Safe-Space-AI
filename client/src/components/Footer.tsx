import { Link } from 'wouter';
import { ROUTES } from '@/routes';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Safe Space AI</h3>
            <p className="text-sm text-muted-foreground">
              A private AI journal that listens, understands and never leaves your device.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={ROUTES.DASHBOARD}><a className="hover:text-foreground transition-colors">Dashboard</a></Link></li>
              <li><Link href={ROUTES.JOURNAL}><a className="hover:text-foreground transition-colors">Write Journal</a></Link></li>
              <li><Link href={ROUTES.INSIGHTS}><a className="hover:text-foreground transition-colors">Insights</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Email</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Safe Space AI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            Built with privacy in mind. Your data never leaves your device.
          </p>
        </div>
      </div>
    </footer>
  );
}
