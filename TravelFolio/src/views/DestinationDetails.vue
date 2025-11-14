<template>
  <div class="destination-details-page">
    <!-- Loading State -->
    <div class="loading-container" v-if="loading">
      <div class="spinner"></div>
      <p class="loading-text">Loading destination details...</p>
    </div>
    
    <!-- Error State -->
    <div class="error-container" v-else-if="error">
      <i class="fas fa-exclamation-triangle error-icon"></i>
      <h3 class="error-title">Something went wrong</h3>
      <p class="error-message">{{ error }}</p>
      <Button variant="primary" @click="loadDestination">Try Again</Button>
    </div>
    
    <!-- Content -->
    <div v-else-if="destination">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <h1 class="hero-title">{{ destination.name }}</h1>
          <p class="hero-subtitle">{{ destination.location }}</p>
        </div>
      </section>

      <!-- Image Gallery -->
      <section class="gallery-section">
        <div class="container">
          <div class="main-image">
            <img :src="destination.images[mainImageIndex]" :alt="destination.name" class="main-img">
          </div>
          <div class="thumbnails">
            <img 
              v-for="(image, index) in destination.images" 
              :key="index"
              :src="image" 
              :alt="destination.name"
              :class="{ active: index === mainImageIndex }"
              @click="mainImageIndex = index"
              class="thumbnail-img"
            >
          </div>
        </div>
      </section>

      <!-- Destination Information -->
      <section class="destination-info">
        <div class="container">
          <div class="info-grid">
            <div class="description">
              <h2 class="section-title">About {{ destination.name }}</h2>
              <p class="section-description">{{ destination.description }}</p>
              
              <h3 class="subsection-title">Highlights</h3>
              <ul class="highlights-list">
                <li class="highlight-item" v-for="(highlight, index) in destination.highlights" :key="index">
                  {{ highlight }}
                </li>
              </ul>
              
              <h3 class="subsection-title">Best Time to Visit</h3>
              <p class="section-description">{{ destination.bestTimeToVisit }}</p>
              
              <h3 class="subsection-title">Price Range</h3>
              <p class="section-description">{{ destination.priceRange }}</p>
            </div>
            
            <div class="booking-panel">
              <div class="price">{{ destination.priceRange }}</div>
              <Button variant="primary" block>Book Now</Button>
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
import { getDestinationById } from '@/services/travelSearchService'
import Button from '@/components/Button.vue'

// Vue Router
const route = useRoute()

// Reactive data
const mainImageIndex = ref(0)
const destination = ref(null)
const loading = ref(true)
const error = ref('')

// Load destination data
const loadDestination = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const destinationId = route.params.id
    const dest = await getDestinationById(destinationId)
    
    if (dest) {
      destination.value = {
        ...dest,
        images: dest.images || [
          dest.image,
          'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          'https://images.unsplash.com/photo-1535139262971-c51845709a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80'
        ]
      }
    } else {
      error.value = 'Destination not found.'
    }
  } catch (err) {
    console.error('Failed to load destination:', err)
    error.value = 'Failed to load destination details. Please try again.'
  } finally {
    loading.value = false
  }
}

// Initialize
onMounted(() => {
  loadDestination()
})
</script>

<style scoped>
.destination-details-page {
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
              url('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
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

/* Gallery Section */
.gallery-section {
  padding: var(--space-12) 0;
}

.main-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.thumbnails {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.thumbnail-img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  cursor: pointer;
  opacity: 0.7;
  transition: var(--transition);
}

.thumbnail-img.active,
.thumbnail-img:hover {
  opacity: 1;
  transform: scale(1.05);
  box-shadow: var(--shadow);
}

/* Destination Information */
.destination-info {
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

.highlights-list {
  list-style-type: disc;
  padding-left: var(--space-6);
  margin-bottom: var(--space-6);
}

.highlight-item {
  margin-bottom: var(--space-2);
  color: var(--text-secondary);
  line-height: var(--line-height-normal);
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
  
  .main-img {
    height: 400px;
  }
  
  .destination-info {
    padding: var(--space-8) 0;
  }
  
  .gallery-section {
    padding: var(--space-8) 0;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .main-img {
    height: 300px;
  }
  
  .hero-section {
    padding: var(--space-12) 0;
  }
  
  .section-title {
    font-size: var(--font-size-xl);
  }
  
  .subsection-title {
    font-size: var(--font-size-lg);
  }
  
  .price {
    font-size: var(--font-size-2xl);
  }
}

@media (max-width: 576px) {
  .thumbnails {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .thumbnail-img {
    height: 80px;
  }
}
</style>