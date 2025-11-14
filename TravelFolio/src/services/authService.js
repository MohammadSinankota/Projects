import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from './firebase'

// Mock functions for when Firebase is not configured
const mockAuth = {
  currentUser: null
}

const mockOnAuthStateChanged = (auth, callback) => {
  console.warn('Firebase not configured, using mock auth state')
  callback(null)
  return () => {}
}

// Use mock functions if Firebase is not configured
const safeAuth = auth || mockAuth
const safeOnAuthStateChanged = auth ? onAuthStateChanged : mockOnAuthStateChanged

// Register a new user with email and password
export const registerUser = async (email, password, displayName) => {
  try {
    // Check if Firebase is properly configured
    if (!isFirebaseConfigured() || !safeAuth) {
      console.warn('Firebase is not properly configured. Registration will not work.')
      return { success: false, error: 'Firebase is not properly configured. Registration is disabled.' }
    }
    
    const userCredential = await createUserWithEmailAndPassword(safeAuth, email, password)
    // Update the user's profile with their display name
    await updateProfile(userCredential.user, {
      displayName: displayName
    })
    return { success: true, user: userCredential.user }
  } catch (error) {
    console.error('Registration error:', error)
    let errorMessage = 'Registration failed. Please try again.'
    
    // Handle Firebase specific errors
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Please use a different email or try logging in.'
          break
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.'
          break
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.'
          break
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled.'
          break
        case 'auth/invalid-api-key':
          errorMessage = 'Firebase configuration error. Please contact the administrator.'
          break
        default:
          errorMessage = error.message || errorMessage
      }
    }
    
    return { success: false, error: errorMessage }
  }
}

// Login user with email and password
export const loginUser = async (email, password) => {
  try {
    // Check if Firebase is properly configured
    if (!isFirebaseConfigured() || !safeAuth) {
      console.warn('Firebase is not properly configured. Login will not work.')
      return { success: false, error: 'Firebase is not properly configured. Login is disabled.' }
    }
    
    const userCredential = await signInWithEmailAndPassword(safeAuth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    console.error('Login error:', error)
    let errorMessage = 'Login failed. Please check your credentials and try again.'
    
    // Handle Firebase specific errors
    if (error.code) {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.'
          break
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.'
          break
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email. Please check your email or register.'
          break
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed login attempts. Please try again later.'
          break
        case 'auth/invalid-api-key':
          errorMessage = 'Firebase configuration error. Please contact the administrator.'
          break
        default:
          errorMessage = error.message || errorMessage
      }
    }
    
    return { success: false, error: errorMessage }
  }
}

// Logout the current user
export const logoutUser = async () => {
  try {
    if (!safeAuth) {
      console.warn('Firebase is not properly configured. Logout will not work.')
      return { success: false, error: 'Firebase is not properly configured. Logout is disabled.' }
    }
    
    await signOut(safeAuth)
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return { success: false, error: error.message || 'Logout failed. Please try again.' }
  }
}

// Send password reset email
export const resetPassword = async (email) => {
  try {
    // Check if Firebase is properly configured
    if (!isFirebaseConfigured() || !safeAuth) {
      console.warn('Firebase is not properly configured. Password reset will not work.')
      return { success: false, error: 'Firebase is not properly configured. Password reset is disabled.' }
    }
    
    await sendPasswordResetEmail(safeAuth, email)
    return { success: true, message: 'Password reset email sent. Please check your inbox.' }
  } catch (error) {
    console.error('Password reset error:', error)
    let errorMessage = 'Failed to send password reset email. Please try again.'
    
    // Handle Firebase specific errors
    if (error.code) {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.'
          break
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.'
          break
        case 'auth/invalid-api-key':
          errorMessage = 'Firebase configuration error. Please contact the administrator.'
          break
        default:
          errorMessage = error.message || errorMessage
      }
    }
    
    return { success: false, error: errorMessage }
  }
}

// Google Sign-In
export const signInWithGoogle = async () => {
  try {
    if (!isFirebaseConfigured() || !safeAuth) {
      console.warn('Firebase is not properly configured. Google sign-in will not work.')
      return { success: false, error: 'Firebase is not properly configured. Google sign-in is disabled.' }
    }
    
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(safeAuth, provider)
    return { success: true, user: result.user }
  } catch (error) {
    console.error('Google sign-in error:', error)
    let errorMessage = 'Google sign-in failed. Please try again.'
    
    // Handle Firebase specific errors
    if (error.code) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in popup was closed. Please try again.'
          break
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-in request was cancelled. Please try again.'
          break
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection and try again.'
          break
        case 'auth/invalid-api-key':
          errorMessage = 'Firebase configuration error. Please contact the administrator.'
          break
        default:
          errorMessage = error.message || errorMessage
      }
    }
    
    return { success: false, error: errorMessage }
  }
}

// Facebook Sign-In
export const signInWithFacebook = async () => {
  try {
    if (!isFirebaseConfigured() || !safeAuth) {
      console.warn('Firebase is not properly configured. Facebook sign-in will not work.')
      return { success: false, error: 'Firebase is not properly configured. Facebook sign-in is disabled.' }
    }
    
    const provider = new FacebookAuthProvider()
    const result = await signInWithPopup(safeAuth, provider)
    return { success: true, user: result.user }
  } catch (error) {
    console.error('Facebook sign-in error:', error)
    let errorMessage = 'Facebook sign-in failed. Please try again.'
    
    // Handle Firebase specific errors
    if (error.code) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in popup was closed. Please try again.'
          break
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-in request was cancelled. Please try again.'
          break
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection and try again.'
          break
        case 'auth/invalid-api-key':
          errorMessage = 'Firebase configuration error. Please contact the administrator.'
          break
        default:
          errorMessage = error.message || errorMessage
      }
    }
    
    return { success: false, error: errorMessage }
  }
}

// Twitter Sign-In
export const signInWithTwitter = async () => {
  try {
    if (!isFirebaseConfigured() || !safeAuth) {
      console.warn('Firebase is not properly configured. Twitter sign-in will not work.')
      return { success: false, error: 'Firebase is not properly configured. Twitter sign-in is disabled.' }
    }
    
    const provider = new TwitterAuthProvider()
    const result = await signInWithPopup(safeAuth, provider)
    return { success: true, user: result.user }
  } catch (error) {
    console.error('Twitter sign-in error:', error)
    let errorMessage = 'Twitter sign-in failed. Please try again.'
    
    // Handle Firebase specific errors
    if (error.code) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in popup was closed. Please try again.'
          break
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-in request was cancelled. Please try again.'
          break
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection and try again.'
          break
        case 'auth/invalid-api-key':
          errorMessage = 'Firebase configuration error. Please contact the administrator.'
          break
        default:
          errorMessage = error.message || errorMessage
      }
    }
    
    return { success: false, error: errorMessage }
  }
}

// Listen for authentication state changes
export const onAuthStateChange = (callback) => {
  return safeOnAuthStateChanged(safeAuth, callback)
}

// Get the current user
export const getCurrentUser = () => {
  if (!auth) {
    return null
  }
  
  return auth.currentUser
}