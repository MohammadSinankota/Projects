<template>
  <div class="about-page">
    <!-- About Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">About Travelfolio</h1>
        <p class="hero-subtitle">Creating unforgettable travel experiences since 2010</p>
      </div>
    </section>

    <!-- Company History -->
    <section class="company-history">
      <div class="container">
        <div class="history-content">
          <div class="history-text">
            <h2 class="section-title">Our Story</h2>
            <p class="section-description">Founded in 2010, Travelfolio began with a simple mission: to help people explore the world in the most meaningful way possible. What started as a small team of travel enthusiasts has grown into a global company with over 200 employees across 15 countries.</p>
            <p class="section-description">We believe that travel is more than just visiting places - it's about creating connections, discovering new perspectives, and making memories that last a lifetime. That's why we craft every experience with care, attention to detail, and a deep understanding of what makes each destination special.</p>
            <p class="section-description">Over the years, we've helped more than 100,000 travelers explore over 100 countries, and we're just getting started.</p>
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
        <div class="mission-values-grid">
          <div class="mission-card">
            <div class="icon">
              <i class="fas fa-bullseye"></i>
            </div>
            <h3 class="card-title">Our Mission</h3>
            <p class="card-description">To inspire and enable people to explore the world through authentic, sustainable, and transformative travel experiences.</p>
          </div>
          <div class="values-card">
            <div class="icon">
              <i class="fas fa-heart"></i>
            </div>
            <h3 class="card-title">Our Values</h3>
            <ul class="values-list">
              <li class="value-item"><i class="fas fa-check-circle value-icon"></i> Authenticity</li>
              <li class="value-item"><i class="fas fa-check-circle value-icon"></i> Sustainability</li>
              <li class="value-item"><i class="fas fa-check-circle value-icon"></i> Integrity</li>
              <li class="value-item"><i class="fas fa-check-circle value-icon"></i> Excellence</li>
              <li class="value-item"><i class="fas fa-check-circle value-icon"></i> Inclusivity</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <h2 class="section-title">Meet Our Team</h2>
        <div class="team-grid">
          <div class="team-member" v-for="member in teamMembers" :key="member.id">
            <img :src="member.image" :alt="member.name" class="member-image">
            <div class="member-info">
              <h3 class="member-name">{{ member.name }}</h3>
              <p class="member-position">{{ member.position }}</p>
              <p class="member-bio">{{ member.bio }}</p>
              <div class="social-links">
                <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Awards and Partnerships -->
    <section class="awards-section">
      <div class="container">
        <h2 class="section-title">Awards & Partnerships</h2>
        <div class="awards-content">
          <div class="awards-list">
            <div class="award-item">
              <div class="award-icon">
                <i class="fas fa-trophy"></i>
              </div>
              <div class="award-text">
                <h3 class="award-title">World Travel Awards 2022</h3>
                <p class="award-description">Best Adventure Travel Company</p>
              </div>
            </div>
            <div class="award-item">
              <div class="award-icon">
                <i class="fas fa-medal"></i>
              </div>
              <div class="award-text">
                <h3 class="award-title">Travel Weekly Awards 2021</h3>
                <p class="award-description">Outstanding Customer Service</p>
              </div>
            </div>
            <div class="award-item">
              <div class="award-icon">
                <i class="fas fa-certificate"></i>
              </div>
              <div class="award-text">
                <h3 class="award-title">Sustainable Tourism Award 2020</h3>
                <p class="award-description">Environmental Responsibility</p>
              </div>
            </div>
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
import { ref } from 'vue'

// Team members data
const teamMembers = ref([
  {
    id: 1,
    name: 'Alex Johnson',
    position: 'Founder & CEO',
    bio: 'Travel enthusiast with 15+ years of industry experience.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    position: 'Chief Operations Officer',
    bio: 'Expert in logistics and customer experience optimization.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 3,
    name: 'James Wilson',
    position: 'Head of Destinations',
    bio: 'Former diplomat with deep knowledge of international cultures.',
    image: 'https://randomuser.me/api/portraits/men/67.jpg'
  },
  {
    id: 4,
    name: 'Sarah Chen',
    position: 'Sustainability Director',
    bio: 'Leading our eco-friendly travel initiatives.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
])
</script>

<style scoped>
.about-page {
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
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow);
  text-align: center;
  transition: var(--transition);
}

.mission-card:hover,
.values-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-4);
  color: var(--primary-500);
}

.card-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--text-primary);
}

.card-description {
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
}

.values-list {
  list-style: none;
  padding: 0;
  text-align: left;
}

.value-item {
  padding: var(--space-2) 0;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
}

.value-icon {
  color: var(--primary-500);
  margin-right: var(--space-3);
  min-width: 20px;
}

/* Team Section */
.team-section {
  padding: var(--space-12) 0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-8);
}

.team-member {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.member-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
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
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.award-item {
  display: flex;
  gap: var(--space-6);
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.award-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

.award-icon {
  font-size: var(--font-size-2xl);
  color: var(--primary-500);
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.award-text {
  flex: 1;
}

.award-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-1);
  color: var(--text-primary);
}

.award-description {
  color: var(--text-secondary);
  margin: 0;
}

.partnerships {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}

.partnerships-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
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
    font-size: var(--font-size-3xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
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
  
  .company-history,
  .mission-values,
  .team-section,
  .awards-section {
    padding: var(--space-8) 0;
  }
  
  .mission-values-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .award-item {
    flex-direction: column;
    text-align: center;
  }
  
  .award-icon {
    margin: 0 auto var(--space-3);
  }
}

@media (max-width: 576px) {
  .partners-grid {
    grid-template-columns: 1fr;
  }
}
</style>