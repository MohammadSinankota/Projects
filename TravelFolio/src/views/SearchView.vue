<template>
  <div class="search-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">Explore Travel Destinations & Packages</h1>
        <p class="page-subtitle">Search and discover amazing travel experiences around the world</p>
      </div>
    </section>

    <!-- Search Section -->
    <section class="search-section">
      <div class="container">
        <div class="search-box">
          <div class="search-tabs">
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'destinations' }"
              @click="setActiveTab('destinations')"
            >
              Destinations
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'packages' }"
              @click="setActiveTab('packages')"
            >
              Packages
            </button>
          </div>
          
          <div class="search-form">
            <div class="search-input-group">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search destinations, cities, countries..."
                class="form-input search-input"
                @keyup.enter="performSearch"
              >
              <Button variant="primary" @click="performSearch">
                <i class="fas fa-search"></i> Search
              </Button>
            </div>
            
            <div class="advanced-filters" v-if="showAdvancedFilters">
              <div class="filter-row" v-if="activeTab === 'destinations'">
                <div class="filter-group">
                  <label for="continent" class="filter-label">Continent</label>
                  <select id="continent" v-model="destinationFilters.continent" class="form-select">
                    <option value="">All Continents</option>
                    <option v-for="continent in continents" :key="continent" :value="continent">
                      {{ formatContinent(continent) }}
                    </option>
                  </select>
                </div>
                
                <div class="filter-group">
                  <label for="theme" class="filter-label">Theme</label>
                  <select id="theme" v-model="destinationFilters.theme" class="form-select">
                    <option value="">All Themes</option>
                    <option v-for="theme in themes" :key="theme" :value="theme">
                      {{ formatTheme(theme) }}
                    </option>
                  </select>
                </div>
                
                <div class="filter-group">
                  <label for="dest-price" class="filter-label">Price Range</label>
                  <select id="dest-price" v-model="destinationFilters.priceRange" class="form-select">
                    <option value="">All Budgets</option>
                    <option value="0-50000">₹0 - ₹50,000</option>
                    <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                    <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                    <option value="200000+">₹2,00,000+</option>
                  </select>
                </div>
              </div>
              
              <div class="filter-row" v-if="activeTab === 'packages'">
                <div class="filter-group">
                  <label for="package-type" class="filter-label">Package Type</label>
                  <select id="package-type" v-model="packageFilters.type" class="form-select">
                    <option value="">All Types</option>
                    <option v-for="type in packageTypes" :key="type" :value="type">
                      {{ formatPackageType(type) }}
                    </option>
                  </select>
                </div>
                
                <div class="filter-group">
                  <label for="duration" class="filter-label">Duration</label>
                  <select id="duration" v-model="packageFilters.durationRange" class="form-select">
                    <option value="">Any Duration</option>
                    <option value="1-3">1-3 Days</option>
                    <option value="4-7">4-7 Days</option>
                    <option value="8-14">8-14 Days</option>
                    <option value="15+">15+ Days</option>
                  </select>
                </div>
                
                <div class="filter-group">
                  <label for="pkg-price" class="filter-label">Price Range</label>
                  <select id="pkg-price" v-model="packageFilters.budgetRange" class="form-select">
                    <option value="">All Budgets</option>
                    <option value="0-50000">₹0 - ₹50,000</option>
                    <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                    <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                    <option value="200000+">₹2,00,000+</option>
                  </select>
                </div>
              </div>
              
              <div class="filter-row">
                <div class="filter-group">
                  <label for="sort" class="filter-label">Sort By</label>
                  <select 
                    id="sort" 
                    v-model="sortBy" 
                    class="form-select"
                    @change="performSearch"
                  >
                    <option value="">Default</option>
                    <option v-if="activeTab === 'destinations'" value="rating">Highest Rated</option>
                    <option v-if="activeTab === 'destinations'" value="name">Name (A-Z)</option>
                    <option v-if="activeTab === 'packages'" value="price-low">Price (Low to High)</option>
                    <option v-if="activeTab === 'packages'" value="price-high">Price (High to Low)</option>
                    <option v-if="activeTab === 'packages'" value="name">Name (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="filter-actions">
              <Button 
                variant="ghost"
                @click="showAdvancedFilters = !showAdvancedFilters"
              >
                {{ showAdvancedFilters ? 'Hide Filters' : 'Show Filters' }}
                <i :class="showAdvancedFilters ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
              </Button>
              <Button 
                variant="outline-primary" 
                @click="clearFilters"
                v-if="hasActiveFilters"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section class="results-section">
      <div class="container">
        <div class="results-header">
          <h2 class="results-title">
            {{ activeTab === 'destinations' ? 'Destinations' : 'Packages' }}
            <span class="results-count" v-if="!loading">
              ({{ results.length }} found)
            </span>
          </h2>
        </div>
        
        <!-- Loading State -->
        <div class="loading-container" v-if="loading">
          <div class="spinner"></div>
          <p class="loading-text">Searching for the best travel options...</p>
          <p class="ai-search-message" v-if="searchQuery">Using AI to find "{{ searchQuery }}"...</p>
        </div>
        
        <!-- Error State -->
        <div class="error-container" v-else-if="error">
          <i class="fas fa-exclamation-triangle error-icon"></i>
          <h3 class="error-title">Something went wrong</h3>
          <p class="error-message">{{ error }}</p>
          <Button variant="primary" @click="performSearch">Try Again</Button>
        </div>
        
        <!-- No Results State -->
        <div class="no-results" v-else-if="results.length === 0 && searchPerformed">
          <i class="fas fa-search search-icon"></i>
          <h3 class="no-results-title">No results found</h3>
          <p class="no-results-message">We couldn't find any {{ activeTab }} matching your search criteria. Try adjusting your filters.</p>
          <p class="ai-search-message" v-if="searchQuery">We're using AI to search for "{{ searchQuery }}" - please check back in a moment.</p>
        </div>
        
        <!-- Results Grid -->
        <div class="results-grid" v-else-if="results.length > 0">
          <div 
            class="result-card" 
            v-for="item in results" 
            :key="item.id"
          >
            <div class="card-image">
              <img :src="item.image" :alt="item.name" class="card-img">
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ item.name }}</h3>
              
              <div class="card-meta" v-if="activeTab === 'destinations'">
                <span class="location meta-item">
                  <i class="fas fa-map-marker-alt meta-icon"></i> {{ item.location }}
                </span>
                <span class="rating meta-item">
                  <i class="fas fa-star meta-icon"></i> {{ item.rating }}
                </span>
              </div>
              
              <div class="card-meta" v-if="activeTab === 'packages'">
                <span class="duration meta-item">
                  <i class="fas fa-clock meta-icon"></i> {{ item.duration }}
                </span>
                <span class="price">{{ item.price }}</span>
              </div>
              
              <p class="card-description">{{ item.description }}</p>
              
              <div class="card-inclusions" v-if="activeTab === 'packages' && item.inclusions">
                <h4 class="inclusions-title">Includes:</h4>
                <ul class="inclusions-list">
                  <li class="inclusion-item" v-for="(item, index) in item.inclusions.slice(0, 3)" :key="index">
                    {{ item }}
                  </li>
                  <li class="inclusion-item" v-if="item.inclusions.length > 3">
                    +{{ item.inclusions.length - 3 }} more
                  </li>
                </ul>
              </div>
              
              <div class="card-actions">
                <Button 
                  :to="activeTab === 'destinations' ? `/destinations/${item.id}` : `/packages/${item.id}`"
                  variant="primary"
                >
                  {{ activeTab === 'destinations' ? 'Explore' : 'View Details' }}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- AI-Powered Recommendations Section -->
    <section class="recommendations-section" v-if="showRecommendations && (aiRecommendations.destinations.length > 0 || aiRecommendations.packages.length > 0)">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Personalized Recommendations</h2>
          <p class="section-subtitle">AI-powered suggestions based on your search</p>
        </div>
        
        <div class="recommendations-content">
          <div class="recommendations-grid" v-if="aiRecommendations.destinations.length > 0">
            <h3 class="recommendations-subtitle">Recommended Destinations</h3>
            <div class="recommendation-card" v-for="dest in aiRecommendations.destinations" :key="dest.id || dest.name">
              <div class="card-image">
                <img :src="dest.image" :alt="dest.name" class="card-img">
              </div>
              <div class="card-content">
                <h3 class="card-title">{{ dest.name }}</h3>
                <div class="card-meta">
                  <span class="location meta-item">
                    <i class="fas fa-map-marker-alt meta-icon"></i> {{ dest.location }}
                  </span>
                  <span class="rating meta-item" v-if="dest.rating">
                    <i class="fas fa-star meta-icon"></i> {{ dest.rating }}
                  </span>
                </div>
                <p class="card-description">{{ dest.description }}</p>
                <!-- Ensure proper ID for navigation -->
                <Button 
                  :to="`/destinations/${dest.id || encodeURIComponent(dest.name)}`" 
                  variant="primary" 
                  block
                >
                  Explore
                </Button>
              </div>
            </div>
          </div>
          
          <div class="recommendations-grid packages" v-if="aiRecommendations.packages.length > 0">
            <h3 class="recommendations-subtitle">Recommended Packages</h3>
            <div class="recommendation-card" v-for="pkg in aiRecommendations.packages" :key="pkg.id || pkg.name">
              <div class="card-image">
                <img :src="pkg.image" :alt="pkg.name" class="card-img">
              </div>
              <div class="card-content">
                <h3 class="card-title">{{ pkg.name }}</h3>
                <div class="card-meta">
                  <span class="duration meta-item">
                    <i class="fas fa-clock meta-icon"></i> {{ pkg.duration }}
                  </span>
                  <span class="price">{{ pkg.price }}</span>
                </div>
                <p class="card-description">{{ pkg.description }}</p>
                <!-- Ensure proper ID for navigation -->
                <Button 
                  :to="`/packages/${pkg.id || encodeURIComponent(pkg.name)}`" 
                  variant="primary" 
                  block
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  searchDestinations, 
  searchPackages, 
  getContinents, 
  getThemes, 
  getPackageTypes
} from '@/services/travelSearchService'
import Button from '@/components/Button.vue'

