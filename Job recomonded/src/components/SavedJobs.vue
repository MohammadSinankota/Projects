<template>
  <div class="saved-jobs">
    <div class="header-section">
      <div class="header-content">
        <h2>Saved Jobs</h2>
        <p class="header-subtitle">Your personalized collection of job opportunities</p>
      </div>
      <div class="header-actions">
        <button @click="exportToCSV" class="export-btn" :disabled="savedJobs.length === 0">
          📥 Export to CSV
        </button>
        <button @click="clearAllJobs" class="clear-btn" :disabled="savedJobs.length === 0">
          🗑 Clear All
        </button>
      </div>
    </div>
    
    <div class="stats-summary">
      <div class="stat-card">
        <h3>{{ savedJobs.length }}</h3>
        <p>Total Saved Jobs</p>
      </div>
      
      <div class="stat-card">
        <h3>{{ uniqueCompanies }}</h3>
        <p>Unique Companies</p>
      </div>
      
      <div class="stat-card">
        <h3>{{ remoteJobsCount }}</h3>
        <p>Remote Opportunities</p>
      </div>
      
      <div class="stat-card">
        <h3>{{ avgMatchScore }}%</h3>
        <p>Avg Match Score</p>
      </div>
    </div>
    
    <div v-if="savedJobs.length === 0" class="no-saved-jobs">
      <div class="no-saved-content">
        <h3>No Saved Jobs Yet</h3>
        <p>You haven't saved any jobs yet. Go to the Recommendations tab to find and save jobs!</p>
        <button @click="goToRecommendations" class="recommendations-btn">Find Jobs</button>
      </div>
    </div>
    
    <div v-else>
      <div class="search-filters">
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            placeholder="Search saved jobs by title, company, or skills..." 
            class="search-input"
          >
          <span class="search-icon">🔍</span>
        </div>
        
        <div class="filters">
          <select v-model="selectedCompany" class="filter-select">
            <option value="">All Companies</option>
            <option v-for="company in allCompanies" :key="company" :value="company">
              {{ company }}
            </option>
          </select>
          
          <select v-model="sortBy" class="filter-select">
            <option value="">Sort By</option>
            <option value="saved">Date Saved</option>
            <option value="match">Match Score</option>
            <option value="title">Job Title</option>
            <option value="company">Company</option>
          </select>
        </div>
      </div>
      
      <div class="results-info">
        <p>Showing {{ filteredJobs.length }} of {{ savedJobs.length }} saved jobs</p>
      </div>
      
      <div class="jobs-grid">
        <div 
          v-for="job in sortedJobs" 
          :key="job.id" 
          class="job-card"
        >
          <div class="job-header">
            <div class="job-title-section">
              <h3>{{ job.title }}</h3>
              <div class="job-tags">
                <span class="job-tag job-type-tag">{{ job.jobType }}</span>
                <span v-if="job.isRemote" class="job-tag remote-tag">Remote</span>
              </div>
            </div>
            <button 
              @click="$emit('remove-job', job.id)" 
              class="remove-btn"
              title="Remove from saved jobs"
            >
              ✕ Remove
            </button>
          </div>
          
          <div class="job-details">
            <div class="company-info">
              <span class="company-icon">🏢</span>
              <p class="company">{{ job.company }}</p>
            </div>
            <div class="location-info">
              <span class="location-icon">📍</span>
              <p class="location">{{ job.location }}</p>
            </div>
            <div class="experience-info">
              <span class="experience-icon">📅</span>
              <p class="experience">{{ job.experience || 'Not specified' }}</p>
            </div>
          </div>
          
          <div class="job-skills">
            <h4>Required Skills:</h4>
            <div class="skills-container">
              <span 
                v-for="skill in job.skills" 
                :key="skill" 
                class="skill-badge"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          
          <div class="job-description-container">
            <h4>Job Description:</h4>
            <p class="job-description">{{ truncatedDescription(job.description) }}</p>
          </div>
          
          <div class="job-footer">
            <div class="ranking-score">
              <span class="score-label">AI Match:</span>
              <span class="score-value" :class="getScoreClass(job.rankingScore)">
                {{ job.rankingScore }}%
              </span>
            </div>
            <button 
              @click="viewJobDetails(job)" 
              class="view-details-btn"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      
      <div class="pagination" v-if="totalPages > 1">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          Previous
        </button>
        
        <div class="page-numbers">
          <button 
            v-for="page in visiblePages" 
            :key="page" 
            @click="currentPage = page" 
            :class="['page-btn', { active: page === currentPage }]"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
    
    <!-- Job Details Modal -->
    <div v-if="selectedJob" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedJob.title }}</h2>
          <button class="close-modal" @click="closeModal">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-job-details">
            <div class="modal-company">{{ selectedJob.company }}</div>
            <div class="modal-location">📍 {{ selectedJob.location }}</div>
            <div class="modal-job-type">{{ selectedJob.jobType }}</div>
          </div>
          <div class="modal-section">
            <h3>Job Description</h3>
            <p>{{ selectedJob.description }}</p>
          </div>
          <div class="modal-section">
            <h3>Required Skills</h3>
            <div class="modal-skills">
              <span 
                v-for="skill in selectedJob.skills" 
                :key="skill" 
                class="modal-skill-badge"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          <div class="modal-section">
            <h3>AI Match Score</h3>
            <div class="modal-score">
              <span class="modal-score-value" :class="getScoreClass(selectedJob.rankingScore)">
                {{ selectedJob.rankingScore }}%
              </span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button 
            @click="$emit('remove-job', selectedJob.id); closeModal()" 
            class="modal-remove-btn"
          >
            Remove Job
          </button>
          <button class="modal-apply-btn">Apply Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SavedJobs',
  props: {
    savedJobs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchQuery: '',
      selectedCompany: '',
      sortBy: '',
      currentPage: 1,
      jobsPerPage: 6,
      selectedJob: null
    }
  },
  computed: {
    filteredJobs() {
      return this.savedJobs.filter(job => {
        const matchesSearch = 
          job.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          job.skills.some(skill => skill.toLowerCase().includes(this.searchQuery.toLowerCase()))
        
        const matchesCompany = this.selectedCompany 
          ? job.company === this.selectedCompany 
          : true
          
        return matchesSearch && matchesCompany
      })
    },
    sortedJobs() {
      const startIndex = (this.currentPage - 1) * this.jobsPerPage
      const endIndex = startIndex + this.jobsPerPage
      
      let sorted = [...this.filteredJobs]
      
      if (this.sortBy === 'saved') {
        // Assuming jobs are already in saved order
        sorted = sorted.slice().reverse()
      } else if (this.sortBy === 'match') {
        sorted.sort((a, b) => b.rankingScore - a.rankingScore)
      } else if (this.sortBy === 'title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title))
      } else if (this.sortBy === 'company') {
        sorted.sort((a, b) => a.company.localeCompare(b.company))
      }
      
      return sorted.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.filteredJobs.length / this.jobsPerPage)
    },
    visiblePages() {
      const pages = []
      const maxVisible = 5
      
      if (this.totalPages <= maxVisible) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i)
        }
      } else {
        if (this.currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(this.totalPages)
        } else if (this.currentPage >= this.totalPages - 2) {
          pages.push(1)
          pages.push('...')
          for (let i = this.totalPages - 3; i <= this.totalPages; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push('...')
          for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(this.totalPages)
        }
      }
      
      return pages
    },
    uniqueCompanies() {
      const companies = new Set(this.savedJobs.map(job => job.company))
      return companies.size
    },
    remoteJobsCount() {
      return this.savedJobs.filter(job => job.jobType.toLowerCase().includes('remote')).length
    },
    avgMatchScore() {
      if (this.savedJobs.length === 0) return 0
      const total = this.savedJobs.reduce((sum, job) => sum + job.rankingScore, 0)
      return Math.round(total / this.savedJobs.length)
    },
    allCompanies() {
      const companies = new Set()
      this.savedJobs.forEach(job => {
        companies.add(job.company)
      })
      return Array.from(companies).sort()
    }
  },
  methods: {
    getScoreClass(score) {
      if (score >= 90) return 'excellent'
      if (score >= 75) return 'good'
      if (score >= 60) return 'average'
      return 'poor'
    },
    truncatedDescription(description) {
      if (description.length > 200) {
        return description.substring(0, 200) + '...'
      }
      return description
    },
    exportToCSV() {
      // Create CSV content
      let csvContent = "Title,Company,Location,Job Type,Skills,Description,Match Score\n"
      
      this.savedJobs.forEach(job => {
        const skills = `"${job.skills.join(', ')}"`
        const description = `"${job.description.replace(/"/g, '"')}"`
        
        csvContent += `"${job.title}","${job.company}","${job.location}","${job.jobType}",${skills},${description},${job.rankingScore}\n`
      })
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', 'saved-jobs.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    clearAllJobs() {
      if (confirm('Are you sure you want to remove all saved jobs?')) {
        // Emit event for each job to remove them all
        this.savedJobs.forEach(job => {
          this.$emit('remove-job', job.id)
        })
      }
    },
    goToRecommendations() {
      // This would typically be handled by the parent component
      this.$emit('navigate-to-recommendations')
    },
    viewJobDetails(job) {
      this.selectedJob = job
    },
    closeModal() {
      this.selectedJob = null
    }
  }
}
</script>

