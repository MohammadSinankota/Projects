<template>
  <div class="card" :class="{ 'card-hover': hover }">
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  hover: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: var(--transition);
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.card-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-primary);
}

.card-body {
  padding: var(--space-6);
}

.card-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--border-primary);
}

/* Responsive Design */
@media (max-width: 768px) {
  .card-header,
  .card-body,
  .card-footer {
    padding: var(--space-4);
  }
}
</style>