// Vue Router
const route = useRoute()
const router = useRouter()

// Reactive data
const activeTab = ref('destinations')
const searchQuery = ref('')
const showAdvancedFilters = ref(false)
const loading = ref(false)
const error = ref('')
const results = ref([])
const searchPerformed = ref(false)
const sortBy = ref('')
const showRecommendations = ref(false)
const aiRecommendations = ref({
  destinations: [],
  packages: []
})

// Filters
const destinationFilters = reactive({
  continent: '',
  theme: '',
  priceRange: ''
})

const packageFilters = reactive({
  type: '',
  durationRange: '',
  budgetRange: ''
})

// Data for dropdowns
const continents = ref([])
const themes = ref([])
const packageTypes = ref([])

// Computed properties
const hasActiveFilters = computed(() => {
  if (activeTab.value === 'destinations') {
    return destinationFilters.continent || destinationFilters.theme || destinationFilters.priceRange
  } else {
    return packageFilters.type || packageFilters.durationRange || packageFilters.budgetRange
  }
})

// Methods
const setActiveTab = (tab) => {
  activeTab.value = tab
  results.value = []
  searchPerformed.value = false
  sortBy.value = ''
  
  // Update URL
  router.push({
    query: { 
      ...route.query, 
      tab: tab,
      q: searchQuery.value || undefined
    }
  })
}

