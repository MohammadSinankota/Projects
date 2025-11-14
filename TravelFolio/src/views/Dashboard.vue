<template>
  <div class="dashboard">
    <!-- Dashboard Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Welcome, {{ user.name }}!</h1>
        <p class="hero-subtitle">Manage your bookings and travel preferences</p>
      </div>
    </section>

    <!-- Dashboard Content -->
    <section class="dashboard-content">
      <div class="container">
        <div class="dashboard-grid">
          <!-- Sidebar Navigation -->
          <div class="sidebar">
            <div class="user-profile">
              <img :src="user.avatar" :alt="user.name" class="user-avatar">
              <h3 class="user-name">{{ user.name }}</h3>
              <p class="user-email">{{ user.email }}</p>
            </div>
            <nav class="dashboard-nav">
              <ul class="nav-list">
                <li class="nav-item" :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'">
                  <i class="fas fa-tachometer-alt nav-icon"></i> Overview
                </li>
                <li class="nav-item" :class="{ active: activeTab === 'bookings' }" @click="activeTab = 'bookings'">
                  <i class="fas fa-calendar-check nav-icon"></i> My Bookings
                </li>
                <li class="nav-item" :class="{ active: activeTab === 'wishlist' }" @click="activeTab = 'wishlist'">
                  <i class="fas fa-heart nav-icon"></i> Wishlist
                </li>
                <li class="nav-item" :class="{ active: activeTab === 'profile' }" @click="activeTab = 'profile'">
                  <i class="fas fa-user nav-icon"></i> Profile Settings
                </li>
                <li class="nav-item" :class="{ active: activeTab === 'notifications' }" @click="activeTab = 'notifications'">
                  <i class="fas fa-bell nav-icon"></i> Notifications
                </li>
              </ul>
            </nav>
          </div>

          <!-- Main Content -->
          <div class="main-content">
            <!-- Overview Tab -->
            <div v-if="activeTab === 'overview'" class="tab-content">
              <h2 class="tab-title">Overview</h2>
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-calendar-check"></i>
                  </div>
                  <div class="stat-info">
                    <h3 class="stat-value">{{ userStats.bookings }}</h3>
                    <p class="stat-label">Active Bookings</p>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-heart"></i>
                  </div>
                  <div class="stat-info">
                    <h3 class="stat-value">{{ userStats.wishlist }}</h3>
                    <p class="stat-label">Wishlist Items</p>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-globe"></i>
                  </div>
                  <div class="stat-info">
                    <h3 class="stat-value">{{ userStats.destinations }}</h3>
                    <p class="stat-label">Destinations Visited</p>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-star"></i>
                  </div>
                  <div class="stat-info">
                    <h3 class="stat-value">{{ userStats.reviews }}</h3>
                    <p class="stat-label">Reviews Submitted</p>
                  </div>
                </div>
              </div>

              <div class="recent-activity">
                <h3 class="activity-title">Recent Activity</h3>
                <div class="activity-list">
                  <div class="activity-item" v-for="activity in recentActivity" :key="activity.id">
                    <div class="activity-icon">
                      <i :class="activity.icon"></i>
                    </div>
                    <div class="activity-content">
                      <h4 class="activity-heading">{{ activity.title }}</h4>
                      <p class="activity-description">{{ activity.description }}</p>
                      <span class="activity-time">{{ activity.time }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bookings Tab -->
            <div v-if="activeTab === 'bookings'" class="tab-content">
              <h2 class="tab-title">My Bookings</h2>
              <div class="bookings-list">
                <div class="booking-card" v-for="booking in userBookings" :key="booking.id">
                  <div class="booking-header">
                    <h3 class="booking-title">{{ booking.packageName }}</h3>
                    <span class="booking-status" :class="booking.status.toLowerCase()">{{ booking.status }}</span>
                  </div>
                  <div class="booking-details">
                    <div class="detail-item">
                      <i class="fas fa-calendar detail-icon"></i>
                      <span class="detail-text">{{ booking.date }}</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-users detail-icon"></i>
                      <span class="detail-text">{{ booking.travelers }} Travelers</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-tag detail-icon"></i>
                      <span class="detail-text">${{ booking.price }}</span>
                    </div>
                  </div>
                  <div class="booking-actions">
                    <Button variant="outline-primary">View Details</Button>
                    <Button variant="primary">Manage Booking</Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Wishlist Tab -->
            <div v-if="activeTab === 'wishlist'" class="tab-content">
              <h2 class="tab-title">My Wishlist</h2>
              <div class="wishlist-grid">
                <div class="wishlist-item" v-for="item in wishlistItems" :key="item.id">
                  <img :src="item.image" :alt="item.name" class="item-image">
                  <div class="item-info">
                    <h3 class="item-name">{{ item.name }}</h3>
                    <p class="item-location">{{ item.location }}</p>
                    <div class="item-price">From ${{ item.price }}</div>
                  </div>
                  <div class="item-actions">
                    <Button variant="primary">Book Now</Button>
                    <Button variant="outline-primary" @click="removeFromWishlist(item.id)">
                      <i class="fas fa-trash"></i> Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Profile Tab -->
            <div v-if="activeTab === 'profile'" class="tab-content">
              <h2 class="tab-title">Profile Settings</h2>
              <form class="profile-form" @submit.prevent="updateProfile">
                <div class="form-group">
                  <label for="name" class="form-label">Full Name</label>
                  <input type="text" id="name" v-model="profileForm.name" class="form-input">
                </div>
                <div class="form-group">
                  <label for="email" class="form-label">Email Address</label>
                  <input type="email" id="email" v-model="profileForm.email" class="form-input">
                </div>
                <div class="form-group">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input type="tel" id="phone" v-model="profileForm.phone" class="form-input">
                </div>
                <div class="form-group">
                  <label for="preferences" class="form-label">Travel Preferences</label>
                  <textarea id="preferences" rows="3" v-model="profileForm.preferences" class="form-textarea"></textarea>
                </div>
                <Button type="submit" variant="primary">Update Profile</Button>
              </form>
            </div>

            <!-- Notifications Tab -->
            <div v-if="activeTab === 'notifications'" class="tab-content">
              <h2 class="tab-title">Notifications</h2>
              <div class="notifications-list">
                <div class="notification-item" v-for="notification in notifications" :key="notification.id">
                  <div class="notification-icon">
                    <i :class="notification.icon"></i>
                  </div>
                  <div class="notification-content">
                    <h4 class="notification-title">{{ notification.title }}</h4>
                    <p class="notification-message">{{ notification.message }}</p>
                    <span class="notification-time">{{ notification.time }}</span>
                  </div>
                  <div class="notification-actions">
                    <Button v-if="notification.actions" variant="outline-primary">View</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/Button.vue'

// Reactive data
const activeTab = ref('overview')

// User data
const user = ref({
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
})

// User stats
const userStats = ref({
  bookings: 12,
  wishlist: 8,
  destinations: 24,
  reviews: 5
})

// Recent activity data
const recentActivity = ref([
  {
    id: 1,
    icon: 'fas fa-calendar-check',
    title: 'Booking Confirmed',
    description: 'Your trip to Bali has been confirmed for June 15-22, 2023',
    time: '2 hours ago'
  },
  {
    id: 2,
    icon: 'fas fa-heart',
    title: 'Added to Wishlist',
    description: 'You added Paris City Tour to your wishlist',
    time: '1 day ago'
  },
  {
    id: 3,
    icon: 'fas fa-star',
    title: 'Review Submitted',
    description: 'You reviewed your recent trip to Switzerland',
    time: '3 days ago'
  }
])

// User bookings data
const userBookings = ref([
  {
    id: 1,
    packageName: 'Bali Beach Resort',
    date: 'Jun 15-22, 2023',
    travelers: 2,
    price: '1,200',
    status: 'Confirmed'
  },
  {
    id: 2,
    packageName: 'Swiss Alps Adventure',
    date: 'Aug 5-15, 2023',
    travelers: 4,
    price: '3,500',
    status: 'Pending'
  },
  {
    id: 3,
    packageName: 'Tokyo Cultural Tour',
    date: 'Oct 10-17, 2023',
    travelers: 2,
    price: '2,100',
    status: 'Confirmed'
  }
])

// Wishlist items
const wishlistItems = ref([
  {
    id: 1,
    name: 'Santorini Sunset Cruise',
    location: 'Santorini, Greece',
    price: '150',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    name: 'Paris City Tour',
    location: 'Paris, France',
    price: '200',
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 3,
    name: 'Safari Experience',
    location: 'Maasai Mara, Kenya',
    price: '800',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }
])

// Profile form data
const profileForm = ref({
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  preferences: 'Beach destinations, cultural experiences, adventure activities'
})

// Notification data
const notifications = ref([
  {
    id: 1,
    icon: 'fas fa-bell',
    title: 'Special Offer',
    message: 'Get 20% off on your next booking to Europe. Limited time offer!',
    time: '2 hours ago',
    actions: true
  },
  {
    id: 2,
    icon: 'fas fa-calendar',
    title: 'Upcoming Trip Reminder',
    message: 'Your trip to Bali is in 2 weeks. Complete your travel checklist.',
    time: '1 day ago',
    actions: true
  },
  {
    id: 3,
    icon: 'fas fa-star',
    title: 'Review Request',
    message: 'How was your recent trip to Switzerland? Share your experience!',
    time: '3 days ago',
    actions: true
  }
])

// Methods
const removeFromWishlist = (id) => {
  wishlistItems.value = wishlistItems.value.filter(item => item.id !== id)
  alert('Item removed from wishlist!')
}

const updateProfile = () => {
  alert('Profile updated successfully!')
}
</script>

<style scoped>
.dashboard {
  font-family: var(--font-primary);
  padding-bottom: var(--space-12);
}

/* Hero Section */
.hero {
  height: 40vh;
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

/* Dashboard Content */
.dashboard-content {
  padding: 0 var(--space-4);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-8);
}

/* Sidebar */
.sidebar {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow);
  height: fit-content;
}

