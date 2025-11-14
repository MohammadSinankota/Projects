<template>
  <div class="about-page">
    <!-- About Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">About Travelfolio</h1>
        <p class="hero-subtitle">Creating unforgettable travel experiences since 2010. With over 15 years of expertise and 100,000+ satisfied travelers, we're your trusted partner for extraordinary adventures worldwide.</p>
        <Button 
          variant="primary" 
          size="large" 
          @click="scrollToMission"
          class="hero-cta"
        >
          Discover Our Mission
        </Button>
      </div>
    </section>

    <!-- Company History -->
    <section class="company-history" ref="missionRef">
      <div class="container">
        <div class="history-content">
          <div class="history-text">
            <h2 class="section-title">Our Story</h2>
            <p class="section-description">Founded in 2010, Travelfolio began with a simple mission: to help people explore the world in the most meaningful way possible. What started as a small team of travel enthusiasts has grown into a global company with over 200 employees across 15 countries, serving travelers from 50+ nations.</p>
            <p class="section-description">We believe that travel is more than just visiting places - it's about creating connections, discovering new perspectives, and making memories that last a lifetime. That's why we craft every experience with care, attention to detail, and a deep understanding of what makes each destination special. Our team of certified travel experts and local guides ensures authentic experiences that go beyond typical tourist attractions.</p>
            <p class="section-description">Over the years, we've helped more than 100,000 travelers explore over 100 countries, earning a 4.8/5 average rating from our customers. We're proud to have been recognized with multiple industry awards and continue to innovate in sustainable and responsible tourism.</p>
            <Button variant="secondary" size="medium" class="read-more-btn">
              Read Full Story
            </Button>
          </div>
          <div class="history-image">
            <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Our Team" class="history-img">
          </div>
        </div>
      </div>
    </section>

    <!-- Mission and Values -->
    <section class="mission-values">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Our Mission & Values</h2>
          <p class="section-subtitle">What drives us to create exceptional travel experiences</p>
        </div>
        <div class="mission-values-grid">
          <Card class="mission-card">
            <template #header>
              <div class="icon-wrapper">
                <i class="fas fa-bullseye icon"></i>
              </div>
              <h3 class="card-title">Our Mission</h3>
            </template>
            <template #content>
              <p class="card-description">To inspire and enable people to explore the world through authentic, sustainable, and transformative travel experiences. We're committed to responsible tourism that benefits local communities while preserving the natural and cultural heritage of destinations for future generations.</p>
            </template>
            <template #footer>
              <Button variant="outline-primary" size="small">Learn More</Button>
            </template>
          </Card>
          
          <Card class="values-card">
            <template #header>
              <div class="icon-wrapper">
                <i class="fas fa-heart icon"></i>
              </div>
              <h3 class="card-title">Our Values</h3>
            </template>
            <template #content>
              <ul class="values-list">
                <li class="value-item">
                  <i class="fas fa-check-circle value-icon"></i>
                  <span><strong>Authenticity:</strong> We provide genuine experiences that connect travelers with local cultures and communities.</span>
                </li>
                <li class="value-item">
                  <i class="fas fa-check-circle value-icon"></i>
                  <span><strong>Sustainability:</strong> We promote responsible tourism that protects the environment and supports local economies.</span>
                </li>
                <li class="value-item">
                  <i class="fas fa-check-circle value-icon"></i>
                  <span><strong>Integrity:</strong> We maintain transparent pricing, honest reviews, and ethical business practices.</span>
                </li>
                <li class="value-item">
                  <i class="fas fa-check-circle value-icon"></i>
                  <span><strong>Excellence:</strong> We strive for perfection in every aspect of our service, from planning to execution.</span>
                </li>
                <li class="value-item">
                  <i class="fas fa-check-circle value-icon"></i>
                  <span><strong>Inclusivity:</strong> We welcome travelers of all backgrounds and provide accessible travel options.</span>
                </li>
              </ul>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Join Our Travel Community</h2>
          <p class="cta-subtitle">Create an account or sign in to access exclusive travel benefits</p>
          <div class="cta-buttons">
            <Button variant="primary" size="large" to="/register">Create Account</Button>
            <Button variant="outline-primary" size="large" to="/login">Sign In</Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Meet Our Team</h2>
          <p class="section-subtitle">The passionate people behind our travel experiences</p>
        </div>
        <div class="team-grid">
          <Card 
            v-for="member in teamMembers" 
            :key="member.id"
            class="team-member"
          >
            <template #header>
              <img :src="member.image" :alt="member.name" class="member-image">
            </template>
            <template #content>
              <div class="member-info">
                <h3 class="member-name">{{ member.name }}</h3>
                <p class="member-position">{{ member.position }}</p>
                <p class="member-bio">{{ member.bio }}</p>
              </div>
            </template>
            <template #footer>
              <div class="social-links">
                <a href="#" class="social-link" aria-label="LinkedIn">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" class="social-link" aria-label="Twitter">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Awards and Partnerships -->
    <section class="awards-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Awards & Partnerships</h2>
          <p class="section-subtitle">Recognitions and collaborations that drive our success</p>
        </div>
        <div class="awards-content">
          <div class="awards-list">
            <Card 
              v-for="award in awards" 
              :key="award.id"
              class="award-item"
            >
              <template #header>
                <div class="award-icon">
                  <i :class="award.icon"></i>
                </div>
              </template>
              <template #content>
                <div class="award-text">
                  <h3 class="award-title">{{ award.title }}</h3>
                  <p class="award-description">{{ award.description }}</p>
                </div>
              </template>
            </Card>
          </div>
          <div class="partnerships">
            <h3 class="partnerships-title">Our Partners</h3>
            <div class="partners-grid">
              <div class="partner-logo">
                <i class="fab fa-airbnb fa-3x"></i>
              </div>
              <div class="partner-logo">
                <i class="fab fa-expedia fa-3x"></i>
              </div>
              <div class="partner-logo">
                <i class="fab fa-tripadvisor fa-3x"></i>
              </div>
              <div class="partner-logo">
                <i class="fab fa-google fa-3x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'

