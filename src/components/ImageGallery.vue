<template>
  <div v-if="images && images.length > 0" class="image-gallery">
    <div v-for="(image, index) in images" :key="index" class="image-container">
      <img :src="image" :alt="`Image ${index + 1}`" class="gallery-image" @click="openModal(index)" />
    </div>
    
    <!-- 图片查看模态框 -->
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <img :src="images[currentImageIndex]" :alt="`Image ${currentImageIndex + 1}`" class="modal-image" />
        <div class="modal-navigation" v-if="images.length > 1">
          <button @click.stop="prevImage" class="nav-button prev-button">&lt;</button>
          <button @click.stop="nextImage" class="nav-button next-button">&gt;</button>
        </div>
        <div class="image-counter">
          {{ currentImageIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const showModal = ref(false)
const currentImageIndex = ref(0)

const openModal = (index: number) => {
  currentImageIndex.value = index
  showModal.value = true
  document.body.style.overflow = 'hidden' // 防止背景滚动
}

const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = '' // 恢复背景滚动
}

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length
}

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + props.images.length) % props.images.length
}
</script>

<style scoped>
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
}

.image-container {
  flex: 1 1 auto;
  min-width: 200px;
  max-width: 300px;
  cursor: pointer;
}

.gallery-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.gallery-image:hover {
  transform: scale(1.05);
}

.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.close {
  position: absolute;
  top: -40px;
  right: 0;
  color: white;
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
  z-index: 1001;
}

.close:hover {
  color: #ccc;
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  display: block;
  margin: 0 auto;
}

.modal-navigation {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.nav-button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.prev-button {
  border-radius: 0 4px 4px 0;
}

.next-button {
  border-radius: 4px 0 0 4px;
}

.image-counter {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1rem;
}
</style>