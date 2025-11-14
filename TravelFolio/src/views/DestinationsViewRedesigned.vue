<template>
  <div class="destinations-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">Discover Amazing Destinations with Travelfolio</h1>
        <p class="page-subtitle">From serene beaches to majestic mountains, explore the most beautiful places on Earth. With over 500 destinations across 100+ countries, we'll help you find your perfect getaway.</p>
        <Button 
          variant="primary" 
          size="large" 
          @click="scrollToDestinations"
          class="header-cta"
        >
          Explore Destinations
        </Button>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section">
      <div class="container">
        <Card class="filter-card">
          <template #header>
            <h2 class="filter-title">Filter Destinations</h2>
          </template>
          <template #content>
            <div class="filters">
              <div class="filter-group">
                <label for="continent" class="filter-label">Continent</label>
                <select id="continent" class="form-select" v-model="filters.continent">
                  <option value="">All Continents</option>
                  <option value="asia">Asia</option>
                  <option value="europe">Europe</option>
                  <option value="africa">Africa</option>
                  <option value="north-america">North America</option>
                  <option value="south-america">South America</option>
                  <option value="oceania">Oceania</option>
                </select>
              </div>
              
              <div class="filter-group">
                <label for="theme" class="filter-label">Theme</label>
                <select id="theme" class="form-select" v-model="filters.theme">
                  <option value="">All Themes</option>
                  <option value="beach">Beach</option>
                  <option value="mountain">Mountain</option>
                  <option value="city">City</option>
                  <option value="cultural">Cultural</option>
                  <option value="adventure">Adventure</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              
              <div class="filter-group">
                <label for="budget" class="filter-label">Budget</label>
                <select id="budget" class="form-select" v-model="filters.budget">
                  <option value="">All Budgets</option>
                  <option value="0-50000">₹0 - ₹50,000</option>
                  <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                  <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                  <option value="200000+">₹2,00,000+</option>
                </select>
              </div>
              
              <div class="filter-group filter-buttons">
                <Button variant="primary" @click="applyFilters">Apply Filters</Button>
                <Button variant="outline-primary" @click="resetFilters">Reset</Button>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>

    <!-- Destinations Grid -->
    <section class="destinations-grid-section" ref="destinationsSection">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Destinations</h2>
          <p class="section-subtitle">Handpicked by our travel experts for unforgettable experiences</p>
        </div>
        <div class="destinations-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            v-for="destination in filteredDestinations" 
            :key="destination.id" 
            hover 
            class="destination-card"
          >
            <template #header>
              <div class="destination-image-container">
                <img :src="destination.image" :alt="destination.name" class="destination-image">
                <div class="destination-rating">
                  <i class="fas fa-star"></i> {{ destination.rating }}
                </div>
              </div>
            </template>
            <template #content>
              <div class="destination-info">
                <h3 class="destination-name">{{ destination.name }}</h3>
                <p class="destination-location">
                  <i class="fas fa-map-marker-alt"></i> {{ destination.location }}
                </p>
                <p class="destination-description">{{ destination.description }}</p>
                <div class="destination-meta">
                  <span class="price">From ₹{{ destination.price }}</span>
                </div>
              </div>
            </template>
            <template #footer>
              <Button :to="`/destinations/${destination.id}`" variant="primary" block>Explore</Button>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Popular Categories -->
    <section class="categories-section py-16 bg-secondary-light">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Popular Categories</h2>
          <p class="section-subtitle">Find your perfect travel experience</p>
        </div>
        <div class="categories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card hover class="category-card text-center">
            <template #header>
              <div class="category-icon">
                <i class="fas fa-umbrella-beach"></i>
              </div>
            </template>
            <template #content>
              <h3 class="category-title">Beach Destinations</h3>
              <p class="category-description">Relax on pristine beaches with crystal clear waters. From tropical paradises to Mediterranean coastlines, find your perfect seaside escape with luxury resorts and water activities.</p>
            </template>
            <template #footer>
              <Button to="/destinations#beach" variant="outline-primary" block>Explore</Button>
            </template>
          </Card>
          
          <Card hover class="category-card text-center">
            <template #header>
              <div class="category-icon">
                <i class="fas fa-mountain"></i>
              </div>
            </template>
            <template #content>
              <h3 class="category-title">Mountain Retreats</h3>
              <p class="category-description">Experience breathtaking views and fresh mountain air. From snow-capped peaks to lush green valleys, discover serene mountain retreats perfect for hiking, skiing, and relaxation.</p>
            </template>
            <template #footer>
              <Button to="/destinations#mountain" variant="outline-primary" block>Explore</Button>
            </template>
          </Card>
          
          <Card hover class="category-card text-center">
            <template #header>
              <div class="category-icon">
                <i class="fas fa-city"></i>
              </div>
            </template>
            <template #content>
              <h3 class="category-title">City Tours</h3>
              <p class="category-description">Discover vibrant cultures and iconic landmarks. Explore bustling metropolises, historic districts, and modern skylines with expert guides who reveal the hidden gems of each destination.</p>
            </template>
            <template #footer>
              <Button to="/destinations#city" variant="outline-primary" block>Explore</Button>
            </template>
          </Card>
          
          <Card hover class="category-card text-center">
            <template #header>
              <div class="category-icon">
                <i class="fas fa-landmark"></i>
              </div>
            </template>
            <template #content>
              <h3 class="category-title">Cultural Experiences</h3>
              <p class="category-description">Immerse yourself in rich traditions and heritage</p>
            </template>
            <template #footer>
              <Button to="/destinations#cultural" variant="outline-primary" block>Explore</Button>
            </template>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'

