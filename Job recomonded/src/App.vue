<template>
  <div id="app">
    <header>
      <h1>AI Job Recommendation & Tracker</h1>
      <nav>
        <button @click="setActiveTab('input')" :class="{ active: activeTab === 'input' }">Profile</button>
        <button @click="setActiveTab('recommendations')" :class="{ active: activeTab === 'recommendations' }">Recommendations</button>
        <button @click="setActiveTab('favorites')" :class="{ active: activeTab === 'favorites' }">Saved Jobs</button>
        <button @click="setActiveTab('analytics')" :class="{ active: activeTab === 'analytics' }">Analytics</button>
      </nav>
      <div class="theme-toggle">
        <button @click="toggleTheme">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</button>
      </div>
    </header>
    
    <main>
      <UserProfile v-if="activeTab === 'input'" @profile-updated="loadRecommendations" />
      <JobRecommendations 
        v-if="activeTab === 'recommendations'" 
        :jobs="recommendedJobs" 
        @regenerate="generateRecommendations"
        @save-job="saveJob"
      />
      <SavedJobs 
        v-if="activeTab === 'favorites'" 
        :saved-jobs="savedJobs" 
        @remove-job="removeJob"
        @navigate-to-recommendations="setActiveTab('recommendations')"
      />
      <AnalyticsDashboard 
        v-if="activeTab === 'analytics'" 
        :jobs="recommendedJobs" 
        :saved-jobs="savedJobs"
      />
    </main>
  </div>
</template>

<script>
import UserProfile from './components/UserProfile.vue'
import JobRecommendations from './components/JobRecommendations.vue'
import SavedJobs from './components/SavedJobs.vue'
import AnalyticsDashboard from './components/AnalyticsDashboard.vue'

