<template>
  <div class="packages-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">Choose Your Perfect Travel Package</h1>
        <p class="page-subtitle">Curated experiences for every type of traveler with Travelfolio. From budget-friendly adventures to luxury getaways, we have the perfect package for your dream vacation.</p>
        <Button 
          variant="primary" 
          size="large" 
          @click="scrollToPackages"
          class="header-cta"
        >
          Browse Packages
        </Button>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section">
      <div class="container">
        <Card class="filter-card">
          <template #header>
            <h2 class="filter-title">Filter Packages</h2>
          </template>
          <template #content>
            <div class="filters">
              <div class="filter-group">
                <label for="type" class="filter-label">Package Type</label>
                <select id="type" class="form-select" v-model="filters.type">
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
                <select id="duration" class="form-select" v-model="filters.duration">
                  <option value="">Any Duration</option>
                  <option value="1-3">1-3 Days</option>
                  <option value="4-7">4-7 Days</option>
                  <option value="8-14">8-14 Days</option>
                  <option value="15+">15+ Days</option>
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

    <!-- Packages Grid -->
    <section class="packages-grid-section" ref="packagesSection">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Tour Packages</h2>
          <p class="section-subtitle">Handcrafted experiences for unforgettable memories</p>
        </div>
        <div class="packages-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            v-for="pkg in filteredPackages" 
            :key="pkg.id" 
            hover 
            class="package-card"
          >
            <template #header>
              <div class="package-image-container">
                <img :src="pkg.image" :alt="pkg.name" class="package-image">
                <div class="package-badge" :class="pkg.badgeClass">{{ pkg.badge }}</div>
              </div>
            </template>
            <template #content>
              <div class="package-info">
                <h3 class="package-name">{{ pkg.name }}</h3>
                <div class="package-details">
                  <span class="duration"><i class="fas fa-clock"></i> {{ pkg.duration }}</span>
                  <span class="price">₹{{ pkg.price }}</span>
                </div>
                <p class="package-description">{{ pkg.description }}</p>
                <ul class="package-inclusions">
                  <li v-for="(inclusion, index) in pkg.inclusions.slice(0, 3)" :key="index">
                    <i class="fas fa-check-circle"></i> {{ inclusion }}
                  </li>
                  <li v-if="pkg.inclusions.length > 3">
                    <i class="fas fa-plus-circle"></i> +{{ pkg.inclusions.length - 3 }} more
                  </li>
                </ul>
              </div>
            </template>
            <template #footer>
              <Button :to="`/packages/${pkg.id}`" variant="primary" block>View Details</Button>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Package Categories -->
    <section class="categories-section py-16 bg-secondary-light">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Popular Package Types</h2>
          <p class="section-subtitle">Find the perfect experience for your travel style</p>
        </div>
        <div class="categories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card hover class="category-card text-center">
            <template #header>
              <div class="category-icon">
                <i class="fas fa-heart"></i>
              </div>
            </template>
            <template #content>
              <h3 class="category-title">Honeymoon Specials</h3>
              <p class="category-description">Romantic getaways for newlyweds and couples. Experience intimate dinners, couples' spa treatments, and unforgettable moments in the world's most romantic destinations.</p>
            </template>
            <template #footer>
              <Button to="/packages#honeymoon" variant="outline-primary" block>Explore</Button>
            </template>
          </Card>
          
          <Card hover class="category-card text-center">
            <template #header>
              <div class="category-icon">
                <i class="fas fa-users"></i>
              </div>
            </template>
            <template #content>
              <h3 class="category-title">Family Adventures</h3>
              <p class="category-description">Fun-filled experiences for the whole family. Create lasting memories with activities and accommodations designed for travelers of all ages, from toddlers to grandparents.</p>
            </template>
            <template #footer>
              <Button to="/packages#family" variant="outline-primary" block>Explore</Button>
            </template>
          </Card>
          
          <Card hover class="category-card text-center">
            <template #header>
              <div class="category-icon">
                <i class="fas fa-gem"></i>
              </div>
            </template>
            <template #content>
              <h3 class="category-title">Luxury Escapes</h3>
              <p class="category-description">Premium experiences with top-tier amenities</p>
            </template>
            <template #footer>
              <Button to="/packages#luxury" variant="outline-primary" block>Explore</Button>
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
  type: '',
  duration: '',
  budget: ''
})

