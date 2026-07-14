import { useMemo, useState } from 'react';
import { Journal } from '@/types';

export function useJournalSearch(journals: Journal[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'mood'>('date');

  const filteredAndSorted = useMemo(() => {
    let result = [...journals];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(journal =>
        journal.title.toLowerCase().includes(query) ||
        journal.content.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } else if (sortBy === 'mood') {
      result.sort((a, b) => (b.moodScore || 0) - (a.moodScore || 0));
    }

    return result;
  }, [journals, searchQuery, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    results: filteredAndSorted,
  };
}
