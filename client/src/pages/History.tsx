import { useState } from 'react';
import { Link } from 'wouter';
import { Search, Trash2, Edit2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MainLayout } from '@/components/MainLayout';
import { EmptyState } from '@/components/EmptyState';
import { useApp } from '@/contexts/AppContext';
import { useJournalSearch } from '@/hooks/useJournalSearch';
import { formatDate, wordCount } from '@/lib/formatting';
import { ROUTES } from '@/routes';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function History() {
  const { journals, deleteJournal } = useApp();
  const { searchQuery, setSearchQuery, sortBy, setSortBy, results } = useJournalSearch(journals);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    deleteJournal(id);
    setDeleteConfirm(null);
    toast.success('Journal deleted');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-display font-bold mb-2">Journal History</h1>
          <p className="text-muted-foreground">Browse and manage all your journal entries</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="space-y-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={sortBy === 'date' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('date')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Newest First
            </Button>
            <Button
              variant={sortBy === 'mood' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('mood')}
            >
              Sort by Mood
            </Button>
          </div>
        </motion.div>

        {/* Journal List */}
        {results.length > 0 ? (
          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {results.map((journal) => (
              <motion.div key={journal.id} variants={itemVariants}>
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <Link href={`/journal/${journal.id}`}>
                      <div className="flex-1 min-w-0 hover:opacity-80 transition-opacity cursor-pointer">
                        <h3 className="font-semibold truncate">{journal.title || 'Untitled'}</h3>
                        <p className="text-sm text-muted-foreground truncate">{journal.content.substring(0, 100)}...</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{formatDate(journal.createdAt)}</span>
                          <span>{wordCount(journal.content)} words</span>
                          {journal.mood && <span>{journal.mood} {journal.moodScore}%</span>}
                        </div>
                      </div>
                    </Link>

                    <div className="flex gap-2 flex-shrink-0">
                      <Link href={`/journal/${journal.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteConfirm(journal.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  {/* Delete Confirmation */}
                  {deleteConfirm === journal.id && (
                    <div className="mt-4 pt-4 border-t border-border flex gap-2">
                      <p className="text-sm text-muted-foreground flex-1">Delete this journal?</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDeleteConfirm(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(journal.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState
            icon="📚"
            title={searchQuery ? 'No journals found' : 'No journals yet'}
            description={searchQuery ? 'Try a different search term' : 'Start your journaling journey today'}
            actionLabel={!searchQuery ? 'Write First Journal' : undefined}
            actionHref={!searchQuery ? ROUTES.JOURNAL : undefined}
          />
        )}
      </div>
    </MainLayout>
  );
}
