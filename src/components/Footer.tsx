import React, { useEffect, useState } from "react";

export interface FooterProps {
  /**
   * Customize the brand name displayed in the footer
   */
  brandName?: string;
  /**
   * URL for the logo image
   */
  logoUrl?: string;
  /**
   * URL for the brand website
   */
  brandUrl?: string;
  /**
   * Additional content to display after the brand name
   */
  children?: React.ReactNode;
  /**
   * Custom CSS classes for the footer
   */
  className?: string;
  /**
   * Footer tagline or description
   */
  tagline?: string;
}

/**
 * Footer component with Contentious branding and styling
 */
export const Footer: React.FC<FooterProps> = ({
  brandName = "Contentious",
  logoUrl = "/images/contentious-logo-light.png",
  brandUrl = "https://contentious.ltd",
  children,
  className = "",
  tagline = "Chosen by us, powered by Notion and Replit."
}) => {
  const [currentLogoUrl, setCurrentLogoUrl] = useState(logoUrl);

  // This is a placeholder for theme detection,
  // in a real implementation you might want to use your own theming solution
  useEffect(() => {
    setCurrentLogoUrl(logoUrl);
  }, [logoUrl]);

  return (
    <footer 
      className={`py-8 mt-16 border-t border-border ${className}`} 
      style={{ backgroundColor: 'var(--gloaming-dark-hex)', color: 'var(--limestone-dark-hex)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-start md:items-center gap-8 mb-6 md:mb-0 py-2">
            <div className="flex-shrink-0">
              <a
                href={brandUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline logo-link"
              >
                <img 
                  src={currentLogoUrl} 
                  alt={`${brandName} Logo`} 
                  className="h-16 w-16 min-w-[64px] object-contain opacity-20 hover:opacity-100 transition-opacity duration-300"
                  style={{ aspectRatio: '1/1' }}
                />
              </a>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-2xl font-display opacity-60" style={{ color: 'var(--limestone-dark-hex)' }}>
                {children || "Favourite things"}
              </div>
              <div className="mt-3 opacity-60" style={{ color: 'var(--limestone-dark-hex)' }}>
                <span>
                  A curated collection of favourite things from{" "}
                </span>
                <a
                  href={brandUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 no-underline hover:no-underline"
                  style={{ 
                    color: 'var(--limestone-dark-hex)',
                    transition: 'all 0.3s ease' 
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--sunshine-hex)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--limestone-dark-hex)'}
                >
                  {brandName}
                </a>
                <span>. {tagline}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;