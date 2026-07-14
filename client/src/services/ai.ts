import { MoodAnalysis } from '@/types';

const MOOD_KEYWORDS = {
  happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'awesome', 'fantastic', 'excellent', 'delighted', 'cheerful', 'positive', 'grateful', 'blessed'],
  sad: ['sad', 'depressed', 'unhappy', 'miserable', 'down', 'blue', 'disappointed', 'heartbroken', 'lonely', 'grief', 'sorrowful', 'melancholy', 'devastated'],
  anxious: ['anxious', 'worried', 'nervous', 'stressed', 'overwhelmed', 'panic', 'fear', 'afraid', 'tense', 'uneasy', 'apprehensive', 'concerned'],
  calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'content', 'satisfied', 'comfortable', 'at ease', 'composed', 'mindful', 'centered'],
  angry: ['angry', 'furious', 'mad', 'rage', 'irritated', 'frustrated', 'annoyed', 'bitter', 'resentful', 'hostile', 'aggressive'],
  confused: ['confused', 'uncertain', 'lost', 'bewildered', 'perplexed', 'unclear', 'disoriented', 'puzzled', 'conflicted'],
  motivated: ['motivated', 'inspired', 'determined', 'driven', 'ambitious', 'energized', 'focused', 'purposeful', 'passionate'],
  tired: ['tired', 'exhausted', 'fatigued', 'drained', 'weary', 'burnt out', 'depleted', 'sleepy', 'lethargic'],
};

const MOOD_EMOJIS: Record<string, string> = {
  happy: '😊',
  sad: '😢',
  anxious: '😰',
  calm: '😌',
  angry: '😠',
  confused: '😕',
  motivated: '🚀',
  tired: '😴',
};

function detectMood(text: string): { mood: string; score: number } {
  const lowerText = text.toLowerCase();
  const moodScores: Record<string, number> = {};

  Object.entries(MOOD_KEYWORDS).forEach(([mood, keywords]) => {
    const matches = keywords.filter(keyword => lowerText.includes(keyword)).length;
    moodScores[mood] = matches;
  });

  const maxScore = Math.max(...Object.values(moodScores));
  const detectedMood = Object.entries(moodScores).find(([, score]) => score === maxScore)?.[0] || 'neutral';
  const score = maxScore > 0 ? Math.min(100, (maxScore / 5) * 100) : 50;

  return { mood: detectedMood, score };
}

function extractKeyThemes(text: string): string[] {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const themes: string[] = [];

  const themePatterns = [
    { pattern: /work|job|career|office|boss|colleague/gi, theme: 'Work & Career' },
    { pattern: /relationship|love|partner|family|friend|social/gi, theme: 'Relationships' },
    { pattern: /health|exercise|sleep|diet|wellness|body/gi, theme: 'Health & Wellness' },
    { pattern: /money|finance|budget|expense|income|debt/gi, theme: 'Finance' },
    { pattern: /learning|study|education|skill|growth|development/gi, theme: 'Personal Growth' },
    { pattern: /travel|adventure|explore|experience|trip/gi, theme: 'Travel & Adventure' },
    { pattern: /creative|art|music|write|design|build/gi, theme: 'Creativity' },
    { pattern: /goal|dream|plan|future|hope|vision/gi, theme: 'Goals & Dreams' },
  ];

  themePatterns.forEach(({ pattern, theme }) => {
    if (pattern.test(text)) {
      themes.push(theme);
    }
  });

  return themes.slice(0, 4);
}

function generatePositiveHighlights(text: string): string[] {
  const positiveWords = ['good', 'great', 'amazing', 'wonderful', 'accomplished', 'proud', 'grateful', 'blessed', 'successful', 'improved', 'better', 'progress'];
  const highlights: string[] = [];

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

  sentences.forEach(sentence => {
    if (positiveWords.some(word => sentence.toLowerCase().includes(word))) {
      const trimmed = sentence.trim();
      if (trimmed.length > 20) {
        highlights.push(trimmed);
      }
    }
  });

  return highlights.slice(0, 3);
}

