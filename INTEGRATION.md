# Integrating Contentious UI with the Favourites App

This guide provides step-by-step instructions for integrating the Contentious UI package into the main Favourites application.

## 1. Set Up Local Dependencies

Since the package is not published to npm yet, you'll need to use local dependencies:

```json
// In the main app's package.json
"dependencies": {
  // ...other dependencies
  "contentious-ui": "file:./contentious-ui"
}
```

Then run `npm install` to create the symlink.

## 2. Import Styles

In your main CSS file (e.g., `src/index.css`), import the Contentious UI styles:

```css
@import '../contentious-ui/src/styles/contentious-styles.css';

/* Rest of your application styles */
```

## 3. Configure Tailwind

Extend your Tailwind configuration with the Contentious theme:

```js
// tailwind.config.js
import { contentiousTailwindConfig } from 'contentious-ui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./contentious-ui/src/**/*.{js,ts,jsx,tsx}",  // Include the UI package
  ],
  theme: {
    extend: {
      ...contentiousTailwindConfig.theme.extend,
    },
  },
  plugins: [
    ...contentiousTailwindConfig.plugins,
  ],
}
```

## 4. Copy Font Files

Copy the Bely font files to your `public/fonts` directory:

```
public/
└── fonts/
    ├── Bely.otf
    ├── Bely bold.otf
    ├── Bely italic.otf
    └── Bely display.otf
```

## 5. Using Components

Replace application components with Contentious UI components:

```tsx
// Before
import Footer from './components/Footer';

// After
import { Footer } from 'contentious-ui';
```

### Example: Header Component

```tsx
import { Header } from 'contentious-ui';

function MyApp() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <Header 
      title="Favourite things" 
      subtitle="Raindrops on roses and..." 
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
    />
  );
}
```

### Example: Footer Component

```tsx
import { Footer } from 'contentious-ui';

function MyApp() {
  return (
    <Footer 
      brandName="Contentious" 
      brandUrl="https://contentious.ltd"
    />
  );
}
```

### Example: FilterBar Component

```tsx
import { FilterBar } from 'contentious-ui';

function MyApp() {
  const [activeTags, setActiveTags] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  
  // Toggle tag selection - exclusive mode
  const handleTagToggle = (tagName) => {
    if (activeTags.includes(tagName)) {
      setActiveTags([]);
    } else {
      setActiveTags([tagName]);
    }
  };
  
  return (
    <FilterBar 
      tags={tags}
      activeTags={activeTags}
      onTagToggle={handleTagToggle}
      viewMode={viewMode}
      setViewMode={setViewMode}
      filteredCount={10}
      totalCount={20}
    />
  );
}
```

## 6. Using Utilities

The Contentious UI package provides utility functions that can be used in your application:

```tsx
import { cn } from 'contentious-ui';

function MyComponent({ className }) {
  return (
    <div className={cn(
      "base-style", 
      className
    )}>
      Content
    </div>
  );
}
```

## 7. Customization

You can customize the theme by overriding CSS variables in your own CSS file:

```css
:root {
  /* Override specific colors */
  --sunshine-hex: #FFD700; /* Custom gold color */
}
```