// Sample packages data
const packages = ref([
  {
    id: 1,
    name: 'Romantic Europe Escape',
    price: '1,50,000',
    duration: '10 Days',
    description: 'Experience the romance of Europe with this curated package. Visit Paris, Venice, and Santorini with luxury accommodations and private tours.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['5-star accommodation', 'Daily breakfast', 'Airport transfers', 'Guided city tours', 'Romantic dinners', 'Spa treatments', '24/7 support'],
    badge: 'Honeymoon',
    badgeClass: 'badge-honeymoon',
    type: 'honeymoon'
  },
  {
    id: 2,
    name: 'Bali Adventure Tour',
    price: '80,000',
    duration: '6 Days',
    description: 'Thrilling adventures in the heart of Bali. Surf, hike, and explore waterfalls with expert guides and comfortable accommodations.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['3-star hotels', 'All meals', 'Adventure activities', 'Local guide', 'Transportation', 'Travel insurance', '24/7 support'],
    badge: 'Adventure',
    badgeClass: 'badge-adventure',
    type: 'adventure'
  },
  {
    id: 3,
    name: 'Luxury Dubai Getaway',
    price: '2,00,000',
    duration: '5 Days',
    description: 'Experience luxury in the most opulent city in the world. Stay in 5-star hotels, enjoy desert safaris, and indulge in world-class shopping.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['5-star hotels', 'All meals', 'Desert safari', 'Spa treatments', 'Private transfers', 'Concierge service', '24/7 support'],
    badge: 'Luxury',
    badgeClass: 'badge-luxury',
    type: 'luxury'
  },
  {
    id: 4,
    name: 'Thailand Budget Trip',
    price: '55,000',
    duration: '4 Days',
    description: 'Explore Thailand on a budget without compromising on experiences. Discover bustling Bangkok, ancient temples, and pristine beaches.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['Budget hotels', 'Breakfast included', 'City tours', 'Transportation', 'Local guide', 'Travel insurance'],
    badge: 'Budget',
    badgeClass: 'badge-budget',
    type: 'budget'
  },
  {
    id: 5,
    name: 'Adventure in the Alps',
    price: '65,000',
    duration: '7 Days',
    description: 'Thrilling mountain adventures in the Swiss Alps. Ski, hike, and experience the beauty of the mountains with expert guides.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['Mountain lodges', 'All meals', 'Skiing equipment', 'Professional guides', 'Transportation', 'Travel insurance', '24/7 support'],
    badge: 'Adventure',
    badgeClass: 'badge-adventure',
    type: 'adventure'
  },
  {
    id: 6,
    name: 'Luxury Safari – Kenya',
    price: '1,20,000',
    duration: '5 Days',
    description: 'Experience the African wilderness in luxury. Spot the Big Five, stay in luxury safari lodges, and enjoy gourmet dining under the stars.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['Luxury safari lodges', 'All meals', 'Game drives', 'Expert naturalist guide', 'Airport transfers', '24/7 support'],
    badge: 'Luxury',
    badgeClass: 'badge-luxury',
    type: 'luxury'
  },
  {
    id: 7,
    name: 'Family Fun in Orlando',
    price: '95,000',
    duration: '6 Days',
    description: 'Create magical memories with your family at Disney World and Universal Studios. Enjoy theme parks, character meetups, and family-friendly accommodations.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['Family resort', 'Theme park tickets', 'Character dining', 'Transportation', '24/7 support'],
    badge: 'Family',
    badgeClass: 'badge-family',
    type: 'family'
  },
  {
    id: 8,
    name: 'Cultural Japan Experience',
    price: '1,10,000',
    duration: '8 Days',
    description: 'Immerse yourself in Japanese culture with temple visits, tea ceremonies, and traditional arts. Experience both ancient traditions and modern marvels.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['Traditional ryokan', 'Cultural activities', 'Local guide', 'Transportation', '24/7 support'],
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    type: 'cultural'
  }
])

// Computed property for filtered packages
const filteredPackages = computed(() => {
  return packages.value.filter(pkg => {
    // Type filter
    if (filters.value.type && pkg.type !== filters.value.type) {
      return false
    }
    
    // Duration filter
    if (filters.value.duration) {
      const days = parseInt(pkg.duration);
      if (filters.value.duration === '1-3' && (days < 1 || days > 3)) return false
      if (filters.value.duration === '4-7' && (days < 4 || days > 7)) return false
      if (filters.value.duration === '8-14' && (days < 8 || days > 14)) return false
      if (filters.value.duration === '15+' && days < 15) return false
    }
    
    // Budget filter
    if (filters.value.budget) {
      const price = parseInt(pkg.price.replace(/,/g, ''))
      if (filters.value.budget === '0-50000' && price > 50000) return false
      if (filters.value.budget === '50000-100000' && (price < 50000 || price > 100000)) return false
      if (filters.value.budget === '100000-200000' && (price < 100000 || price > 200000)) return false
      if (filters.value.budget === '200000+' && price < 200000) return false
    }
    
    return true
  })
})

// Reference for scrolling
const packagesSection = ref(null)

// Methods
const applyFilters = () => {
  // In a real app, this would trigger an API call
  console.log('Applying filters:', filters.value)
}

const resetFilters = () => {
  filters.value = {
    type: '',
    duration: '',
    budget: ''
  }
}

const scrollToPackages = () => {
  packagesSection.value?.scrollIntoView({ behavior: 'smooth' })
}
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

/* Packages Grid */
.packages-grid-section {
  padding: var(--space-16) 0;
  background-color: var(--bg-primary);
}

.package-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.package-image-container {
  position: relative;
}

.package-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.package-badge {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
}

.badge-honeymoon {
  background-color: var(--accent-gold);
  color: var(--text-inverse);
}

.badge-adventure {
  background-color: var(--primary-color);
  color: var(--text-inverse);
}

.badge-luxury {
  background-color: var(--accent-purple);
  color: var(--text-inverse);
}

.badge-budget {
  background-color: var(--success);
  color: var(--text-inverse);
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

.duration {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.price {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--secondary-color);
}

.package-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
}

.package-inclusions {
  list-style: none;
  padding: 0;
  margin-bottom: var(--space-6);
}

.package-inclusions li {
  padding: var(--space-1) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

/* Package Categories */
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
  
  .packages-grid-section,
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
  
  .package-details {
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