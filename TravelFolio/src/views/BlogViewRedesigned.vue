<template>
  <div class="blog-page">
    <!-- Blog Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Travelfolio Travel Blog</h1>
        <p class="hero-subtitle">Insights, tips, and stories from our travel experts. Discover destination guides, packing tips, cultural insights, and real traveler experiences from around the world.</p>
        <Button 
          variant="primary" 
          size="large" 
          @click="scrollToPosts"
          class="hero-cta"
        >
          Explore Stories
        </Button>
      </div>
    </section>

    <!-- Blog Filters -->
    <section class="blog-filters">
      <div class="container">
        <Card class="filter-card">
          <template #content>
            <div class="filters">
              <div class="filter-group">
                <label for="category" class="filter-label">Category</label>
                <select id="category" v-model="selectedCategory" class="form-select">
                  <option value="all">All Categories</option>
                  <option value="tips">Travel Tips</option>
                  <option value="destinations">Destinations</option>
                  <option value="experiences">Experiences</option>
                  <option value="culture">Culture</option>
                </select>
              </div>
              <div class="search-box">
                <input 
                  type="text" 
                  placeholder="Search blog posts..." 
                  v-model="searchQuery" 
                  class="search-input"
                  @keyup.enter="searchPosts"
                >
                <Button 
                  variant="primary" 
                  @click="searchPosts"
                  class="search-button"
                >
                  <i class="fas fa-search"></i>
                </Button>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="blog-posts" ref="postsSection">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Latest Travel Stories</h2>
          <p class="section-subtitle">Discover inspiring tales and practical advice from our journeys</p>
        </div>
        <div class="posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            v-for="post in filteredPosts" 
            :key="post.id" 
            hover 
            class="post-card"
          >
            <template #header>
              <div class="post-image">
                <img :src="post.image" :alt="post.title" class="post-img">
                <div class="post-category">{{ post.category }}</div>
              </div>
            </template>
            <template #content>
              <div class="post-content">
                <div class="post-meta">
                  <span class="meta-item"><i class="far fa-calendar meta-icon"></i> {{ post.date }}</span>
                  <span class="meta-item"><i class="far fa-clock meta-icon"></i> {{ post.readTime }} min read</span>
                </div>
                <h3 class="post-title">{{ post.title }}</h3>
                <p class="post-excerpt">{{ post.excerpt }}</p>
              </div>
            </template>
            <template #footer>
              <Button :to="`/blog/${post.id}`" variant="primary" block>Read More</Button>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Popular Categories -->
    <section class="categories-section py-16 bg-secondary-light">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Popular Categories</h2>
          <p class="section-subtitle">Find content that matches your travel interests</p>
        </div>
        <div class="categories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card hover class="category-card text-center">
            <template #header>
              <div class="category-icon">
                <i class="fas fa-map-marked-alt"></i>
              </div>
            </template>
            <template #content>
              <h3 class="category-title">Destinations</h3>
              <p class="category-description">Explore breathtaking places around the world</p>
            </template>
            <template #footer>
              <Button to="/blog#destinations" variant="outline-primary" block>View Posts</Button>
            </template>
          </Card>
          
          <Card hover class="category-card text-center">
            <template #header>
              <div class="category-icon">
                <i class="fas fa-lightbulb"></i>
              </div>
            </template>
            <template #content>
              <h3 class="category-title">Travel Tips</h3>
              <p class="category-description">Practical advice for smoother journeys</p>
            </template>
            <template #footer>
              <Button to="/blog#tips" variant="outline-primary" block>View Posts</Button>
            </template>
          </Card>
          
          <Card hover class="category-card text-center">
            <template #header>
              <div class="category-icon">
                <i class="fas fa-globe-asia"></i>
              </div>
            </template>
            <template #content>
              <h3 class="category-title">Culture</h3>
              <p class="category-description">Immerse in local traditions and customs</p>
            </template>
            <template #footer>
              <Button to="/blog#culture" variant="outline-primary" block>View Posts</Button>
            </template>
          </Card>
          
          <Card hover class="category-card text-center">
            <template #header>
              <div class="category-icon">
                <i class="fas fa-hiking"></i>
              </div>
            </template>
            <template #content>
              <h3 class="category-title">Experiences</h3>
              <p class="category-description">Unique adventures and activities</p>
            </template>
            <template #footer>
              <Button to="/blog#experiences" variant="outline-primary" block>View Posts</Button>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="blog-newsletter">
      <div class="container">
        <Card class="newsletter-card">
          <template #header>
            <h2 class="newsletter-title">Stay Updated with Our Travel Stories</h2>
          </template>
          <template #content>
            <p class="newsletter-description">Subscribe to our newsletter and never miss our latest travel tips and destination guides.</p>
            <form class="newsletter-form" @submit.prevent="subscribeToNewsletter">
              <div class="form-group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required 
                  v-model="email" 
                  class="newsletter-input"
                >
                <Button 
                  type="submit" 
                  variant="primary"
                  :disabled="isSubscribing"
                >
                  <span v-if="!isSubscribing">Subscribe</span>
                  <span v-else>Subscribing...</span>
                </Button>
              </div>
            </form>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'

