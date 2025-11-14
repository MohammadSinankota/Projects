<template>
  <div class="package-details-page">
    <!-- Loading State -->
    <div class="loading-container" v-if="loading">
      <div class="spinner"></div>
      <p class="loading-text">Loading package details...</p>
    </div>
    
    <!-- Error State -->
    <div class="error-container" v-else-if="error">
      <i class="fas fa-exclamation-triangle error-icon"></i>
      <h3 class="error-title">Something went wrong</h3>
      <p class="error-message">{{ error }}</p>
      <Button variant="primary" @click="loadPackage">Try Again</Button>
    </div>
    
    <!-- Content -->
    <div v-else-if="tourPackage">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <h1 class="hero-title">{{ tourPackage.name }}</h1>
          <p class="hero-subtitle">{{ tourPackage.duration }} | {{ tourPackage.destinations }}</p>
        </div>
      </section>

      <!-- Package Image -->
      <section class="package-image">
        <div class="container">
          <img :src="tourPackage.image" :alt="tourPackage.name" class="package-img">
        </div>
      </section>

      <!-- Package Information -->
      <section class="package-info">
        <div class="container">
          <div class="info-grid">
            <div class="description">
              <h2 class="section-title">Package Overview</h2>
              <p class="section-description">{{ tourPackage.overview }}</p>
              
              <h3 class="subsection-title">Daily Itinerary</h3>
              <div class="itinerary">
                <div class="itinerary-day" v-for="(day, index) in tourPackage.itinerary" :key="index">
                  <h4 class="day-title">Day {{ day.day }}: {{ day.title }}</h4>
                  <p class="day-description">{{ day.description }}</p>
                </div>
              </div>
              
              <h3 class="subsection-title">Inclusions</h3>
              <ul class="inclusions-list">
                <li class="list-item" v-for="(inclusion, index) in tourPackage.inclusions" :key="index">
                  <i class="fas fa-check-circle list-icon"></i>
                  {{ inclusion }}
                </li>
              </ul>
              
              <h3 class="subsection-title">Exclusions</h3>
              <ul class="exclusions-list">
                <li class="list-item" v-for="(exclusion, index) in tourPackage.exclusions" :key="index">
                  <i class="fas fa-times-circle list-icon"></i>
                  {{ exclusion }}
                </li>
              </ul>
            </div>
            
            <div class="booking-panel">
              <div class="price">{{ tourPackage.price }}</div>
              <Button variant="primary" block>Book This Package</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPackageById } from '@/services/travelSearchService'
import Button from '@/components/Button.vue'

// Vue Router
const route = useRoute()

// Reactive data
const tourPackage = ref(null)
const loading = ref(true)
const error = ref('')

// Load package data
const loadPackage = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const packageId = route.params.id
    const pkg = await getPackageById(packageId)
    
    if (pkg) {
      tourPackage.value = pkg
    } else {
      error.value = 'Package not found.'
    }
  } catch (err) {
    console.error('Failed to load package:', err)
    error.value = 'Failed to load package details. Please try again.'
  } finally {
    loading.value = false
  }
}

// Initialize
onMounted(() => {
  loadPackage()
})
</script>

<style scoped>
.package-details-page {
  font-family: var(--font-primary);
  padding-bottom: var(--space-12);
}

/* Loading State */
.loading-container {
  text-align: center;
  padding: var(--space-12) 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid var(--primary-100);
  border-top: 5px solid var(--primary-500);
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
  margin: 0 auto var(--space-4);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: var(--text-primary);
  font-size: var(--font-size-lg);
}

/* Error State */
.error-container {
  text-align: center;
  padding: var(--space-12) var(--space-6);
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  margin: var(--space-8);
}

.error-icon {
  font-size: var(--font-size-3xl);
  color: var(--error);
  margin-bottom: var(--space-3);
}

.error-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.error-message {
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
  line-height: var(--line-height-relaxed);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(rgba(10, 31, 68, 0.85), rgba(10, 31, 68, 0.85)), 
              url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
  color: var(--text-inverse);
  text-align: center;
  padding: var(--space-16) 0;
}

.hero-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-3);
  color: var(--text-inverse);
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-inverse);
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

/* Package Image */
.package-image {
  padding: var(--space-12) 0;
}

.package-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

/* Package Information */
.package-info {
  padding: var(--space-12) 0;
}

.info-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-12);
}

.section-title {
  color: var(--text-primary);
  margin-bottom: var(--space-4);
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
}

.subsection-title {
  color: var(--text-primary);
  margin-bottom: var(--space-3);
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
}

.section-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
  line-height: var(--line-height-relaxed);
}

.day-title {
  color: var(--primary-500);
  margin-bottom: var(--space-2);
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
}

.day-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
}

.itinerary {
  margin-bottom: var(--space-8);
}

.itinerary-day {
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--border-primary);
}

.itinerary-day:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.list-item {
  margin-bottom: var(--space-2);
  color: var(--text-secondary);
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  line-height: var(--line-height-normal);
}

.list-icon {
  color: var(--primary-500);
  min-width: 20px;
  margin-top: var(--space-1);
}

.inclusions-list {
  list-style: none;
  padding: 0;
  margin-bottom: var(--space-8);
}

.exclusions-list {
  list-style: none;
  padding: 0;
  margin-bottom: var(--space-8);
}

.booking-panel {
  background: var(--bg-secondary);
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  text-align: center;
  position: sticky;
  top: 100px;
}

.price {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--secondary-500);
  margin-bottom: var(--space-6);
}

/* Responsive Design */
@media (max-width: 992px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .booking-panel {
    position: static;
  }
  
  .package-image {
    padding: var(--space-8) 0;
  }
  
  .package-img {
    height: 400px;
  }
  
  .package-info {
    padding: var(--space-8) 0;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: var(--space-12) 0;
  }
  
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .section-title {
    font-size: var(--font-size-xl);
  }
  
  .subsection-title {
    font-size: var(--font-size-lg);
  }
  
  .package-img {
    height: 300px;
  }
  
  .price {
    font-size: var(--font-size-2xl);
  }
}

@media (max-width: 576px) {
  .day-title {
    font-size: var(--font-size-base);
  }
  
  .day-description {
    font-size: var(--font-size-sm);
  }
}
</style>