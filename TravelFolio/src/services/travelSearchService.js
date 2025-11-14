// Travel Search Service - Simulates AI-like data fetching for travel information

// Sample travel data - In a real application, this would come from an API
const travelData = {
  destinations: [
    {
      id: 1,
      name: 'Santorini, Greece',
      description: 'White-washed charm and breathtaking sunsets over the Aegean Sea.',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      location: 'Europe',
      rating: 4.9,
      continent: 'europe',
      theme: 'beach',
      priceRange: '100000-200000'
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      description: 'Where ancient traditions meet cutting-edge technology and culture.',
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      location: 'Asia',
      rating: 4.8,
      continent: 'asia',
      theme: 'city',
      priceRange: '50000-100000'
    },
    {
      id: 3,
      name: 'New York, USA',
      description: 'The city that never sleeps with iconic landmarks and vibrant culture.',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      location: 'North America',
      rating: 4.7,
      continent: 'north-america',
      theme: 'city',
      priceRange: '100000-200000'
    },
    {
      id: 4,
      name: 'Cape Town, South Africa',
      description: 'Stunning landscapes with mountains, beaches, and rich wildlife.',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      location: 'Africa',
      rating: 4.8,
      continent: 'africa',
      theme: 'adventure',
      priceRange: '50000-100000'
    },
    {
      id: 5,
      name: 'Swiss Alps',
      description: 'Majestic mountain ranges perfect for adventure and relaxation.',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      location: 'Europe',
      rating: 4.9,
      continent: 'europe',
      theme: 'mountain',
      priceRange: '100000-200000'
    },
    {
      id: 6,
      name: 'Bali, Indonesia',
      description: 'Tropical paradise with beaches, temples, and vibrant culture.',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      location: 'Asia',
      rating: 4.7,
      continent: 'asia',
      theme: 'beach',
      priceRange: '50000-100000'
    },
    {
      id: 7,
      name: 'Dubai, UAE',
      description: 'Luxury meets adventure in the desert with iconic architecture.',
      image: 'https://images.unsplash.com/photo-1529271029047-0a0b5c40d9a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      location: 'Asia',
      rating: 4.8,
      continent: 'asia',
      theme: 'luxury',
      priceRange: '200000+'
    },
    {
      id: 8,
      name: 'Paris, France',
      description: 'Romantic city of lights, art, and culture with world-class cuisine.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
      location: 'Europe',
      rating: 4.7,
      continent: 'europe',
      theme: 'cultural',
      priceRange: '100000-200000'
    }
  ],
  packages: [
    {
      id: 1,
      name: 'Romantic Europe Escape',
      price: '₹1,50,000',
      duration: '10 Days',
      description: 'Experience the romance of Europe with this curated package.',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      inclusions: ['5-star accommodation', 'Daily breakfast', 'Airport transfers', 'Guided city tours'],
      type: 'honeymoon',
      durationRange: '8-14',
      budgetRange: '100000-200000'
    },
    {
      id: 2,
      name: 'Bali Adventure Tour',
      price: '₹80,000',
      duration: '6 Days',
      description: 'Thrilling adventures in the heart of Bali.',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      inclusions: ['3-star hotels', 'All meals', 'Adventure activities', 'Local guide'],
      type: 'adventure',
      durationRange: '4-7',
      budgetRange: '50000-100000'
    },
    {
      id: 3,
      name: 'Luxury Dubai Getaway',
      price: '₹1,00,000',
      duration: '5 Days',
      description: 'Experience luxury in the most opulent city in the world.',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      inclusions: ['5-star hotels', 'All meals', 'Desert safari', 'Spa treatments'],
      type: 'luxury',
      durationRange: '4-7',
      budgetRange: '100000-200000'
    },
    {
      id: 4,
      name: 'Thailand Budget Trip',
      price: '₹55,000',
      duration: '4 Days',
      description: 'Explore Thailand on a budget without compromising on experiences.',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      inclusions: ['Budget hotels', 'Breakfast included', 'City tours', 'Transportation'],
      type: 'budget',
      durationRange: '4-7',
      budgetRange: '0-50000'
    },
    {
      id: 5,
      name: 'Adventure in the Alps',
      price: '₹65,000',
      duration: '7 Days',
      description: 'Thrilling mountain adventures in the Swiss Alps.',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      inclusions: ['Mountain lodges', 'All meals', 'Skiing equipment', 'Professional guides'],
      type: 'adventure',
      durationRange: '4-7',
      budgetRange: '50000-100000'
    },
    {
      id: 6,
      name: 'Luxury Safari – Kenya',
      price: '₹1,20,000',
      duration: '5 Days',
      description: 'Experience the African wilderness in luxury.',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      inclusions: ['Luxury safari lodges', 'All meals', 'Game drives', 'Expert naturalist guide'],
      type: 'luxury',
      durationRange: '4-7',
      budgetRange: '100000-200000'
    }
  ]
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Search destinations based on criteria
export async function searchDestinations(criteria = {}) {
  await delay(500); // Simulate network delay
  
  let results = [...travelData.destinations];
  
  // Apply filters
  if (criteria.query) {
    const query = criteria.query.toLowerCase();
    results = results.filter(dest => 
      dest.name.toLowerCase().includes(query) || 
      dest.description.toLowerCase().includes(query) ||
      dest.location.toLowerCase().includes(query)
    );
  }
  
  if (criteria.continent) {
    results = results.filter(dest => dest.continent === criteria.continent);
  }
  
  if (criteria.theme) {
    results = results.filter(dest => dest.theme === criteria.theme);
  }
  
  if (criteria.priceRange) {
    results = results.filter(dest => dest.priceRange === criteria.priceRange);
  }
  
  if (criteria.sortBy) {
    if (criteria.sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (criteria.sortBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
  
  return results;
}

// Search packages based on criteria
export async function searchPackages(criteria = {}) {
  await delay(500); // Simulate network delay
  
  let results = [...travelData.packages];
  
  // Apply filters
  if (criteria.query) {
    const query = criteria.query.toLowerCase();
    results = results.filter(pkg => 
      pkg.name.toLowerCase().includes(query) || 
      pkg.description.toLowerCase().includes(query)
    );
  }
  
  if (criteria.type) {
    results = results.filter(pkg => pkg.type === criteria.type);
  }
  
  if (criteria.durationRange) {
    results = results.filter(pkg => pkg.durationRange === criteria.durationRange);
  }
  
  if (criteria.budgetRange) {
    results = results.filter(pkg => pkg.budgetRange === criteria.budgetRange);
  }
  
  if (criteria.sortBy) {
    if (criteria.sortBy === 'price-low') {
      results.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')));
    } else if (criteria.sortBy === 'price-high') {
      results.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, '')));
    } else if (criteria.sortBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
  
  return results;
}

// Get all unique continents
export function getContinents() {
  const continents = [...new Set(travelData.destinations.map(dest => dest.continent))];
  return continents.sort();
}

// Get all unique themes
export function getThemes() {
  const themes = [...new Set(travelData.destinations.map(dest => dest.theme))];
  return themes.sort();
}

// Get all unique package types
export function getPackageTypes() {
  const types = [...new Set(travelData.packages.map(pkg => pkg.type))];
  return types.sort();
}

// Get destination by ID
export async function getDestinationById(id) {
  await delay(300); // Simulate network delay
  return travelData.destinations.find(dest => dest.id === parseInt(id));
}

// Get package by ID
export async function getPackageById(id) {
  await delay(300); // Simulate network delay
  return travelData.packages.find(pkg => pkg.id === parseInt(id));
}

// Get featured destinations (top rated)
export async function getFeaturedDestinations(limit = 4) {
  await delay(300); // Simulate network delay
  return [...travelData.destinations]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Get featured packages (random selection)
export async function getFeaturedPackages(limit = 3) {
  await delay(300); // Simulate network delay
  const shuffled = [...travelData.packages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}