// Reactive data for filters
const filters = ref({
  continent: '',
  theme: '',
  budget: ''
})

// Sample destinations data
const destinations = ref([
  {
    id: 1,
    name: 'Santorini, Greece',
    description: 'Experience the iconic white-washed buildings and stunning sunsets of Santorini. Explore ancient ruins, taste exceptional wines, and relax on unique volcanic beaches. Perfect for honeymooners and culture enthusiasts.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Europe',
    rating: 4.9,
    price: '85,000',
    continent: 'europe',
    theme: 'beach'
  },
  {
    id: 2,
    name: 'Tokyo, Japan',
    description: 'Immerse yourself in the fascinating blend of traditional culture and futuristic innovation. From serene temples to bustling Shibuya Crossing, Tokyo offers an unforgettable urban adventure with world-class cuisine.',
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Asia',
    rating: 4.8,
    price: '95,000',
    continent: 'asia',
    theme: 'city'
  },
  {
    id: 3,
    name: 'New York, USA',
    description: 'The city that never sleeps awaits with its iconic skyline, world-class museums, Broadway shows, and diverse neighborhoods. Experience the energy of Times Square, the tranquility of Central Park, and culinary delights from around the globe.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'North America',
    rating: 4.7,
    price: '1,20,000',
    continent: 'north-america',
    theme: 'city'
  },
  {
    id: 4,
    name: 'Cape Town, South Africa',
    description: 'Stunning landscapes with Table Mountain, pristine beaches, and rich wildlife. Experience the best of African safari and vibrant city life with world-class wine regions and cultural diversity.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Africa',
    rating: 4.8,
    price: '1,10,000',
    continent: 'africa',
    theme: 'adventure'
  },
  {
    id: 5,
    name: 'Swiss Alps',
    description: 'Majestic mountain ranges perfect for skiing, hiking, and relaxation. Experience charming alpine villages, crystal-clear lakes, and breathtaking panoramic views in one of the world\'s most beautiful mountain destinations.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Europe',
    rating: 4.9,
    price: '1,30,000',
    continent: 'europe',
    theme: 'mountain'
  },
  {
    id: 6,
    name: 'Bali, Indonesia',
    description: 'Discover the Island of the Gods with its lush rice terraces, ancient temples, and pristine beaches. Experience spiritual wellness, vibrant arts scene, and exceptional surfing spots in this tropical paradise.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Asia',
    rating: 4.7,
    price: '65,000',
    continent: 'asia',
    theme: 'beach'
  },
  {
    id: 7,
    name: 'Paris, France',
    description: 'The City of Light enchants with its iconic landmarks, world-class art, and culinary excellence. Stroll along the Seine, marvel at the Eiffel Tower, and indulge in authentic French cuisine and culture.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Europe',
    rating: 4.8,
    price: '1,00,000',
    continent: 'europe',
    theme: 'cultural'
  },
  {
    id: 8,
    name: 'Machu Picchu, Peru',
    description: 'Journey to the lost city of the Incas, high in the Andes Mountains. Experience ancient ruins, breathtaking landscapes, and rich Incan history on this once-in-a-lifetime adventure.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'South America',
    rating: 4.9,
    price: '95,000',
    continent: 'south-america',
    theme: 'adventure'
  }
])