const performSearch = async () => {
  loading.value = true
  error.value = ''
  searchPerformed.value = true
  
  // Update URL with search query
  const query = {
    ...route.query,
    q: searchQuery.value || undefined,
    tab: activeTab.value
  }
  
  if (activeTab.value === 'destinations') {
    // Add destination filters to query
    if (destinationFilters.continent) query.continent = destinationFilters.continent
    if (destinationFilters.theme) query.theme = destinationFilters.theme
    if (destinationFilters.priceRange) query.price = destinationFilters.priceRange
  } else {
    // Add package filters to query
    if (packageFilters.type) query.type = packageFilters.type
    if (packageFilters.durationRange) query.duration = packageFilters.durationRange
    if (packageFilters.budgetRange) query.budget = packageFilters.budgetRange
  }
  
  if (sortBy.value) query.sort = sortBy.value
  
  router.push({ query })
  
  try {
    if (activeTab.value === 'destinations') {
      const criteria = {
        query: searchQuery.value,
        ...destinationFilters,
        sortBy: sortBy.value
      }
      results.value = await searchDestinations(criteria)
    } else {
      const criteria = {
        query: searchQuery.value,
        ...packageFilters,
        sortBy: sortBy.value
      }
      results.value = await searchPackages(criteria)
    }
    
    // Always hide recommendations since getRecommendations is not implemented
    showRecommendations.value = false
  } catch (err) {
    error.value = 'Failed to fetch search results. Please try again.'
    console.error('Search error:', err)
    showRecommendations.value = false
  } finally {
    loading.value = false
  }
}

