import { useEffect, useRef, useState } from 'react';

interface UseAutosaveOptions {
  enabled: boolean;
  interval: number;
  onSave: () => void;
}

export function useAutosave({ enabled, interval, onSave }: UseAutosaveOptions) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const scheduleAutosave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        setIsSaving(true);
        try {
          onSave();
          setLastSaved(new Date());
        } finally {
          setIsSaving(false);
        }
        scheduleAutosave();
      }, interval);
    };

    scheduleAutosave();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, interval, onSave]);

  const manualSave = async () => {
    setIsSaving(true);
    try {
      onSave();
      setLastSaved(new Date());
    } finally {
      setIsSaving(false);
    }
  };

  return { isSaving, lastSaved, manualSave };
}
