<template>
  <div class="contact-page">
    <!-- Contact Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Contact Travelfolio</h1>
        <p class="hero-subtitle">We'd love to hear from you. Get in touch with our travel experts.</p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-section">
            <h2 class="section-title">Send Us a Message</h2>
            <form class="contact-form" @submit.prevent="submitContactForm">
              <div class="form-group">
                <label for="name" class="form-label">Full Name</label>
                <input type="text" id="name" v-model="contactForm.name" required class="form-input">
              </div>
              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" id="email" v-model="contactForm.email" required class="form-input">
              </div>
              <div class="form-group">
                <label for="subject" class="form-label">Subject</label>
                <input type="text" id="subject" v-model="contactForm.subject" required class="form-input">
              </div>
              <div class="form-group">
                <label for="message" class="form-label">Message</label>
                <textarea id="message" rows="5" v-model="contactForm.message" required class="form-textarea"></textarea>
              </div>
              <Button type="submit" variant="primary">Send Message</Button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="contact-info-section">
            <h2 class="section-title">Contact Information</h2>
            <div class="contact-info">
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="info-content">
                  <h3 class="info-title">Our Office</h3>
                  <p class="info-text">123 Travel Street, New York, NY 10001</p>
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-phone"></i>
                </div>
                <div class="info-content">
                  <h3 class="info-title">Phone Number</h3>
                  <p class="info-text">+1 (555) 123-4567</p>
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="info-content">
                  <h3 class="info-title">Email Address</h3>
                  <p class="info-text">info@travelfolio.com</p>
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon">
                  <i class="fab fa-whatsapp"></i>
                </div>
                <div class="info-content">
                  <h3 class="info-title">WhatsApp</h3>
                  <p class="info-text">+1 (555) 987-6543</p>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="social-media">
              <h3 class="social-title">Follow Us</h3>
              <div class="social-icons">
                <a href="#" class="social-icon">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-pinterest"></i>
                </a>
              </div>
            </div>

            <!-- Office Hours -->
            <div class="office-hours">
              <h3 class="hours-title">Office Hours</h3>
              <ul class="hours-list">
                <li class="hours-item">Monday - Friday: 9:00 AM - 6:00 PM</li>
                <li class="hours-item">Saturday: 10:00 AM - 4:00 PM</li>
                <li class="hours-item">Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Google Map -->
    <section class="map-section">
      <div class="container">
        <h2 class="section-title">Find Us on the Map</h2>
        <div class="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304603!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1697040000000!5m2!1sen!2s" 
            width="100%" 
            height="450" 
            style="border:0;" 
            allowfullscreen 
            loading="lazy">
          </iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'

// Reactive data for contact form
const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Method to submit contact form
const submitContactForm = () => {
  if (contactForm.value.name && contactForm.value.email && contactForm.value.subject && contactForm.value.message) {
    alert(`Thank you, ${contactForm.value.name}! Your message has been sent successfully. We'll get back to you soon.`)
    // Reset form
    contactForm.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } else {
    alert('Please fill in all required fields.')
  }
}
</script>

<style scoped>
.contact-page {
  font-family: var(--font-primary);
  padding-bottom: var(--space-12);
}

/* Hero Section */
.hero {
  height: 60vh;
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

/* Contact Content */
.contact-content {
  padding: var(--space-12) 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
}

/* Contact Form */
.contact-form-section {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow);
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
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

/* Contact Info */
.contact-info-section {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.info-item {
  display: flex;
  gap: var(--space-4);
}

.info-icon {
  font-size: var(--font-size-xl);
  color: var(--primary-500);
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
.social-media {
  margin-bottom: var(--space-8);
}

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
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: var(--primary-50);
  color: var(--primary-500);
  transition: var(--transition);
  text-decoration: none;
}

.social-icon:hover {
  background-color: var(--primary-500);
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
}

.hours-item {
  padding: var(--space-2) 0;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-primary);
}

.hours-item:last-child {
  border-bottom: none;
}

/* Map Section */
.map-section {
  padding: var(--space-12) 0;
  background-color: var(--bg-secondary);
}

.map-container {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
}

/* Responsive Design */
@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
}

@media (max-width: 768px) {
  .hero {
    height: 50vh;
  }
  
  .hero-title {
    font-size: var(--font-size-2xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-base);
  }
  
  .contact-content,
  .map-section {
    padding: var(--space-8) 0;
  }
  
  .contact-form-section,
  .contact-info-section {
    padding: var(--space-6);
  }
}

@media (max-width: 576px) {
  .info-item {
    flex-direction: column;
  }
  
  .info-icon {
    margin-bottom: var(--space-2);
  }
}
</style>