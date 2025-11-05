/**
 * Asset Path Utility
 * Handles asset paths with base URL for GitHub Pages
 */

/**
 * Get asset path with base URL
 * @param path - Asset path starting with / or without
 * @returns Asset path with base URL (e.g., /Portolio/assets/...)
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Split path into segments and encode each segment (but keep slashes)
  const segments = cleanPath.split('/');
  const encodedSegments = segments.map(segment => {
    // Encode each segment but preserve slashes
    return encodeURIComponent(segment);
  });
  const encodedPath = encodedSegments.join('/');
  
  // Get base URL from Vite (includes trailing slash, e.g., "/Portolio/")
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // Combine base URL with encoded path
  // baseUrl already has trailing slash, encodedPath should not start with /
  return `${baseUrl}${encodedPath}`;
}

