<template>
  <div class="blog-page">
    <!-- Blog Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Travelfolio Travel Blog</h1>
        <p class="hero-subtitle">Insights, tips, and stories from our travel experts</p>
      </div>
    </section>

    <!-- Blog Filters -->
    <section class="blog-filters">
      <div class="container">
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
            <input type="text" placeholder="Search blog posts..." v-model="searchQuery" class="search-input">
            <Button variant="primary" class="search-button">
              <i class="fas fa-search"></i>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="blog-posts">
      <div class="container">
        <div class="posts-grid">
          <div class="post-card" v-for="post in filteredPosts" :key="post.id">
            <div class="post-image">
              <img :src="post.image" :alt="post.title" class="post-img">
              <div class="post-category">{{ post.category }}</div>
            </div>
            <div class="post-content">
              <div class="post-meta">
                <span class="meta-item"><i class="far fa-calendar meta-icon"></i> {{ post.date }}</span>
                <span class="meta-item"><i class="far fa-clock meta-icon"></i> {{ post.readTime }} min read</span>
              </div>
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-excerpt">{{ post.excerpt }}</p>
              <router-link :to="`/blog/${post.id}`" class="read-more">Read More <i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="blog-newsletter">
      <div class="container">
        <div class="newsletter-content">
          <h2 class="newsletter-title">Stay Updated with Our Travel Stories</h2>
          <p class="newsletter-description">Subscribe to our newsletter and never miss our latest travel tips and destination guides.</p>
          <form class="newsletter-form" @submit.prevent="subscribeToNewsletter">
            <input type="email" placeholder="Enter your email" required v-model="email" class="newsletter-input">
            <Button type="submit" variant="primary">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '@/components/Button.vue'

// Reactive data
const selectedCategory = ref('all')
const searchQuery = ref('')
const email = ref('')

// Blog posts data
const blogPosts = ref([
  {
    id: 1,
    title: '10 Hidden Gems in Southeast Asia',
    excerpt: 'Discover the lesser-known but breathtaking destinations that most tourists miss in Southeast Asia.',
    category: 'Destinations',
    date: 'Oct 5, 2023',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    title: 'Packing Tips for Your Next Adventure',
    excerpt: 'Learn how to pack light but smart for any type of travel experience with our expert tips.',
    category: 'Tips',
    date: 'Sep 28, 2023',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1535139262971-c51845709a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 3,
    title: 'Cultural Experiences in Japan',
    excerpt: 'Immerse yourself in the rich traditions and modern culture of Japan with our guide.',
    category: 'Culture',
    date: 'Sep 20, 2023',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80'
  },
  {
    id: 4,
    title: 'Adventure Activities in New Zealand',
    excerpt: 'From bungee jumping to hiking, discover the thrilling adventures that await in New Zealand.',
    category: 'Experiences',
    date: 'Sep 12, 2023',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 5,
    title: 'Budget Travel Tips for Europe',
    excerpt: 'Explore Europe without breaking the bank with our comprehensive budget travel guide.',
    category: 'Tips',
    date: 'Aug 30, 2023',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 6,
    title: 'Best Time to Visit the Maldives',
    excerpt: 'Plan your perfect tropical getaway with our guide on when to visit the Maldives for the best experience.',
    category: 'Destinations',
    date: 'Aug 15, 2023',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
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
    alert(`Thank you for subscribing with ${email.value}! You'll receive our travel stories soon.`)
    email.value = ''
  }
}
</script>

<style scoped>
.blog-page {
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

/* Blog Filters */
.blog-filters {
  padding: var(--space-8) 0;
  background-color: var(--bg-secondary);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 200px;
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
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
}

.search-box {
  display: flex;
  gap: var(--space-3);
  flex: 1;
  min-width: 250px;
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
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
}

/* Blog Posts */
.blog-posts {
  padding: var(--space-12) 0;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.post-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.post-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-xl);
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
  background: var(--primary-500);
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
  color: var(--primary-500);
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

.read-more {
  color: var(--primary-500);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  transition: var(--transition);
}

.read-more:hover {
  color: var(--secondary-500);
  gap: var(--space-2);
}

/* Newsletter */
.blog-newsletter {
  padding: var(--space-12) 0;
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

/* Responsive Design */
@media (max-width: 992px) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group,
  .search-box {
    min-width: 100%;
  }
  
  .blog-posts {
    padding: var(--space-8) 0;
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
  
  .blog-newsletter {
    padding: var(--space-8) 0;
  }
  
  .newsletter-title {
    font-size: var(--font-size-2xl);
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-input {
    min-width: 100%;
  }
}

@media (max-width: 576px) {
  .post-meta {
    flex-direction: column;
    gap: var(--space-1);
  }
}
</style>