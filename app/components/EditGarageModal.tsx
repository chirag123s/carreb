// app/components/EditGarageModal.tsx
"use client";

import React, { useState } from 'react';
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface GarageEntry {
  id: number;
  nickname: string;
  make: string;
  model: string;
  year: string;
  is_current_car: boolean;
}

interface EditGarageModalProps {
  entry: GarageEntry;
  onSave: (updatedEntry: Partial<GarageEntry>) => void;
  onClose: () => void;
}

export default function EditGarageModal({ entry, onSave, onClose }: EditGarageModalProps) {
  const [nickname, setNickname] = useState(entry.nickname);
  const [isCurrentCar, setIsCurrentCar] = useState(entry.is_current_car);

  const handleSave = () => {
    onSave({
      nickname,
      is_current_car: isCurrentCar,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Car Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Give your car a nickname"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="current-car"
              checked={isCurrentCar}
              onCheckedChange={setIsCurrentCar}
            />
            <Label htmlFor="current-car">This is my current car</Label>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-600">
              <strong>Car:</strong> {entry.make} {entry.model} {entry.year}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 mt-6">
          <Button onClick={handleSave} className="flex-1">
            Save Changes
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
