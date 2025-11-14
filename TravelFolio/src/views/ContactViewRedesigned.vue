<template>
  <div class="contact-page">
    <!-- Contact Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Contact Travelfolio</h1>
        <p class="hero-subtitle">We'd love to hear from you. Get in touch with our travel experts. Our dedicated team is available 24/7 to assist with any questions, bookings, or travel planning needs.</p>
        <Button 
          variant="primary" 
          size="large" 
          @click="scrollToForm"
          class="hero-cta"
        >
          Get in Touch
        </Button>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content" ref="formSection">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <Card class="contact-form-section">
            <template #header>
              <h2 class="section-title">Send Us a Message</h2>
            </template>
            <template #content>
              <form class="contact-form" @submit.prevent="submitContactForm">
                <div class="form-group">
                  <label for="name" class="form-label">Full Name <span class="required">*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="contactForm.name" 
                    required 
                    class="form-input"
                    placeholder="Enter your full name as it appears on your ID"
                  >
                </div>
                <div class="form-group">
                  <label for="email" class="form-label">Email Address <span class="required">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="contactForm.email" 
                    required 
                    class="form-input"
                    placeholder="Enter your primary email address"
                  >
                </div>
                <div class="form-group">
                  <label for="subject" class="form-label">Subject <span class="required">*</span></label>
                  <input 
                    type="text" 
                    id="subject" 
                    v-model="contactForm.subject" 
                    required 
                    class="form-input"
                    placeholder="Booking inquiry, general question, feedback, etc."
                  >
                </div>
                <div class="form-group">
                  <label for="message" class="form-label">Message <span class="required">*</span></label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    v-model="contactForm.message" 
                    required 
                    class="form-textarea"
                    placeholder="Please provide as much detail as possible about your inquiry, including travel dates, destinations, and any special requirements"
                  ></textarea>
                </div>
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="large" 
                  block
                  :disabled="isSubmitting"
                >
                  <span v-if="!isSubmitting">Send Message</span>
                  <span v-else>Sending...</span>
                </Button>
              </form>
            </template>
          </Card>

          <!-- Contact Information -->
          <div class="contact-info-section">
            <Card class="info-card">
              <template #header>
                <h2 class="section-title">Contact Information</h2>
              </template>
              <template #content>
                <div class="contact-info">
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="info-content">
                      <h3 class="info-title">Our Office</h3>
                      <p class="info-text">123 Travel Street, New York, NY 10001</p>
                      <p class="info-text">Open Monday-Friday, 9:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="fas fa-phone"></i>
                    </div>
                    <div class="info-content">
                      <h3 class="info-title">Phone Number</h3>
                      <p class="info-text">+1 (555) 123-4567</p>
                      <p class="info-text">24/7 Customer Support Hotline</p>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div class="info-content">
                      <h3 class="info-title">Email Address</h3>
                      <p class="info-text">info@travelfolio.com</p>
                      <p class="info-text">General inquiries - Response within 2 hours</p>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="fab fa-whatsapp"></i>
                    </div>
                    <div class="info-content">
                      <h3 class="info-title">WhatsApp</h3>
                      <p class="info-text">+1 (555) 987-6543</p>
                      <p class="info-text">Instant messaging support - Available 24/7</p>
                    </div>
                  </div>
                </div>
              </template>
            </Card>

            <!-- Social Media -->
            <Card class="social-card">
              <template #header>
                <h3 class="social-title">Follow Us</h3>
              </template>
              <template #content>
                <div class="social-icons">
                  <a href="#" class="social-icon" aria-label="Facebook">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" class="social-icon" aria-label="Twitter">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="#" class="social-icon" aria-label="Instagram">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="#" class="social-icon" aria-label="LinkedIn">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" class="social-icon" aria-label="Pinterest">
                    <i class="fab fa-pinterest"></i>
                  </a>
                </div>
              </template>
            </Card>

            <!-- Office Hours -->
            <Card class="hours-card">
              <template #header>
                <h3 class="hours-title">Office Hours</h3>
              </template>
              <template #content>
                <ul class="hours-list">
                  <li class="hours-item">
                    <span class="day">Monday - Friday</span>
                    <span class="time">9:00 AM - 6:00 PM EST</span>
                  </li>
                  <li class="hours-item">
                    <span class="day">Saturday</span>
                    <span class="time">10:00 AM - 4:00 PM EST</span>
                  </li>
                  <li class="hours-item">
                    <span class="day">Sunday</span>
                    <span class="time">Closed</span>
                  </li>
                  <li class="hours-item">
                    <span class="day">24/7 Emergency Support</span>
                    <span class="time">+1 (555) 123-4567</span>
                  </li>
                </ul>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <!-- Google Map -->
    <section class="map-section">
      <div class="container">
        <h2 class="section-title">Find Us on the Map</h2>
        <Card class="map-card">
          <template #content>
            <div class="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304603!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1697040000000!5m2!1sen!2s" 
                width="100%" 
                height="450" 
                style="border:0;" 
                allowfullscreen 
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'

