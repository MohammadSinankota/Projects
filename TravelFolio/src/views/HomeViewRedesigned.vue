<template>
  <div class="home-page">
    <!-- Hero Section with Video Background -->
    <section class="hero-section">
      <div class="video-background">
        <!-- Fallback to image background since video file is missing -->
        <div class="hero-image-fallback"></div>
        <!-- 
        <video 
          v-show="videoLoaded" 
          autoplay 
          muted 
          loop 
          class="hero-video" 
          @error="handleVideoError"
        >
          <source src="/videos/travel-hero.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        -->
        <div class="video-overlay"></div>
      </div>
      
      <div class="hero-content">
        <h1 class="hero-title">Explore the World with Travelfolio</h1>
        <p class="hero-subtext">Discover breathtaking destinations, curated experiences, and unforgettable journeys tailored just for you. With over 100,000 satisfied travelers, we're your trusted partner for extraordinary adventures.</p>
        <div class="hero-buttons">
          <Button to="/search" variant="primary" size="xl">Search Destinations</Button>
          <Button to="/booking" variant="outline-primary" size="xl">Book Your Trip</Button>
        </div>
      </div>
    </section>

    <!-- Search Bar Section -->
    <section class="search-section">
      <div class="container">
        <div class="search-box card">
          <div class="search-inputs">
            <div class="input-group">
              <label for="destination" class="input-label">Destination</label>
              <input type="text" id="destination" placeholder="Where do you want to go?" class="form-input" ref="searchInput">
            </div>
            
            <div class="input-group">
              <label for="checkin" class="input-label">Check-in</label>
              <input type="date" id="checkin" class="form-input">
            </div>
            
            <div class="input-group">
              <label for="checkout" class="input-label">Check-out</label>
              <input type="date" id="checkout" class="form-input">
            </div>
            
            <div class="input-group">
              <label for="guests" class="input-label">Guests</label>
              <select id="guests" class="form-select">
                <option value="1">1 Guest</option>
                <option value="2" selected>2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5+">5+ Guests</option>
              </select>
            </div>
          </div>
          
          <Button @click="searchDestinations" variant="primary" size="lg">
            <i class="fas fa-search"></i> Search
          </Button>
        </div>
      </div>
    </section>

    <!-- Popular Destinations -->
    <section class="popular-destinations py-16">
      <div class="container">
        <h2 class="section-title">Top Destinations Around the World</h2>
        <div class="destinations-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card v-for="destination in destinations" :key="destination.id" hover class="destination-card">
            <template #header>
              <div class="destination-image-container">
                <img :src="destination.image" :alt="destination.name" class="destination-image">
                <div class="destination-rating">
                  <i class="fas fa-star"></i> {{ destination.rating }}
                </div>
              </div>
            </template>
            <div class="destination-info">
              <h3 class="destination-name">{{ destination.name }}</h3>
              <p class="destination-location">
                <i class="fas fa-map-marker-alt"></i> {{ destination.location }}
              </p>
              <p class="destination-description">{{ destination.description }}</p>
              <div class="destination-meta">
                <span class="price">From ₹{{ destination.price }}</span>
              </div>
              <Button :to="`/destinations/${destination.id}`" variant="primary" block>Explore</Button>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- Featured Packages -->
    <section class="featured-packages py-16 bg-secondary-light">
      <div class="container">
        <h2 class="section-title">Featured Tour Packages</h2>
        <div class="packages-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="pkg in packages" :key="pkg.id" hover class="package-card">
            <template #header>
              <div class="package-image-container">
                <img :src="pkg.image" :alt="pkg.name" class="package-image">
                <div class="package-badge" :class="pkg.badgeClass">{{ pkg.badge }}</div>
              </div>
            </template>
            <div class="package-info">
              <h3 class="package-name">{{ pkg.name }}</h3>
              <div class="package-details">
                <span class="duration"><i class="fas fa-clock"></i> {{ pkg.duration }}</span>
                <span class="price">₹{{ pkg.price }}</span>
              </div>
              <ul class="package-inclusions">
                <li v-for="(inclusion, index) in pkg.inclusions.slice(0, 3)" :key="index">
                  <i class="fas fa-check-circle"></i> {{ inclusion }}
                </li>
                <li v-if="pkg.inclusions.length > 3">
                  <i class="fas fa-plus-circle"></i> +{{ pkg.inclusions.length - 3 }} more
                </li>
              </ul>
              <Button :to="`/packages/${pkg.id}`" variant="primary" block>View Details</Button>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="why-choose-us py-16">
      <div class="container">
        <h2 class="section-title">Why Choose Travelfolio</h2>
        <div class="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="feature-card card text-center">
            <div class="feature-icon">
              <i class="fas fa-user-tie"></i>
            </div>
            <h3 class="feature-title">Expert Guides</h3>
            <p class="feature-description">Certified travel professionals with deep local knowledge and over 10 years of experience in creating memorable journeys.</p>
          </div>
          
          <div class="feature-card card text-center">
            <div class="feature-icon">
              <i class="fas fa-hotel"></i>
            </div>
            <h3 class="feature-title">Premium Stays</h3>
            <p class="feature-description">Handpicked hotels and resorts that offer exceptional comfort, service, and authentic local experiences.</p>
          </div>
          
          <div class="feature-card card text-center">
            <div class="feature-icon">
              <i class="fas fa-tags"></i>
            </div>
            <h3 class="feature-title">Best Prices</h3>
            <p class="feature-description">Transparent and affordable packages with no hidden costs. We guarantee the best value for your travel investment.</p>
          </div>
          
          <div class="feature-card card text-center">
            <div class="feature-icon">
              <i class="fas fa-headset"></i>
            </div>
            <h3 class="feature-title">24/7 Support</h3>
            <p class="feature-description">Always here to assist your journey with multilingual support. Our dedicated team is available around the clock for your peace of mind.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials py-16 bg-secondary-light">
      <div class="container">
        <h2 class="section-title">What Our Travelers Say</h2>
        <div class="testimonials-carousel">
          <div class="testimonial-card card">
            <div class="testimonial-header">
              <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Priya Sharma" class="testimonial-avatar">
              <div class="testimonial-info">
                <h3 class="testimonial-name">Priya Sharma</h3>
                <div class="testimonial-rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>
            <div class="testimonial-content">
              <p class="testimonial-text">"Travelfolio made our honeymoon in Bali absolutely magical! Every detail was perfect, from the airport pickup to the romantic dinner on the beach. The personalized itinerary exceeded our expectations, and the local guides were incredibly knowledgeable. Highly recommend their services!"</p>
              <div class="testimonial-meta">
                <span class="testimonial-destination">Bali, Indonesia</span>
                <span class="testimonial-date">June 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter py-16">
      <div class="container">
        <div class="newsletter-content card text-center">
          <h2 class="newsletter-title">Stay Updated with Our Latest Offers</h2>
          <p class="newsletter-description">Join our 50,000+ travelers community and get exclusive deals delivered to your inbox.</p>
          <form class="newsletter-form">
            <div class="form-group">
              <input type="email" placeholder="Enter your email" required class="form-input">
              <Button type="submit" variant="primary">Subscribe</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'

