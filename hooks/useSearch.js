import { useState, useCallback } from 'react';

export const useSearch = (initialData) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const search = useCallback(() => {
    console.log('Search term:', searchTerm);
    if (searchTerm) {
      const results = initialData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log('Filtered results:', results);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, initialData]);

  return { searchTerm, setSearchTerm, searchResults, search };
};
