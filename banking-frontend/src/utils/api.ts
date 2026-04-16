// Custom fetchApi utility for banking system
const API_BASE_URL = 'http://localhost:5000'; // Change this to your backend URL

// Generic API Response interface - matches backend response format
// Backend returns data directly on success, or error object on failure
export type ApiResponse<T = any> = T | {
  error: {
    message: string;
    status?: number;
  };
};

// Type guard to check if response is an error
export function isApiError<T>(response: ApiResponse<T>): response is { error: { message: string; status?: number } } {
  return (response as any).error !== undefined;
}
export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for session management
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Return error format that matches backend error responses
      return {
        error: {
          message: responseData.message || 'An error occurred',
          status: response.status,
        },
      };
    }

    // Return successful response directly (not wrapped in data property)
    // This matches the backend response format
    return responseData;
  } catch (error) {
    console.error('API Error:', error);
    return {
      error: {
        message: error instanceof Error ? error.message : 'Network error occurred',
      },
    };
  }
}