<template>
  <div class="user-profile">
    <div class="profile-header">
      <div class="avatar-section">
        <div class="avatar-container">
          <div class="avatar-preview" @click="triggerFileInput">
            <div class="avatar-placeholder" v-if="!avatarUrl">
              <span class="avatar-text">{{ initials }}</span>
            </div>
            <img v-else :src="avatarUrl" alt="Profile Avatar" class="avatar-image">
            <div class="avatar-overlay">
              <span class="edit-icon">✏️</span>
            </div>
          </div>
          <input 
            type="file" 
            ref="fileInput" 
            @change="handleFileUpload" 
            accept="image/*" 
            class="file-input"
          >
        </div>
        <div class="header-info">
          <h2>Professional Profile</h2>
          <p>Complete your profile to get personalized job recommendations</p>
        </div>
      </div>
    </div>
    
    <form @submit.prevent="saveProfile">
      <!-- Personal Information Section -->
      <div class="form-section">
        <h3>Personal Information</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="firstName">First Name:</label>
            <input 
              id="firstName" 
              v-model="localProfile.firstName" 
              placeholder="Enter your first name"
              required
            >
          </div>
          <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input 
              id="lastName" 
              v-model="localProfile.lastName" 
              placeholder="Enter your last name"
              required
            >
          </div>
          <div class="form-group full-width">
            <label for="email">Email:</label>
            <input 
              id="email" 
              v-model="localProfile.email" 
              type="email"
              placeholder="Enter your email address"
              required
            >
          </div>
          <div class="form-group full-width">
            <label for="phone">Phone Number:</label>
            <input 
              id="phone" 
              v-model="localProfile.phone" 
              type="tel"
              placeholder="Enter your phone number"
            >
          </div>
        </div>
      </div>
      
      <!-- Professional Summary Section -->
      <div class="form-section">
        <h3>Professional Summary</h3>
        <div class="form-group">
          <label for="summary">Professional Summary:</label>
          <textarea 
            id="summary" 
            v-model="localProfile.summary" 
            placeholder="Briefly describe your professional background, key achievements, and career goals..."
            rows="4"
          ></textarea>
        </div>
      </div>
      
      <!-- Skills & Expertise Section -->
      <div class="form-section">
        <h3>Skills & Expertise</h3>
        <div class="form-group">
          <label for="skills">Skills (comma separated):</label>
          <input 
            id="skills" 
            v-model="localProfile.skillsInput" 
            placeholder="e.g., JavaScript, Vue.js, CSS"
            @input="updateSkills"
          >
          <div class="skills-tags">
            <span 
              v-for="(skill, index) in localProfile.skills" 
              :key="index" 
              class="skill-tag"
            >
              {{ skill }}
              <button type="button" @click="removeSkill(index)" class="remove-skill">×</button>
            </span>
          </div>
          <div class="sample-skills">
            <span class="sample-label">Sample skills:</span>
            <button type="button" @click="addSampleSkill('JavaScript')">JavaScript</button>
            <button type="button" @click="addSampleSkill('Vue.js')">Vue.js</button>
            <button type="button" @click="addSampleSkill('React')">React</button>
            <button type="button" @click="addSampleSkill('Python')">Python</button>
            <button type="button" @click="addSampleSkill('Node.js')">Node.js</button>
          </div>
        </div>
      </div>
      
      <!-- Education & Certifications -->
      <div class="form-section">
        <h3>Education & Certifications</h3>
        <div class="form-group">
          <label for="education">Highest Education Level:</label>
          <select id="education" v-model="localProfile.education">
            <option value="">Select education level</option>
            <option value="High School">High School</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="certifications">Certifications (comma separated):</label>
          <input 
            id="certifications" 
            v-model="localProfile.certificationsInput" 
            placeholder="e.g., AWS Certified, PMP, CISSP"
            @input="updateCertifications"
          >
          <div class="skills-tags">
            <span 
              v-for="(cert, index) in localProfile.certifications" 
              :key="index" 
              class="skill-tag certification-tag"
            >
              {{ cert }}
              <button type="button" @click="removeCertification(index)" class="remove-skill">×</button>
            </span>
          </div>
        </div>
      </div>
      
      <!-- Experience Section -->
      <div class="form-section">
        <h3>Experience & Preferences</h3>
        <div class="form-group">
          <label for="experience">Years of Experience:</label>
          <select id="experience" v-model="localProfile.experience">
            <option value="">Select experience</option>
            <option value="0-1">0-1 years</option>
            <option value="2-3">2-3 years</option>
            <option value="4-5">4-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="locations">Preferred Locations (comma separated):</label>
          <input 
            id="locations" 
            v-model="localProfile.locationsInput" 
            placeholder="e.g., San Francisco, Remote"
            @input="updateLocations"
          >
          <div class="skills-tags">
            <span 
              v-for="(location, index) in localProfile.locations" 
              :key="index" 
              class="skill-tag"
            >
              {{ location }}
              <button type="button" @click="removeLocation(index)" class="remove-skill">×</button>
            </span>
          </div>
          <div class="sample-skills">
            <span class="sample-label">Sample locations:</span>
            <button type="button" @click="addSampleLocation('Remote')">Remote</button>
            <button type="button" @click="addSampleLocation('San Francisco')">San Francisco</button>
            <button type="button" @click="addSampleLocation('New York')">New York</button>
          </div>
        </div>
        
        <div class="form-group">
          <label>Job Type:</label>
          <div class="radio-group">
            <label>
              <input 
                type="radio" 
                v-model="localProfile.jobType" 
                value="Full-time"
              > Full-time
            </label>
            <label>
              <input 
                type="radio" 
                v-model="localProfile.jobType" 
                value="Part-time"
              > Part-time
            </label>
            <label>
              <input 
                type="radio" 
                v-model="localProfile.jobType" 
                value="Contract"
              > Contract
            </label>
            <label>
              <input 
                type="radio" 
                v-model="localProfile.jobType" 
                value="Remote"
              > Remote
            </label>
          </div>
        </div>
      </div>
      
      <button type="submit" class="save-btn">Save Profile & Get Recommendations</button>
    </form>
    
    <!-- Professional Preview -->
    <div class="profile-preview" v-if="isProfileComplete">
      <h3>Profile Preview</h3>
      <div class="preview-card">
        <div class="preview-header">
          <div class="preview-avatar-container">
            <div class="preview-avatar" v-if="!avatarUrl">{{ initials }}</div>
            <img v-else :src="avatarUrl" alt="Profile Avatar" class="preview-avatar-image">
          </div>
          <div class="preview-name">{{ fullName || 'Professional' }}</div>
          <div class="preview-title" v-if="primarySkill">{{ primarySkill }} Specialist</div>
        </div>
        <div class="preview-summary" v-if="localProfile.summary">
          <h4>Professional Summary</h4>
          <p>{{ localProfile.summary }}</p>
        </div>
        <div class="preview-contact" v-if="localProfile.email || localProfile.phone">
          <h4>Contact Information</h4>
          <div class="contact-info">
            <div v-if="localProfile.email" class="contact-item">
              <span class="contact-label">Email:</span>
              <span class="contact-value">{{ localProfile.email }}</span>
            </div>
            <div v-if="localProfile.phone" class="contact-item">
              <span class="contact-label">Phone:</span>
              <span class="contact-value">{{ localProfile.phone }}</span>
            </div>
          </div>
        </div>
        <div class="preview-skills" v-if="localProfile.skills.length > 0">
          <h4>Top Skills</h4>
          <div class="preview-tags">
            <span v-for="(skill, index) in localProfile.skills.slice(0, 5)" :key="index" class="preview-tag">
              {{ skill }}
            </span>
          </div>
        </div>
        <div class="preview-experience" v-if="localProfile.experience || localProfile.education">
          <h4>Background</h4>
          <div class="experience-info">
            <div v-if="localProfile.experience" class="experience-item">
              <span class="experience-label">Experience:</span>
              <span class="experience-value">{{ localProfile.experience }}</span>
            </div>
            <div v-if="localProfile.education" class="experience-item">
              <span class="experience-label">Education:</span>
              <span class="experience-value">{{ localProfile.education }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      localProfile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        summary: '',
        skillsInput: '',
        skills: [],
        education: '',
        certificationsInput: '',
        certifications: [],
        experience: '',
        locationsInput: '',
        locations: [],
        jobType: '',
        avatar: null
      },
      avatarUrl: ''
    }
  },
  computed: {
    initials() {
      const firstInitial = this.localProfile.firstName ? this.localProfile.firstName.charAt(0).toUpperCase() : '';
      const lastInitial = this.localProfile.lastName ? this.localProfile.lastName.charAt(0).toUpperCase() : '';
      return firstInitial + lastInitial || 'PR';
    },
    fullName() {
      return `${this.localProfile.firstName} ${this.localProfile.lastName}`.trim();
    },
    primarySkill() {
      return this.localProfile.skills.length > 0 ? this.localProfile.skills[0] : '';
    },
    isProfileComplete() {
      return this.localProfile.skills.length > 0 || 
             this.localProfile.summary || 
             this.localProfile.education || 
             this.localProfile.certifications.length > 0 ||
             this.localProfile.firstName || 
             this.localProfile.lastName;
    }
  },
  mounted() {
    this.loadProfile()
  },
  methods: {
    loadProfile() {
      const profile = localStorage.getItem('userProfile')
      if (profile) {
        const parsedProfile = JSON.parse(profile)
        this.localProfile = {
          ...parsedProfile,
          firstName: parsedProfile.firstName || '',
          lastName: parsedProfile.lastName || '',
          email: parsedProfile.email || '',
          phone: parsedProfile.phone || '',
          summary: parsedProfile.summary || '',
          skillsInput: parsedProfile.skills ? parsedProfile.skills.join(', ') : '',
          education: parsedProfile.education || '',
          certificationsInput: parsedProfile.certifications ? parsedProfile.certifications.join(', ') : '',
          certifications: parsedProfile.certifications || [],
          locationsInput: parsedProfile.locations ? parsedProfile.locations.join(', ') : '',
        }
        
        // Load avatar if exists
        const avatar = localStorage.getItem('userAvatar')
        if (avatar) {
          this.avatarUrl = avatar;
        }
      }
    },
    updateSkills() {
      this.localProfile.skills = this.localProfile.skillsInput
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)
    },
    removeSkill(index) {
      this.localProfile.skills.splice(index, 1)
      this.localProfile.skillsInput = this.localProfile.skills.join(', ')
    },
    addSampleSkill(skill) {
      if (!this.localProfile.skills.includes(skill)) {
        this.localProfile.skills.push(skill)
        this.localProfile.skillsInput = this.localProfile.skills.join(', ')
      }
    },
    updateCertifications() {
      this.localProfile.certifications = this.localProfile.certificationsInput
        .split(',')
        .map(cert => cert.trim())
        .filter(cert => cert.length > 0)
    },
    removeCertification(index) {
      this.localProfile.certifications.splice(index, 1)
      this.localProfile.certificationsInput = this.localProfile.certifications.join(', ')
    },
    updateLocations() {
      this.localProfile.locations = this.localProfile.locationsInput
        .split(',')
        .map(location => location.trim())
        .filter(location => location.length > 0)
    },
    removeLocation(index) {
      this.localProfile.locations.splice(index, 1)
      this.localProfile.locationsInput = this.localProfile.locations.join(', ')
    },
    addSampleLocation(location) {
      if (!this.localProfile.locations.includes(location)) {
        this.localProfile.locations.push(location)
        this.localProfile.locationsInput = this.localProfile.locations.join(', ')
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatarUrl = e.target.result;
          localStorage.setItem('userAvatar', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    saveProfile() {
      const profile = {
        firstName: this.localProfile.firstName,
        lastName: this.localProfile.lastName,
        email: this.localProfile.email,
        phone: this.localProfile.phone,
        summary: this.localProfile.summary,
        skills: this.localProfile.skills,
        education: this.localProfile.education,
        certifications: this.localProfile.certifications,
        experience: this.localProfile.experience,
        locations: this.localProfile.locations,
        jobType: this.localProfile.jobType
      }
      
      localStorage.setItem('userProfile', JSON.stringify(profile))
      this.$emit('profile-updated')
    }
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 900px;
  margin: 0 auto;
  padding: 25px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

body.dark-mode .user-profile {
  background: #2c2c2c;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.profile-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

body.dark-mode .profile-header {
  border-bottom: 1px solid #444;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar-container {
  position: relative;
  cursor: pointer;
}

.avatar-preview {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.avatar-preview:hover {
  transform: scale(1.05);
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  font-weight: bold;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-preview:hover .avatar-overlay {
  opacity: 1;
}

.edit-icon {
  color: white;
  font-size: 24px;
}

.file-input {
  display: none;
}

.header-info h2 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 28px;
}

body.dark-mode .header-info h2 {
  color: #ecf0f1;
}

.header-info p {
  margin: 0;
  color: #7f8c8d;
  font-size: 16px;
}

body.dark-mode .header-info p {
  color: #bdc3c7;
}

.form-section {
  margin-bottom: 30px;
}

.form-section h3 {
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  color: #2c3e50;
  border-bottom: 1px solid #eee;
}

body.dark-mode .form-section h3 {
  color: #ecf0f1;
  border-bottom: 1px solid #444;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #34495e;
}

body.dark-mode label {
  color: #bdc3c7;
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
  font-family: inherit;
}

body.dark-mode input, 
body.dark-mode select,
body.dark-mode textarea {
  background: #3c3c3c;
  border: 1px solid #555;
  color: #f0f0f0;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 5px;
}

.radio-group label {
  display: flex;
  align-items: center;
  font-weight: normal;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

body.dark-mode .radio-group label {
  background: #333;
}

.radio-group label:hover {
  background: #f0f7ff;
}

body.dark-mode .radio-group label:hover {
  background: #3a3a3a;
}

.radio-group input {
  width: auto;
  margin-right: 8px;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.skill-tag {
  display: flex;
  align-items: center;
  background: #3498db;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.skill-tag.certification-tag {
  background: #9b59b6;
}

body.dark-mode .skill-tag {
  background: #2980b9;
}

body.dark-mode .skill-tag.certification-tag {
  background: #8e44ad;
}

.remove-skill {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-left: 8px;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.remove-skill:hover {
  background: rgba(255, 255, 255, 0.2);
}

.sample-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
  align-items: center;
}

.sample-label {
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 500;
}

body.dark-mode .sample-label {
  color: #bdc3c7;
}

.sample-skills button {
  background: #eee;
  border: none;
  border-radius: 15px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.sample-skills button:hover {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

body.dark-mode .sample-skills button {
  background: #3c3c3c;
  color: #f0f0f0;
}

body.dark-mode .sample-skills button:hover {
  background: #2980b9;
}

.save-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
}

body.dark-mode .save-btn {
  background: linear-gradient(135deg, #2c3e50, #3498db);
}

body.dark-mode .save-btn:hover {
  box-shadow: 0 6px 20px rgba(44, 62, 80, 0.4);
}

/* Profile Preview */
.profile-preview {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

body.dark-mode .profile-preview {
  border-top: 1px solid #444;
}

.profile-preview h3 {
  margin: 0 0 20px 0;
  color: #2c3e50;
}

body.dark-mode .profile-preview h3 {
  color: #ecf0f1;
}

.preview-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

body.dark-mode .preview-card {
  background: #333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.preview-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.preview-avatar-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}

.preview-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.preview-name {
  font-size: 22px;
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
}

body.dark-mode .preview-name {
  color: #ecf0f1;
}

.preview-title {
  font-size: 16px;
  color: #7f8c8d;
  text-align: center;
}

body.dark-mode .preview-title {
  color: #bdc3c7;
}

.preview-summary h4, 
.preview-contact h4, 
.preview-skills h4, 
.preview-experience h4 {
  margin: 0 0 10px 0;
  color: #34495e;
  font-size: 18px;
}

body.dark-mode .preview-summary h4, 
body.dark-mode .preview-contact h4, 
body.dark-mode .preview-skills h4, 
body.dark-mode .preview-experience h4 {
  color: #bdc3c7;
}

.preview-summary p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

body.dark-mode .preview-summary p {
  color: #ddd;
}

.contact-info, .experience-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.contact-item, .experience-item {
  display: flex;
  gap: 10px;
}

.contact-label, .experience-label {
  font-weight: 500;
  color: #34495e;
  min-width: 60px;
}

body.dark-mode .contact-label, 
body.dark-mode .experience-label {
  color: #bdc3c7;
}

.contact-value, .experience-value {
  color: #555;
}

body.dark-mode .contact-value, 
body.dark-mode .experience-value {
  color: #ddd;
}

.preview-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.preview-tag {
  background: #3498db;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

body.dark-mode .preview-tag {
  background: #2980b9;
}

@media (max-width: 768px) {
  .user-profile {
    padding: 15px;
  }
  
  .avatar-section {
    flex-direction: column;
    text-align: center;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 10px;
  }
  
  .sample-skills {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .preview-header {
    flex-direction: column;
    text-align: center;
  }
}
</style>