export default {
  name: 'App',
  components: {
    UserProfile,
    JobRecommendations,
    SavedJobs,
    AnalyticsDashboard
  },
  data() {
    return {
      activeTab: 'input',
      isDarkMode: false,
      userProfile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        summary: '',
        skills: [],
        education: '',
        certifications: [],
        experience: '',
        locations: [],
        jobType: ''
      },
      recommendedJobs: [],
      savedJobs: []
    }
  },
  mounted() {
    this.loadUserProfile()
    this.loadSavedJobs()
    this.applyTheme()
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('darkMode', this.isDarkMode)
      this.applyTheme()
    },
    applyTheme() {
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }
    },
    loadUserProfile() {
      const profile = localStorage.getItem('userProfile')
      if (profile) {
        this.userProfile = JSON.parse(profile)
      }
    },
    loadSavedJobs() {
      const saved = localStorage.getItem('savedJobs')
      if (saved) {
        this.savedJobs = JSON.parse(saved)
      }
    },
    loadRecommendations() {
      // Load recommendations when profile is updated
      this.generateRecommendations()
    },
    generateRecommendations() {
      // Mock AI API call to generate job recommendations
      this.recommendedJobs = this.mockAIRecommendations()
    },
    mockAIRecommendations() {
      // Extended mock data for job recommendations
      const mockJobs = [
        {
          id: 1,
          title: 'Senior Frontend Developer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          skills: ['Vue.js', 'JavaScript', 'CSS', 'HTML', 'TypeScript'],
          jobType: 'Full-time',
          rankingScore: 95,
          description: 'We are looking for a skilled Frontend Developer with expertise in Vue.js to join our team. You will be responsible for building user-facing features using Vue.js and modern web technologies.'
        },
        {
          id: 2,
          title: 'AI Engineer',
          company: 'InnovateAI',
          location: 'Remote',
          skills: ['Python', 'TensorFlow', 'Machine Learning', 'NLP', 'Deep Learning'],
          jobType: 'Full-time',
          rankingScore: 88,
          description: 'Join our AI research team to develop cutting-edge machine learning models. You will work on NLP projects and help deploy AI solutions to production.'
        },
        {
          id: 3,
          title: 'Full Stack Developer',
          company: 'StartUp Ventures',
          location: 'New York, NY',
          skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
          jobType: 'Contract',
          rankingScore: 82,
          description: 'Work on diverse projects using modern full-stack technologies. You will build scalable web applications and collaborate with cross-functional teams.'
        },
        {
          id: 4,
          title: 'Data Scientist',
          company: 'DataDriven Co.',
          location: 'Boston, MA',
          skills: ['Python', 'R', 'SQL', 'Statistics', 'Data Visualization'],
          jobType: 'Full-time',
          rankingScore: 78,
          description: 'Analyze complex datasets to drive business insights and decisions. You will build predictive models and create data visualizations for stakeholders.'
        },
        {
          id: 5,
          title: 'UX/UI Designer',
          company: 'Creative Minds',
          location: 'Austin, TX',
          skills: ['Figma', 'Sketch', 'Prototyping', 'User Research', 'Adobe XD'],
          jobType: 'Part-time',
          rankingScore: 75,
          description: 'Design beautiful and intuitive user experiences for our products. You will conduct user research and create wireframes and prototypes.'
        },
        {
          id: 6,
          title: 'DevOps Engineer',
          company: 'CloudTech Solutions',
          location: 'Seattle, WA',
          skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD', 'Terraform'],
          jobType: 'Full-time',
          rankingScore: 85,
          description: 'Manage our cloud infrastructure and deployment pipelines. You will ensure high availability and scalability of our applications.'
        },
        {
          id: 7,
          title: 'Backend Developer',
          company: 'ServerStack',
          location: 'Remote',
          skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'API Development'],
          jobType: 'Full-time',
          rankingScore: 80,
          description: 'Develop and maintain our backend services and APIs. You will work with databases and implement business logic.'
        },
        {
          id: 8,
          title: 'Mobile App Developer',
          company: 'AppWorks',
          location: 'Los Angeles, CA',
          skills: ['React Native', 'iOS', 'Android', 'JavaScript', 'Mobile UI'],
          jobType: 'Contract',
          rankingScore: 77,
          description: 'Build cross-platform mobile applications for iOS and Android. You will work with modern frameworks to create engaging user experiences.'
        }
      ]
      
      // Filter and rank based on user profile
      return mockJobs.map(job => {
        // Simple ranking algorithm based on matching skills
        const matchingSkills = job.skills.filter(skill => 
          this.userProfile.skills.some(userSkill => 
            userSkill.toLowerCase().includes(skill.toLowerCase()) || 
            skill.toLowerCase().includes(userSkill.toLowerCase())
          )
        ).length
        
        // Adjust ranking score based on matching skills
        const adjustedScore = Math.min(100, job.rankingScore + (matchingSkills * 5))
        
        return {
          ...job,
          rankingScore: adjustedScore
        }
      }).sort((a, b) => b.rankingScore - a.rankingScore)
    },
    saveJob(job) {
      if (!this.savedJobs.find(j => j.id === job.id)) {
        this.savedJobs.push(job)
        localStorage.setItem('savedJobs', JSON.stringify(this.savedJobs))
      }
    },
    removeJob(jobId) {
      this.savedJobs = this.savedJobs.filter(job => job.id !== jobId)
      localStorage.setItem('savedJobs', JSON.stringify(this.savedJobs))
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: background-color 0.3s, color 0.3s;
  background-color: #f5f7fa;
  color: #333;
}

body.dark-mode {
  background-color: #1a1a1a;
  color: #f0f0f0;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
}

body.dark-mode header {
  border-bottom: 1px solid #444;
}

header h1 {
  font-size: 2rem;
  color: #2c3e50;
}

body.dark-mode header h1 {
  color: #ecf0f1;
}

nav {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

nav button {
  padding: 10px 15px;
  background-color: #eee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

body.dark-mode nav button {
  background-color: #333;
  color: #f0f0f0;
}

nav button:hover {
  background-color: #ddd;
}

body.dark-mode nav button:hover {
  background-color: #444;
}

nav button.active {
  background-color: #3498db;
  color: white;
}

body.dark-mode nav button.active {
  background-color: #2980b9;
}

.theme-toggle button {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.theme-toggle button:hover {
  background-color: #2980b9;
}

body.dark-mode .theme-toggle button {
  background-color: #2c3e50;
}

body.dark-mode .theme-toggle button:hover {
  background-color: #34495e;
}

main {
  min-height: 70vh;
}

@media (max-width: 768px) {
  #app {
    padding: 10px;
  }
  
  header {
    flex-direction: column;
    align-items: stretch;
  }
  
  header h1 {
    text-align: center;
  }
  
  nav {
    justify-content: center;
  }
}
</style>