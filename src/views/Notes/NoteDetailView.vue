<template>
  <!-- <div class="note-detail"> -->
    <button @click="goBack" class="back-button"><</button>
    
    <div v-if="note" class="note-content">
      <h1>{{ note.title }}</h1>
      <p class="date">{{ note.date }}</p>
      <ImageGallery v-if="note.images && note.images.length > 0" :images="note.images" />
      <div class="content" v-html="formatContent(note.content)"></div>
    </div>
    
    <div v-else class="not-found">
      <h2>Note not found</h2>
      <p>The requested note could not be found.</p>
    </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useWebsiteStore } from '@/stores/website'
import ImageGallery from '@/components/ImageGallery.vue'
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()
const store = useWebsiteStore()
const { notes } = storeToRefs(store)

const note = ref<any>(null)

// Get note ID from route params
const noteId = parseInt(route.params.id as string)

// Find the note when notes data is available
const findNote = () => {
  note.value = notes.value.find(n => n.id === noteId) || null
}

// Watch for notes data changes
watch(notes, () => {
  if (notes.value.length > 0) {
    findNote()
  }
})

// Also check on mount
onMounted(() => {
  if (notes.value.length > 0) {
    findNote()
  } else {
    // If data is not loaded yet, load it
    store.loadData().then(() => {
      findNote()
    })
  }
})

// Format content with Markdown
const formatContent = (content: string) => {
  return marked.parse(content)
}

// Go back to notes list
const goBack = () => {
  router.push('/notes')
}
</script>

<style scoped>
.note-detail {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.back-button {
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  padding: 8px 16px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateZ(0);
  border: 1px solid transparent;
  width:2rem;
  height:2rem;
}

.back-button:hover {
  background-color: var(--color-background-mute);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: var(--color-accent);
}

.back-button:active {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.note-content h1 {
  margin-top: 0;
  color: var(--color-accent);
}

.date {
  color: var(--color-text-secondary);
  font-size: 0.8rem; /* 调小时间字体 */
  margin: 5px 0 20px 0;
}

.content {
  line-height: 1.6;
  white-space: pre-wrap;
  font-size: 0.9rem; /* 正文字体 */
}

.not-found {
  text-align: center;
  padding: 40px 20px;
}

.not-found h2 {
  margin-top: 0;
}

.content :deep(pre) {
  font-size: 0.6rem; /* 调整代码块字体大小 */
}

</style>