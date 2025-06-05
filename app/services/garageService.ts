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
      const response = await fetch(`${this.apiUrl}/api/garage/list/?user_id=${userId}`);
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
      const response = await fetch(`${this.apiUrl}/api/garage/${entryId}/`, {
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
      const response = await fetch(`${this.apiUrl}/api/garage/${entryId}/`, {
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
      const response = await fetch(`${this.apiUrl}/api/integration/payment-success/`, {
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
      const response = await fetch(`${this.apiUrl}/api/garage/move-search/`, {
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