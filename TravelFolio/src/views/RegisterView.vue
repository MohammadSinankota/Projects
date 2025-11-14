<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-subtitle">Join our travel community today</p>
      </div>
      
      <form class="auth-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name" class="form-label">Full Name</label>
          <input 
            type="text" 
            id="name" 
            v-model="registerForm.name" 
            placeholder="Enter your full name" 
            required
            class="form-input"
          >
        </div>
        
        <div class="form-group">
          <label for="email" class="form-label">Email Address</label>
          <input 
            type="email" 
            id="email" 
            v-model="registerForm.email" 
            placeholder="Enter your email" 
            required
            class="form-input"
          >
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="registerForm.password" 
              placeholder="Create a password" 
              required
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label for="confirm-password" class="form-label">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              v-model="registerForm.confirmPassword" 
              placeholder="Confirm your password" 
              required
              class="form-input"
            >
          </div>
        </div>
        
        <div class="form-options">
          <div class="terms">
            <input type="checkbox" id="terms" v-model="registerForm.agreeToTerms" required class="form-checkbox">
            <label for="terms" class="terms-label">I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a></label>
          </div>
        </div>
        
        <Button type="submit" variant="primary" block size="large" :disabled="loading">
          <span v-if="loading">Creating Account...</span>
          <span v-else>Create Account</span>
        </Button>
      </form>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      
      <div v-if="firebaseConfigError" class="config-error-message">
        <p>{{ firebaseConfigError }}</p>
        <p>Please contact the administrator to configure Firebase properly.</p>
      </div>
      
      <div class="auth-footer">
        <p class="auth-text">Already have an account? <router-link to="/login" class="auth-link">Sign in</router-link></p>
        
        <div class="social-login" v-if="!firebaseConfigError">
          <p class="social-text">Or sign up with</p>
          <div class="social-icons">
            <button @click="handleGoogleSignUp" class="social-icon" :disabled="loading">
              <i class="fab fa-google"></i>
            </button>
            <button @click="handleFacebookSignUp" class="social-icon" :disabled="loading">
              <i class="fab fa-facebook-f"></i>
            </button>
            <button @click="handleTwitterSignUp" class="social-icon" :disabled="loading">
              <i class="fab fa-twitter"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { registerUser, signInWithGoogle, signInWithFacebook, signInWithTwitter } from '@/services/authService'

// Router instance
const router = useRouter()

// Reactive data for register form
const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

// Loading state
const loading = ref(false)

// Error message
const errorMessage = ref('')

// Success message
const successMessage = ref('')

// Firebase configuration error
const firebaseConfigError = ref('')

// Check Firebase configuration on component mount
onMounted(() => {
  // Firebase configuration check is handled within the auth service functions
  // If Firebase is not configured, the auth functions will return appropriate error messages
})

// Watch for password mismatch
watch(
  () => registerForm.value,
  (newVal) => {
    if (newVal.password && newVal.confirmPassword && newVal.password !== newVal.confirmPassword) {
      errorMessage.value = 'Passwords do not match.'
    } else if (errorMessage.value === 'Passwords do not match.') {
      errorMessage.value = ''
    }
  },
  { deep: true }
)

// Method to handle registration
const handleRegister = async () => {
  if (firebaseConfigError.value) {
    errorMessage.value = firebaseConfigError.value
    return
  }
  
  if (!registerForm.value.name || !registerForm.value.email || !registerForm.value.password) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }
  
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match.'
    return
  }
  
  if (!registerForm.value.agreeToTerms) {
    errorMessage.value = 'Please agree to the Terms of Service and Privacy Policy.'
    return
  }
  
  if (registerForm.value.password.length < 6) {
    errorMessage.value = 'Password should be at least 6 characters.'
    return
  }
  
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const result = await registerUser(
      registerForm.value.email, 
      registerForm.value.password, 
      registerForm.value.name
    )
    
    if (result.success) {
      // Registration successful
      // Redirect to dashboard
      router.push('/dashboard')
    } else {
      // Registration failed
      errorMessage.value = result.error || 'Registration failed. Please try again.'
    }
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred. Please try again.'
    console.error('Registration error:', error)
  } finally {
    loading.value = false
  }
}

// Method to handle Google sign-up
const handleGoogleSignUp = async () => {
  if (firebaseConfigError.value) {
    errorMessage.value = firebaseConfigError.value
    return
  }
  
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const result = await signInWithGoogle()
    
    if (result.success) {
      // Google sign-up successful
      router.push('/dashboard')
    } else {
      errorMessage.value = result.error
    }
  } catch (error) {
    errorMessage.value = 'Google sign-up failed. Please try again.'
    console.error('Google sign-up error:', error)
  } finally {
    loading.value = false
  }
}

// Method to handle Facebook sign-up
const handleFacebookSignUp = async () => {
  if (firebaseConfigError.value) {
    errorMessage.value = firebaseConfigError.value
    return
  }
  
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const result = await signInWithFacebook()
    
    if (result.success) {
      // Facebook sign-up successful
      router.push('/dashboard')
    } else {
      errorMessage.value = result.error
    }
  } catch (error) {
    errorMessage.value = 'Facebook sign-up failed. Please try again.'
    console.error('Facebook sign-up error:', error)
  } finally {
    loading.value = false
  }
}

// Method to handle Twitter sign-up
const handleTwitterSignUp = async () => {
  if (firebaseConfigError.value) {
    errorMessage.value = firebaseConfigError.value
    return
  }
  
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const result = await signInWithTwitter()
    
    if (result.success) {
      // Twitter sign-up successful
      router.push('/dashboard')
    } else {
      errorMessage.value = result.error
    }
  } catch (error) {
    errorMessage.value = 'Twitter sign-up failed. Please try again.'
    console.error('Twitter sign-up error:', error)
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.terms {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
}

.form-checkbox {
  width: 18px;
  height: 18px;
  accent-color: var(--primary-500);
  margin-top: 2px;
}

.checkbox-label,
.terms-label,
.auth-text {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.terms-label {
  line-height: var(--line-height-relaxed);
}

.forgot-password,
.terms-link,
.auth-link {
  color: var(--primary-500);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: var(--transition);
}

.forgot-password:hover,
.terms-link:hover,
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

.config-error-message {
  padding: var(--space-3);
  background-color: var(--warning-50);
  color: var(--warning-600);
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
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .terms {
    align-items: center;
  }
  
  .form-checkbox {
    margin-top: 0;
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