import { useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, BookOpen, Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { MainLayout } from '@/components/MainLayout';
import { StatCard } from '@/components/StatCard';
import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';

export default function Insights() {
  const { journals, dailyMoods, writingStreak } = useApp();

  const moodDistribution = useMemo(() => {
    const dist: Record<string, number> = {};
    journals.forEach(j => {
      if (j.mood) {
        dist[j.mood] = (dist[j.mood] || 0) + 1;
      }
    });
    return Object.entries(dist).map(([mood, count]) => ({
      name: mood.charAt(0).toUpperCase() + mood.slice(1),
      value: count,
    }));
  }, [journals]);

  const weeklyData = useMemo(() => {
    const data: Record<string, number> = {};
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { weekday: 'short' });
      data[dateStr] = 0;
    }

    journals.forEach(j => {
      const date = new Date(j.createdAt);
      const dateStr = date.toLocaleDateString('en-US', { weekday: 'short' });
      if (dateStr in data) {
        data[dateStr]++;
      }
    });

    return Object.entries(data).map(([day, count]) => ({ day, count }));
  }, [journals]);

  const totalWords = journals.reduce((sum, j) => sum + j.content.split(/\s+/).length, 0);
  const avgWordsPerEntry = journals.length > 0 ? Math.round(totalWords / journals.length) : 0;

  const COLORS = ['#a78bfa', '#f87171', '#60a5fa', '#34d399', '#fbbf24'];

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
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-display font-bold mb-2">Your Insights</h1>
          <p className="text-muted-foreground">Track your emotional journey and writing patterns</p>
        </motion.div>

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
              description={`${totalWords.toLocaleString()} total words`}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              icon={<TrendingUp className="w-6 h-6" />}
              label="Average Words"
              value={avgWordsPerEntry}
              description="per entry"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              icon={<Calendar className="w-6 h-6" />}
              label="This Week"
              value={journals.filter(j => {
                const date = new Date(j.createdAt);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return date >= weekAgo;
              }).length}
              description="entries written"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              icon={<Flame className="w-6 h-6" />}
              label="Writing Streak"
              value={writingStreak.current}
              description={`Longest: ${writingStreak.longest}`}
              trend={writingStreak.current > 0 ? 'up' : 'neutral'}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#a78bfa" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Mood Distribution</h2>
              {moodDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={moodDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {moodDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-72 flex items-center justify-center text-muted-foreground">
                  No mood data yet
                </div>
              )}
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
