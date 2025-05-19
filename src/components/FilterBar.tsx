import React from "react";
import { Grid, List } from "lucide-react";

export interface FilterTag {
  id: string;
  name: string;
  color?: string;
}

export interface FilterBarProps {
  /**
   * Array of available tags for filtering
   */
  tags: FilterTag[];
  /**
   * Currently active tag names
   */
  activeTags: string[];
  /**
   * Callback when a tag is toggled
   */
  onTagToggle: (tag: string) => void;
  /**
   * Current view mode (grid or list)
   */
  viewMode?: "grid" | "list";
  /**
   * Callback when view mode changes
   */
  setViewMode?: (mode: "grid" | "list") => void;
  /**
   * Count of items after filtering
   */
  filteredCount: number;
  /**
   * Total count of items before filtering
   */
  totalCount: number;
  /**
   * Whether to show the view mode toggle
   */
  showViewToggle?: boolean;
  /**
   * Custom CSS classes
   */
  className?: string;
}

/**
 * FilterBar component with Contentious styling
 */
export const FilterBar: React.FC<FilterBarProps> = ({
  tags,
  activeTags,
  onTagToggle,
  viewMode = "grid",
  setViewMode,
  filteredCount,
  totalCount,
  showViewToggle = true,
  className = ""
}) => {
  // Get tag style based on active state
  const getTagStyle = (tagName: string, isActive: boolean) => {
    const baseClasses = "filter-button transition-all duration-400";
    
    if (isActive) {
      // For active tags
      return `${baseClasses} active bg-primary text-primary-foreground border-primary hover:bg-primary hover:text-primary-foreground`;
    }

    // All inactive buttons with proper theming support
    return `${baseClasses} bg-muted/50 text-foreground/80 border border-border/20 hover:bg-gloaming-dark hover:border-gloaming hover:text-limestone`;
  };

  // Format tag name for display based on count
  const formatTagName = (tagName: string, count: number): string => {
    // If count is 1, use singular form
    if (count === 1) {
      return tagName;
    }
    
    // Otherwise use plural form
    // Handle special cases or irregular plurals
    if (tagName.toLowerCase() === "campaign") return "Campaigns";
    if (tagName.toLowerCase() === "content") return "Content";
    if (tagName.toLowerCase() === "style guide") return "Style guides";
    if (tagName.toLowerCase() === "app") return "Apps";
    
    // Regular pluralization (add 's')
    return `${tagName}s`;
  };

  // Get readable text for active filters
  const getFiltersText = () => {
    if (activeTags.length === 0) {
      // Default case - no filters
      return `Showing <span class="font-medium text-foreground">${filteredCount}</span> ${filteredCount === 1 ? 'thing' : 'things'}`;
    }
    
    if (activeTags.length === 1) {
      // Single filter case - use singular or plural based on count
      return `Showing <span class="font-medium text-foreground">${filteredCount}</span> ${formatTagName(activeTags[0], filteredCount)}`;
    }
    
    // Multiple filters case - list the tags
    return `Showing <span class="font-medium text-foreground">${filteredCount}</span> ${filteredCount === 1 ? 'thing' : 'things'} in ${activeTags.join(", ")}`;
  };

  return (
    <div className={`mb-8 ${className}`}>
      {/* View toggle - hidden on mobile */}
      {showViewToggle && setViewMode && (
        <div className="hidden md:flex justify-end mb-5">
          <div className="flex items-center">
            <span className="text-muted-foreground mr-2">View:</span>
            <div className="flex border border-border/30 rounded-[4px] overflow-hidden">
              <button
                type="button"
                className={`px-3 py-1.5 h-auto view-button rounded-none ${
                  viewMode === "grid" 
                    ? "bg-primary text-primary-foreground active" 
                    : "bg-muted/50 text-foreground/80"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4 mr-1 inline-block" />
                Grid
              </button>
              <button
                type="button"
                className={`px-3 py-1.5 h-auto view-button rounded-none ${
                  viewMode === "list" 
                    ? "bg-primary text-primary-foreground active" 
                    : "bg-muted/50 text-foreground/80"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-1 inline-block" />
                List
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            className={`px-2.5 py-1 h-auto rounded-[4px] font-medium ${getTagStyle(tag.name, activeTags.includes(tag.name))}`}
            onClick={() => onTagToggle(tag.name)}
          >
            <span className="flex items-center">
              {tag.name}
            </span>
          </button>
        ))}
      </div>
      
      {/* Count display */}
      <div 
        className="intro-text text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: getFiltersText() }}
      />
    </div>
  );
}

export default FilterBar;