function generateSuggestions(mood: string, text: string): string[] {
  const suggestions: Record<string, string[]> = {
    happy: [
      'Keep this positive energy by sharing it with someone close to you',
      'Document what made you happy today for future reference',
      'Consider how you can maintain this good mood tomorrow',
    ],
    sad: [
      'Consider reaching out to someone you trust',
      'Try a gentle activity that usually brings you comfort',
      'Remember that feelings are temporary and will pass',
    ],
    anxious: [
      'Try a grounding technique: focus on your breathing',
      'Break down your concerns into smaller, manageable steps',
      'Consider what you can control and what you cannot',
    ],
    calm: [
      'Maintain this peaceful state by continuing mindful practices',
      'Reflect on what brought you this calm',
      'Share this tranquility with others around you',
    ],
    angry: [
      'Take time to cool down before making decisions',
      'Try to understand the root cause of your anger',
      'Consider a physical activity to release tension',
    ],
    confused: [
      'Write down the specific things that confuse you',
      'Break down the situation into smaller parts',
      'Seek clarity by talking to someone or researching',
    ],
    motivated: [
      'Channel this energy into your goals and projects',
      'Use this momentum to tackle challenging tasks',
      'Document what triggered this motivation',
    ],
    tired: [
      'Prioritize rest and recovery',
      'Consider what might be draining your energy',
      'Plan a restorative activity for yourself',
    ],
  };

  return suggestions[mood] || [
    'Reflect on what you wrote today',
    'Consider one small step you can take tomorrow',
    'Be kind to yourself',
  ];
}

function generateReflectionQuestions(text: string): string[] {
  const questions = [
    'What was the most significant moment in your day?',
    'How did your actions align with your values today?',
    'What are you grateful for, even if it\'s small?',
    'What would you do differently if you could?',
    'What did you learn about yourself today?',
    'How did you grow today?',
    'What are you looking forward to tomorrow?',
    'What would make tomorrow better than today?',
  ];

  return questions.sort(() => Math.random() - 0.5).slice(0, 3);
}

export const aiService = {
  analyzeMood: async (text: string): Promise<MoodAnalysis> => {
    if (!text || text.trim().length === 0) {
      return {
        mood: 'neutral',
        moodScore: 50,
        summary: 'No content to analyze',
        keyThemes: [],
        positiveHighlights: [],
        suggestions: [],
        reflectionQuestions: [],
        confidence: 0,
      };
    }

    const { mood, score } = detectMood(text);
    const keyThemes = extractKeyThemes(text);
    const positiveHighlights = generatePositiveHighlights(text);
    const suggestions = generateSuggestions(mood, text);
    const reflectionQuestions = generateReflectionQuestions(text);

    const wordCount = text.split(/\s+/).length;
    const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    const summary = `You wrote ${wordCount} words across ${sentenceCount} thoughts. Your overall mood appears to be ${mood}, with a confidence level of ${Math.round(score)}%.`;

    return {
      mood,
      moodScore: Math.round(score),
      summary,
      keyThemes,
      positiveHighlights,
      suggestions,
      reflectionQuestions,
      confidence: Math.min(100, Math.round((keyThemes.length * 25) + score) / 2),
    };
  },

  getMoodEmoji: (mood: string): string => {
    return MOOD_EMOJIS[mood] || '😐';
  },

  getMoodColor: (mood: string): string => {
    const colors: Record<string, string> = {
      happy: 'oklch(0.7 0.15 70)',
      sad: 'oklch(0.65 0.12 15)',
      anxious: 'oklch(0.6 0.12 240)',
      calm: 'oklch(0.5 0.12 240)',
      angry: 'oklch(0.65 0.12 15)',
      confused: 'oklch(0.6 0.12 280)',
      motivated: 'oklch(0.7 0.15 70)',
      tired: 'oklch(0.5 0.01 260)',
    };
    return colors[mood] || 'oklch(0.4 0.15 280)';
  },
};