// Computed property for filtered destinations
const filteredDestinations = computed(() => {
  return destinations.value.filter(destination => {
    // Continent filter
    if (filters.value.continent && destination.continent !== filters.value.continent) {
      return false
    }
    
    // Theme filter
    if (filters.value.theme && destination.theme !== filters.value.theme) {
      return false
    }
    
    // Budget filter
    if (filters.value.budget) {
      const price = parseInt(destination.price.replace(/,/g, ''))
      if (filters.value.budget === '0-50000' && price > 50000) return false
      if (filters.value.budget === '50000-100000' && (price < 50000 || price > 100000)) return false
      if (filters.value.budget === '100000-200000' && (price < 100000 || price > 200000)) return false
      if (filters.value.budget === '200000+' && price < 200000) return false
    }
    
    return true
  })
})

// Reference for scrolling
const destinationsSection = ref(null)

// Methods
const applyFilters = () => {
  // In a real app, this would trigger an API call
  console.log('Applying filters:', filters.value)
}

const resetFilters = () => {
  filters.value = {
    continent: '',
    theme: '',
    budget: ''
  }
}

const scrollToDestinations = () => {
  destinationsSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.destinations-page {
  font-family: var(--font-primary);
  padding-bottom: var(--space-12);
}

/* Page Header */
.page-header {
  background: linear-gradient(rgba(10, 31, 68, 0.85), rgba(10, 31, 68, 0.85)), 
              url('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
  color: var(--text-inverse);
  text-align: center;
  padding: var(--space-16) 0;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--text-inverse);
  line-height: 1.2;
}

.page-subtitle {
  font-size: var(--font-size-xl);
  max-width: 600px;
  margin: 0 auto var(--space-6);
  color: var(--text-inverse);
  opacity: 0.9;
  line-height: var(--line-height-relaxed);
}

.header-cta {
  margin-top: var(--space-4);
}

/* Filter Section */
.filter-section {
  background-color: var(--bg-secondary);
  padding: var(--space-12) 0;
  margin-top: -80px;
  position: relative;
  z-index: 1;
}

.filter-card {
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
}

.filter-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 0;
  color: var(--text-primary);
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-6);
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  margin-bottom: var(--space-2);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.form-select {
  padding: var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition);
}

.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 191, 191, 0.25);
}

.filter-buttons {
  flex-direction: row;
  gap: var(--space-3);
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: var(--space-10);
}

.section-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-3);
  color: var(--text-primary);
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* Destinations Grid */
.destinations-grid-section {
  padding: var(--space-16) 0;
  background-color: var(--bg-primary);
}

.destination-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.destination-image-container {
  position: relative;
}

.destination-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.destination-rating {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--text-inverse);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.destination-info {
  padding: var(--space-6);
}

.destination-name {
  margin-bottom: var(--space-2);
  color: var(--text-primary);
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
}

.destination-location {
  color: var(--primary-color);
  margin-bottom: var(--space-3);
  font-size: var(--font-size-sm);
}

.destination-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
}

.destination-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.price {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--secondary-color);
}

/* Popular Categories */
.categories-section {
  background-color: var(--bg-secondary);
}

.category-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  text-align: center;
}

.category-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-4);
  color: var(--primary-color);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-50);
  border-radius: var(--radius-full);
  margin: 0 auto;
}

.category-title {
  margin-bottom: var(--space-3);
  color: var(--text-primary);
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
}

.category-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
  line-height: var(--line-height-relaxed);
}

/* Responsive Design */
@media (max-width: 992px) {
  .page-title {
    font-size: var(--font-size-4xl);
  }
  
  .page-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .filters {
    grid-template-columns: 1fr;
  }
  
  .filter-buttons {
    flex-direction: column;
  }
  
  .section-title {
    font-size: var(--font-size-2xl);
  }
  
  .destinations-grid-section,
  .categories-section {
    padding: var(--space-12) 0;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: var(--space-12) 0;
  }
  
  .page-title {
    font-size: var(--font-size-3xl);
  }
  
  .page-subtitle {
    font-size: var(--font-size-base);
  }
  
  .filter-section {
    padding: var(--space-8) 0;
  }
  
  .filter-card {
    padding: var(--space-6);
  }
  
  .filter-title {
    font-size: var(--font-size-xl);
  }
  
  .section-header {
    margin-bottom: var(--space-6);
  }
  
  .section-subtitle {
    font-size: var(--font-size-base);
  }
}

@media (max-width: 576px) {
  .page-title {
    font-size: var(--font-size-2xl);
  }
  
  .destination-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
  
  .price {
    font-size: var(--font-size-base);
  }
  
  .category-icon {
    width: 60px;
    height: 60px;
    font-size: var(--font-size-2xl);
  }
}
</style>