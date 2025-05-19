import React, { useState } from 'react';
import { 
  Header, 
  Footer, 
  FilterBar, 
  SearchInput,
  FilterTag
} from 'contentious-ui';

// Sample data
const sampleTags: FilterTag[] = [
  { id: '1', name: 'Website' },
  { id: '2', name: 'App' },
  { id: '3', name: 'Book' },
  { id: '4', name: 'Article' },
  { id: '5', name: 'Style guide' },
];

const sampleItems = [
  { id: '1', title: 'Example Website', tags: ['Website'] },
  { id: '2', title: 'Mobile App', tags: ['App'] },
  { id: '3', title: 'Design Book', tags: ['Book'] },
  { id: '4', title: 'UX Article', tags: ['Article'] },
  { id: '5', title: 'Brand Guidelines', tags: ['Style guide'] },
];

export default function ExampleApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter items based on active tags and search term
  const filteredItems = sampleItems.filter(item => {
    // Filter by tags
    const matchesTags = 
      activeTags.length === 0 || 
      item.tags.some(tag => activeTags.includes(tag));
    
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTags && matchesSearch;
  });
  
  // Toggle tag selection
  const handleTagToggle = (tagName: string) => {
    if (activeTags.includes(tagName)) {
      setActiveTags(activeTags.filter(t => t !== tagName));
    } else {
      setActiveTags([tagName]); // Exclusive selection
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        title="Favourite things" 
        subtitle="Raindrops on roses and..."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <FilterBar 
          tags={sampleTags}
          activeTags={activeTags}
          onTagToggle={handleTagToggle}
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredCount={filteredItems.length}
          totalCount={sampleItems.length}
        />
        
        {/* Display items */}
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'flex flex-col gap-4'
          }
        `}>
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="bg-card p-4 rounded-md shadow-sm border border-border"
            >
              <h3 className="text-lg font-medium text-card-foreground">
                {item.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 text-xs rounded-[4px] bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}