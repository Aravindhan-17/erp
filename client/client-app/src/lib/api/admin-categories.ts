export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  parentId?: string | null;
  bannerUrl?: string | null;
  imageUrl?: string | null;
  status: string;
  industry: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
  parent?: Category | null;
}

export interface CreateCategoryDto {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  bannerUrl?: string;
  imageUrl?: string;
  status?: string;
  industry?: string;
  isActive?: boolean;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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

export const adminCategoriesApi = {
  fetchCategories: async (): Promise<Category[]> => {
    const res = await fetch(`${API_URL}/admin/categories`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  fetchCategoryById: async (id: string): Promise<Category> => {
    const res = await fetch(`${API_URL}/admin/categories/${id}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch category');
    return res.json();
  },

  createCategory: async (data: CreateCategoryDto): Promise<Category> => {
    const res = await fetch(`${API_URL}/admin/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create category');
    return res.json();
  },

  updateCategory: async (id: string, data: UpdateCategoryDto): Promise<Category> => {
    const res = await fetch(`${API_URL}/admin/categories/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update category');
    return res.json();
  },

  deleteCategory: async (id: string): Promise<Category> => {
    const res = await fetch(`${API_URL}/admin/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete category');
    return res.json();
  }
};
