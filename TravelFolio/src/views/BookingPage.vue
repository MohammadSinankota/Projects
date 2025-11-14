<template>
  <div class="booking-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">Book Your Dream Trip</h1>
        <p class="page-subtitle">Fill in your details to confirm your booking</p>
      </div>
    </section>

    <!-- Booking Form -->
    <section class="booking-form-section">
      <div class="container">
        <div class="form-container">
          <form @submit.prevent="confirmBooking">
            <div class="form-grid">
              <div class="form-group">
                <label for="fullName" class="form-label">Full Name *</label>
                <input type="text" id="fullName" v-model="bookingForm.fullName" required class="form-input">
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">Email *</label>
                <input type="email" id="email" v-model="bookingForm.email" required class="form-input">
              </div>
              
              <div class="form-group">
                <label for="phone" class="form-label">Phone *</label>
                <input type="tel" id="phone" v-model="bookingForm.phone" required class="form-input">
              </div>
              
              <div class="form-group">
                <label for="destination" class="form-label">Destination *</label>
                <select id="destination" v-model="bookingForm.destination" required class="form-select">
                  <option value="">Select Destination</option>
                  <option value="bali">Bali, Indonesia</option>
                  <option value="paris">Paris, France</option>
                  <option value="dubai">Dubai, UAE</option>
                  <option value="maldives">Maldives</option>
                  <option value="santorini">Santorini, Greece</option>
                  <option value="tokyo">Tokyo, Japan</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="startDate" class="form-label">Start Date *</label>
                <input type="date" id="startDate" v-model="bookingForm.startDate" required class="form-input">
              </div>
              
              <div class="form-group">
                <label for="endDate" class="form-label">End Date *</label>
                <input type="date" id="endDate" v-model="bookingForm.endDate" required class="form-input">
              </div>
              
              <div class="form-group">
                <label for="travelers" class="form-label">Number of Travelers *</label>
                <select id="travelers" v-model="bookingForm.travelers" required class="form-select">
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="3">3 Travelers</option>
                  <option value="4">4 Travelers</option>
                  <option value="5">5 Travelers</option>
                  <option value="6">6+ Travelers</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="specialRequests" class="form-label">Special Requests</label>
                <textarea id="specialRequests" v-model="bookingForm.specialRequests" rows="4" placeholder="Any special requirements or preferences?" class="form-textarea"></textarea>
              </div>
            </div>
            
            <!-- Dynamic Price Calculation -->
            <div class="price-calculation">
              <h3 class="price-title">Booking Summary</h3>
              <div class="price-details">
                <div class="price-item">
                  <span class="price-label">Base Price:</span>
                  <span class="price-value">₹{{ basePrice.toLocaleString() }}</span>
                </div>
                <div class="price-item">
                  <span class="price-label">Travelers ({{ bookingForm.travelers }}):</span>
                  <span class="price-value">₹{{ (basePrice * (bookingForm.travelers - 1)).toLocaleString() }}</span>
                </div>
                <div class="price-item">
                  <span class="price-label">Taxes & Fees:</span>
                  <span class="price-value">₹{{ taxes.toLocaleString() }}</span>
                </div>
                <div class="price-item total">
                  <span class="price-label">Total:</span>
                  <span class="price-value">₹{{ totalPrice.toLocaleString() }}</span>
                </div>
              </div>
            </div>
            
            <Button type="submit" variant="primary" block>Confirm Booking</Button>
          </form>
        </div>
      </div>
    </section>

    <!-- Confirmation Popup -->
    <div class="popup-overlay" v-if="showPopup">
      <div class="popup">
        <div class="popup-content">
          <h2 class="popup-title">Booking Confirmed!</h2>
          <p class="popup-message">Your booking request has been received! Our team will contact you soon.</p>
          <Button variant="primary" @click="closePopup">Close</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Button from '@/components/Button.vue'

// Reactive data
const bookingForm = ref({
  fullName: '',
  email: '',
  phone: '',
  destination: '',
  startDate: '',
  endDate: '',
  travelers: 1,
  specialRequests: ''
})

const showPopup = ref(false)

// Computed properties for price calculation
const basePrice = computed(() => {
  // In a real app, this would come from the selected package/destination
  return 50000
})

const taxes = computed(() => {
  return Math.round(basePrice.value * 0.18) // 18% tax
})

const totalPrice = computed(() => {
  const travelersCost = basePrice.value * bookingForm.value.travelers
  return travelersCost + taxes.value
})

// Methods
const confirmBooking = () => {
  if (bookingForm.value.fullName && bookingForm.value.email && bookingForm.value.phone && 
      bookingForm.value.destination && bookingForm.value.startDate && bookingForm.value.endDate) {
    showPopup.value = true
  } else {
    alert('Please fill in all required fields.')
  }
}

const closePopup = () => {
  showPopup.value = false
  // Reset form
  bookingForm.value = {
    fullName: '',
    email: '',
    phone: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    specialRequests: ''
  }
}
</script>

<style scoped>
.booking-page {
  font-family: var(--font-primary);
  padding-bottom: var(--space-12);
}

/* Page Header */
.page-header {
  background: linear-gradient(rgba(10, 31, 68, 0.85), rgba(10, 31, 68, 0.85)), 
              url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
  color: var(--text-inverse);
  text-align: center;
  padding: var(--space-16) 0;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-3);
  color: var(--text-inverse);
}

.page-subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-inverse);
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

/* Booking Form */
.booking-form-section {
  padding: var(--space-12) 0;
}

.form-container {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow);
  max-width: 1000px;
  margin: 0 auto;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
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

.form-input,
.form-select,
.form-textarea {
  padding: var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

/* Price Calculation */
.price-calculation {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  margin-bottom: var(--space-8);
}

.price-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  color: var(--text-primary);
  text-align: center;
}

.price-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.price-item {
  display: flex;
  justify-content: space-between;
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--border-primary);
}

.price-item:last-child {
  border-bottom: none;
}

.price-item.total {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  padding-top: var(--space-3);
  border-top: 2px solid var(--border-primary);
  border-bottom: none;
}

.price-label {
  color: var(--text-primary);
}

.price-value {
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
}

/* Popup */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
}

.popup {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
  text-align: center;
}

.popup-title {
  font-family: var(--font-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-3);
  color: var(--text-primary);
}

.popup-message {
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
  line-height: var(--line-height-relaxed);
}

/* Responsive Design */
@media (max-width: 992px) {
  .page-title {
    font-size: var(--font-size-3xl);
  }
  
  .page-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .booking-form-section {
    padding: var(--space-8) 0;
  }
  
  .form-container {
    padding: var(--space-6);
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: var(--space-12) 0;
  }
  
  .page-title {
    font-size: var(--font-size-2xl);
  }
  
  .page-subtitle {
    font-size: var(--font-size-base);
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .price-item {
    flex-direction: column;
    gap: var(--space-1);
  }
  
  .price-item.total {
    flex-direction: row;
  }
}

@media (max-width: 576px) {
  .popup {
    padding: var(--space-6);
  }
  
  .popup-title {
    font-size: var(--font-size-xl);
  }
}
</style>