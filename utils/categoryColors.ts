/**
 * Returns Tailwind classes for category badges based on category name.
 * Used across ToolCard and Tools page for consistent styling.
 */
export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Sleep':
      return 'bg-blue-50 text-blue-600 border-blue-100';
    case 'Metabolic':
      return 'bg-orange-50 text-orange-600 border-orange-100';
    case 'Labs':
      return 'bg-purple-50 text-purple-600 border-purple-100';
    case 'Wearables':
      return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'Recovery':
      return 'bg-rose-50 text-rose-600 border-rose-100';
    default:
      return 'bg-slate-50 text-slate-600 border-slate-100';
  }
};

/**
 * Darker variant for badges on light backgrounds (like featured cards)
 */
export const getCategoryColorDark = (category: string): string => {
  switch (category) {
    case 'Sleep':
      return 'bg-blue-100 text-blue-700';
    case 'Metabolic':
      return 'bg-orange-100 text-orange-700';
    case 'Labs':
      return 'bg-purple-100 text-purple-700';
    case 'Wearables':
      return 'bg-emerald-100 text-emerald-700';
    case 'Recovery':
      return 'bg-rose-100 text-rose-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};