const searchInput = ref(null)
const router = useRouter()
const videoLoaded = ref(false)

const handleVideoError = () => {
  console.warn('Video failed to load, using image fallback')
  videoLoaded.value = false
}

// Sample destinations data
const destinations = ref([
  {
    id: 1,
    name: 'Santorini, Greece',
    description: 'Experience the iconic white-washed buildings and stunning sunsets of Santorini. Explore ancient ruins, taste exceptional wines, and relax on unique volcanic beaches. Perfect for honeymooners and culture enthusiasts.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Europe',
    rating: 4.9,
    price: '85,000'
  },
  {
    id: 2,
    name: 'Tokyo, Japan',
    description: 'Immerse yourself in the fascinating blend of traditional culture and futuristic innovation. From serene temples to bustling Shibuya Crossing, Tokyo offers an unforgettable urban adventure with world-class cuisine.',
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Asia',
    rating: 4.8,
    price: '95,000'
  },
  {
    id: 3,
    name: 'New York, USA',
    description: 'The city that never sleeps awaits with its iconic skyline, world-class museums, Broadway shows, and diverse neighborhoods. Experience the energy of Times Square, the tranquility of Central Park, and culinary delights from around the globe.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'North America',
    rating: 4.7,
    price: '1,20,000'
  },
  {
    id: 4,
    name: 'Bali, Indonesia',
    description: 'Discover the Island of the Gods with its lush rice terraces, ancient temples, and pristine beaches. Experience spiritual wellness, vibrant arts scene, and exceptional surfing spots in this tropical paradise.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Asia',
    rating: 4.7,
    price: '65,000'
  }
])

// Sample packages data
const packages = ref([
  {
    id: 1,
    name: 'Romantic Europe Escape',
    price: '1,50,000',
    duration: '10 Days',
    description: 'Experience the romance of Europe with this curated package. Visit Paris, Venice, and Santorini with luxury accommodations and private tours.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['5-star accommodation', 'Daily breakfast', 'Airport transfers', 'Guided city tours', 'Romantic dinners', 'Spa treatments'],
    badge: 'Honeymoon',
    badgeClass: 'badge-honeymoon'
  },
  {
    id: 2,
    name: 'Bali Adventure Tour',
    price: '80,000',
    duration: '6 Days',
    description: 'Thrilling adventures in the heart of Bali. Surf, hike, and explore waterfalls with expert guides and comfortable accommodations.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['3-star hotels', 'All meals', 'Adventure activities', 'Local guide', 'Transportation', 'Travel insurance'],
    badge: 'Adventure',
    badgeClass: 'badge-adventure'
  },
  {
    id: 3,
    name: 'Luxury Dubai Getaway',
    price: '2,00,000',
    duration: '5 Days',
    description: 'Experience luxury in the most opulent city in the world. Stay in 5-star hotels, enjoy desert safaris, and indulge in world-class shopping.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusions: ['5-star hotels', 'All meals', 'Desert safari', 'Spa treatments', 'Private transfers', 'Concierge service'],
    badge: 'Luxury',
    badgeClass: 'badge-luxury'
  }
])

