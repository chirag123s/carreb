"use client";

import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { garageService, GarageEntry } from '../services/garageService';

export function useGarage() {
  const { user, isAuthenticated } = useAuth0();
  const [garageEntries, setGarageEntries] = useState<GarageEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGarage = async () => {
    if (!isAuthenticated || !user?.sub) {
      setGarageEntries([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const entries = await garageService.getUserGarage(user.sub);
      setGarageEntries(entries);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch garage');
      console.error('Error fetching garage:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToGarage = async (searchUid: string, nickname?: string) => {
    if (!isAuthenticated || !user?.sub || !user?.email) {
      throw new Error('User not authenticated');
    }

    try {
      const newEntry = await garageService.moveSearchToGarage(
        searchUid, 
        user.sub, 
        user.email
      );
      setGarageEntries(prev => [newEntry, ...prev]);
      return newEntry;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to garage');
      throw err;
    }
  };

  const updateGarageEntry = async (entryId: number, updates: Partial<GarageEntry>) => {
    try {
      const updatedEntry = await garageService.updateGarageEntry(entryId, updates);
      setGarageEntries(prev => 
        prev.map(entry => 
          entry.id === entryId ? { ...entry, ...updatedEntry } : entry
        )
      );
      return updatedEntry;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update garage entry');
      throw err;
    }
  };

  const deleteGarageEntry = async (entryId: number) => {
    try {
      await garageService.deleteGarageEntry(entryId);
      setGarageEntries(prev => prev.filter(entry => entry.id !== entryId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete garage entry');
      throw err;
    }
  };

  const checkIfInGarage = (searchUid: string): boolean => {
    return garageEntries.some(entry => entry.original_search_uid === searchUid);
  };

  useEffect(() => {
    fetchGarage();
  }, [isAuthenticated, user]);

  return {
    garageEntries,
    loading,
    error,
    addToGarage,
    updateGarageEntry,
    deleteGarageEntry,
    checkIfInGarage,
    refetch: fetchGarage,
  };
}
