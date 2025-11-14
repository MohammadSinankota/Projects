<template>
  <div class="home-page">
    <!-- Hero Section with Image Background -->
    <section class="hero-section">
      <div class="image-background">
        <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Travel Background" class="hero-bg-image">
        <div class="image-overlay"></div>
      </div>
      
      <div class="hero-content">
        <h1 class="hero-title">Explore the World with Travelfolio 🌎</h1>
        <p class="hero-subtext">Discover breathtaking destinations, curated experiences, and unforgettable journeys tailored just for you.</p>
        <div class="hero-buttons">
          <Button to="/search" variant="primary" size="xl">Search Destinations</Button>
          <Button to="/booking" variant="outline-primary" size="xl">Book Your Trip</Button>
        </div>
      </div>
    </section>

    <!-- Search Bar Section -->
    <section class="search-section">
      <div class="container">
        <div class="search-box">
          <div class="search-inputs">
            <div class="input-group">
              <label for="destination" class="input-label">Destination</label>
              <input type="text" id="destination" placeholder="Where do you want to go?" class="form-input" ref="searchInput">
            </div>
            
            <div class="input-group">
              <label for="date" class="input-label">Date</label>
              <input type="date" id="date" class="form-input">
            </div>
            
            <div class="input-group">
              <label for="budget" class="input-label">Budget Range</label>
              <select id="budget" class="form-select">
                <option value="">Select Budget</option>
                <option value="0-20000">₹0 - ₹20,000</option>
                <option value="20000-50000">₹20,000 - ₹50,000</option>
                <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                <option value="100000+">₹1,00,000+</option>
              </select>
            </div>
          </div>
          
          <Button @click="searchDestinations" variant="primary">Search Trips</Button>
        </div>
      </div>
    </section>

    <!-- Popular Destinations -->
    <section class="popular-destinations">
      <div class="container">
        <h2 class="section-title">Top Destinations Around the World</h2>
        <div class="destinations-grid">
          <div class="destination-card">
            <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Bali, Indonesia" class="destination-image">
            <div class="destination-info">
              <h3 class="destination-name">Bali, Indonesia</h3>
              <p class="destination-description">Tropical paradise with beaches and temples.</p>
              <Button to="/destinations/6" variant="outline-primary">Explore</Button>
            </div>
          </div>
          
          <div class="destination-card">
            <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80" alt="Paris, France" class="destination-image">
            <div class="destination-info">
              <h3 class="destination-name">Paris, France</h3>
              <p class="destination-description">Romantic city of lights, art, and culture.</p>
              <Button to="/destinations/8" variant="outline-primary">Explore</Button>
            </div>
          </div>
          
          <div class="destination-card">
            <img src="https://images.unsplash.com/photo-1529271029047-0a0b5c40d9a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Dubai, UAE" class="destination-image">
            <div class="destination-info">
              <h3 class="destination-name">Dubai, UAE</h3>
              <p class="destination-description">Luxury meets adventure in the desert.</p>
              <Button to="/destinations/7" variant="outline-primary">Explore</Button>
            </div>
          </div>
          
          <div class="destination-card">
            <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Maldives" class="destination-image">
            <div class="destination-info">
              <h3 class="destination-name">Maldives</h3>
              <p class="destination-description">Turquoise waters, coral reefs, and villas on the sea.</p>
              <Button to="/destinations/1" variant="outline-primary">Explore</Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Packages -->
    <section class="top-packages">
      <div class="container">
        <h2 class="section-title">Featured Tour Packages</h2>
        <div class="packages-grid">
          <div class="package-card">
            <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Adventure in the Alps" class="package-image">
            <div class="package-info">
              <h3 class="package-name">Adventure in the Alps</h3>
              <div class="package-details">
                <span class="price">₹65,000</span>
                <span class="duration">7 Days</span>
              </div>
              <p class="package-description">Experience thrilling mountain adventures with expert guides and luxury accommodations.</p>
              <Button to="/packages/5" variant="primary">View Details</Button>
            </div>
          </div>
          
          <div class="package-card">
            <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Luxury Safari – Kenya" class="package-image">
            <div class="package-info">
              <h3 class="package-name">Luxury Safari – Kenya</h3>
              <div class="package-details">
                <span class="price">₹1,20,000</span>
                <span class="duration">5 Days</span>
              </div>
              <p class="package-description">Witness the majestic wildlife of Africa from luxurious safari lodges.</p>
              <Button to="/packages/6" variant="primary">View Details</Button>
            </div>
          </div>
          
          <div class="package-card">
            <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Family Fun in Singapore" class="package-image">
            <div class="package-info">
              <h3 class="package-name">Family Fun in Singapore</h3>
              <div class="package-details">
                <span class="price">₹80,000</span>
                <span class="duration">4 Days</span>
              </div>
              <p class="package-description">Perfect family getaway with theme parks, gardens, and cultural experiences.</p>
              <Button to="/packages/4" variant="primary">View Details</Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="why-choose-us">
      <div class="container">
        <h2 class="section-title">Why Choose Travelfolio</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">✈️</div>
            <h3 class="feature-title">Expert Guides</h3>
            <p class="feature-description">Certified travel professionals with deep local knowledge.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🏨</div>
            <h3 class="feature-title">Premium Stays</h3>
            <p class="feature-description">Handpicked hotels and resorts for unforgettable experiences.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💸</div>
            <h3 class="feature-title">Best Prices</h3>
            <p class="feature-description">Transparent and affordable packages with no hidden costs.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🌐</div>
            <h3 class="feature-title">24/7 Support</h3>
            <p class="feature-description">Always here to assist your journey with multilingual support.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <div class="container">
        <h2 class="section-title">What Our Travelers Say</h2>
        <div class="testimonials-carousel">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p class="testimonial-text">"Travelfolio made our honeymoon in Maldives magical! Every detail was perfect."</p>
              <div class="testimonial-author">— Priya & Karan</div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p class="testimonial-text">"Professional service and amazing destination options. Highly recommended!"</p>
              <div class="testimonial-author">— Amit Verma</div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p class="testimonial-text">"Loved the Bali trip. Everything was well managed and exceeded expectations!"</p>
              <div class="testimonial-author">— Sara J.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter">
      <div class="container">
        <div class="newsletter-content">
          <h2 class="newsletter-title">Stay Updated with Our Latest Offers</h2>
          <p class="newsletter-description">Join our 10,000+ travelers community and get exclusive deals.</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Enter your email" required class="form-input newsletter-input">
            <Button type="submit" variant="primary">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

