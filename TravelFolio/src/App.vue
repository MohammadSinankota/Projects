<template>
  <div id="app">
    <Header 
      :is-menu-open="isMenuOpen" 
      :is-dark-theme="isDarkTheme"
      @toggle-menu="toggleMenu"
      @close-menu="closeMenu"
      @toggle-theme="toggleTheme"
    />
    
    <main>
      <RouterView />
    </main>
    
    <Footer />
    
    <BackToTop v-if="showBackToTop" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import Header from './components/ui/Header.vue'
import Footer from './components/ui/Footer.vue'
import BackToTop from './components/ui/BackToTop.vue'
import { onAuthStateChange } from './services/authService'

// Reactive data
const isMenuOpen = ref(false)
const isDarkTheme = ref(false)
const showBackToTop = ref(false)

// Theme toggle function
const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  if (isDarkTheme.value) {
    document.body.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.body.removeAttribute('data-theme')
    localStorage.setItem('theme', 'light')
  }
}

// Toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Close menu when clicking outside
const closeMenu = () => {
  isMenuOpen.value = false
}

// Handle scroll for back to top button
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// Set initial theme
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkTheme.value = true
    document.body.setAttribute('data-theme', 'dark')
  }
  
  window.addEventListener('scroll', handleScroll)
  
  // Listen for auth state changes
  const unsubscribe = onAuthStateChange((user) => {
    // Auth state changes are handled in Header component
    // This is just to ensure the listener is set up
  })
  
  // Cleanup listener on unmount
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>