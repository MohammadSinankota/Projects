<template>
  <div class="packages-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">Choose Your Perfect Travel Package</h1>
        <p class="page-subtitle">Curated experiences for every type of traveler with Travelfolio</p>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section">
      <div class="container">
        <div class="filters">
          <div class="filter-group">
            <label for="type" class="filter-label">Package Type</label>
            <select id="type" class="form-select">
              <option value="">All Types</option>
              <option value="adventure">Adventure</option>
              <option value="family">Family</option>
              <option value="honeymoon">Honeymoon</option>
              <option value="budget">Budget</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="duration" class="filter-label">Duration</label>
            <select id="duration" class="form-select">
              <option value="">Any Duration</option>
              <option value="1-3">1-3 Days</option>
              <option value="4-7">4-7 Days</option>
              <option value="8-14">8-14 Days</option>
              <option value="15+">15+ Days</option>
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

    <!-- Packages Grid -->
    <section class="packages-grid-section">
      <div class="container">
        <div class="packages-grid">
          <div class="package-card" v-for="pkg in packages" :key="pkg.id">
            <img :src="pkg.image" :alt="pkg.name" class="package-image">
            <div class="package-info">
              <h3 class="package-name">{{ pkg.name }}</h3>
              <div class="package-details">
                <span class="price">{{ pkg.price }}</span>
                <span class="duration">{{ pkg.duration }}</span>
              </div>
              <p class="package-description">{{ pkg.description }}</p>
              <div class="package-includes">
                <h4 class="includes-title">Includes:</h4>
                <ul class="includes-list">
                  <li class="includes-item" v-for="item in pkg.inclusions" :key="item">
                    <i class="fas fa-check includes-icon"></i>
                    {{ item }}
                  </li>
                </ul>
              </div>
              <Button :to="`/packages/${pkg.id}`" variant="secondary" block>View Details</Button>
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

// Sample packages data
const packages = ref([
  {
    id: 1,
    name: 'Romantic Europe Escape',
    price: '₹1,50,000',
    duration: '10 Days',
    description: 'Experience the romance of Europe with this curated package.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['5-star accommodation', 'Daily breakfast', 'Airport transfers', 'Guided city tours']
  },
  {
    id: 2,
    name: 'Bali Adventure Tour',
    price: '₹80,000',
    duration: '6 Days',
    description: 'Thrilling adventures in the heart of Bali.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['3-star hotels', 'All meals', 'Adventure activities', 'Local guide']
  },
  {
    id: 3,
    name: 'Luxury Dubai Getaway',
    price: '₹1,00,000',
    duration: '5 Days',
    description: 'Experience luxury in the most opulent city in the world.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['5-star hotels', 'All meals', 'Desert safari', 'Spa treatments']
  },
  {
    id: 4,
    name: 'Thailand Budget Trip',
    price: '₹55,000',
    duration: '4 Days',
    description: 'Explore Thailand on a budget without compromising on experiences.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['Budget hotels', 'Breakfast included', 'City tours', 'Transportation']
  },
  {
    id: 5,
    name: 'Adventure in the Alps',
    price: '₹65,000',
    duration: '7 Days',
    description: 'Thrilling mountain adventures in the Swiss Alps.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['Mountain lodges', 'All meals', 'Skiing equipment', 'Professional guides']
  },
  {
    id: 6,
    name: 'Luxury Safari – Kenya',
    price: '₹1,20,000',
    duration: '5 Days',
    description: 'Experience the African wilderness in luxury.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['Luxury safari lodges', 'All meals', 'Game drives', 'Expert naturalist guide']
  }
])
</script>

<style scoped>
.packages-page {
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

/* Packages Grid */
.packages-grid-section {
  padding: var(--space-12) 0;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.package-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  background: var(--bg-primary);
}

.package-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-xl);
}

.package-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.package-info {
  padding: var(--space-6);
}

.package-name {
  margin-bottom: var(--space-3);
  color: var(--text-primary);
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
}

.package-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.price {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--secondary-500);
}

.duration {
  background: var(--primary-500);
  color: var(--text-inverse);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.package-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
}

.includes-title {
  margin-bottom: var(--space-2);
  color: var(--text-primary);
  font-size: var(--font-size-base);
}

.includes-list {
  list-style: none;
  padding: 0;
  margin-bottom: var(--space-6);
}

.includes-item {
  padding: var(--space-1) 0;
  color: var(--text-secondary);
  position: relative;
  padding-left: var(--space-6);
  line-height: var(--line-height-normal);
}

.includes-icon {
  color: var(--primary-500);
  position: absolute;
  left: 0;
  top: var(--space-1);
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
  
  .packages-grid-section {
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
  
  .package-details {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
  
  .price {
    font-size: var(--font-size-lg);
  }
}
</style>