const clearFilters = () => {
  if (activeTab.value === 'destinations') {
    destinationFilters.continent = ''
    destinationFilters.theme = ''
    destinationFilters.priceRange = ''
  } else {
    packageFilters.type = ''
    packageFilters.durationRange = ''
    packageFilters.budgetRange = ''
  }
  sortBy.value = ''
  searchQuery.value = ''
  results.value = []
  searchPerformed.value = false
  showRecommendations.value = false
  
  // Update URL
  router.push({
    query: { 
      tab: activeTab.value
    }
  })
}

const formatContinent = (continent) => {
  const continentNames = {
    'asia': 'Asia',
    'europe': 'Europe',
    'africa': 'Africa',
    'north-america': 'North America',
    'south-america': 'South America',
    'oceania': 'Oceania'
  }
  return continentNames[continent] || continent
}

const formatTheme = (theme) => {
  const themeNames = {
    'beach': 'Beach',
    'mountain': 'Mountain',
    'city': 'City',
    'cultural': 'Cultural',
    'adventure': 'Adventure',
    'luxury': 'Luxury'
  }
  return themeNames[theme] || theme
}

const formatPackageType = (type) => {
  const typeNames = {
    'adventure': 'Adventure',
    'family': 'Family',
    'honeymoon': 'Honeymoon',
    'budget': 'Budget',
    'luxury': 'Luxury'
  }
  return typeNames[type] || type
}

// Initialize dropdown data and check for query parameters
onMounted(async () => {
  try {
    continents.value = getContinents()
    themes.value = getThemes()
    packageTypes.value = getPackageTypes()
    
    // Check for query parameters
    if (route.query.tab) {
      activeTab.value = route.query.tab
    }
    
    if (route.query.q) {
      searchQuery.value = route.query.q
    }
    
    // Set filters from query parameters
    if (activeTab.value === 'destinations') {
      if (route.query.continent) destinationFilters.continent = route.query.continent
      if (route.query.theme) destinationFilters.theme = route.query.theme
      if (route.query.price) destinationFilters.priceRange = route.query.price
    } else {
      if (route.query.type) packageFilters.type = route.query.type
      if (route.query.duration) packageFilters.durationRange = route.query.duration
      if (route.query.budget) packageFilters.budgetRange = route.query.budget
    }
    
    if (route.query.sort) {
      sortBy.value = route.query.sort
    }
    
    // Perform search if there's a query
    if (searchQuery.value || Object.values(destinationFilters).some(v => v) || Object.values(packageFilters).some(v => v)) {
      performSearch()
    }
  } catch (err) {
    console.error('Failed to load filter data:', err)
  }
})
</script>

<style scoped>
.search-page {
  font-family: var(--font-primary);
  padding-bottom: var(--space-12);
}

