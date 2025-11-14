<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-form">
        <div class="login-header">
          <h1 class="login-title">Admin Panel</h1>
          <p class="login-subtitle">Sign in to access the administration dashboard</p>
        </div>
        
        <form @submit.prevent="login" class="login-form-content">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input 
              type="email" 
              id="email" 
              v-model="loginForm.email" 
              placeholder="Enter your admin email" 
              required
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="loginForm.password" 
              placeholder="Enter your password" 
              required
              class="form-input"
            >
          </div>
          
          <div class="form-options">
            <div class="remember-me">
              <input type="checkbox" id="remember" v-model="loginForm.remember" class="form-checkbox">
              <label for="remember" class="checkbox-label">Remember me</label>
            </div>
          </div>
          
          <Button type="submit" variant="primary" block>Sign In</Button>
        </form>
        
        <div class="login-footer">
          <router-link to="/" class="back-link">&larr; Back to Main Site</router-link>
        </div>
      </div>
      
      <div class="login-image">
        <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Travel" class="login-img">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

// Router instance
const router = useRouter()

// Reactive data for login form
const loginForm = ref({
  email: '',
  password: '',
  remember: false
})

// Method to handle login
const login = () => {
  if (loginForm.value.email && loginForm.value.password) {
    // In a real app, you would authenticate with a backend here
    alert(`Welcome to the Admin Panel!`)
    // Redirect to admin dashboard (not implemented in this demo)
    router.push('/')
  } else {
    alert('Please fill in all required fields.')
  }
}
</script>

<style scoped>
.admin-login {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8) 0;
  background: linear-gradient(135deg, var(--neutral-50) 0%, var(--neutral-100) 100%);
}

.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: var(--bg-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  max-width: 1000px;
  width: 100%;
}

.login-form {
  padding: var(--space-12);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-2);
  color: var(--primary-500);
  text-align: center;
}

.login-subtitle {
  color: var(--text-secondary);
  margin: 0 0 var(--space-8);
  line-height: var(--line-height-relaxed);
  text-align: center;
}

.login-form-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
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

.form-input {
  padding: var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-sm);
}

.remember-me {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.form-checkbox {
  width: 18px;
  height: 18px;
  accent-color: var(--primary-500);
}

.checkbox-label {
  color: var(--text-primary);
}

.login-footer {
  margin-top: var(--space-8);
  text-align: center;
}

.back-link {
  color: var(--primary-500);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: var(--transition);
}

.back-link:hover {
  color: var(--secondary-500);
  text-decoration: underline;
}

.login-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
}

.login-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 992px) {
  .login-container {
    grid-template-columns: 1fr;
  }
  
  .login-image {
    display: none;
  }
  
  .login-form {
    padding: var(--space-8);
  }
}

@media (max-width: 576px) {
  .admin-login {
    padding: var(--space-4) 0;
  }
  
  .login-form {
    padding: var(--space-6);
  }
  
  .login-title {
    font-size: var(--font-size-xl);
  }
  
  .form-options {
    flex-direction: column;
    gap: var(--space-3);
    align-items: flex-start;
  }
}
</style>