const searchDestinations = () => {
  const query = searchInput.value?.value.trim()
  if (query) {
    router.push({
      path: '/search',
      query: { q: query }
    })
  }
}
</script>

<style scoped>
.home-page {
  font-family: var(--font-primary);
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-inverse);
  overflow: hidden;
}

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-image-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(10, 31, 68, 0.85), rgba(0, 191, 191, 0.7)),
              url('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(10, 31, 68, 0.85), rgba(0, 191, 191, 0.7));
}

.hero-content {
  max-width: 800px;
  padding: 0 var(--space-5);
  z-index: 1;
}

.hero-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  line-height: var(--line-height-tight);
}

.hero-subtext {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-8);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  line-height: var(--line-height-normal);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

/* Search Section */
.search-section {
  background-color: var(--bg-secondary);
  padding: var(--space-12) 0;
  margin-top: -80px;
  position: relative;
  z-index: 1;
}

.search-box {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
  align-items: flex-end;
}

.search-inputs {
  display: flex;
  flex: 1;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.input-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 200px;
}

.input-label {
  margin-bottom: var(--space-2);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.form-input,
.form-select {
  padding: var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: var(--transition);
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 191, 191, 0.25);
}

/* Popular Destinations */
.popular-destinations {
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

/* Featured Packages */
.featured-packages {
  background-color: var(--bg-secondary);
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

/* Why Choose Us */
.why-choose-us {
  background-color: var(--bg-primary);
}

.feature-card {
  text-align: center;
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  transition: var(--transition);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-4);
  color: var(--primary-color);
}

.feature-title {
  margin-bottom: var(--space-3);
  color: var(--text-primary);
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
}

.feature-description {
  color: var(--text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

/* Testimonials */
.testimonials {
  background-color: var(--bg-secondary);
}

.testimonial-card {
  max-width: 800px;
  margin: 0 auto;
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-primary);
}

.testimonial-avatar {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.testimonial-info {
  flex: 1;
}

.testimonial-name {
  margin-bottom: var(--space-1);
  color: var(--text-primary);
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
}

.testimonial-rating {
  color: var(--accent-gold);
}

.testimonial-content {
  padding: var(--space-6);
}

.testimonial-text {
  font-style: italic;
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-4);
  color: var(--text-primary);
  line-height: var(--line-height-relaxed);
}

.testimonial-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* Newsletter */
.newsletter {
  background: linear-gradient(135deg, var(--primary-700), var(--primary-500));
  color: var(--text-inverse);
}

.newsletter-content {
  max-width: 600px;
  margin: 0 auto;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.newsletter-title {
  margin-bottom: var(--space-3);
  font-size: var(--font-size-3xl);
  font-family: var(--font-secondary);
  color: var(--text-primary);
}

.newsletter-description {
  margin-bottom: var(--space-8);
  opacity: 0.9;
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--text-secondary);
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-group {
  display: flex;
  gap: var(--space-3);
}

.form-input {
  flex: 1;
  min-width: 250px;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  color: var(--text-primary);
  background-color: var(--bg-primary);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 191, 191, 0.25);
}

/* Responsive Design */
@media (max-width: 992px) {
  .hero-title {
    font-size: var(--font-size-4xl);
  }
  
  .hero-subtext {
    font-size: var(--font-size-lg);
  }
  
  .search-inputs {
    flex-direction: column;
  }
  
  .input-group {
    min-width: 100%;
  }
  
  .form-group {
    flex-direction: column;
  }
  
  .form-input {
    min-width: 100%;
  }
  
  .popular-destinations,
  .featured-packages,
  .why-choose-us,
  .testimonials,
  .newsletter {
    padding: var(--space-12) 0;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 80vh;
  }
  
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .hero-subtext {
    font-size: var(--font-size-base);
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .search-box {
    padding: var(--space-6);
  }
  
  .section-title {
    font-size: var(--font-size-2xl);
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .newsletter-title {
    font-size: var(--font-size-2xl);
  }
  
  .testimonial-header {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: var(--font-size-2xl);
  }
  
  .hero-buttons .btn {
    width: 100%;
    max-width: 280px;
  }
  
  .package-details {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
  
  .price {
    font-size: var(--font-size-lg);
  }
  
  .testimonial-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
}
</style>