.user-profile {
  text-align: center;
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--border-primary);
  margin-bottom: var(--space-6);
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: var(--radius-full);
  object-fit: cover;
  margin-bottom: var(--space-3);
  border: 3px solid var(--primary-500);
}

.user-name {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-1);
  color: var(--text-primary);
}

.user-email {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
}

.nav-list {
  list-style: none;
  padding: 0;
}

.nav-item {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
}

.nav-item:hover {
  background-color: var(--primary-50);
}

.nav-item.active {
  background-color: var(--primary-500);
  color: var(--text-inverse);
}

.nav-icon {
  width: 20px;
  text-align: center;
}

/* Main Content */
.main-content {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow);
}

.tab-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-6);
  color: var(--text-primary);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.stat-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  text-align: center;
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

.stat-icon {
  font-size: var(--font-size-2xl);
  color: var(--primary-500);
  margin-bottom: var(--space-3);
}

.stat-value {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-1);
  color: var(--text-primary);
}

.stat-label {
  color: var(--text-secondary);
  margin: 0;
}

/* Recent Activity */
.recent-activity {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.activity-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--text-primary);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.activity-item {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--bg-primary);
  transition: var(--transition);
}

.activity-item:hover {
  background: var(--primary-50);
}

.activity-icon {
  font-size: var(--font-size-lg);
  color: var(--primary-500);
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-content {
  flex: 1;
}

.activity-heading {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-1);
  color: var(--text-primary);
}

