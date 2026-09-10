export const UPLOAD_CONSTRAINTS = {
  categories: {
    maxSize: 5 * 1024 * 1024, // 5MB
    types: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  },
  products: {
    maxSize: 10 * 1024 * 1024, // 10MB
    types: ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'],
  },
  avatars: {
    maxSize: 2 * 1024 * 1024, // 2MB
    types: ['image/jpeg', 'image/png', 'image/webp'],
  },
} as const;
