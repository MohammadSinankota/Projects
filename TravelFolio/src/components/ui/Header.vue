<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <div class="header-logo">
        <RouterLink to="/" class="logo-link">
          <h1 class="logo-text">Travel<span class="logo-highlight">folio</span></h1>
        </RouterLink>
      </div>
      
      <nav class="header-nav" :class="{ 'nav-open': isMenuOpen }">
        <ul class="nav-list">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" @click="closeMenu">Home</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <RouterLink to="/destinations" class="nav-link" @click="closeMenu">Destinations</RouterLink>
            <ul class="dropdown-menu">
              <li><RouterLink to="/destinations#beach" class="dropdown-link" @click="closeMenu">Beach Destinations</RouterLink></li>
              <li><RouterLink to="/destinations#mountain" class="dropdown-link" @click="closeMenu">Mountain Retreats</RouterLink></li>
              <li><RouterLink to="/destinations#city" class="dropdown-link" @click="closeMenu">City Tours</RouterLink></li>
              <li><RouterLink to="/destinations#cultural" class="dropdown-link" @click="closeMenu">Cultural Experiences</RouterLink></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <RouterLink to="/packages" class="nav-link" @click="closeMenu">Packages</RouterLink>
            <ul class="dropdown-menu">
              <li><RouterLink to="/packages#honeymoon" class="dropdown-link" @click="closeMenu">Honeymoon Specials</RouterLink></li>
              <li><RouterLink to="/packages#family" class="dropdown-link" @click="closeMenu">Family Adventures</RouterLink></li>
              <li><RouterLink to="/packages#luxury" class="dropdown-link" @click="closeMenu">Luxury Escapes</RouterLink></li>
              <li><RouterLink to="/packages#budget" class="dropdown-link" @click="closeMenu">Budget Friendly</RouterLink></li>
            </ul>
          </li>
          <li class="nav-item">
            <RouterLink to="/search" class="nav-link" @click="closeMenu">Search</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link" @click="closeMenu">About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/blog" class="nav-link" @click="closeMenu">Blog</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/contact" class="nav-link" @click="closeMenu">Contact</RouterLink>
          </li>
        </ul>
      </nav>
      
      <div class="header-actions">
        <div class="action-item language-selector">
          <select v-model="selectedLanguage" @change="changeLanguage" class="language-select">
            <option value="en">EN 🇬🇧</option>
            <option value="es">ES 🇪🇸</option>
            <option value="fr">FR 🇫🇷</option>
            <option value="hi">HI 🇮🇳</option>
            <option value="ar">AR 🇸🇦</option>
          </select>
        </div>
        
        <button class="action-item theme-toggle" @click="toggleTheme" :aria-label="isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'">
          <i :class="isDarkTheme ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
        
        <!-- User menu when logged in -->
        <div v-if="currentUser" class="user-menu">
          <div class="user-dropdown">
            <button class="user-button" @click="toggleUserMenu" :aria-expanded="isUserMenuOpen">
              <i class="fas fa-user-circle user-icon"></i>
              <span class="user-name">{{ currentUser.displayName || 'User' }}</span>
              <i class="fas fa-chevron-down dropdown-icon"></i>
            </button>
            <ul class="user-dropdown-menu" :class="{ 'show': isUserMenuOpen }">
              <li>
                <RouterLink to="/dashboard" class="user-dropdown-link" @click="closeUserMenu">
                  <i class="fas fa-tachometer-alt"></i> Dashboard
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/dashboard#bookings" class="user-dropdown-link" @click="closeUserMenu">
                  <i class="fas fa-calendar-check"></i> My Bookings
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/dashboard#wishlist" class="user-dropdown-link" @click="closeUserMenu">
                  <i class="fas fa-heart"></i> Wishlist
                </RouterLink>
              </li>
              <li>
                <button class="user-dropdown-link" @click="handleLogout">
                  <i class="fas fa-sign-out-alt"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Auth buttons when not logged in -->
        <template v-else>
          <Button to="/login" variant="outline-primary" size="sm">Login</Button>
          <Button to="/register" variant="primary" size="sm">Register</Button>
        </template>
        
        <button class="hamburger" @click="toggleMenu" :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getCurrentUser, logoutUser, onAuthStateChange } from '@/services/authService'
import { useRouter } from 'vue-router'
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

// Router instance
const router = useRouter()

// Emits
const emit = defineEmits(['toggleMenu', 'closeMenu', 'toggleTheme'])

// Reactive data
const selectedLanguage = ref('en')
const isScrolled = ref(false)
const currentUser = ref(null)
const isUserMenuOpen = ref(false)

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