/* Page Header */
.page-header {
  background: linear-gradient(rgba(10, 31, 68, 0.85), rgba(10, 31, 68, 0.85)), 
              url('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
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
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
  color: var(--text-inverse);
  opacity: 0.9;
  line-height: var(--line-height-relaxed);
}

/* Search Section */
.search-section {
  background-color: var(--bg-secondary);
  padding: var(--space-8) 0;
}

.search-box {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
}

.search-tabs {
  display: flex;
  border-bottom: 1px solid var(--border-primary);
  margin-bottom: var(--space-6);
}

.tab-btn {
  padding: var(--space-3) var(--space-6);
  border: none;
  background: transparent;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
  position: relative;
}

.tab-btn.active {
  color: var(--primary-500);
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-500);
  border-radius: var(--radius-full);
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.search-input-group {
  display: flex;
  gap: var(--space-3);
}

.search-input {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-base);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
}

.search-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
}

.advanced-filters {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  margin-bottom: var(--space-2);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.form-select {
  padding: var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition);
}

.form-select:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
}

.filter-actions {
  display: flex;
  gap: var(--space-3);
}

/* Results Section */
.results-section {
  padding: var(--space-12) 0;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
}

.results-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0;
}

.results-count {
  color: var(--text-secondary);
  font-weight: var(--font-weight-normal);
  font-size: var(--font-size-base);
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
  margin-bottom: var(--space-2);
}

.ai-search-message {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

/* Error State */
.error-container {
  text-align: center;
  padding: var(--space-12) var(--space-6);
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
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

/* No Results State */
.no-results {
  text-align: center;
  padding: var(--space-12) var(--space-6);
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
}

.search-icon {
  font-size: var(--font-size-3xl);
  color: var(--primary-500);
  margin-bottom: var(--space-3);
}

.no-results-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.no-results-message {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
}

/* Results Grid */
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.result-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.result-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-xl);
}

.card-image {
  width: 100%;
  height: 200px;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: var(--space-6);
}

.card-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-3);
  color: var(--text-primary);
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
  font-size: var(--font-size-sm);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--text-secondary);
}

.meta-icon {
  color: var(--primary-500);
}

.price {
  font-weight: var(--font-weight-bold);
  color: var(--secondary-500);
}

.card-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
}

.card-inclusions {
  margin-bottom: var(--space-4);
}

.inclusions-title {
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
}

.inclusions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.inclusion-item {
  padding: var(--space-1) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  position: relative;
  padding-left: var(--space-4);
}

.inclusion-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--primary-500);
}

.card-actions {
  display: flex;
  justify-content: center;
}

/* Recommendations Section */
.recommendations-section {
  padding: var(--space-12) 0;
  background-color: var(--bg-secondary);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.section-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

.recommendations-subtitle {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
  grid-column: 1 / -1;
}

.recommendations-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.recommendation-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.recommendation-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

/* Responsive Design */
@media (max-width: 992px) {
  .page-title {
    font-size: var(--font-size-3xl);
  }
  
  .page-subtitle {
    font-size: var(--font-size-base);
  }
  
  .search-input-group {
    flex-direction: column;
  }
  
  .filter-row {
    grid-template-columns: 1fr;
  }
  
  .results-section {
    padding: var(--space-8) 0;
  }
  
  .recommendations-section {
    padding: var(--space-8) 0;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: var(--space-12) 0;
  }
  
  .page-title {
    font-size: var(--font-size-2xl);
  }
  
  .search-box {
    padding: var(--space-4);
  }
  
  .search-tabs {
    margin-bottom: var(--space-4);
  }
  
  .tab-btn {
    padding: var(--space-2) var(--space-4);
  }
  
  .results-grid,
  .recommendations-grid {
    grid-template-columns: 1fr;
  }
  
  .card-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
  
  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
}

@media (max-width: 576px) {
  .filter-actions {
    flex-direction: column;
  }
  
  .card-content {
    padding: var(--space-4);
  }
  
  .card-title {
    font-size: var(--font-size-lg);
  }
}
</style>