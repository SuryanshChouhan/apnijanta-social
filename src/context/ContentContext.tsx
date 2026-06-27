'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ContentItem = {
  id: string;
  value: string;
  section: string;
  field_type?: string;
};

type ContentContextType = {
  content: Record<string, string>;
  contentArray: ContentItem[];
  loading: boolean;
  refreshContent: () => Promise<void>;
  getContentArray: <T>(key: string) => T[];
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Record<string, string>>({});
  const [contentArray, setContentArray] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      if (!res.ok) throw new Error('Failed to fetch content');
      const data: ContentItem[] = await res.json();
      
      const contentMap: Record<string, string> = {};
      data.forEach(item => {
        contentMap[item.id] = item.value;
      });

      setContent(contentMap);
      setContentArray(data);
    } catch (error) {
      console.error('Error fetching CMS content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const getContentArray = <T,>(key: string): T[] => {
    const val = content[key];
    if (!val) return [];
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error(`Failed to parse JSON for CMS key: ${key}`, e);
      return [];
    }
  };

  return (
    <ContentContext.Provider value={{ content, contentArray, loading, refreshContent: fetchContent, getContentArray }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