const searchInput = ref(null)
const router = useRouter()

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

.image-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
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
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
}

.search-button {
  height: fit-content;
  align-self: flex-end;
}

/* Popular Destinations */
.popular-destinations {
  padding: var(--space-16) 0;
  background-color: var(--bg-primary);
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-8);
}

.destination-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  background: var(--bg-primary);
  height: 100%;
  display: flex;
  flex-direction: column;
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.destination-name {
  margin-bottom: var(--space-2);
  color: var(--text-primary);
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
}

.destination-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
  flex-grow: 1;
  line-height: var(--line-height-relaxed);
}

/* Top Packages */
.top-packages {
  padding: var(--space-16) 0;
  background-color: var(--bg-secondary);
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-8);
}

.package-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  background: var(--bg-primary);
  height: 100%;
  display: flex;
  flex-direction: column;
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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
  margin-bottom: var(--space-6);
  line-height: var(--line-height-relaxed);
  flex-grow: 1;
}

/* Why Choose Us */
.why-choose-us {
  padding: var(--space-16) 0;
  background-color: var(--bg-primary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-8);
}

.feature-card {
  text-align: center;
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  background: var(--bg-secondary);
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-4);
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
  padding: var(--space-16) 0;
  background-color: var(--bg-secondary);
}

.testimonials-carousel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.testimonial-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow);
  text-align: center;
}

.testimonial-text {
  font-style: italic;
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-4);
  color: var(--text-primary);
  line-height: var(--line-height-relaxed);
}

.testimonial-author {
  font-weight: var(--font-weight-semibold);
  color: var(--primary-500);
  font-size: var(--font-size-base);
}

/* Newsletter */
.newsletter {
  padding: var(--space-16) 0;
  background: linear-gradient(135deg, var(--primary-700), var(--primary-500));
  color: var(--text-inverse);
}

.newsletter-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.newsletter-title {
  margin-bottom: var(--space-3);
  font-size: var(--font-size-3xl);
  font-family: var(--font-secondary);
  color: var(--text-inverse);
}

.newsletter-description {
  margin-bottom: var(--space-8);
  opacity: 0.9;
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
}

.newsletter-form {
  display: flex;
  gap: var(--space-4);
  max-width: 500px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.newsletter-input {
  flex: 1;
  min-width: 250px;
  padding: var(--space-3) var(--space-4);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  color: var(--text-primary);
}

.newsletter-button {
  padding: var(--space-3) var(--space-6);
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
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-input {
    min-width: 100%;
  }
  
  .popular-destinations,
  .top-packages,
  .why-choose-us,
  .testimonials,
  .newsletter {
    padding: var(--space-12) 0;
  }
}

@media (max-width: 768px) {
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
}
</style>