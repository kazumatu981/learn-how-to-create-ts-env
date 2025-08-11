<template>
  <div class="vp-card" @click="navigate">
    <img v-if="image" :src="image" alt="Card image" class="vp-card-image" />
    <div class="vp-card-content">
      <h3 class="vp-card-title">{{ title }}</h3>
      <p class="vp-card-description">{{ description }}</p>
      <div v-if="tags?.length" class="vp-card-tags">
        <span v-for="tag in tags" :key="tag" class="vp-card-tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  title: string
  description?: string
  image?: string
  link?: string
  tags?: string[]
}>()

const router = useRouter()

function navigate() {
  if (link) router.push(link)
}
</script>

<style scoped>
.vp-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  background-color: #fff;
}

.vp-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.vp-card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.vp-card-content {
  padding: 1rem;
}

.vp-card-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.vp-card-description {
  margin-top: 0.5rem;
  color: #555;
}

.vp-card-tags {
  margin-top: 0.75rem;
}

.vp-card-tag {
  display: inline-block;
  background-color: #f0f0f0;
  color: #333;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}
</style>