// Reactive data for contact form
const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const formSection = ref<HTMLElement | null>(null)

// Method to submit contact form
const submitContactForm = () => {
  if (contactForm.value.name && contactForm.value.email && contactForm.value.subject && contactForm.value.message) {
    isSubmitting.value = true
    
    // Simulate API call
    setTimeout(() => {
      alert(`Thank you, ${contactForm.value.name}! Your message has been sent successfully. We'll get back to you soon.`)
      // Reset form
      contactForm.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      isSubmitting.value = false
    }, 1500)
  } else {
    alert('Please fill in all required fields.')
  }
}

// Scroll to form section
const scrollToForm = () => {
  formSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.contact-page {
  font-family: var(--font-primary);
  padding-bottom: var(--space-12);
}

/* Hero Section */
.hero {
  height: 70vh;
  background: linear-gradient(rgba(10, 31, 68, 0.85), rgba(10, 31, 68, 0.85)), 
              url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-inverse);
  margin-bottom: var(--space-12);
}

.hero-content {
  max-width: 800px;
  padding: 0 var(--space-6);
}

.hero-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--text-inverse);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-inverse);
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto var(--space-6);
  line-height: var(--line-height-relaxed);
}

.hero-cta {
  margin-top: var(--space-4);
}

/* Contact Content */
.contact-content {
  padding: var(--space-12) 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
}

/* Contact Form */
.contact-form-section {
  height: fit-content;
}

.contact-form {
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
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 191, 191, 0.25);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--text-tertiary);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

/* Contact Info */
.contact-info-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.info-card,
.social-card,
.hours-card {
  height: fit-content;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.info-item {
  display: flex;
  gap: var(--space-4);
}

.info-icon {
  font-size: var(--font-size-xl);
  color: var(--primary-color);
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-content {
  flex: 1;
}

.info-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-1);
  color: var(--text-primary);
}

.info-text {
  color: var(--text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

/* Social Media */
.social-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--text-primary);
}

.social-icons {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: var(--primary-50);
  color: var(--primary-color);
  transition: var(--transition);
  text-decoration: none;
}

.social-icon:hover {
  background-color: var(--primary-color);
  color: var(--text-inverse);
  transform: translateY(-3px);
}

/* Office Hours */
.hours-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--text-primary);
}

.hours-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.hours-item {
  display: flex;
  justify-content: space-between;
  padding: var(--space-3) 0;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-primary);
}

.hours-item:last-child {
  border-bottom: none;
}

.day {
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.time {
  color: var(--text-secondary);
}

/* Map Section */
.map-section {
  padding: var(--space-12) 0;
  background-color: var(--bg-secondary);
}

.map-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.map-container {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

/* Responsive Design */
@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: var(--font-size-4xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
}

@media (max-width: 768px) {
  .hero {
    height: 60vh;
  }
  
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-base);
  }
  
  .contact-content,
  .map-section {
    padding: var(--space-8) 0;
  }
  
  .contact-grid {
    gap: var(--space-6);
  }
  
  .social-icons {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .info-item {
    flex-direction: column;
  }
  
  .info-icon {
    margin-bottom: var(--space-2);
  }
  
  .hours-item {
    flex-direction: column;
    gap: var(--space-1);
  }
  
  .hero-title {
    font-size: var(--font-size-2xl);
  }
  
  .hero-content {
    padding: 0 var(--space-4);
  }
}
</style>