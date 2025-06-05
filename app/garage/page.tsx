// app/garage/page.tsx
"use client";

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Suspense } from 'react';
import { Car, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GarageGrid from '../components/GarageGrid';
import { ProtectedRoute } from '../components/ProctectedRoute';
import Link from 'next/link';

export default function GaragePage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<GaragePageSkeleton />}>
        <GarageContent />
      </Suspense>
    </ProtectedRoute>
  );
}

function GarageContent() {
  const { user } = useAuth0();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Car className="h-8 w-8" />
              My Garage
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your cars and explore new recommendations
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/car-search">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Find New Car
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <GarageGrid />

      {/* Quick Actions */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Compare Cars</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Compare your saved cars side by side to see which offers better value.
            </p>
            <Button variant="outline" size="sm">
              Start Comparison
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get AI-powered recommendations based on your preferences and history.
            </p>
            <Link href="/smart-car-finder">
              <Button variant="outline" size="sm">
                Get Recommendations
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Share Your Results</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Share your car search results with friends and family.
            </p>
            <Button variant="outline" size="sm">
              Share Results
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function GaragePageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}


// app/services/garageService.ts
export interface GarageEntry {
  id: number;
  user_id: string;
  user_email: string;
  nickname: string;
  make: string;
  model: string;
  year: string;
  engine_type: string;
  is_current_car: boolean;
  original_search_uid?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentIntegrationRequest {
  payment_uuid?: string;
  user_id: string;
  user_email: string;
  search_uid?: string;
  plan_name?: string;
}

class GarageService {
  private apiUrl = process.env.NEXT_PUBLIC_API_URL;

  async getUserGarage(userId: string): Promise<GarageEntry[]> {
    try {
      const response = await fetch(`${this.apiUrl}/garage/list/?user_id=${userId}`);
      console.log()
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch garage');
      }
      
      return data.garage || [];
    } catch (error) {
      console.error('Error fetching garage:', error);
      throw error;
    }
  }

  async updateGarageEntry(entryId: number, updates: Partial<GarageEntry>): Promise<GarageEntry> {
    try {
      const response = await fetch(`${this.apiUrl}/garage/${entryId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update garage entry');
      }
      
      return data.garage_entry;
    } catch (error) {
      console.error('Error updating garage entry:', error);
      throw error;
    }
  }

  async deleteGarageEntry(entryId: number): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/garage/${entryId}/`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete garage entry');
      }
    } catch (error) {
      console.error('Error deleting garage entry:', error);
      throw error;
    }
  }

  async processPaymentSuccess(request: PaymentIntegrationRequest): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/integration/payment-success/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process payment success');
      }
      
      return data;
    } catch (error) {
      console.error('Error processing payment success:', error);
      throw error;
    }
  }

  async moveSearchToGarage(searchUid: string, userId: string, userEmail: string): Promise<GarageEntry> {
    try {
      const response = await fetch(`${this.apiUrl}/garage/move-search/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search_uid: searchUid,
          user_id: userId,
          user_email: userEmail,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to move search to garage');
      }
      
      return data.garage_entry;
    } catch (error) {
      console.error('Error moving search to garage:', error);
      throw error;
    }
  }

  async createShareableLink(searchUid: string): Promise<string> {
    try {
      const baseUrl = window.location.origin;
      return `${baseUrl}/smart-car-finder?sid=${searchUid}`;
    } catch (error) {
      console.error('Error creating shareable link:', error);
      throw error;
    }
  }
}

export const garageService = new GarageService();