<style scoped>
.saved-jobs {
  padding: 20px 0;
  max-width: 1400px;
  margin: 0 auto;
}

.header-section {
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

body.dark-mode .header-section {
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



.export-btn, .clear-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 10px rgba(39, 174, 96, 0.3);
}

.export-btn {
  background: linear-gradient(135deg, #27ae60, #219653);
  color: white;
}

.clear-btn {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  box-shadow: 0 4px 10px rgba(231, 76, 60, 0.3);
}

.export-btn:hover:not(:disabled), .clear-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(39, 174, 96, 0.4);
}

.clear-btn:hover:not(:disabled) {
  box-shadow: 0 6px 15px rgba(231, 76, 60, 0.4);
}

.export-btn:disabled, .clear-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

body.dark-mode .export-btn, body.dark-mode .clear-btn {
  background: linear-gradient(135deg, #2c3e50, #3498db);
}

body.dark-mode .export-btn:hover:not(:disabled), body.dark-mode .clear-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #34495e, #2980b9);
}

.stats-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

body.dark-mode .stat-card {
  background: #2c2c2c;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.stat-card h3 {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 10px;
}

.stat-card p {
  color: #7f8c8d;
  margin: 0;
}

body.dark-mode .stat-card p {
  color: #bdc3c7;
}

.search-filters {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

body.dark-mode .search-filters {
  background: #2c2c2c;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
}

.search-box {
  width: 100%;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
}

.search-input {
  width: 100%;
  padding: 14px 15px 14px 45px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

body.dark-mode .search-input {
  background: #3c3c3c;
  border: 1px solid #555;
  color: #f0f0f0;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
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

.results-info {
  text-align: center;
  margin-bottom: 20px;
  color: #7f8c8d;
  font-weight: 500;
}

body.dark-mode .results-info {
  color: #bdc3c7;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.job-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 25px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  position: relative;
  overflow: hidden;
  border: 1px solid #eee;
}

.job-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  border-color: #3498db;
}

body.dark-mode .job-card {
  background: #2c2c2c;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid #444;
}

body.dark-mode .job-card:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  border-color: #3498db;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

body.dark-mode .job-header {
  border-bottom: 1px solid #444;
}

.job-title-section {
  flex: 1;
}

.job-header h3 {
  color: #2c3e50;
  margin: 0 0 10px 0;
  font-size: 1.4rem;
  line-height: 1.3;
}

body.dark-mode .job-header h3 {
  color: #ecf0f1;
}

.job-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.job-tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.job-type-tag {
  background: #e1f0fa;
  color: #3498db;
}

.remote-tag {
  background: #e8f4f8;
  color: #27ae60;
}

body.dark-mode .job-type-tag {
  background: #1e3a5f;
  color: #6ab7e4;
}

body.dark-mode .remote-tag {
  background: #1e443a;
  color: #64d6a3;
}

.remove-btn {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 15px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.remove-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
}

.job-details {
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.company-info, .location-info, .experience-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.company-icon, .location-icon, .experience-icon {
  font-size: 1.2rem;
}

.company {
  font-weight: 600;
  color: #3498db;
  margin: 0;
  font-size: 1.1rem;
}

.location, .experience {
  color: #7f8c8d;
  margin: 0;
}

body.dark-mode .company {
  color: #6ab7e4;
}

body.dark-mode .location, body.dark-mode .experience {
  color: #bdc3c7;
}

.job-skills {
  margin-bottom: 20px;
}

.job-skills h4 {
  color: #2c3e50;
  margin: 0 0 12px 0;
  font-size: 1rem;
}

body.dark-mode .job-skills h4 {
  color: #ecf0f1;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-badge {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s;
}

.skill-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

body.dark-mode .skill-badge {
  background: linear-gradient(135deg, #2980b9, #3498db);
}

.job-description-container {
  margin-bottom: 20px;
}

.job-description-container h4 {
  color: #2c3e50;
  margin: 0 0 12px 0;
  font-size: 1rem;
}

body.dark-mode .job-description-container h4 {
  color: #ecf0f1;
}

.job-description {
  color: #555;
  margin-bottom: 0;
  line-height: 1.6;
}

body.dark-mode .job-description {
  color: #ddd;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

body.dark-mode .job-footer {
  border-top: 1px solid #444;
}

.score-label {
  font-weight: 500;
  color: #7f8c8d;
  margin-right: 8px;
}

.score-value {
  font-weight: 700;
  font-size: 1.4rem;
}

.score-value.excellent {
  color: #27ae60;
}

.score-value.good {
  color: #3498db;
}

.score-value.average {
  color: #f39c12;
}

.score-value.poor {
  color: #e74c3c;
}

.view-details-btn {
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.view-details-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

body.dark-mode .view-details-btn {
  background: #2980b9;
}

body.dark-mode .view-details-btn:hover {
  background: #3498db;
}

.no-saved-jobs {
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
  grid-column: 1 / -1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

body.dark-mode .no-saved-jobs {
  background: #2c2c2c;
  color: #bdc3c7;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.no-saved-content h3 {
  color: #2c3e50;
  margin: 0 0 15px 0;
}

body.dark-mode .no-saved-content h3 {
  color: #ecf0f1;
}

.recommendations-btn {
  padding: 12px 25px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 20px;
}

.recommendations-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

body.dark-mode .pagination {
  background: #2c2c2c;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
}

.pagination-btn, .page-btn {
  padding: 10px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled), .page-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
  transform: none;
}

.page-btn {
  background-color: #eee;
  color: #333;
  min-width: 40px;
}

body.dark-mode .page-btn {
  background-color: #3c3c3c;
  color: #f0f0f0;
}

.page-btn.active {
  background-color: #3498db;
  color: white;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-info {
  font-weight: 500;
  color: #34495e;
  padding: 0 15px;
}

body.dark-mode .page-info {
  color: #ecf0f1;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

body.dark-mode .modal-content {
  background: #2c2c2c;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  border-bottom: 1px solid #eee;
}

body.dark-mode .modal-header {
  border-bottom: 1px solid #444;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.8rem;
}

body.dark-mode .modal-header h2 {
  color: #ecf0f1;
}

.close-modal {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.close-modal:hover {
  background: #eee;
  color: #e74c3c;
}

body.dark-mode .close-modal:hover {
  background: #3c3c3c;
}

.modal-body {
  padding: 0 25px;
  flex: 1;
}

.modal-job-details {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

body.dark-mode .modal-job-details {
  border-bottom: 1px solid #444;
}

.modal-company {
  font-size: 1.4rem;
  font-weight: 700;
  color: #3498db;
  flex: 1;
  min-width: 200px;
}

.modal-location {
  font-size: 1.1rem;
  color: #7f8c8d;
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal-job-type {
  background: #e1f0fa;
  color: #3498db;
  padding: 6px 15px;
  border-radius: 20px;
  font-weight: 600;
  align-self: flex-start;
}

body.dark-mode .modal-company {
  color: #6ab7e4;
}

body.dark-mode .modal-location {
  color: #bdc3c7;
}

body.dark-mode .modal-job-type {
  background: #1e3a5f;
  color: #6ab7e4;
}

.modal-section {
  margin-bottom: 30px;
}

.modal-section h3 {
  color: #2c3e50;
  margin: 0 0 15px 0;
  font-size: 1.3rem;
}

body.dark-mode .modal-section h3 {
  color: #ecf0f1;
}

.modal-section p {
  color: #555;
  line-height: 1.7;
  margin: 0;
}

body.dark-mode .modal-section p {
  color: #ddd;
}

.modal-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.modal-skill-badge {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

body.dark-mode .modal-skill-badge {
  background: linear-gradient(135deg, #2980b9, #3498db);
}

.modal-score {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
}

body.dark-mode .modal-score {
  background: #333;
}

.modal-score-value {
  font-size: 3rem;
  font-weight: 800;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 25px;
  border-top: 1px solid #eee;
}

body.dark-mode .modal-footer {
  border-top: 1px solid #444;
}

.modal-remove-btn, .modal-apply-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
}

.modal-remove-btn {
  background: #e74c3c;
  color: white;
}

.modal-remove-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
}

.modal-apply-btn {
  background: #3498db;
  color: white;
}

.modal-apply-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .jobs-grid {
    grid-template-columns: 1fr;
  }
  
  .header-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-actions {
    flex-direction: column;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .filter-select {
    width: 100%;
  }
  
  .job-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .job-details {
    gap: 15px;
  }
  
  .job-footer {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .modal-job-details {
    flex-direction: column;
    gap: 15px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .modal-remove-btn, .modal-apply-btn {
    width: 100%;
  }
  
  .stats-summary {
    grid-template-columns: 1fr 1fr;
  }
}
</style>