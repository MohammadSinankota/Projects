<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="logo">
        <router-link to="/">
          <h1 class="logo-text">Travel<span class="logo-highlight">folio</span></h1>
        </router-link>
      </div>
      <nav class="nav">
        <ul class="nav-list" :class="{ active: isMenuOpen }">
          <li><router-link to="/" exact-active-class="active" @click="closeMenu">Home</router-link></li>
          <li class="dropdown" @mouseenter="openDropdown" @mouseleave="closeDropdown">
            <router-link to="/destinations" exact-active-class="active" @click="closeMenu">Destinations</router-link>
            <ul class="dropdown-menu">
              <li><router-link to="/destinations#beach" @click="closeMenu">Beach Destinations</router-link></li>
              <li><router-link to="/destinations#mountain" @click="closeMenu">Mountain Retreats</router-link></li>
              <li><router-link to="/destinations#city" @click="closeMenu">City Tours</router-link></li>
              <li><router-link to="/destinations#cultural" @click="closeMenu">Cultural Experiences</router-link></li>
            </ul>
          </li>
          <li class="dropdown" @mouseenter="openDropdown" @mouseleave="closeDropdown">
            <router-link to="/packages" exact-active-class="active" @click="closeMenu">Packages</router-link>
            <ul class="dropdown-menu">
              <li><router-link to="/packages#honeymoon" @click="closeMenu">Honeymoon Specials</router-link></li>
              <li><router-link to="/packages#family" @click="closeMenu">Family Adventures</router-link></li>
              <li><router-link to="/packages#luxury" @click="closeMenu">Luxury Escapes</router-link></li>
              <li><router-link to="/packages#budget" @click="closeMenu">Budget Friendly</router-link></li>
            </ul>
          </li>
          <li><router-link to="/search" exact-active-class="active" @click="closeMenu">Search</router-link></li>
          <li><router-link to="/about" exact-active-class="active" @click="closeMenu">About</router-link></li>
          <li><router-link to="/testimonials" exact-active-class="active" @click="closeMenu">Testimonials</router-link></li>
          <li><router-link to="/blog" exact-active-class="active" @click="closeMenu">Blog</router-link></li>
          <li><router-link to="/contact" exact-active-class="active" @click="closeMenu">Contact</router-link></li>
        </ul>
        <div class="nav-actions">
          <div class="language-selector">
            <select id="languageSelect" v-model="selectedLanguage" @change="changeLanguage" class="lang-select">
              <option value="en">EN 🇬🇧</option>
              <option value="es">ES 🇪🇸</option>
              <option value="fr">FR 🇫🇷</option>
              <option value="hi">HI 🇮🇳</option>
              <option value="ar">AR 🇸🇦</option>
            </select>
          </div>
          <button class="theme-toggle btn-ghost" @click="toggleTheme">
            <i :class="isDarkTheme ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>
          <div class="auth-buttons">
            <Button to="/login" variant="outline-primary">Login</Button>
            <Button to="/register" variant="primary">Register</Button>
          </div>
          <div class="hamburger" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Button from '@/components/ui/Button.vue'

// Props
const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    default: false
  },
  isDarkTheme: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['toggleMenu', 'closeMenu', 'toggleTheme'])

// Reactive data
const selectedLanguage = ref('en')
const isScrolled = ref(false)

// Methods
const toggleMenu = () => {
  emit('toggleMenu')
}

const closeMenu = () => {
  emit('closeMenu')
}

const toggleTheme = () => {
  emit('toggleTheme')
}

const openDropdown = (event) => {
  event.currentTarget.classList.add('active')
}

const closeDropdown = (event) => {
  event.currentTarget.classList.remove('active')
}

const changeLanguage = () => {
  localStorage.setItem('language', selectedLanguage.value)
  // In a real implementation, this would trigger content translation
  console.log(`Language changed to: ${selectedLanguage.value}`)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Set initial language
onMounted(() => {
  // Set initial language
  const savedLanguage = localStorage.getItem('language') || navigator.language.split('-')[0]
  selectedLanguage.value = ['en', 'es', 'fr', 'hi', 'ar'].includes(savedLanguage) ? savedLanguage : 'en'
  
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  transition: var(--transition);
  padding: var(--space-3) 0;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-text {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin: 0;
  color: var(--text-primary);
}

.logo-highlight {
  color: var(--primary-500);
}

.logo a {
  text-decoration: none;
  color: inherit;
}

.nav {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: var(--space-6);
}

.nav-list li {
  position: relative;
}

.nav-list a {
  text-decoration: none;
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  transition: var(--transition);
  position: relative;
  padding: var(--space-2) 0;
  font-size: var(--font-size-base);
}

.nav-list a:hover,
.nav-list a.active {
  color: var(--primary-500);
}

.nav-list a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-500);
  transition: var(--transition);
}

.nav-list a:hover::after,
.nav-list a.active::after {
  width: 100%;
}

/* Dropdown Styles */
.dropdown:hover .dropdown-menu,
.dropdown.active .dropdown-menu {
  display: block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-lg);
  padding: var(--space-2) 0;
  min-width: 220px;
  z-index: var(--z-dropdown);
  margin-top: var(--space-2);
}

.dropdown-menu li {
  margin: 0;
  list-style:none;  
}

.dropdown-menu a {
  display: block;
  padding: var(--space-3) var(--space-4);
  color: var(--text-primary);
  text-decoration: none;
  transition: var(--transition);
  font-size: var(--font-size-sm);
}

.dropdown-menu a:hover {
  background-color: var(--primary-50);
  color: var(--primary-600);
}

.dropdown-menu a::after {
  display: none;
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-left: var(--space-6);
}

.theme-toggle {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  font-size: var(--font-size-lg);
  color: var(--text-primary);
  border: none;
  background: none;
  cursor: pointer;
  transition: var(--transition);
}

.theme-toggle:hover {
  background-color: var(--primary-50);
  color: var(--primary-600);
}

.lang-select {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-primary);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: var(--transition);
}

.lang-select:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  transition: var(--transition);
}

.hamburger:hover {
  background-color: var(--primary-50);
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: var(--text-primary);
  margin: 3px 0;
  transition: var(--transition);
}

/* Responsive Design */
@media (max-width: 992px) {
  .nav-list {
    position: fixed;
    top: 70px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 70px);
    background-color: var(--bg-primary);
    flex-direction: column;
    align-items: center;
    padding-top: var(--space-8);
    transition: var(--transition);
    box-shadow: var(--shadow-lg);
    gap: 0;
  }
  
  .nav-list.active {
    left: 0;
  }
  
  .nav-list li {
    margin: var(--space-4) 0;
    width: 100%;
    text-align: center;
  }
  
  .dropdown-menu {
    position: static;
    box-shadow: none;
    padding-left: var(--space-6);
    display: none;
    background-color: var(--primary-50);
    border-radius: 0;
    margin-top: 0;
  }
  
  .dropdown.active .dropdown-menu {
    display: block;
  }
  
  .nav-buttons {
    display: none;
  }
  
  .hamburger {
    display: flex;
  }
  
  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
}
</style>