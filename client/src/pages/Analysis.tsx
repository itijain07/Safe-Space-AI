import { useRoute, useLocation } from 'wouter';
import { ArrowLeft, Lightbulb, Star, Target, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MainLayout } from '@/components/MainLayout';
import { MoodCard } from '@/components/MoodCard';
import { AnalysisCard } from '@/components/AnalysisCard';
import { useApp } from '@/contexts/AppContext';
import { ROUTES } from '@/routes';
import { motion } from 'framer-motion';

export default function Analysis() {
  const [, params] = useRoute('/analysis/:id');
  const [, navigate] = useLocation();
  const { journals } = useApp();

  const journalId = params?.id;
  const journal = journals.find(j => j.id === journalId);

  if (!journal || !journal.analysis) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="text-center">
            <p className="text-muted-foreground">Analysis not found</p>
            <Button onClick={() => navigate(ROUTES.DASHBOARD)} className="mt-4">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const { analysis } = journal;

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
            <h1 className="text-3xl font-display font-bold">Your Insights</h1>
            <p className="text-sm text-muted-foreground">{journal.title || 'Untitled'}</p>
          </div>
        </motion.div>

        {/* Mood Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <MoodCard mood={analysis.mood} score={analysis.moodScore} />
        </motion.div>

        {/* Analysis Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Summary */}
          <motion.div variants={itemVariants}>
            <AnalysisCard
              title="Summary"
              icon="📝"
            >
              <p className="text-muted-foreground leading-relaxed">
                {analysis.summary}
              </p>
            </AnalysisCard>
          </motion.div>

          {/* Key Themes */}
          <motion.div variants={itemVariants}>
            <AnalysisCard
              title="Key Themes"
              icon="🎯"
            >
              {analysis.keyThemes.length > 0 ? (
                <div className="space-y-2">
                  {analysis.keyThemes.map((theme, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{theme}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No themes detected</p>
              )}
            </AnalysisCard>
          </motion.div>

          {/* Positive Highlights */}
          <motion.div variants={itemVariants}>
            <AnalysisCard
              title="Positive Highlights"
              icon="✨"
            >
              {analysis.positiveHighlights.length > 0 ? (
                <div className="space-y-3">
                  {analysis.positiveHighlights.map((highlight, i) => (
                    <div key={i} className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-sm text-foreground">{highlight}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No highlights yet</p>
              )}
            </AnalysisCard>
          </motion.div>

          {/* Suggestions */}
          <motion.div variants={itemVariants}>
            <AnalysisCard
              title="Suggestions"
              icon="💡"
            >
              <div className="space-y-2">
                {analysis.suggestions.map((suggestion, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">{i + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{suggestion}</p>
                  </div>
                ))}
              </div>
            </AnalysisCard>
          </motion.div>

          {/* Reflection Questions */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <AnalysisCard
              title="Reflection Questions"
              icon="🤔"
            >
              <div className="space-y-3">
                {analysis.reflectionQuestions.map((question, i) => (
                  <div key={i} className="p-4 bg-card border border-border rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-2">Question {i + 1}</p>
                    <p className="text-sm text-muted-foreground italic">{question}</p>
                  </div>
                ))}
              </div>
            </AnalysisCard>
          </motion.div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            Back to Dashboard
          </Button>
          <Button
            className="flex-1"
            onClick={() => navigate(ROUTES.JOURNAL)}
          >
            Write Another Entry
          </Button>
        </motion.div>
      </div>
    </MainLayout>
  );
}
