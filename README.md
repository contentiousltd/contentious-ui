# Contentious UI

A reusable component library and styling system built for Contentious-branded applications. This package provides consistent styling, theming, and UI components that follow the Contentious design language.

## Features

- **Consistent Branding**: Implements the Contentious visual identity
- **Reusable Components**: Header, Footer, FilterBar, SearchInput, and more
- **Tailwind Integration**: Extends Tailwind with Contentious theme colors and styling
- **Dark/Light Mode**: Full theme support with proper color contrasts
- **Responsive Design**: Works across mobile, tablet, and desktop
- **Bely Font Support**: Configured for the Contentious brand fonts

## Installation

```bash
npm install github:yourusername/contentious-ui
```

## Setup

### 1. Import CSS Styles

In your main CSS file:

```css
@import 'contentious-ui/src/styles/contentious-styles.css';
```

### 2. Configure Tailwind

Extend your `tailwind.config.js`:

```js
import { contentiousTailwindConfig } from 'contentious-ui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/contentious-ui/**/*.{js,ts,jsx,tsx}",
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

### 3. Add Font Files

Copy the Bely font files to your public directory:

```
public/
└── fonts/
    ├── Bely.otf
    ├── Bely bold.otf
    ├── Bely italic.otf
    └── Bely display.otf
```

## Usage

### Header Component

```jsx
import { Header } from 'contentious-ui';

function App() {
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

### Footer Component

```jsx
import { Footer } from 'contentious-ui';

function App() {
  return (
    <Footer 
      brandName="Contentious" 
      brandUrl="https://contentious.ltd"
    />
  );
}
```

### FilterBar Component

```jsx
import { FilterBar } from 'contentious-ui';

function App() {
  const [activeTags, setActiveTags] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  
  return (
    <FilterBar 
      tags={tags}
      activeTags={activeTags}
      onTagToggle={handleTagToggle}
      viewMode={viewMode}
      setViewMode={setViewMode}
      filteredCount={filteredItems.length}
      totalCount={items.length}
    />
  );
}
```

### SearchInput Component

```jsx
import { SearchInput } from 'contentious-ui';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <SearchInput 
      value={searchTerm} 
      onChange={setSearchTerm} 
      placeholder="Search things..."
    />
  );
}
```

## Component API Reference

### Header Props

| Prop | Type | Description |
|------|------|-------------|
| title | string | Main header title |
| subtitle | string | (Optional) Header subtitle |
| searchTerm | string | Current search term |
| onSearchChange | function | Callback for search changes |
| className | string | Additional CSS classes |
| rightContent | ReactNode | Custom right side content |
| showSearch | boolean | Whether to show search functionality |

### Footer Props

| Prop | Type | Description |
|------|------|-------------|
| brandName | string | Name of the brand |
| logoUrl | string | URL to logo image |
| brandUrl | string | URL for brand website link |
| children | ReactNode | Additional content |
| className | string | Additional CSS classes |
| tagline | string | Footer tagline text |

### FilterBar Props

| Prop | Type | Description |
|------|------|-------------|
| tags | Array | Available filter tags |
| activeTags | Array | Currently active tag names |
| onTagToggle | function | Callback when tag is toggled |
| viewMode | string | Current view mode ('grid' or 'list') |
| setViewMode | function | Callback to change view mode |
| filteredCount | number | Count after filtering |
| totalCount | number | Total item count |
| showViewToggle | boolean | Whether to show view mode toggle |
| className | string | Additional CSS classes |

## Building from Source

Clone this repository and run:

```bash
npm install
npm run build
```

## License

All rights reserved. This package is proprietary to Contentious Ltd.