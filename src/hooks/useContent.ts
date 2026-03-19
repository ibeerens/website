import { useState, useEffect } from "react";
import { fetchMarkdown, fetchJson, MarkdownContent } from "@/lib/content";

export function useMarkdown<T = Record<string, unknown>>(path: string | null) {
  const [data, setData] = useState<MarkdownContent<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!path) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchMarkdown<T>(path)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [path]);

  return { data, loading, error };
}

export function useJson<T>(path: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!path) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchJson<T>(path)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [path]);

  return { data, loading, error };
}