// Reactive data
const selectedCategory = ref('all')
const searchQuery = ref('')
const email = ref('')
const isSubscribing = ref(false)

// Reference for scrolling
const postsSection = ref(null)

// Blog posts data
const blogPosts = ref([
  {
    id: 1,
    title: '10 Hidden Gems in Southeast Asia',
    excerpt: 'Discover the lesser-known but breathtaking destinations that most tourists miss in Southeast Asia.',
    category: 'Destinations',
    date: 'Oct 5, 2023',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    content: `Southeast Asia is a treasure trove of incredible destinations, but beyond the popular tourist spots lie hidden gems waiting to be discovered. These lesser-known places offer authentic experiences without the crowds, allowing you to connect with local cultures and landscapes in a more meaningful way. From the pristine beaches of the Philippines to the ancient temples of Myanmar, here are 10 hidden gems that will take your breath away.`
  },
  {
    id: 2,
    title: 'Packing Tips for Your Next Adventure',
    excerpt: 'Learn how to pack light but smart for any type of travel experience with our expert tips.',
    category: 'Tips',
    date: 'Sep 28, 2023',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1535139262971-c51845709a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    content: `Packing for a trip can be stressful, but with the right approach, you can travel light without sacrificing comfort or convenience. Whether you're heading to a tropical beach or a bustling city, these expert packing tips will help you make the most of your luggage space while ensuring you have everything you need for a successful trip.`
  },
  {
    id: 3,
    title: 'Cultural Experiences in Japan',
    excerpt: 'Immerse yourself in the rich traditions and modern culture of Japan with our guide.',
    category: 'Culture',
    date: 'Sep 20, 2023',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80',
    content: `Japan is a fascinating blend of ancient traditions and cutting-edge modernity. From the serene temples of Kyoto to the neon-lit streets of Tokyo, this country offers a wealth of cultural experiences that will enrich your understanding of one of the world's most unique societies. Discover the etiquette, customs, and traditions that make Japan so special.`
  },
  {
    id: 4,
    title: 'Adventure Activities in New Zealand',
    excerpt: 'From bungee jumping to hiking, discover the thrilling adventures that await in New Zealand.',
    category: 'Experiences',
    date: 'Sep 12, 2023',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    content: `New Zealand is an adventurer's paradise, offering some of the world's most thrilling outdoor experiences. Whether you're seeking adrenaline-pumping activities or more leisurely explorations of the country's stunning landscapes, there's something for every type of traveler. From the famous bungee jumping spots to the breathtaking Milford Track, discover why New Zealand is a top destination for adventure seekers.`
  },
  {
    id: 5,
    title: 'Budget Travel Tips for Europe',
    excerpt: 'Explore Europe without breaking the bank with our comprehensive budget travel guide.',
    category: 'Tips',
    date: 'Aug 30, 2023',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    content: `Europe doesn't have to be expensive! With careful planning and smart choices, you can explore the continent's incredible diversity without emptying your wallet. From finding affordable accommodation to discovering free activities and budget-friendly dining options, this guide will help you make the most of your European adventure while staying within your budget.`
  },
  {
    id: 6,
    title: 'Best Time to Visit the Maldives',
    excerpt: 'Plan your perfect tropical getaway with our guide on when to visit the Maldives for the best experience.',
    category: 'Destinations',
    date: 'Aug 15, 2023',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    content: `The Maldives is a year-round tropical paradise, but timing your visit can make a significant difference in your experience. Understanding the seasons, weather patterns, and peak tourist times will help you plan the perfect getaway. Whether you're looking for the best deals, optimal weather, or specific activities, this guide will help you choose the ideal time for your Maldivian escape.`
  },
  {
    id: 7,
    title: 'Solo Travel Safety Tips',
    excerpt: 'Stay safe and confident while traveling alone with our essential safety guidelines.',
    category: 'Tips',
    date: 'Jul 22, 2023',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1499363536502-8708c68c142e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    content: `Solo travel can be one of the most rewarding experiences, offering freedom and self-discovery. However, it also requires extra vigilance and preparation to ensure your safety. These essential tips will help you navigate the world confidently while minimizing risks and staying secure throughout your journey.`
  },
  {
    id: 8,
    title: 'Eco-Friendly Travel Practices',
    excerpt: 'Reduce your environmental impact while exploring the world with sustainable travel tips.',
    category: 'Culture',
    date: 'Jun 18, 2023',
    readTime: 11,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    content: `As travelers, we have a responsibility to protect the destinations we love. Sustainable tourism practices not only help preserve beautiful places for future generations but also enhance our travel experiences by connecting us more deeply with local communities and environments. Discover how you can make a positive impact while still enjoying incredible adventures.`
  }
])

