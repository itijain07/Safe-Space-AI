import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Save, Zap, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { MainLayout } from '@/components/MainLayout';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useApp } from '@/contexts/AppContext';
import { aiService } from '@/services/ai';
import { useAutosave } from '@/hooks/useAutosave';
import { wordCount, characterCount, readingTime, formatRelativeTime } from '@/lib/formatting';
import { ROUTES, getAnalysisRoute } from '@/routes';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';

export default function JournalEditor() {
  const [, params] = useRoute('/journal/:id');
  const [, navigate] = useLocation();
  const { journals, createJournal, updateJournal } = useApp();

  const journalId = params?.id;
  const isNew = journalId === 'new';
  const journal = isNew ? null : journals.find(j => j.id === journalId);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (journal) {
      setTitle(journal.title || '');
      setContent(journal.content);
    }
  }, [journal]);

  const { isSaving, lastSaved, manualSave } = useAutosave({
    enabled: true,
    interval: 30000,
    onSave: () => {
      if (isNew) {
        if (content.trim()) {
          const newJournal = createJournal(title || 'Untitled', content);
          navigate(`/journal/${newJournal.id}`);
        }
      } else if (journal) {
        updateJournal({
          ...journal,
          title: title || 'Untitled',
          content,
        });
      }
    },
  });

  const handleAnalyze = async () => {
    if (!content.trim()) {
      toast.error('Please write something to analyze');
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = await aiService.analyzeMood(content);

      if (journal) {
        updateJournal({
          ...journal,
          title: title || 'Untitled',
          content,
          mood: analysis.mood,
          moodScore: analysis.moodScore,
          analysis,
        });
      } else {
        const newJournal = createJournal(title || 'Untitled', content);
        updateJournal({
          ...newJournal,
          mood: analysis.mood,
          moodScore: analysis.moodScore,
          analysis,
        });
        navigate(getAnalysisRoute(newJournal.id));
        return;
      }

      navigate(getAnalysisRoute(journal?.id || ''));
      toast.success('Analysis complete! Check your insights.');
    } catch (error) {
      toast.error('Failed to analyze. Please try again.');
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = async () => {
    await manualSave();
    toast.success('Journal saved successfully');
  };

  const wc = wordCount(content);
  const cc = characterCount(content);
  const rt = readingTime(content);

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-display font-bold">Write Your Thoughts</h1>
            <p className="text-sm text-muted-foreground">
              {lastSaved ? `Last saved ${formatRelativeTime(lastSaved)}` : 'Auto-saving enabled'}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Editor */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title (Optional)</label>
              <Input
                placeholder="Give your entry a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Your Thoughts</label>
              <Textarea
                placeholder="Write freely. Express your thoughts, feelings, and reflections. Your words are private and never leave your device."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-96 resize-none text-base leading-relaxed"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                variant="outline"
                className="flex-1"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !content.trim()}
                className="flex-1"
              >
                <Zap className="w-4 h-4 mr-2" />
                {isAnalyzing ? 'Analyzing...' : 'Analyze & Get Insights'}
              </Button>
            </div>
          </div>

          {/* Sidebar Stats */}
          <motion.div
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="bg-card rounded-lg p-4 space-y-4 sticky top-24">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Word Count</p>
                <p className="text-3xl font-bold">{wc}</p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Characters</p>
                <p className="text-2xl font-semibold">{cc.toLocaleString()}</p>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Reading Time</p>
                </div>
                <p className="text-2xl font-semibold">{rt} min</p>
              </div>

              {isAnalyzing && (
                <div className="border-t border-border pt-4">
                  <LoadingSpinner size="sm" message="Analyzing..." />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
