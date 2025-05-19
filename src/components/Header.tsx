import React from "react";
import { SearchInput } from "../components/SearchInput";

export interface HeaderProps {
  /**
   * The title to display in the header
   */
  title: string;
  /**
   * Optional subtitle to display under the title
   */
  subtitle?: string;
  /**
   * Current search term
   */
  searchTerm?: string;
  /**
   * Callback when search term changes
   */
  onSearchChange?: (term: string) => void;
  /**
   * Custom CSS classes
   */
  className?: string;
  /**
   * Right side content (optional)
   */
  rightContent?: React.ReactNode;
  /**
   * Whether to show the search bar
   */
  showSearch?: boolean;
}

/**
 * Header component with Contentious styling
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  searchTerm = "",
  onSearchChange,
  className = "",
  rightContent,
  showSearch = true
}) => {
  return (
    <header 
      className={`sticky top-0 z-10 border-b border-border shadow-md ${className}`} 
      style={{ backgroundColor: 'var(--background-color)' }}
    >
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="tracking-tight text-4xl" style={{ color: 'var(--theme-header-color)' }}>
            <span>{title}</span>
          </h1>
          {subtitle && (
            <p className="text-lg text-foreground/80">{subtitle}</p>
          )}
        </div>
        
        <div className="flex flex-shrink-0 items-center">
          {showSearch && onSearchChange && (
            <SearchInput value={searchTerm} onChange={onSearchChange} />
          )}
          {rightContent}
        </div>
      </div>
    </header>
  );
}

export default Header;