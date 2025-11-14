<template>
  <div class="destinations-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">Discover Amazing Destinations with Travelfolio</h1>
        <p class="page-subtitle">From serene beaches to majestic mountains, explore the most beautiful places on Earth</p>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section">
      <div class="container">
        <div class="filters">
          <div class="filter-group">
            <label for="continent" class="filter-label">Continent</label>
            <select id="continent" class="form-select">
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
            <select id="theme" class="form-select">
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
            <select id="budget" class="form-select">
              <option value="">All Budgets</option>
              <option value="0-50000">₹0 - ₹50,000</option>
              <option value="50000-100000">₹50,000 - ₹1,00,000</option>
              <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
              <option value="200000+">₹2,00,000+</option>
            </select>
          </div>
          
          <div class="filter-group">
            <Button variant="primary">Apply Filters</Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Destinations Grid -->
    <section class="destinations-grid-section">
      <div class="container">
        <div class="destinations-grid">
          <div class="destination-card" v-for="destination in destinations" :key="destination.id">
            <img :src="destination.image" :alt="destination.name" class="destination-image">
            <div class="destination-info">
              <h3 class="destination-name">{{ destination.name }}</h3>
              <p class="destination-description">{{ destination.description }}</p>
              <div class="destination-meta">
                <span class="meta-item"><i class="fas fa-map-marker-alt meta-icon"></i> {{ destination.location }}</span>
                <span class="meta-item"><i class="fas fa-star meta-icon"></i> {{ destination.rating }}</span>
              </div>
              <Button :to="`/destinations/${destination.id}`" variant="secondary" block>Explore</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/Button.vue'

// Sample destinations data
const destinations = ref([
  {
    id: 1,
    name: 'Santorini, Greece',
    description: 'White-washed charm and breathtaking sunsets over the Aegean Sea.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Europe',
    rating: 4.9
  },
  {
    id: 2,
    name: 'Tokyo, Japan',
    description: 'Where ancient traditions meet cutting-edge technology and culture.',
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Asia',
    rating: 4.8
  },
  {
    id: 3,
    name: 'New York, USA',
    description: 'The city that never sleeps with iconic landmarks and vibrant culture.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'North America',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Cape Town, South Africa',
    description: 'Stunning landscapes with mountains, beaches, and rich wildlife.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Africa',
    rating: 4.8
  },
  {
    id: 5,
    name: 'Swiss Alps',
    description: 'Majestic mountain ranges perfect for adventure and relaxation.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Europe',
    rating: 4.9
  },
  {
    id: 6,
    name: 'Bali, Indonesia',
    description: 'Tropical paradise with beaches, temples, and vibrant culture.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Asia',
    rating: 4.7
  }
])
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
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--text-inverse);
}

.page-subtitle {
  font-size: var(--font-size-xl);
  max-width: 600px;
  margin: 0 auto;
  color: var(--text-inverse);
  opacity: 0.9;
  line-height: var(--line-height-relaxed);
}

/* Filter Section */
.filter-section {
  background-color: var(--bg-secondary);
  padding: var(--space-8) 0;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 200px;
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
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
}

/* Destinations Grid */
.destinations-grid-section {
  padding: var(--space-12) 0;
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.destination-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  background: var(--bg-primary);
}

.destination-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-xl);
}

.destination-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
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

.destination-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
}

.destination-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-6);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.meta-item {
  display: flex;
  align-items: center;
}

.meta-icon {
  margin-right: var(--space-2);
  color: var(--primary-500);
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: var(--font-size-3xl);
  }
  
  .page-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    min-width: 100%;
  }
  
  .destinations-grid-section {
    padding: var(--space-8) 0;
  }
}

@media (max-width: 576px) {
  .page-header {
    padding: var(--space-12) 0;
  }
  
  .page-title {
    font-size: var(--font-size-2xl);
  }
  
  .destination-meta {
    flex-direction: column;
    gap: var(--space-2);
  }
}
</style>