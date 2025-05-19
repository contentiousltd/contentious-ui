import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

export interface SearchInputProps {
  /**
   * Current search value
   */
  value: string;
  /**
   * Callback when search value changes
   */
  onChange: (value: string) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Custom CSS classes
   */
  className?: string;
  /**
   * Whether the search input starts expanded
   */
  initiallyExpanded?: boolean;
}

/**
 * Expandable search input with Contentious styling
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search things...",
  className = "",
  initiallyExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle click outside to collapse search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current && 
        !wrapperRef.current.contains(event.target as Node) && 
        isExpanded && 
        value === ""
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, value]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleClear = () => {
    onChange("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      ref={wrapperRef}
      className={`relative transition-all duration-300 rounded-full ${
        isExpanded ? "w-64" : "w-10"
      } ${className}`}
    >
      <div className="relative flex items-center">
        <button
          type="button"
          aria-label="Search"
          onClick={() => setIsExpanded(true)}
          className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
            isExpanded 
              ? "text-muted-foreground absolute left-2" 
              : "bg-muted/50 hover:bg-muted text-foreground"
          }`}
        >
          <Search className="h-5 w-5" />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full py-2 pl-10 pr-8 outline-none rounded-full transition-all duration-300 ${
            isExpanded 
              ? "opacity-100 bg-muted/30 ring-1 ring-border" 
              : "opacity-0 w-0 p-0"
          }`}
          style={{ visibility: isExpanded ? "visible" : "hidden" }}
        />
        {isExpanded && value && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={handleClear}
            className="absolute right-2 p-1 text-muted-foreground hover:text-foreground rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;