<script setup>
import { MapPin } from 'lucide-vue-next'

defineProps({
  address: {
    type: Object,
    required: true,
  },
})

defineEmits(['makeDefault', 'edit'])
</script>

<template>
  <div class="profile-data-card">
    <span class="profile-data-card__icon">
      <MapPin :size="20" aria-hidden="true" />
    </span>

    <div class="profile-data-card__content">
      <div class="profile-data-card__heading">
        <strong>{{ address.name }}</strong>
        <span v-if="address.isDefault" class="mini-badge">기본 배송지</span>
      </div>
      <p>{{ address.recipient }} · {{ address.phone }}</p>
      <p>{{ address.address }}</p>
    </div>

    <div class="profile-data-card__actions">
      <button
        v-if="!address.isDefault"
        class="text-button"
        type="button"
        @click="$emit('makeDefault', address.id)"
      >
        기본으로 설정
      </button>
      <button class="text-button" type="button" @click="$emit('edit', address.id)">수정</button>
    </div>
  </div>
</template>