const changeLanguage = () => {
  localStorage.setItem('language', selectedLanguage.value)
  // In a real implementation, this would trigger content translation
  console.log(`Language changed to: ${selectedLanguage.value}`)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = () => {
  isUserMenuOpen.value = false
}

const handleLogout = async () => {
  try {
    const result = await logoutUser()
    if (result.success) {
      // Redirect to home page after logout
      router.push('/')
    } else {
      console.error('Logout failed:', result.error)
    }
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    closeUserMenu()
  }
}

// Close user menu when clicking outside
const handleClickOutside = (event) => {
  const userMenu = document.querySelector('.user-dropdown')
  if (userMenu && !userMenu.contains(event.target)) {
    isUserMenuOpen.value = false
  }
}

// Set initial language
onMounted(() => {
  // Set initial language
  const savedLanguage = localStorage.getItem('language') || navigator.language.split('-')[0]
  selectedLanguage.value = ['en', 'es', 'fr', 'hi', 'ar'].includes(savedLanguage) ? savedLanguage : 'en'
  
  window.addEventListener('scroll', handleScroll)
  
  // Listen for auth state changes
  const unsubscribe = onAuthStateChange((user) => {
    currentUser.value = user
  })
  
  // Add click outside listener
  document.addEventListener('click', handleClickOutside)
  
  // Cleanup
  onUnmounted(() => {
    unsubscribe()
    document.removeEventListener('click', handleClickOutside)
  })
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
  transition: all 0.3s ease;
  padding: var(--space-3) 0;
}

.header.header-scrolled {
  padding: var(--space-2) 0;
  box-shadow: var(--shadow-md);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-logo .logo-link {
  text-decoration: none;
  color: inherit;
}

.logo-text {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin: 0;
  color: var(--text-primary);
}

.logo-highlight {
  color: var(--primary-color);
}

.header-nav {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: var(--space-6);
}

.nav-link {
  text-decoration: none;
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  transition: var(--transition);
  position: relative;
  padding: var(--space-2) 0;
  font-size: var(--font-size-base);
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  color: var(--primary-color);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: var(--transition);
}

.nav-link:hover::after,
.nav-link.router-link-exact-active::after {
  width: 100%;
}

.dropdown {
  position: relative;
}

.dropdown:hover .dropdown-menu {
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

.dropdown-link {
  display: block;
  padding: var(--space-3) var(--space-4);
  color: var(--text-primary);
  text-decoration: none;
  transition: var(--transition);
  font-size: var(--font-size-sm);
}

.dropdown-link:hover {
  background-color: var(--primary-50);
  color: var(--primary-600);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.action-item {
  display: flex;
  align-items: center;
}

.language-select {
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

.language-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 191, 191, 0.25);
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

/* User Menu */
.user-menu {
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  padding: var(--space-2);
  border-radius: var(--radius-md);
  transition: var(--transition);
}

.user-button:hover {
  background-color: var(--primary-50);
}

.user-icon {
  font-size: var(--font-size-xl);
}

.dropdown-icon {
  font-size: var(--font-size-xs);
  transition: transform 0.3s ease;
}

.user-button:hover .dropdown-icon {
  transform: translateY(1px);
}

.user-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-lg);
  padding: var(--space-2) 0;
  min-width: 200px;
  z-index: var(--z-dropdown);
  margin-top: var(--space-2);
  display: none;
}

.user-dropdown-menu.show {
  display: block;
}

.user-dropdown-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  color: var(--text-primary);
  text-decoration: none;
  transition: var(--transition);
  font-size: var(--font-size-sm);
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}

.user-dropdown-link:hover {
  background-color: var(--primary-50);
  color: var(--primary-600);
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
  
  .nav-list.nav-open {
    left: 0;
  }
  
  .nav-item {
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
  
  .nav-open .dropdown.active .dropdown-menu {
    display: block;
  }
  
  .header-actions .btn {
    display: none;
  }
  
  .hamburger {
    display: flex;
  }
  
  .hamburger.nav-open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .hamburger.nav-open span:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.nav-open span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
  
  .user-name {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@media (max-width: 768px) {
  .logo-text {
    font-size: var(--font-size-xl);
  }
  
  .user-name {
    display: none;
  }
  
  .user-button {
    padding: var(--space-1);
  }
  
  .user-icon {
    font-size: var(--font-size-lg);
  }
}

@media (max-width: 576px) {
  .header {
    padding: var(--space-2) 0;
  }
  
  .container {
    padding: 0 var(--space-3);
  }
  
  .language-select {
    padding: var(--space-1) var(--space-2);
    font-size: var(--font-size-xs);
  }
  
  .theme-toggle {
    width: 35px;
    height: 35px;
    font-size: var(--font-size-base);
  }
}
</style>