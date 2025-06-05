// app/components/GarageCard.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Edit, Trash2, Share2, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CarsRating from './CarsRating';

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

interface GarageCardProps {
  entry: GarageEntry;
  onEdit: (entry: GarageEntry) => void;
  onDelete: (entryId: number) => void;
  onShare: (searchUid: string) => void;
}

export default function GarageCard({ entry, onEdit, onDelete, onShare }: GarageCardProps) {
  const handleShare = () => {
    if (entry.original_search_uid) {
      onShare(entry.original_search_uid);
    }
  };

  return (
    <Card className="relative hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              {entry.nickname || `${entry.make} ${entry.model}`}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {entry.make} {entry.model} {entry.year}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {entry.is_current_car && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                Current Car
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(entry)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                {entry.original_search_uid && (
                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  onClick={() => onDelete(entry.id)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <CarsRating 
            rating={4.2} 
            starRating={4}
            coo={4500}
            co2={2300}
            savings={150}
          />
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Added: {new Date(entry.created_at).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}
