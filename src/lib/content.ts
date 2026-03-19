/**
 * Content loading utilities for markdown and JSON files.
 * Edit files in public/content/ to update the website without touching code.
 */

import matter from "gray-matter";

const CONTENT_BASE = "/content";

export async function fetchText(path: string): Promise<string> {
  const res = await fetch(`${CONTENT_BASE}/${path}`);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.text();
}

export async function fetchJson<T>(path: string): Promise<T> {
  const text = await fetchText(path);
  return JSON.parse(text) as T;
}

export interface MarkdownContent<T = Record<string, unknown>> {
  data: T;
  content: string;
}

export async function fetchMarkdown<T = Record<string, unknown>>(
  path: string
): Promise<MarkdownContent<T>> {
  const text = await fetchText(path);
  const { data, content } = matter(text);
  return { data: data as T, content };
}