// Router instance
const router = useRouter()

// Active tab for auth section
const activeTab = ref('login')

// Reactive data for login form
const loginForm = ref({
  email: '',
  password: '',
  remember: false
})

// Reactive data for register form
const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

// Watch for password mismatch
watch(
  () => registerForm.value,
  (newVal) => {
    if (newVal.password && newVal.confirmPassword && newVal.password !== newVal.confirmPassword) {
      console.log('Passwords do not match')
    }
  },
  { deep: true }
)

// Method to handle login
const handleLogin = () => {
  if (loginForm.value.email && loginForm.value.password) {
    // In a real app, you would authenticate with a backend here
    alert(`Welcome back to Travelfolio! You've been logged in successfully.`)
    // Redirect to home page or dashboard
    router.push('/')
  } else {
    alert('Please fill in all required fields.')
  }
}

// Team members data
const teamMembers = ref([
  {
    id: 1,
    name: 'Alex Johnson',
    position: 'Founder & CEO',
    bio: 'Travel enthusiast with 15+ years of industry experience. Alex has traveled to over 80 countries and is passionate about creating authentic travel experiences that connect people with different cultures.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    position: 'Chief Operations Officer',
    bio: 'Expert in logistics and customer experience optimization with a background in hospitality management. Maria ensures seamless travel experiences from booking to return.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 3,
    name: 'James Wilson',
    position: 'Head of Destinations',
    bio: 'Former diplomat with deep knowledge of international cultures and 20+ years of experience in destination development. James has personally vetted over 200 destinations worldwide.',
    image: 'https://randomuser.me/api/portraits/men/67.jpg'
  },
  {
    id: 4,
    name: 'Sarah Chen',
    position: 'Sustainability Director',
    bio: 'Leading our eco-friendly travel initiatives with a focus on responsible tourism. Sarah has implemented sustainable practices that have reduced our carbon footprint by 40% while supporting local communities.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: 5,
    name: 'David Okafor',
    position: 'Head of Adventure Travel',
    bio: 'Certified adventure guide with expertise in extreme sports and outdoor activities. David designs thrilling experiences that push boundaries while maintaining the highest safety standards.',
    image: 'https://randomuser.me/api/portraits/men/82.jpg'
  },
  {
    id: 6,
    name: 'Elena Rodriguez',
    position: 'Luxury Travel Specialist',
    bio: 'Former concierge at 5-star hotels with a passion for creating bespoke luxury experiences. Elena has access to exclusive properties and private experiences unavailable to the general public.',
    image: 'https://randomuser.me/api/portraits/women/76.jpg'
  }
])

