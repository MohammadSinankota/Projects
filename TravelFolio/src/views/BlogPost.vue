<template>
  <div class="blog-post">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">{{ blogPost.title }}</h1>
        <div class="post-meta">
          <span class="meta-item"><i class="far fa-calendar meta-icon"></i> {{ blogPost.date }}</span>
          <span class="meta-item"><i class="far fa-clock meta-icon"></i> {{ blogPost.readTime }} min read</span>
          <span class="meta-item"><i class="fas fa-tag meta-icon"></i> {{ blogPost.category }}</span>
        </div>
      </div>
    </section>

    <!-- Post Content -->
    <section class="post-content">
      <div class="container">
        <div class="content-wrapper">
          <!-- Main Content -->
          <div class="main-content">
            <div class="featured-image">
              <img :src="blogPost.image" :alt="blogPost.title" class="featured-img">
            </div>

            <div class="post-details">
              <p class="excerpt">{{ blogPost.excerpt }}</p>
              
              <div class="post-body" v-html="blogPost.content"></div>
            </div>

            <!-- Author Info -->
            <div class="author-info">
              <img :src="blogPost.author.avatar" :alt="blogPost.author.name" class="author-avatar">
              <div class="author-details">
                <h3 class="author-name">{{ blogPost.author.name }}</h3>
                <p class="author-bio">{{ blogPost.author.bio }}</p>
                <div class="social-links">
                  <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                  <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                  <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>

            <!-- Comments Section -->
            <div class="comments-section">
              <h3 class="section-title">Comments ({{ comments.length }})</h3>
              <div class="comment-form">
                <h4 class="form-title">Leave a Comment</h4>
                <form @submit.prevent="addComment" class="comment-form-content">
                  <div class="form-group">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" id="name" v-model="newComment.name" placeholder="Your Name" required class="form-input">
                  </div>
                  <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" v-model="newComment.email" placeholder="Your Email" required class="form-input">
                  </div>
                  <div class="form-group">
                    <label for="comment" class="form-label">Comment</label>
                    <textarea id="comment" v-model="newComment.comment" rows="4" placeholder="Your Comment" required class="form-textarea"></textarea>
                  </div>
                  <Button type="submit" variant="primary">Post Comment</Button>
                </form>
              </div>

              <div class="comments-list">
                <div class="comment" v-for="comment in comments" :key="comment.id">
                  <img :src="comment.avatar" :alt="comment.name" class="comment-avatar">
                  <div class="comment-content">
                    <div class="comment-header">
                      <h4 class="comment-name">{{ comment.name }}</h4>
                      <span class="comment-date">{{ comment.date }}</span>
                    </div>
                    <p class="comment-text">{{ comment.comment }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="sidebar">
            <div class="sidebar-widget">
              <h3 class="widget-title">Recent Posts</h3>
              <div class="recent-posts">
                <div class="recent-post" v-for="post in recentPosts" :key="post.id">
                  <img :src="post.image" :alt="post.title" class="recent-post-img">
                  <div class="recent-post-content">
                    <h4 class="recent-post-title"><router-link :to="`/blog/${post.id}`" class="recent-post-link">{{ post.title }}</router-link></h4>
                    <span class="recent-post-date">{{ post.date }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="sidebar-widget">
              <h3 class="widget-title">Categories</h3>
              <ul class="categories">
                <li class="category-item" v-for="category in categories" :key="category.id">
                  <a href="#" class="category-link">{{ category.name }} <span class="category-count">({{ category.count }})</span></a>
                </li>
              </ul>
            </div>

            <div class="sidebar-widget">
              <h3 class="widget-title">Newsletter</h3>
              <p class="widget-description">Subscribe to our newsletter for travel tips and inspiration.</p>
              <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
                <input type="email" v-model="newsletterEmail" placeholder="Your Email" required class="newsletter-input">
                <Button type="submit" variant="primary" block>Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'

// Reactive data
const newsletterEmail = ref('')

const newComment = ref({
  name: '',
  email: '',
  comment: ''
})

// Categories data
const categories = ref([
  { id: 1, name: 'Destinations', count: 12 },
  { id: 2, name: 'Travel Tips', count: 8 },
  { id: 3, name: 'Culture', count: 6 },
  { id: 4, name: 'Experiences', count: 10 },
  { id: 5, name: 'Food', count: 5 }
])

// Blog post data (in a real app, this would come from an API or route params)
const blogPost = ref({
  id: 1,
  title: '10 Hidden Gems in Southeast Asia',
  date: 'Oct 5, 2023',
  readTime: 8,
  category: 'Destinations',
  image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  excerpt: 'Discover the lesser-known but breathtaking destinations that most tourists miss in Southeast Asia.',
  content: `
    <p>Southeast Asia is a region of incredible diversity, from bustling cities to pristine beaches and lush jungles. While many travelers flock to popular destinations like Bangkok and Bali, there are countless hidden gems waiting to be discovered.</p>
    
    <h2>1. Kawah Ijen, Indonesia</h2>
    <p>One of the most surreal natural phenomena you'll ever witness, Kawah Ijen is a volcano crater with a glowing blue sulfur flame that illuminates the night sky. The hike to the crater is challenging but rewarding, offering breathtaking views of the surrounding landscape.</p>
    
    <h2>2. Ha Giang, Vietnam</h2>
    <p>Far from the crowds of Halong Bay, Ha Giang province offers some of Vietnam's most stunning mountain scenery. The winding roads through the mountains provide incredible photo opportunities, especially during the rice harvest season.</p>
    
    <h2>3. Mergui Archipelago, Myanmar</h2>
    <p>This remote chain of over 800 islands remains largely untouched by tourism. With crystal-clear waters, pristine beaches, and vibrant coral reefs, it's a paradise for divers and beach lovers.</p>
    
    <p>These are just three of the many hidden gems waiting to be explored in Southeast Asia. Each destination offers a unique perspective on the region's rich culture, history, and natural beauty.</p>
  `,
  author: {
    name: 'Alex Johnson',
    bio: 'Travel writer and photographer with 10+ years of experience exploring Southeast Asia.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  }
})

// Comments data
const comments = ref([
  {
    id: 1,
    name: 'Maria Garcia',
    email: 'maria@example.com',
    comment: 'This is exactly what I was looking for! Planning a trip to Southeast Asia next year and these hidden gems are perfect.',
    date: 'Oct 6, 2023',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'James Wilson',
    email: 'james@example.com',
    comment: 'I\'ve been to Kawah Ijen and can confirm it\'s absolutely magical. One of the most incredible experiences I\'ve ever had.',
    date: 'Oct 7, 2023',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
  }
])

// Recent posts data
const recentPosts = ref([
  {
    id: 2,
    title: 'Packing Tips for Your Next Adventure',
    date: 'Sep 28, 2023',
    image: 'https://images.unsplash.com/photo-1535139262971-c51845709a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 3,
    title: 'Cultural Experiences in Japan',
    date: 'Sep 20, 2023',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80'
  },
  {
    id: 4,
    title: 'Adventure Activities in New Zealand',
    date: 'Sep 12, 2023',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }
])

// Methods
const addComment = () => {
  if (newComment.value.name && newComment.value.email && newComment.value.comment) {
    // In a real app, you would submit the comment to a backend
    alert('Thank you for your comment! It has been submitted successfully.')
    // Reset form
    newComment.value = {
      name: '',
      email: '',
      comment: ''
    }
  } else {
    alert('Please fill in all required fields.')
  }
}

const subscribeNewsletter = () => {
  if (newsletterEmail.value) {
    alert(`Thank you for subscribing with ${newsletterEmail.value}! You'll receive our travel stories soon.`)
    newsletterEmail.value = ''
  }
}
</script>

<style scoped>
.blog-post {
  font-family: var(--font-primary);
  padding-bottom: var(--space-12);
}

/* Hero Section */
.hero {
  background: linear-gradient(rgba(10, 31, 68, 0.85), rgba(10, 31, 68, 0.85)), 
              url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
  color: var(--text-inverse);
  text-align: center;
  padding: var(--space-16) 0;
}

.hero-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--text-inverse);
}

.post-meta {
  display: flex;
  justify-content: center;
  gap: var(--space-6);
  font-size: var(--font-size-base);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.meta-icon {
  color: var(--primary-400);
}

/* Post Content */
.post-content {
  padding: var(--space-12) 0;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-12);
}

/* Featured Image */
.featured-image {
  margin-bottom: var(--space-8);
}

.featured-img {
  width: 100%;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

/* Post Details */
.excerpt {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
  line-height: var(--line-height-relaxed);
  font-style: italic;
}

.post-body {
  color: var(--text-primary);
  line-height: var(--line-height-relaxed);
}

.post-body h2 {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin: var(--space-8) 0 var(--space-4);
  color: var(--text-primary);
}

.post-body p {
  margin-bottom: var(--space-4);
  color: var(--text-secondary);
}

/* Author Info */
.author-info {
  display: flex;
  gap: var(--space-6);
  padding: var(--space-8);
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  margin: var(--space-12) 0;
}

.author-avatar {
  width: 100px;
  height: 100px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 3px solid var(--primary-500);
}

.author-details {
  flex: 1;
}

.author-name {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-2);
  color: var(--text-primary);
}

.author-bio {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
}

.social-links {
  display: flex;
  gap: var(--space-3);
}

.social-link {
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

.social-link:hover {
  background-color: var(--primary-500);
  color: var(--text-inverse);
  transform: translateY(-3px);
}

/* Comments Section */
.comments-section {
  margin-top: var(--space-12);
}

.section-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-6);
  color: var(--text-primary);
}

