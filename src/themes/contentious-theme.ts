/**
 * Contentious color theme with CSS variables
 */
export const contentiousTheme = {
  colors: {
    // Base colors
    'gloaming-dark': '#383533',
    'gloaming': '#4F4D4B',
    'limestone': '#F2F2E7',
    'limestone-dark': '#DEDED4',
    'sunshine': '#FFCF3B',
    'sunshine-dark': '#F8B400',
    'moonlight': '#CFF0FF',
    'moonlight-dark': '#B8E7FF',
    'flame': '#E9331F',
    'flame-dark': '#D1251A',
  },
  fonts: {
    'body': 'Bely, system-ui, sans-serif',
    'display': 'Bely Display, Georgia, serif',
    'mono': 'monospace',
  },
};

/**
 * Tailwind configuration extension for Contentious theme
 */
export const contentiousTailwindConfig = {
  theme: {
    extend: {
      colors: {
        // Theme colors
        'primary': 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'card': 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        'border': 'hsl(var(--border))',
        'muted': 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        
        // Contentious-specific color aliases
        'gloaming-dark': 'var(--gloaming-dark-hex)',
        'gloaming': 'var(--gloaming-hex)',
        'limestone': 'var(--limestone-hex)',
        'limestone-dark': 'var(--limestone-dark-hex)',
        'sunshine': 'var(--sunshine-hex)',
        'sunshine-dark': 'var(--sunshine-dark-hex)',
        'moonlight': 'var(--moonlight-hex)',
        'moonlight-dark': 'var(--moonlight-dark-hex)',
        'flame': 'var(--flame-hex)',
        'flame-dark': 'var(--flame-dark-hex)'
      },
      fontFamily: {
        'sans': ['var(--font-body)', 'system-ui', 'sans-serif'],
        'display': ['var(--font-display)', 'Georgia', 'serif'],
        'mono': ['var(--font-mono)', 'monospace']
      },
      borderRadius: {
        'contentious': '4px'
      },
      boxShadow: {
        'contentious': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'contentious-md': '0 4px 6px rgba(0, 0, 0, 0.07)'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
};