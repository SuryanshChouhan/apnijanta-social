"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Review, SupportRequest, College, BlogPost } from '../types';

interface GlobalContextType {
  reviewsList: Review[];
  setReviewsList: React.Dispatch<React.SetStateAction<Review[]>>;
  supportRequests: SupportRequest[];
  setSupportRequests: React.Dispatch<React.SetStateAction<SupportRequest[]>>;
  collegeList: College[];
  setCollegeList: React.Dispatch<React.SetStateAction<College[]>>;
  blogList: BlogPost[];
  setBlogList: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  handleAddReview: (newReview: Review) => Promise<void>;
  handleAddSupportRequest: (newRequest: SupportRequest) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [collegeList, setCollegeList] = useState<College[]>([]);
  const [blogList, setBlogList] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/blogs').then(r => r.json()).then(setBlogList).catch(console.error);
    fetch('/api/colleges').then(r => r.json()).then(setCollegeList).catch(console.error);
    fetch('/api/cases').then(r => r.json()).then(setSupportRequests).catch(console.error);
    fetch('/api/reviews').then(r => r.json()).then(setReviewsList).catch(console.error);
  }, []);

  const handleAddReview = async (newReview: Review) => {
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      setReviewsList(prev => [newReview, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSupportRequest = async (newRequest: SupportRequest) => {
    try {
      await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest)
      });
      setSupportRequests(prev => [newRequest, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <GlobalContext.Provider value={{
      reviewsList, setReviewsList,
      supportRequests, setSupportRequests,
      collegeList, setCollegeList,
      blogList, setBlogList,
      handleAddReview, handleAddSupportRequest
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}