// Awards data
const awards = ref([
  {
    id: 1,
    icon: 'fas fa-trophy',
    title: 'World Travel Awards 2022',
    description: 'Best Adventure Travel Company'
  },
  {
    id: 2,
    icon: 'fas fa-medal',
    title: 'Travel Weekly Awards 2021',
    description: 'Outstanding Customer Service'
  },
  {
    id: 3,
    icon: 'fas fa-certificate',
    title: 'Sustainable Tourism Award 2020',
    description: 'Environmental Responsibility'
  }
])

// Scroll to mission section
const missionRef = ref<HTMLElement | null>(null)

const scrollToMission = () => {
  missionRef.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.about-page {
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

/* Company History */
.company-history {
  padding: var(--space-12) 0;
}

.history-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
}

.history-text {
  order: 1;
}

.history-image {
  order: 2;
}

.history-img {
  width: 100%;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.section-description {
  margin-bottom: var(--space-4);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
}

.read-more-btn {
  margin-top: var(--space-4);
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
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* Mission and Values */
.mission-values {
  padding: var(--space-12) 0;
  background-color: var(--bg-secondary);
}

.mission-values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.mission-card,
.values-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-4);
}

.icon {
  font-size: var(--font-size-4xl);
  color: var(--primary-500);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-50);
  border-radius: var(--radius-full);
}

.card-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--text-primary);
  text-align: center;
}

.card-description {
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  text-align: center;
}

.values-list {
  list-style: none;
  padding: 0;
  text-align: left;
}

.value-item {
  padding: var(--space-3) 0;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.value-icon {
  color: var(--primary-500);
  min-width: 20px;
}

/* Team Section */
.team-section {
  padding: var(--space-12) 0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-8);
}

.team-member {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.member-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.member-info {
  padding: var(--space-6);
  text-align: center;
}

.member-name {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-1);
  color: var(--text-primary);
}

.member-position {
  color: var(--primary-500);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-3);
}

.member-bio {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-sm);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  padding-top: var(--space-2);
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

/* Awards Section */
.awards-section {
  padding: var(--space-12) 0;
  background-color: var(--bg-secondary);
}

.awards-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-8);
}

.awards-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

.award-item {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.award-icon {
  font-size: var(--font-size-2xl);
  color: var(--primary-500);
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-3);
}

.award-text {
  flex: 1;
}

.award-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-2);
  color: var(--text-primary);
}

.award-description {
  color: var(--text-secondary);
  margin: 0;
}

/* CTA Section */
.cta-section {
  padding: var(--space-12) 0;
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
  color: var(--text-inverse);
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.cta-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-3);
  color: var(--text-inverse);
}

.cta-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-inverse);
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto var(--space-6);
  line-height: var(--line-height-relaxed);
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

/* Partnerships */
.partnerships {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  height: fit-content;
}

.partnerships-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-6);
  color: var(--text-primary);
  text-align: center;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  text-align: center;
}

.partner-logo {
  color: var(--primary-500);
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
}

.partner-logo:hover {
  color: var(--secondary-500);
  transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 992px) {
  .history-content {
    grid-template-columns: 1fr;
  }
  
  .history-text {
    order: 2;
  }
  
  .history-image {
    order: 1;
  }
  
  .awards-content {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: var(--font-size-4xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .section-title {
    font-size: var(--font-size-2xl);
  }
  
  .form-row {
    grid-template-columns: 1fr;
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
  
  .company-history,
  .mission-values,
  .team-section,
  .awards-section {
    padding: var(--space-8) 0;
  }
  
  .mission-values-grid,
  .team-grid,
  .awards-list {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    margin-bottom: var(--space-6);
  }
  
  .section-subtitle {
    font-size: var(--font-size-base);
  }
  
  .auth-content {
    padding: var(--space-6);
  }
}

@media (max-width: 576px) {
  .partners-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: var(--font-size-2xl);
  }
  
  .hero-content {
    padding: 0 var(--space-4);
  }
  
  .form-options {
    flex-direction: column;
    gap: var(--space-3);
    align-items: flex-start;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-title {
    font-size: var(--font-size-2xl);
  }
  
  .cta-subtitle {
    font-size: var(--font-size-base);
  }
}
</style>