import { useState } from 'react';
import { Download, Trash2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MainLayout } from '@/components/MainLayout';
import { useApp } from '@/contexts/AppContext';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

export default function Settings() {
  const { exportData, clearAllData } = useApp();
  const { theme, toggleTheme } = useTheme();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `safe-space-ai-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Journals exported successfully');
  };

  const handleClearData = () => {
    clearAllData();
    setDeleteConfirm(false);
    toast.success('All data cleared');
  };

  return (
    <MainLayout>
      <div className="container py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and data</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Currently {theme === 'dark' ? 'enabled' : 'disabled'}
                </p>
              </div>
              <Button variant="outline" onClick={toggleTheme}>
                {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Privacy</h2>
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Your Data is Private</p>
                <p className="text-sm text-muted-foreground">
                  All your journals are stored locally on your device.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Export Your Data</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Download all your journals as a JSON file for backup.
            </p>
            <Button onClick={handleExport} variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export All Journals
            </Button>
          </Card>

          <Card className="p-6 border-destructive/20">
            <h2 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete all your journals and data.
            </p>
            {!deleteConfirm ? (
              <Button
                onClick={() => setDeleteConfirm(true)}
                variant="destructive"
                className="w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete All Data
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-medium">Are you sure? This cannot be undone.</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setDeleteConfirm(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleClearData}
                    variant="destructive"
                    className="flex-1"
                  >
                    Delete Everything
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Safe Space AI</strong>
              </p>
              <p>A private AI journal that listens, understands and never leaves your device.</p>
              <p className="pt-2">Built with privacy-first principles.</p>
              <p className="pt-4 text-xs">Version 1.0.0</p>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
