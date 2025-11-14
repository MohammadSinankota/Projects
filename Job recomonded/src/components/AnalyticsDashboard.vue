<template>
  <div class="analytics-dashboard">
    <div class="dashboard-header">
      <div class="header-content">
        <h2>Analytics Dashboard</h2>
        <p class="header-subtitle">Insights and trends from your job search activity</p>
      </div>
      <div class="header-actions">
        <button @click="exportReport" class="export-btn">
          📥 Export Report
        </button>
        <button @click="refreshData" class="refresh-btn">
          🔄 Refresh
        </button>
      </div>
    </div>
    
    <div class="dashboard-filters">
      <div class="filter-group">
        <label for="timeRange">Time Range:</label>
        <select id="timeRange" v-model="selectedTimeRange" class="filter-select">
          <option value="all">All Time</option>
          <option value="30">Last 30 Days</option>
          <option value="7">Last 7 Days</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="jobTypeFilter">Job Type:</label>
        <select id="jobTypeFilter" v-model="selectedJobType" class="filter-select">
          <option value="">All Types</option>
          <option v-for="type in allJobTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
    </div>
    
    <div class="stats-summary">
      <div class="stat-card">
        <div class="stat-icon">📋</div>
        <div class="stat-content">
          <h3>{{ totalJobs }}</h3>
          <p>Total Recommended Jobs</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">⭐</div>
        <div class="stat-content">
          <h3>{{ savedJobsCount }}</h3>
          <p>Saved Jobs</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-content">
          <h3>{{ topMatchScore }}%</h3>
          <p>Highest Match Score</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🛠️</div>
        <div class="stat-content">
          <h3>{{ uniqueSkillsCount }}</h3>
          <p>Unique Skills</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📍</div>
        <div class="stat-content">
          <h3>{{ uniqueLocationsCount }}</h3>
          <p>Locations</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-content">
          <h3>{{ avgMatchScore }}%</h3>
          <p>Avg Match Score</p>
        </div>
      </div>
    </div>
    
    <div class="charts-container">
      <div class="chart-wrapper">
        <div class="chart-header">
          <h3>Top Skills in Recommended Jobs</h3>
          <div class="chart-actions">
            <button @click="toggleSkillsChart" class="chart-toggle">
              {{ showSkillsChart ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <div v-if="showSkillsChart" class="chart-content">
          <Bar :data="skillsChartData" :options="barChartOptions" />
        </div>
      </div>
      
      <div class="chart-wrapper">
        <div class="chart-header">
          <h3>Job Distribution by Location</h3>
          <div class="chart-actions">
            <button @click="toggleLocationChart" class="chart-toggle">
              {{ showLocationChart ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <div v-if="showLocationChart" class="chart-content">
          <Pie :data="locationChartData" :options="chartOptions" />
        </div>
      </div>
      
      <div class="chart-wrapper">
        <div class="chart-header">
          <h3>Job Type Distribution</h3>
          <div class="chart-actions">
            <button @click="toggleJobTypeChart" class="chart-toggle">
              {{ showJobTypeChart ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <div v-if="showJobTypeChart" class="chart-content">
          <Doughnut :data="jobTypeChartData" :options="chartOptions" />
        </div>
      </div>
      
      <div class="chart-wrapper">
        <div class="chart-header">
          <h3>Match Score Distribution</h3>
          <div class="chart-actions">
            <button @click="toggleScoreChart" class="chart-toggle">
              {{ showScoreChart ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <div v-if="showScoreChart" class="chart-content">
          <Bar :data="matchScoreChartData" :options="scoreChartOptions" />
        </div>
      </div>
      
      <div class="chart-wrapper">
        <div class="chart-header">
          <h3>Experience Level Distribution</h3>
          <div class="chart-actions">
            <button @click="toggleExperienceChart" class="chart-toggle">
              {{ showExperienceChart ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <div v-if="showExperienceChart" class="chart-content">
          <Bar :data="experienceChartData" :options="barChartOptions" />
        </div>
      </div>
    </div>
    
    <div class="insights-section">
      <h3>Key Insights</h3>
      <div class="insights-content">
        <div class="insight-card">
          <h4>Top Matching Skills</h4>
          <p>Your profile strongly matches jobs requiring {{ topMatchingSkills.join(', ') }}.</p>
        </div>
        <div class="insight-card">
          <h4>Opportunity Hotspots</h4>
          <p>Most opportunities are located in {{ topLocations.join(', ') }}.</p>
        </div>
        <div class="insight-card">
          <h4>Recommendation</h4>
          <p>Based on your profile, consider focusing on {{ recommendedFocus }} to improve your match scores.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'
import { Bar, Pie, Doughnut } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
  name: 'AnalyticsDashboard',
  components: {
    Bar,
    Pie,
    Doughnut
  },
  props: {
    jobs: {
      type: Array,
      required: true
    },
    savedJobs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedTimeRange: 'all',
      selectedJobType: '',
      showSkillsChart: true,
      showLocationChart: true,
      showJobTypeChart: true,
      showScoreChart: true,
      showExperienceChart: true,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: document.body.classList.contains('dark-mode') ? '#f0f0f0' : '#333',
              font: {
                size: 12
              }
            }
          }
        }
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: document.body.classList.contains('dark-mode') ? '#f0f0f0' : '#333'
            },
            grid: {
              color: document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            ticks: {
              color: document.body.classList.contains('dark-mode') ? '#f0f0f0' : '#333'
            },
            grid: {
              color: document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
      },
      scoreChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: document.body.classList.contains('dark-mode') ? '#f0f0f0' : '#333'
            },
            grid: {
              color: document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            ticks: {
              color: document.body.classList.contains('dark-mode') ? '#f0f0f0' : '#333'
            },
            grid: {
              color: document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
      }
    }
  },
  computed: {
    totalJobs() {
      return this.jobs.length
    },
    savedJobsCount() {
      return this.savedJobs.length
    },
    topMatchScore() {
      if (this.jobs.length === 0) return 0
      return Math.max(...this.jobs.map(job => job.rankingScore))
    },
    avgMatchScore() {
      if (this.jobs.length === 0) return 0
      const total = this.jobs.reduce((sum, job) => sum + job.rankingScore, 0)
      return Math.round(total / this.jobs.length)
    },
    uniqueSkillsCount() {
      const allSkills = new Set()
      this.jobs.forEach(job => {
        job.skills.forEach(skill => allSkills.add(skill))
      })
      return allSkills.size
    },
    uniqueLocationsCount() {
      const allLocations = new Set()
      this.jobs.forEach(job => {
        allLocations.add(job.location)
      })
      return allLocations.size
    },
    skillsChartData() {
      // Count skills frequency
      const skillCount = {}
      this.jobs.forEach(job => {
        job.skills.forEach(skill => {
          skillCount[skill] = (skillCount[skill] || 0) + 1
        })
      })
      
      // Sort skills by frequency and take top 10
      const sortedSkills = Object.entries(skillCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
      
      const labels = sortedSkills.map(([skill]) => skill)
      const data = sortedSkills.map(([,count]) => count)
      
      return {
        labels,
        datasets: [{
          label: 'Number of Jobs Requiring Skill',
          backgroundColor: '#3498db',
          borderColor: '#3498db',
          borderWidth: 1,
          data
        }]
      }
    },
    locationChartData() {
      // Count jobs by location
      const locationCount = {}
      this.jobs.forEach(job => {
        locationCount[job.location] = (locationCount[job.location] || 0) + 1
      })
      
      const labels = Object.keys(locationCount)
      const data = Object.values(locationCount)
      
      // Generate colors for each segment
      const backgroundColors = [
        '#3498db', '#2ecc71', '#e74c3c', '#f39c12', 
        '#9b59b6', '#1abc9c', '#34495e', '#e67e22',
        '#27ae60', '#8e44ad'
      ]
      
      return {
        labels,
        datasets: [{
          label: 'Jobs by Location',
          backgroundColor: backgroundColors.slice(0, labels.length),
          data
        }]
      }
    },
    jobTypeChartData() {
      // Count jobs by type
      const typeCount = {}
      this.jobs.forEach(job => {
        typeCount[job.jobType] = (typeCount[job.jobType] || 0) + 1
      })
      
      const labels = Object.keys(typeCount)
      const data = Object.values(typeCount)
      
      // Generate colors for each segment
      const backgroundColors = [
        '#3498db', '#2ecc71', '#e74c3c', '#f39c12', 
        '#9b59b6', '#1abc9c'
      ]
      
      return {
        labels,
        datasets: [{
          label: 'Jobs by Type',
          backgroundColor: backgroundColors.slice(0, labels.length),
          data
        }]
      }
    },
    matchScoreChartData() {
      // Group scores into ranges
      const scoreRanges = {
        '90-100': 0,
        '80-89': 0,
        '70-79': 0,
        '60-69': 0,
        'Below 60': 0
      }
      
      this.jobs.forEach(job => {
        const score = job.rankingScore
        if (score >= 90) scoreRanges['90-100']++
        else if (score >= 80) scoreRanges['80-89']++
        else if (score >= 70) scoreRanges['70-79']++
        else if (score >= 60) scoreRanges['60-69']++
        else scoreRanges['Below 60']++
      })
      
      const labels = Object.keys(scoreRanges)
      const data = Object.values(scoreRanges)
      
      return {
        labels,
        datasets: [{
          label: 'Number of Jobs',
          backgroundColor: '#9b59b6',
          borderColor: '#9b59b6',
          borderWidth: 1,
          data
        }]
      }
    },
    experienceChartData() {
      // Count jobs by experience level
      const experienceCount = {}
      this.jobs.forEach(job => {
        const experience = job.experience || 'Not specified'
        experienceCount[experience] = (experienceCount[experience] || 0) + 1
      })
      
      const labels = Object.keys(experienceCount)
      const data = Object.values(experienceCount)
      
      return {
        labels,
        datasets: [{
          label: 'Jobs by Experience Level',
          backgroundColor: '#f39c12',
          borderColor: '#f39c12',
          borderWidth: 1,
          data
        }]
      }
    },
    allJobTypes() {
      const types = new Set()
      this.jobs.forEach(job => {
        types.add(job.jobType)
      })
      return Array.from(types).sort()
    },
    topMatchingSkills() {
      // Get top 3 skills based on frequency
      const skillCount = {}
      this.jobs.forEach(job => {
        job.skills.forEach(skill => {
          skillCount[skill] = (skillCount[skill] || 0) + 1
        })
      })
      
      return Object.entries(skillCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([skill]) => skill)
    },
    topLocations() {
      // Get top 3 locations based on job count
      const locationCount = {}
      this.jobs.forEach(job => {
        locationCount[job.location] = (locationCount[job.location] || 0) + 1
      })
      
      return Object.entries(locationCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([location]) => location)
    },
    recommendedFocus() {
      // Simple recommendation based on skills and job types
      const skills = this.topMatchingSkills[0] || 'technical skills'
      const jobType = this.allJobTypes[0] || 'your preferred job type'
      return `${skills} and ${jobType} positions`
    }
  },
  mounted() {
    // Watch for theme changes to update chart colors
    const observer = new MutationObserver(() => {
      this.updateChartColors()
    })
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    })
  },
  methods: {
    updateChartColors() {
      const isDarkMode = document.body.classList.contains('dark-mode')
      
      // Update chart options for dark mode
      this.chartOptions.plugins.legend.labels.color = isDarkMode ? '#f0f0f0' : '#333'
      this.barChartOptions.scales.y.ticks.color = isDarkMode ? '#f0f0f0' : '#333'
      this.barChartOptions.scales.x.ticks.color = isDarkMode ? '#f0f0f0' : '#333'
      this.barChartOptions.scales.y.grid.color = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      this.barChartOptions.scales.x.grid.color = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      this.scoreChartOptions.scales.y.ticks.color = isDarkMode ? '#f0f0f0' : '#333'
      this.scoreChartOptions.scales.x.ticks.color = isDarkMode ? '#f0f0f0' : '#333'
      this.scoreChartOptions.scales.y.grid.color = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      this.scoreChartOptions.scales.x.grid.color = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    },
    exportReport() {
      // Create a simple report
      const report = `Analytics Report
\nTotal Recommended Jobs: ${this.totalJobs}
Saved Jobs: ${this.savedJobsCount}
Highest Match Score: ${this.topMatchScore}%
Average Match Score: ${this.avgMatchScore}%
Unique Skills: ${this.uniqueSkillsCount}
Unique Locations: ${this.uniqueLocationsCount}
\nTop Matching Skills: ${this.topMatchingSkills.join(', ')}
Top Locations: ${this.topLocations.join(', ')}
\nGenerated on: ${new Date().toLocaleString()}`
      
      // Create download link
      const blob = new Blob([report], { type: 'text/plain;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', 'analytics-report.txt')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    refreshData() {
      // In a real app, this would fetch new data
      // For now, we'll just show a message
      alert('Data refreshed!')
    },
    toggleSkillsChart() {
      this.showSkillsChart = !this.showSkillsChart
    },
    toggleLocationChart() {
      this.showLocationChart = !this.showLocationChart
    },
    toggleJobTypeChart() {
      this.showJobTypeChart = !this.showJobTypeChart
    },
    toggleScoreChart() {
      this.showScoreChart = !this.showScoreChart
    },
    toggleExperienceChart() {
      this.showExperienceChart = !this.showExperienceChart
    }
  }
}
</script>

<style scoped>
.analytics-dashboard {
  padding: 20px 0;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

body.dark-mode .dashboard-header {
  background: #2c2c2c;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
}

.header-content h2 {
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-size: 2rem;
}

body.dark-mode .header-content h2 {
  color: #ecf0f1;
}

.header-subtitle {
  color: #7f8c8d;
  margin: 0;
  font-size: 1.1rem;
}

body.dark-mode .header-subtitle {
  color: #bdc3c7;
}

.header-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.export-btn, .refresh-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
}

.export-btn {
  background: linear-gradient(135deg, #27ae60, #219653);
  color: white;
}

.refresh-btn {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.export-btn:hover, .refresh-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(52, 152, 219, 0.4);
}

body.dark-mode .export-btn, body.dark-mode .refresh-btn {
  background: linear-gradient(135deg, #2c3e50, #3498db);
}

body.dark-mode .export-btn:hover, body.dark-mode .refresh-btn:hover {
  background: linear-gradient(135deg, #34495e, #2980b9);
}

.dashboard-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

body.dark-mode .dashboard-filters {
  background: #2c2c2c;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-weight: 500;
  color: #34495e;
}

body.dark-mode .filter-group label {
  color: #ecf0f1;
}

.filter-select {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  min-width: 150px;
  transition: all 0.3s;
}

.filter-select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

body.dark-mode .filter-select {
  background: #3c3c3c;
  border: 1px solid #555;
  color: #f0f0f0;
}

.stats-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
}

body.dark-mode .stat-card {
  background: #2c2c2c;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.stat-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 50%;
}

body.dark-mode .stat-icon {
  background: #333;
}

.stat-content h3 {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 5px;
}

.stat-content p {
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
}

body.dark-mode .stat-content h3 {
  color: #6ab7e4;
}

body.dark-mode .stat-content p {
  color: #bdc3c7;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.chart-wrapper {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  height: auto;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

body.dark-mode .chart-wrapper {
  background: #2c2c2c;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

body.dark-mode .chart-header {
  border-bottom: 1px solid #444;
}

.chart-header h3 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.3rem;
}

body.dark-mode .chart-header h3 {
  color: #ecf0f1;
}

.chart-actions {
  display: flex;
  gap: 10px;
}

.chart-toggle {
  padding: 6px 12px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.chart-toggle:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

body.dark-mode .chart-toggle {
  background: #2980b9;
}

body.dark-mode .chart-toggle:hover {
  background: #3498db;
}

.chart-content {
  flex: 1;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-content canvas {
  max-height: 300px;
  width: 100% !important;
}

.insights-section {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

body.dark-mode .insights-section {
  background: #2c2c2c;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.insights-section h3 {
  color: #2c3e50;
  margin: 0 0 20px 0;
  font-size: 1.5rem;
}

body.dark-mode .insights-section h3 {
  color: #ecf0f1;
}

.insights-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.insight-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
}

body.dark-mode .insight-card {
  background: #333;
}

.insight-card h4 {
  color: #3498db;
  margin: 0 0 10px 0;
}

body.dark-mode .insight-card h4 {
  color: #6ab7e4;
}

.insight-card p {
  color: #555;
  margin: 0;
  line-height: 1.6;
}

body.dark-mode .insight-card p {
  color: #ddd;
}

@media (max-width: 768px) {
  .stats-summary {
    grid-template-columns: 1fr 1fr;
  }
  
  .charts-container {
    grid-template-columns: 1fr;
  }
  
  .chart-wrapper {
    padding: 15px;
    min-height: 350px;
  }
  
  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-actions {
    flex-direction: column;
  }
  
  .dashboard-filters {
    flex-direction: column;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .filter-select {
    width: 100%;
  }
  
  .insights-content {
    grid-template-columns: 1fr;
  }
}
</style>