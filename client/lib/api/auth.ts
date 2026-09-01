const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function adminLogin(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
}
