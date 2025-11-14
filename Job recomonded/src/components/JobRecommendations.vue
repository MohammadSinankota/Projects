<template>
  <div class="job-recommendations">
    <div class="header-section">
      <div class="header-content">
        <h2>AI Job Recommendations</h2>
        <p class="header-subtitle">Personalized job matches based on your profile</p>
      </div>
      <div class="header-actions">
        <button @click="$emit('regenerate')" class="regenerate-btn">
          🔄 Regenerate Recommendations
        </button>
        <button @click="exportToCSV" class="export-btn" :disabled="filteredJobs.length === 0">
          📥 Export Results
        </button>
      </div>
    </div>
    
    <div class="search-filters">
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          placeholder="Search jobs by title, company, or skills..." 
          class="search-input"
        >
        <span class="search-icon">🔍</span>
      </div>
      
      <div class="filters">
        <select v-model="selectedSkill" class="filter-select">
          <option value="">All Skills</option>
          <option v-for="skill in allSkills" :key="skill" :value="skill">
            {{ skill }}
          </option>
        </select>
        
        <select v-model="selectedLocation" class="filter-select">
          <option value="">All Locations</option>
          <option v-for="location in allLocations" :key="location" :value="location">
            {{ location }}
          </option>
        </select>
        
        <select v-model="selectedJobType" class="filter-select">
          <option value="">All Job Types</option>
          <option v-for="type in jobTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
        
        <select v-model="sortBy" class="filter-select">
          <option value="">Sort By</option>
          <option value="match">Match Score</option>
          <option value="title">Job Title</option>
          <option value="company">Company</option>
        </select>
      </div>
    </div>
    
    <div class="results-info">
      <p>Showing {{ filteredJobs.length }} of {{ jobs.length }} jobs</p>
    </div>
    
    <div v-if="filteredJobs.length === 0" class="no-jobs">
      <div class="no-jobs-content">
        <h3>No Matching Jobs Found</h3>
        <p>No jobs match your current criteria. Try adjusting your filters or regenerate recommendations.</p>
        <button @click="$emit('regenerate')" class="retry-btn">🔄 Try Again</button>
      </div>
    </div>
    
    <div v-else>
      <div class="jobs-grid">
        <div 
          v-for="job in sortedJobs" 
          :key="job.id" 
          class="job-card"
        >
          <div class="job-card-header">
            <div class="job-company-logo">
              <span class="company-initials">{{ getCompanyInitials(job.company) }}</span>
            </div>
            <div class="job-header-content">
              <h3 class="job-title">{{ job.title }}</h3>
              <p class="job-company">{{ job.company }}</p>
              <div class="job-tags">
                <span class="job-tag job-type-tag">{{ job.jobType }}</span>
                <span v-if="isRemoteJob(job.location)" class="job-tag remote-tag">Remote</span>
              </div>
            </div>
            <button 
              @click="$emit('save-job', job)" 
              class="save-btn"
              :class="{ saved: isJobSaved(job.id) }"
              :title="isJobSaved(job.id) ? 'Remove from saved jobs' : 'Save this job'"
            >
              {{ isJobSaved(job.id) ? '★' : '☆' }}
            </button>
          </div>
          
          <div class="job-card-body">
            <div class="job-meta">
              <div class="meta-item">
                <span class="meta-icon">📍</span>
                <span class="meta-text">{{ job.location }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">📅</span>
                <span class="meta-text">{{ job.experience || 'Not specified' }}</span>
              </div>
            </div>
            
            <div class="job-description">
              <p>{{ truncatedDescription(job.description) }}</p>
            </div>
            
            <div class="job-skills">
              <h4>Required Skills:</h4>
              <div class="skills-container">
                <span 
                  v-for="skill in job.skills.slice(0, 9)" 
                  :key="skill" 
                  class="skill-badge"
                >
                  {{ skill }}
                </span>
                <span v-if="job.skills.length > 9" class="skill-badge more-skills">
                  +{{ job.skills.length - 9 }} more
                </span>
              </div>
            </div>
          </div>
          
          <div class="job-card-footer">
            <div class="match-score">
              <div class="score-label">AI Match</div>
              <div class="score-value" :class="getScoreClass(job.rankingScore)">
                {{ job.rankingScore }}%
              </div>
            </div>
            <div class="job-actions">
              <button 
                @click="viewJobDetails(job)" 
                class="action-btn view-details-btn"
              >
                View Details
              </button>
              <button 
                @click="$emit('save-job', job)" 
                class="action-btn apply-btn"
                :class="{ saved: isJobSaved(job.id) }"
              >
                {{ isJobSaved(job.id) ? 'Saved' : 'Save Job' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pagination">
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
            @click="$emit('save-job', selectedJob); closeModal()" 
            class="modal-save-btn"
            :class="{ saved: isJobSaved(selectedJob.id) }"
          >
            {{ isJobSaved(selectedJob.id) ? '★ Saved' : '☆ Save Job' }}
          </button>
          <button class="modal-apply-btn">Apply Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobRecommendations',
  props: {
    jobs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchQuery: '',
      selectedSkill: '',
      selectedLocation: '',
      selectedJobType: '',
      sortBy: '',
      currentPage: 1,
      jobsPerPage: 6,
      savedJobs: [],
      selectedJob: null
    }
  },
  computed: {
    filteredJobs() {
      return this.jobs.filter(job => {
        const matchesSearch = 
          job.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          job.skills.some(skill => skill.toLowerCase().includes(this.searchQuery.toLowerCase()))
        
        const matchesSkill = this.selectedSkill 
          ? job.skills.includes(this.selectedSkill) 
          : true
          
        const matchesLocation = this.selectedLocation 
          ? job.location.includes(this.selectedLocation) 
          : true
          
        const matchesJobType = this.selectedJobType 
          ? job.jobType === this.selectedJobType 
          : true
          
        return matchesSearch && matchesSkill && matchesLocation && matchesJobType
      })
    },
    sortedJobs() {
      const startIndex = (this.currentPage - 1) * this.jobsPerPage
      const endIndex = startIndex + this.jobsPerPage
      
      let sorted = [...this.filteredJobs]
      
      if (this.sortBy === 'match') {
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
    allSkills() {
      const skills = new Set()
      this.jobs.forEach(job => {
        job.skills.forEach(skill => skills.add(skill))
      })
      return Array.from(skills).sort()
    },
    allLocations() {
      const locations = new Set()
      this.jobs.forEach(job => {
        locations.add(job.location)
      })
      return Array.from(locations).sort()
    },
    jobTypes() {
      const types = new Set()
      this.jobs.forEach(job => {
        types.add(job.jobType)
      })
      return Array.from(types).sort()
    }
  },
  mounted() {
    this.loadSavedJobs()
  },
  watch: {
    jobs: {
      handler() {
        // Reset to first page when jobs change
        this.currentPage = 1
      },
      deep: true
    }
  },
  methods: {
    loadSavedJobs() {
      const saved = localStorage.getItem('savedJobs')
      if (saved) {
        this.savedJobs = JSON.parse(saved)
      }
    },
    isJobSaved(jobId) {
      return this.savedJobs.some(job => job.id === jobId)
    },
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
    getCompanyInitials(companyName) {
      if (!companyName) return 'CO';
      const words = companyName.split(' ');
      if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
      } else {
        return words[0][0] + words[words.length - 1][0];
      }
    },
    isRemoteJob(location) {
      if (!location) return false;
      const remoteKeywords = ['remote', 'work from home', 'wfh', 'anywhere'];
      return remoteKeywords.some(keyword => 
        location.toLowerCase().includes(keyword)
      );
    },
    exportToCSV() {
      // Create CSV content
      let csvContent = "Title,Company,Location,Job Type,Skills,Description,Match Score\n"
      
      this.filteredJobs.forEach(job => {
        const skills = `"${job.skills.join(', ')}"`
        const description = `"${job.description.replace(/"/g, '"')}"`
        
        csvContent += `"${job.title}","${job.company}","${job.location}","${job.jobType}",${skills},${description},${job.rankingScore}\n`
      })
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', 'job-recommendations.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
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
.job-recommendations {
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



.regenerate-btn {
  padding: 12px 20px;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
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

.regenerate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(52, 152, 219, 0.4);
  background: linear-gradient(135deg, #2980b9, #1a2530);
}

.export-btn {
  padding: 12px 20px;
  background: linear-gradient(135deg, #27ae60, #219653);
  color: white;
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

.export-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(39, 174, 96, 0.4);
  background: linear-gradient(135deg, #219653, #1e8449);
}

.export-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

body.dark-mode .regenerate-btn {
  background: linear-gradient(135deg, #2c3e50, #3498db);
}

body.dark-mode .regenerate-btn:hover {
  background: linear-gradient(135deg, #34495e, #2980b9);
}

body.dark-mode .export-btn {
  background: linear-gradient(135deg, #2c3e50, #27ae60);
}

body.dark-mode .export-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #34495e, #219653);
}

.search-filters {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
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
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  position: relative;
  overflow: hidden;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  height: 100%;
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

.job-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

body.dark-mode .job-card-header {
  border-bottom: 1px solid #444;
}

.job-company-logo {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.company-initials {
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.job-header-content {
  flex: 1;
  margin: 0 15px;
}

.job-title {
  color: #2c3e50;
  margin: 0 0 5px 0;
  font-size: 1.3rem;
  line-height: 1.3;
}

body.dark-mode .job-title {
  color: #ecf0f1;
}

.job-company {
  color: #3498db;
  margin: 0 0 10px 0;
  font-weight: 600;
}

body.dark-mode .job-company {
  color: #6ab7e4;
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

.save-btn {
  background: none;
  border: none;
  color: #7f8c8d;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.save-btn:hover {
  color: #f39c12;
  background: rgba(243, 156, 18, 0.1);
}

.save-btn.saved {
  color: #f39c12;
  background: rgba(243, 156, 18, 0.1);
}

.job-card-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.job-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-icon {
  font-size: 1.2rem;
}

.meta-text {
  color: #7f8c8d;
}

body.dark-mode .meta-text {
  color: #bdc3c7;
}

.job-description p {
  color: #555;
  margin: 0;
  line-height: 1.6;
}

body.dark-mode .job-description p {
  color: #ddd;
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

.skill-badge.more-skills {
  background: #95a5a6;
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

.job-description {
  color: #555;
  margin-bottom: 0;
  line-height: 1.5;
}

body.dark-mode .job-description {
  color: #bdc3c7;
}

.job-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #eee;
  background: #f8f9fa;
}

body.dark-mode .job-card-footer {
  border-top: 1px solid #444;
  background: #333;
}

.match-score {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-label {
  font-weight: 500;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

body.dark-mode .score-label {
  color: #bdc3c7;
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

.job-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.view-details-btn {
  background: #3498db;
  color: white;
}

.view-details-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.apply-btn {
  background: #f1c40f;
  color: #2c3e50;
}

.apply-btn:hover {
  background: #f39c12;
  transform: translateY(-2px);
}

.apply-btn.saved {
  background: #27ae60;
  color: white;
}

body.dark-mode .view-details-btn {
  background: #2980b9;
}

body.dark-mode .view-details-btn:hover {
  background: #3498db;
}

.no-jobs {
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
  grid-column: 1 / -1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

body.dark-mode .no-jobs {
  background: #2c2c2c;
  color: #bdc3c7;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.no-jobs-content h3 {
  color: #2c3e50;
  margin: 0 0 15px 0;
}

body.dark-mode .no-jobs-content h3 {
  color: #ecf0f1;
}

.retry-btn {
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

.retry-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
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

.modal-save-btn, .modal-apply-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
}

.modal-save-btn {
  background: #f1c40f;
  color: #2c3e50;
}

.modal-save-btn:hover {
  background: #f39c12;
  transform: translateY(-2px);
}

.modal-save-btn.saved {
  background: #27ae60;
  color: white;
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
  
  .job-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .job-meta {
    gap: 15px;
  }
  
  .job-card-footer {
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
  
  .modal-save-btn, .modal-apply-btn {
    width: 100%;
  }
}
</style>