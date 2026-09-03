export interface AdminCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string | null;
  orders?: number;
  lifetimeSpend?: string;
  avgOrderValue?: string;
  dealsJoined?: number;
  segment?: string;
}

export interface CustomerProfile extends AdminCustomer {
  addresses: any[];
  recentOrders?: any[];
}

export interface FetchCustomersParams {
  search?: string;
  segment?: string;
  page?: number;
  limit?: number;
}

export interface FetchCustomersResponse {
  data: AdminCustomer[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Helper to get token (adjust based on your auth implementation)
const getAuthHeaders = () => {
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('adminToken') || '';
  }
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const adminCustomersApi = {
  fetchCustomers: async (params: FetchCustomersParams = {}): Promise<FetchCustomersResponse> => {
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.append('search', params.search);
    if (params.segment) searchParams.append('segment', params.segment);
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());

    const queryString = searchParams.toString();
    const url = `${API_URL}/admin/customers${queryString ? '?' + queryString : ''}`;
    
    const res = await fetch(url, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch customers');
    return res.json();
  },

  fetchCustomerById: async (id: string): Promise<CustomerProfile> => {
    const res = await fetch(`${API_URL}/admin/customers/${id}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch customer profile');
    return res.json();
  },

  toggleSuspend: async (id: string, isActive: boolean): Promise<{ id: string, isActive: boolean }> => {
    const res = await fetch(`${API_URL}/admin/customers/${id}/suspend`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ isActive }),
    });
    if (!res.ok) throw new Error('Failed to toggle customer status');
    return res.json();
  }
};
