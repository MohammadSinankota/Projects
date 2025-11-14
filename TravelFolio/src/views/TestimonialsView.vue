<template>
  <div class="testimonials-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">What Our Travelers Say</h1>
        <p class="page-subtitle">Real stories from real adventures around the globe</p>
      </div>
    </section>

    <!-- Testimonials Grid -->
    <section class="testimonials-section">
      <div class="container">
        <div class="testimonials-grid">
          <div class="testimonial-card" v-for="testimonial in testimonials" :key="testimonial.id">
            <div class="testimonial-header">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="avatar">
              <div class="testimonial-info">
                <h3 class="testimonial-name">{{ testimonial.name }}</h3>
                <div class="rating">
                  <i v-for="n in 5" :key="n" class="fas fa-star rating-star" :class="{ 'filled': n <= testimonial.rating }"></i>
                </div>
              </div>
            </div>
            <div class="testimonial-content">
              <p class="testimonial-review">{{ testimonial.review }}</p>
              <div class="travel-details">
                <span class="destination detail-item"><i class="fas fa-map-marker-alt detail-icon"></i> {{ testimonial.destination }}</span>
                <span class="date detail-item"><i class="far fa-calendar detail-icon"></i> {{ testimonial.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Submit Testimonial -->
    <section class="submit-testimonial">
      <div class="container">
        <div class="submit-content">
          <h2 class="submit-title">Share Your Travel Experience</h2>
          <p class="submit-subtitle">We'd love to hear about your journey with Travelfolio</p>
          <form class="testimonial-form" @submit.prevent="submitTestimonial">
            <div class="form-group">
              <label for="name" class="form-label">Your Name</label>
              <input type="text" id="name" v-model="newTestimonial.name" required class="form-input">
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <input type="email" id="email" v-model="newTestimonial.email" required class="form-input">
            </div>
            <div class="form-group">
              <label for="destination" class="form-label">Destination</label>
              <input type="text" id="destination" v-model="newTestimonial.destination" required class="form-input">
            </div>
            <div class="form-group">
              <label class="form-label">Rating</label>
              <div class="rating-input">
                <i v-for="n in 5" :key="n" 
                   class="fas fa-star rating-star" 
                   :class="{ 'filled': n <= newTestimonial.rating }"
                   @click="setRating(n)"></i>
              </div>
            </div>
            <div class="form-group">
              <label for="review" class="form-label">Your Review</label>
              <textarea id="review" rows="5" v-model="newTestimonial.review" required class="form-textarea"></textarea>
            </div>
            <Button type="submit" variant="primary">Submit Your Review</Button>
          </form>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-content">
              <h3 class="stat-value">50,000+</h3>
              <p class="stat-label">Happy Travelers</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-globe"></i>
            </div>
            <div class="stat-content">
              <h3 class="stat-value">120+</h3>
              <p class="stat-label">Destinations</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-star"></i>
            </div>
            <div class="stat-content">
              <h3 class="stat-value">4.9/5</h3>
              <p class="stat-label">Average Rating</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-award"></i>
            </div>
            <div class="stat-content">
              <h3 class="stat-value">15+</h3>
              <p class="stat-label">Industry Awards</p>
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

// Testimonials data
const testimonials = ref([
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5,
    review: 'My honeymoon in Bali was absolutely magical! Travelfolio took care of every detail, from the airport pickup to the romantic dinner on the beach. Highly recommend their services!',
    destination: 'Bali, Indonesia',
    date: 'June 2023'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    rating: 5,
    review: 'The Swiss Alps adventure package exceeded all my expectations. The guides were knowledgeable, the accommodations were excellent, and the scenery was breathtaking. Will definitely book with Travelfolio again!',
    destination: 'Swiss Alps, Switzerland',
    date: 'May 2023'
  },
  {
    id: 3,
    name: 'Anita Desai',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4,
    review: 'Our family trip to Japan was well-organized and culturally enriching. The kids loved the interactive experiences, and we appreciated the attention to dietary requirements. Great value for money!',
    destination: 'Tokyo, Japan',
    date: 'April 2023'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    review: 'The safari experience in Kenya was unforgettable. The luxury accommodations and expert guides made it a once-in-a-lifetime experience. Travelfolio truly knows how to create memorable journeys!',
    destination: 'Maasai Mara, Kenya',
    date: 'March 2023'
  },
  {
    id: 5,
    name: 'Meera Patel',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    review: 'The Mediterranean cruise package was perfectly planned. Every port of call was amazing, and the onboard activities kept us entertained. The customer service was exceptional throughout our journey.',
    destination: 'Mediterranean Cruise',
    date: 'February 2023'
  },
  {
    id: 6,
    name: 'Amit Verma',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 4,
    review: 'Our road trip through the American West was an adventure of a lifetime. The itinerary was well-balanced with iconic landmarks and hidden gems. The 24/7 support was reassuring during our journey.',
    destination: 'American West, USA',
    date: 'January 2023'
  }
])

// New testimonial form data
const newTestimonial = ref({
  name: '',
  email: '',
  destination: '',
  rating: 0,
  review: ''
})

// Method to set rating
const setRating = (rating) => {
  newTestimonial.value.rating = rating
}

// Method to submit testimonial
const submitTestimonial = () => {
  if (newTestimonial.value.name && newTestimonial.value.email && newTestimonial.value.destination && 
      newTestimonial.value.rating > 0 && newTestimonial.value.review) {
    alert('Thank you for your testimonial! It has been submitted successfully.')
    // Reset form
    newTestimonial.value = {
      name: '',
      email: '',
      destination: '',
      rating: 0,
      review: ''
    }
  } else {
    alert('Please fill in all required fields.')
  }
}
</script>

<style scoped>
.testimonials-page {
  font-family: var(--font-primary);
  padding-bottom: var(--space-12);
}

/* Page Header */
.page-header {
  background: linear-gradient(rgba(10, 31, 68, 0.85), rgba(10, 31, 68, 0.85)), 
              url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
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
  margin-bottom: var(--space-3);
  color: var(--text-inverse);
}

.page-subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-inverse);
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

