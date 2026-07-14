import { Link } from 'wouter';
import { Plus, TrendingUp, Flame, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MainLayout } from '@/components/MainLayout';
import { StatCard } from '@/components/StatCard';
import { EmptyState } from '@/components/EmptyState';
import { useApp } from '@/contexts/AppContext';
import { ROUTES } from '@/routes';
import { formatDate, formatRelativeTime } from '@/lib/formatting';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { journals, dailyMoods, writingStreak } = useApp();

  const todayMood = dailyMoods.find(m => new Date(m.date).toDateString() === new Date().toDateString());
  const recentJournals = journals.slice(0, 5);
  const totalWords = journals.reduce((sum, j) => sum + j.content.split(/\s+/).length, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">Your Dashboard</h1>
            <p className="text-muted-foreground">Welcome back. Continue your journaling journey.</p>
          </div>
          <Link href={ROUTES.JOURNAL}>
            <Button size="lg" className="w-full md:w-auto">
              <Plus className="w-5 h-5 mr-2" />
              New Journal
            </Button>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              icon={<BookOpen className="w-6 h-6" />}
              label="Total Journals"
              value={journals.length}
              description={journals.length > 0 ? `${totalWords.toLocaleString()} words written` : 'Start your first journal'}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              icon={<Flame className="w-6 h-6" />}
              label="Writing Streak"
              value={writingStreak.current}
              description={`Longest: ${writingStreak.longest} days`}
              trend={writingStreak.current > 0 ? 'up' : 'neutral'}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              icon={<TrendingUp className="w-6 h-6" />}
              label="This Week"
              value={journals.filter(j => {
                const date = new Date(j.createdAt);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return date >= weekAgo;
              }).length}
              description="journals written"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              icon={todayMood ? '😊' : '📝'}
              label="Today's Mood"
              value={todayMood ? todayMood.mood : 'Not set'}
              description={todayMood ? `${todayMood.score}% confidence` : 'Write to analyze'}
            />
          </motion.div>
        </motion.div>

        {/* Recent Journals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Recent Journals</h2>
            {recentJournals.length > 0 ? (
              <div className="space-y-3">
                {recentJournals.map((journal, index) => (
                  <motion.div
                    key={journal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={`/journal/${journal.id}`}>
                      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{journal.title || 'Untitled'}</h3>
                            <p className="text-sm text-muted-foreground truncate">{journal.content.substring(0, 100)}...</p>
                            <p className="text-xs text-muted-foreground mt-2">{formatRelativeTime(journal.updatedAt)}</p>
                          </div>
                          {journal.mood && (
                            <div className="text-right flex-shrink-0">
                              <p className="text-2xl">{journal.mood}</p>
                              <p className="text-xs text-muted-foreground">{journal.moodScore}%</p>
                            </div>
                          )}
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="📝"
                title="No journals yet"
                description="Start your journaling journey by writing your first entry."
                actionLabel="Write First Journal"
                actionHref={ROUTES.JOURNAL}
              />
            )}
          </div>

          {journals.length > 5 && (
            <Link href={ROUTES.HISTORY}>
              <Button variant="outline" className="w-full">
                View All Journals
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
}