.form-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--text-primary);
}

.comment-form-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
  padding: var(--space-6);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
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

.comments-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.comment {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.comment-avatar {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
}

.comment-name {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  margin: 0;
  color: var(--text-primary);
}

.comment-date {
  color: var(--text-tertiary);
  font-size: var(--font-size-sm);
}

.comment-text {
  color: var(--text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.sidebar-widget {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
}

.widget-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--text-primary);
}

.widget-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
}

/* Recent Posts */
.recent-posts {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.recent-post {
  display: flex;
  gap: var(--space-3);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-primary);
}

.recent-post:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.recent-post-img {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-lg);
  object-fit: cover;
}

.recent-post-content {
  flex: 1;
}

.recent-post-title {
  margin: 0 0 var(--space-1);
}

.recent-post-link {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: var(--transition);
}

.recent-post-link:hover {
  color: var(--primary-500);
}

.recent-post-date {
  color: var(--text-tertiary);
  font-size: var(--font-size-sm);
}

/* Categories */
.categories {
  list-style: none;
  padding: 0;
}

.category-item {
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--border-primary);
}

.category-item:last-child {
  border-bottom: none;
}

.category-link {
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  transition: var(--transition);
}

.category-link:hover {
  color: var(--primary-500);
}

.category-count {
  color: var(--text-tertiary);
}

/* Newsletter Form */
.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.newsletter-input {
  padding: var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition);
}

.newsletter-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
}

/* Responsive Design */
@media (max-width: 992px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    order: 2;
  }
  
  .main-content {
    order: 1;
  }
  
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .post-meta {
    flex-direction: column;
    gap: var(--space-2);
  }
  
  .post-content {
    padding: var(--space-8) 0;
  }
  
  .author-info {
    flex-direction: column;
    text-align: center;
  }
  
  .comment-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: var(--space-12) 0;
  }
  
  .hero-title {
    font-size: var(--font-size-2xl);
  }
  
  .post-body h2 {
    font-size: var(--font-size-xl);
  }
  
  .author-info {
    padding: var(--space-6);
  }
  
  .comment {
    flex-direction: column;
  }
  
  .recent-post {
    flex-direction: column;
  }
  
  .recent-post-img {
    width: 100%;
    height: 150px;
  }
}

@media (max-width: 576px) {
  .comment-form-content {
    padding: var(--space-4);
  }
  
  .comment {
    padding: var(--space-4);
  }
}
</style>