.activity-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
}

.activity-time {
  color: var(--text-tertiary);
  font-size: var(--font-size-xs);
}

/* Bookings List */
.bookings-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.booking-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: var(--transition);
}

.booking-card:hover {
  box-shadow: var(--shadow);
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-primary);
}

.booking-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0;
}

.booking-status {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.booking-status.confirmed {
  background-color: var(--success);
  color: var(--text-inverse);
}

.booking-status.pending {
  background-color: var(--warning);
  color: var(--text-inverse);
}

.booking-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-secondary);
}

.detail-icon {
  color: var(--primary-500);
  min-width: 20px;
}

.detail-text {
  font-size: var(--font-size-sm);
}

.booking-actions {
  display: flex;
  gap: var(--space-3);
}

/* Wishlist */
.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
}

.wishlist-item {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
}

.wishlist-item:hover {
  box-shadow: var(--shadow);
}

.item-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.item-info {
  padding: var(--space-4);
}

.item-name {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-1);
  color: var(--text-primary);
}

.item-location {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-2);
}

.item-price {
  color: var(--secondary-500);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
}

.item-actions {
  display: flex;
  gap: var(--space-3);
  padding: 0 var(--space-4) var(--space-4);
}

/* Profile Form */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 600px;
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
  min-height: 100px;
  resize: vertical;
}

/* Notifications */
.notifications-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.notification-item {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  transition: var(--transition);
}

.notification-item:hover {
  background: var(--primary-50);
}

.notification-icon {
  font-size: var(--font-size-lg);
  color: var(--primary-500);
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-1);
  color: var(--text-primary);
}

.notification-message {
  color: var(--text-secondary);
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
}

.notification-time {
  color: var(--text-tertiary);
  font-size: var(--font-size-xs);
}

.notification-actions {
  display: flex;
  align-items: flex-start;
}

/* Responsive Design */
@media (max-width: 992px) {
  .dashboard-grid {
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
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
}

@media (max-width: 768px) {
  .hero {
    height: 30vh;
  }
  
  .hero-title {
    font-size: var(--font-size-2xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-base);
  }
  
  .dashboard-content {
    padding: 0 var(--space-2);
  }
  
  .main-content,
  .sidebar {
    padding: var(--space-6);
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .booking-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
  
  .booking-details {
    grid-template-columns: 1fr;
  }
  
  .booking-actions {
    flex-direction: column;
  }
  
  .wishlist-grid {
    grid-template-columns: 1fr;
  }
  
  .item-actions {
    flex-direction: column;
  }
  
  .notification-item {
    flex-direction: column;
  }
  
  .notification-actions {
    align-self: flex-start;
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .activity-item {
    flex-direction: column;
  }
  
  .activity-icon {
    margin-bottom: var(--space-2);
  }
}
</style>