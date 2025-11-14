<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h3 class="footer-logo">Travel<span class="logo-highlight">folio</span></h3>
          <p class="footer-description">Your premier travel agency for unforgettable journeys around the globe.</p>
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
        </div>
        
        <div class="footer-col">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><RouterLink to="/" class="footer-link">Home</RouterLink></li>
            <li><RouterLink to="/destinations" class="footer-link">Destinations</RouterLink></li>
            <li><RouterLink to="/packages" class="footer-link">Packages</RouterLink></li>
            <li><RouterLink to="/about" class="footer-link">About Us</RouterLink></li>
            <li><RouterLink to="/blog" class="footer-link">Blog</RouterLink></li>
            <li><RouterLink to="/contact" class="footer-link">Contact</RouterLink></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4 class="footer-heading">Destinations</h4>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Europe</a></li>
            <li><a href="#" class="footer-link">Asia</a></li>
            <li><a href="#" class="footer-link">North America</a></li>
            <li><a href="#" class="footer-link">South America</a></li>
            <li><a href="#" class="footer-link">Africa</a></li>
            <li><a href="#" class="footer-link">Oceania</a></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4 class="footer-heading">Contact Us</h4>
          <ul class="footer-contact">
            <li class="contact-item">
              <i class="fas fa-map-marker-alt contact-icon"></i>
              <span>123 Travel Street, New York</span>
            </li>
            <li class="contact-item">
              <i class="fas fa-phone contact-icon"></i>
              <span>+1 (555) 123-4567</span>
            </li>
            <li class="contact-item">
              <i class="fas fa-envelope contact-icon"></i>
              <span>info@travelfolio.com</span>
            </li>
            <li class="contact-item">
              <i class="fab fa-whatsapp contact-icon"></i>
              <span>+1 (555) 987-6543</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">&copy; {{ currentYear }} Travelfolio. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// Reactive data
const currentYear = ref(new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: var(--bg-inverse);
  color: var(--text-inverse);
  padding: var(--space-12) 0 var(--space-6);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-8);
  margin-bottom: var(--space-8);
}

.footer-logo {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--text-inverse);
}

.logo-highlight {
  color: var(--primary-400);
}

.footer-description {
  color: var(--neutral-300);
  margin-bottom: var(--space-6);
  line-height: var(--line-height-relaxed);
}

.footer-heading {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-4);
  color: var(--text-inverse);
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: var(--space-3);
}

.footer-link {
  color: var(--neutral-300);
  text-decoration: none;
  transition: var(--transition);
  font-size: var(--font-size-base);
  display: inline-block;
}

.footer-link:hover {
  color: var(--primary-400);
  padding-left: 5px;
}

.footer-contact {
  list-style: none;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--space-4);
  color: var(--neutral-300);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}

.contact-icon {
  margin-right: var(--space-3);
  min-width: 20px;
  color: var(--primary-400);
  font-size: var(--font-size-base);
  margin-top: 3px;
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
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-inverse);
  transition: var(--transition);
  text-decoration: none;
  font-size: var(--font-size-base);
}

.social-icon:hover {
  background-color: var(--primary-500);
  transform: translateY(-3px);
}

.footer-bottom {
  text-align: center;
  padding-top: var(--space-6);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright {
  color: var(--neutral-400);
  font-size: var(--font-size-sm);
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  
  .footer-col {
    text-align: center;
  }
  
  .social-icons {
    justify-content: center;
  }
}
</style>