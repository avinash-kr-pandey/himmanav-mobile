export const colors = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  primaryLight: '#818cf8',
  secondary: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#1f2937',
  textLight: '#6b7280',
  textLighter: '#9ca3af',
  
  border: '#e5e7eb',
  borderDark: '#d1d5db',
  
  success: '#10b981',
  error: '#ef4444',
  
  transparent: 'transparent',
} as const;

export type ColorType = typeof colors;