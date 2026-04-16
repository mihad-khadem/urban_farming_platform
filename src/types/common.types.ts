// Common types for the application
// Send API response type
export interface ApiResponse {
  success?: boolean;
  status?: number;
  message?: string | null;
  data?: any;
  meta?: any;
}
