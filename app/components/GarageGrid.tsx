
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import GarageCard from './GarageCard';
import EditGarageModal from './EditGarageModal';
import ShareModal from './ShareModal';
import { Card, CardContent } from '@/components/ui/card';

interface GarageEntry {
  id: number;
  nickname: string;
  make: string;
  model: string;
  year: string;
  is_current_car: boolean;
  original_search_uid?: string;
  created_at: string;
}

export default function GarageGrid() {
  const { user, isAuthenticated } = useAuth0();
  const [garageEntries, setGarageEntries] = useState<GarageEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEntry, setEditingEntry] = useState<GarageEntry | null>(null);
  const [shareSearchUid, setShareSearchUid] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      fetchGarageEntries();
    }
  }, [isAuthenticated, user]);

  const fetchGarageEntries = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/garage/list/?user_id=${user?.sub}`);
      const data = await response.json();
      
      if (response.ok) {
        setGarageEntries(data.garage || []);
      } else {
        console.error('Failed to fetch garage entries');
      }
    } catch (error) {
      console.error('Error fetching garage entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (entry: GarageEntry) => {
    setEditingEntry(entry);
  };

  const handleDelete = async (entryId: number) => {
    if (confirm('Are you sure you want to delete this car from your garage?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/garage/${entryId}/`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setGarageEntries(prev => prev.filter(entry => entry.id !== entryId));
        } else {
          console.error('Failed to delete garage entry');
        }
      } catch (error) {
        console.error('Error deleting garage entry:', error);
      }
    }
  };

  const handleShare = (searchUid: string) => {
    setShareSearchUid(searchUid);
  };

  const handleSaveEdit = async (updatedEntry: Partial<GarageEntry>) => {
    if (!editingEntry) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/garage/${editingEntry.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEntry),
      });

      if (response.ok) {
        const result = await response.json();
        setGarageEntries(prev => 
          prev.map(entry => 
            entry.id === editingEntry.id 
              ? { ...entry, ...result.garage_entry }
              : entry
          )
        );
        setEditingEntry(null);
      } else {
        console.error('Failed to update garage entry');
      }
    } catch (error) {
      console.error('Error updating garage entry:', error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {garageEntries.map((entry) => (
          <GarageCard
            key={entry.id}
            entry={entry}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShare={handleShare}
          />
        ))}
        
        {/* Add New Car Card */}
        <Card className="border-dashed border-2 hover:border-green-500 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-64">
            <Plus className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-center">
              Add a new car to your garage
            </p>
            <Button className="mt-4" variant="outline">
              Add Car
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      {editingEntry && (
        <EditGarageModal
          entry={editingEntry}
          onSave={handleSaveEdit}
          onClose={() => setEditingEntry(null)}
        />
      )}

      {/* Share Modal */}
      {shareSearchUid && (
        <ShareModal
          searchUid={shareSearchUid}
          onClose={() => setShareSearchUid(null)}
        />
      )}
    </div>
  );
}