<script setup>
import { Inbox } from 'lucide-vue-next'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actionLabel: {
    type: String,
    default: '',
  },
})

defineEmits(['action'])
</script>

<template>
  <div class="empty-state">
    <span class="empty-state__icon">
      <Inbox :size="28" aria-hidden="true" />
    </span>
    <strong>{{ title }}</strong>
    <p>{{ description }}</p>
    <button v-if="actionLabel" class="button button-outline" type="button" @click="$emit('action')">
      {{ actionLabel }}
    </button>
  </div>
</template>
