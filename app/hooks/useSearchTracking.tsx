"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function useSearchTracking() {
  const searchParams = useSearchParams();
  const [searchId, setSearchId] = useState<string | null>(null);

  useEffect(() => {
    const sid = searchParams.get('sid');
    setSearchId(sid);
  }, [searchParams]);

  const getSearchTrackingUrl = (baseUrl: string): string => {
    if (searchId) {
      const separator = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${separator}sid=${searchId}`;
    }
    return baseUrl;
  };

  const getSearchMetadata = () => ({
    search_uid: searchId,
    has_search: !!searchId,
  });

  return {
    searchId,
    getSearchTrackingUrl,
    getSearchMetadata,
  };
}