// Computed property to filter posts based on category and search query
const filteredPosts = computed(() => {
  return blogPosts.value.filter(post => {
    // Category filter
    if (selectedCategory.value !== 'all' && post.category.toLowerCase() !== selectedCategory.value.toLowerCase()) {
      return false
    }
    
    // Search filter
    if (searchQuery.value && 
        !post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) && 
        !post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false
    }
    
    return true
  })
})

// Methods
const subscribeToNewsletter = () => {
  if (email.value) {
    isSubscribing.value = true
    
    // Simulate API call
    setTimeout(() => {
      alert(`Thank you for subscribing with ${email.value}! You'll receive our travel stories soon.`)
      email.value = ''
      isSubscribing.value = false
    }, 1500)
  }
}

const searchPosts = () => {
  // In a real app, this would trigger an API call
  console.log('Searching for:', searchQuery.value)
}

const scrollToPosts = () => {
  postsSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.blog-page {
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

/* Blog Filters */
.blog-filters {
  padding: var(--space-12) 0;
  background-color: var(--bg-secondary);
  margin-top: -80px;
  position: relative;
  z-index: 1;
}

.filter-card {
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-6);
  align-items: end;
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
  transition: var(--transition);
}

.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 191, 191, 0.25);
}

.search-box {
  display: flex;
  gap: var(--space-3);
  flex: 1;
}

.search-input {
  flex: 1;
  padding: var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 191, 191, 0.25);
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: var(--space-10);
}

.section-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-3);
  color: var(--text-primary);
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* Blog Posts */
.blog-posts {
  padding: var(--space-16) 0;
  background-color: var(--bg-primary);
}

.post-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.post-image {
  position: relative;
}

.post-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.post-category {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  background: var(--primary-color);
  color: var(--text-inverse);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.post-content {
  padding: var(--space-6);
}

.post-meta {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-3);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.meta-icon {
  margin-right: var(--space-1);
  color: var(--primary-color);
}

.post-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-3);
  color: var(--text-primary);
}

.post-excerpt {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
}

/* Popular Categories */
.categories-section {
  background-color: var(--bg-secondary);
}

.category-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  text-align: center;
}

.category-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-4);
  color: var(--primary-color);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-50);
  border-radius: var(--radius-full);
  margin: 0 auto;
}

.category-title {
  margin-bottom: var(--space-3);
  color: var(--text-primary);
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
}

.category-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
  line-height: var(--line-height-relaxed);
}

/* Newsletter */
.blog-newsletter {
  padding: var(--space-16) 0;
  background: linear-gradient(135deg, var(--primary-700), var(--primary-500));
  color: var(--text-inverse);
}

.newsletter-card {
  max-width: 600px;
  margin: 0 auto;
  background: var(--bg-primary);
  color: var(--text-primary);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
}

.newsletter-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-3);
  color: var(--text-primary);
  text-align: center;
}

.newsletter-description {
  margin-bottom: var(--space-6);
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  text-align: center;
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

.newsletter-input {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition);
}

.newsletter-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 191, 191, 0.25);
}

/* Responsive Design */
@media (max-width: 992px) {
  .hero-title {
    font-size: var(--font-size-4xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .filters {
    grid-template-columns: 1fr;
  }
  
  .search-box {
    flex-direction: column;
  }
  
  .section-title {
    font-size: var(--font-size-2xl);
  }
  
  .blog-posts,
  .categories-section,
  .blog-newsletter {
    padding: var(--space-12) 0;
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
  
  .blog-filters {
    padding: var(--space-8) 0;
  }
  
  .filter-card {
    padding: var(--space-6);
  }
  
  .section-header {
    margin-bottom: var(--space-6);
  }
  
  .section-subtitle {
    font-size: var(--font-size-base);
  }
  
  .form-group {
    flex-direction: column;
  }
  
  .newsletter-input {
    min-width: 100%;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: var(--font-size-2xl);
  }
  
  .post-meta {
    flex-direction: column;
    gap: var(--space-1);
  }
  
  .category-icon {
    width: 60px;
    height: 60px;
    font-size: var(--font-size-2xl);
  }
}
</style>