/* Testimonials Section */
.testimonials-section {
  padding: var(--space-12) 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.testimonial-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-primary);
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.testimonial-info {
  flex: 1;
}

.testimonial-name {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-1);
  color: var(--text-primary);
}

.rating {
  display: flex;
  gap: var(--space-1);
}

.rating-star {
  color: var(--neutral-300);
}

.rating-star.filled {
  color: var(--accent-gold);
}

.testimonial-content {
  padding: var(--space-6);
}

.testimonial-review {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
}

.travel-details {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.detail-icon {
  color: var(--primary-500);
}

/* Submit Testimonial */
.submit-testimonial {
  padding: var(--space-12) 0;
  background-color: var(--bg-secondary);
}

.submit-content {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow);
  max-width: 800px;
  margin: 0 auto;
}

.submit-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-2);
  color: var(--text-primary);
  text-align: center;
}

.submit-subtitle {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
  text-align: center;
  line-height: var(--line-height-relaxed);
  margin: 0 0 var(--space-6);
}

.testimonial-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-bottom: var(--space-2);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.form-input,
.form-textarea {
  padding: var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.rating-input {
  display: flex;
  gap: var(--space-1);
  font-size: var(--font-size-xl);
  color: var(--neutral-300);
  cursor: pointer;
}

.rating-input .rating-star.filled {
  color: var(--accent-gold);
}

/* Stats Section */
.stats-section {
  padding: var(--space-12) 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-8);
}

.stat-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow);
  text-align: center;
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  font-size: var(--font-size-3xl);
  color: var(--primary-500);
  margin-bottom: var(--space-4);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-family: var(--font-secondary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-2);
  color: var(--text-primary);
}

.stat-label {
  color: var(--text-secondary);
  margin: 0;
}

/* Responsive Design */
@media (max-width: 992px) {
  .page-title {
    font-size: var(--font-size-3xl);
  }
  
  .page-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .testimonials-section,
  .submit-testimonial,
  .stats-section {
    padding: var(--space-8) 0;
  }
  
  .submit-content {
    padding: var(--space-6);
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: var(--space-12) 0;
  }
  
  .page-title {
    font-size: var(--font-size-2xl);
  }
  
  .page-subtitle {
    font-size: var(--font-size-base);
  }
  
  .testimonial-header {
    flex-direction: column;
    text-align: center;
  }
  
  .travel-details {
    flex-direction: column;
    gap: var(--space-2);
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .submit-title {
    font-size: var(--font-size-xl);
  }
}
</style>