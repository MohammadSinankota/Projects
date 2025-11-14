<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <h1 class="auth-title">Welcome Back</h1>
        <p class="auth-subtitle">Sign in to your Travelfolio account</p>
      </div>
      
      <form class="auth-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email" class="form-label">Email Address</label>
          <input 
            type="email" 
            id="email" 
            v-model="loginForm.email" 
            placeholder="Enter your email" 
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
          <a href="#" @click.prevent="handlePasswordReset" class="forgot-password">Forgot password?</a>
        </div>
        
        <Button type="submit" variant="primary" block size="large" :disabled="loading">
          <span v-if="loading">Signing In...</span>
          <span v-else>Sign In</span>
        </Button>
      </form>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      
      <div class="auth-footer">
        <p class="auth-text">Don't have an account? <router-link to="/register" class="auth-link">Sign up</router-link></p>
        
        <div class="social-login">
          <p class="social-text">Or sign in with</p>
          <div class="social-icons">
            <button @click="handleGoogleSignIn" class="social-icon" :disabled="loading">
              <i class="fab fa-google"></i>
            </button>
            <button @click="handleFacebookSignIn" class="social-icon" :disabled="loading">
              <i class="fab fa-facebook-f"></i>
            </button>
            <button @click="handleTwitterSignIn" class="social-icon" :disabled="loading">
              <i class="fab fa-twitter"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { loginUser, resetPassword, signInWithGoogle, signInWithFacebook, signInWithTwitter } from '@/services/authService'

// Router instance
const router = useRouter()

// Reactive data for login form
const loginForm = ref({
  email: '',
  password: '',
  remember: false
})

// Loading state
const loading = ref(false)

// Error message
const errorMessage = ref('')

// Success message
const successMessage = ref('')

// Method to handle login
const handleLogin = async () => {
  if (!loginForm.value.email || !loginForm.value.password) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }
  
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const result = await loginUser(loginForm.value.email, loginForm.value.password)
    
    if (result.success) {
      // Login successful
      // Redirect to home page or dashboard
      router.push('/dashboard')
    } else {
      // Login failed
      errorMessage.value = result.error || 'Login failed. Please check your credentials.'
    }
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred. Please try again.'
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

// Method to handle password reset
const handlePasswordReset = async () => {
  if (!loginForm.value.email) {
    errorMessage.value = 'Please enter your email address first.'
    return
  }
  
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const result = await resetPassword(loginForm.value.email)
    
    if (result.success) {
      successMessage.value = result.message
    } else {
      errorMessage.value = result.error
    }
  } catch (error) {
    errorMessage.value = 'Failed to send password reset email. Please try again.'
    console.error('Password reset error:', error)
  } finally {
    loading.value = false
  }
}

// Method to handle Google sign-in
const handleGoogleSignIn = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const result = await signInWithGoogle()
    
    if (result.success) {
      // Google sign-in successful
      router.push('/dashboard')
    } else {
      errorMessage.value = result.error
    }
  } catch (error) {
    errorMessage.value = 'Google sign-in failed. Please try again.'
    console.error('Google sign-in error:', error)
  } finally {
    loading.value = false
  }
}

// Method to handle Facebook sign-in
const handleFacebookSignIn = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const result = await signInWithFacebook()
    
    if (result.success) {
      // Facebook sign-in successful
      router.push('/dashboard')
    } else {
      errorMessage.value = result.error
    }
  } catch (error) {
    errorMessage.value = 'Facebook sign-in failed. Please try again.'
    console.error('Facebook sign-in error:', error)
  } finally {
    loading.value = false
  }
}

// Method to handle Twitter sign-in
const handleTwitterSignIn = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const result = await signInWithTwitter()
    
    if (result.success) {
      // Twitter sign-in successful
      router.push('/dashboard')
    } else {
      errorMessage.value = result.error
    }
  } catch (error) {
    errorMessage.value = 'Twitter sign-in failed. Please try again.'
    console.error('Twitter sign-in error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: var(--space-6);
  background-color: var(--bg-secondary);
}

.auth-container {
  background-color: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  padding: var(--space-8);
  width: 100%;
  max-width: 450px;
}

.auth-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.auth-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.auth-subtitle {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
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

.checkbox-label,
.auth-text {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.forgot-password,
.auth-link {
  color: var(--primary-500);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: var(--transition);
}

.forgot-password:hover,
.auth-link:hover {
  color: var(--secondary-500);
  text-decoration: underline;
}

.error-message {
  padding: var(--space-3);
  background-color: var(--error-50);
  color: var(--error-600);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
  font-size: var(--font-size-sm);
}

.success-message {
  padding: var(--space-3);
  background-color: var(--success-50);
  color: var(--success-600);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
  font-size: var(--font-size-sm);
}

.auth-footer {
  text-align: center;
}

.auth-text {
  margin-bottom: var(--space-6);
}

.social-login {
  text-align: center;
}

.social-text {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: var(--radius-full);
  background-color: var(--primary-50);
  color: var(--primary-500);
  transition: var(--transition);
  text-decoration: none;
  font-size: var(--font-size-lg);
  border: none;
  cursor: pointer;
}

.social-icon:hover:not(:disabled) {
  background-color: var(--primary-500);
  color: var(--text-inverse);
  transform: translateY(-3px);
}

.social-icon:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .auth-container {
    padding: var(--space-6);
    margin: var(--space-4);
  }
  
  .auth-title {
    font-size: var(--font-size-2xl);
  }
  
  .form-options {
    flex-direction: column;
    gap: var(--space-3);
    align-items: flex-start;
  }
  
  .social-icon {
    width: 45px;
    height: 45px;
    font-size: var(--font-size-base);
  }
}

@media (max-width: 576px) {
  .auth-page {
    padding: var(--space-4);
  }
  
  .auth-container {
    padding: var(--space-6);
  }
  
  .social-icons {
    gap: var(--space-3);
  }
  
  .social-icon {
    width: 40px;
    height: 40px;
  }
}
</style>