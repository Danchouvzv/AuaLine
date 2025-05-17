/**
 * Format a date string to a more readable format
 * @param dateString - ISO date string format (YYYY-MM-DD)
 * @returns Formatted date string (e.g., "Nov 15, 2023")
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return '';
  }
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', 
    day: 'numeric', 
    year: 'numeric'
  }).format(date);
} 