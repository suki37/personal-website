<template>
  <div class="notes">
    <router-view v-slot="{ Component }">
      <component :is="Component" v-if="Component" />
      <div v-else>
        <h1>Notes</h1>
        <div class="notes-list">
          <div 
            v-for="note in paginatedNotes" 
            :key="note.id" 
            class="note-card"
            @click="viewNote(note.id)"
          >
            <h3>{{ note.title }}</h3>
            <p class="date">{{ note.date }}</p>
            <p class="content-preview">{{ note.content.substring(0, 100) }}{{ note.content.length > 100 ? '...' : '' }}</p>
          </div>
        </div>
        
        <!-- Pagination Controls -->
        <div class="pagination">
          <button 
            :disabled="currentPage === 1" 
            @click="prevPage"
            class="pagination-btn"
          >
            Previous
          </button>
          <span class="page-info">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button 
            :disabled="currentPage === totalPages" 
            @click="nextPage"
            class="pagination-btn"
          >
            &nbsp;&nbsp;Next&nbsp;&nbsp;
          </button>
        </div>
      </div>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useWebsiteStore } from '@/stores/website'
import { useRouter } from 'vue-router'

const store = useWebsiteStore()
const { notes } = storeToRefs(store)
const router = useRouter()

// Pagination variables
const currentPage = ref(1)
const itemsPerPage = ref(4)

// Computed properties for pagination
const totalPages = computed(() => {
  return Math.ceil(notes.value.length / itemsPerPage.value)
})

const paginatedNotes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return notes.value.slice(start, end)
})

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Method to view note details
const viewNote = (id: number) => {
  router.push(`/notes/${id}`)
}
</script>

<style scoped>
.notes {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.notes-list {
  margin-top: 20px;
}

.note-card {
  background: var(--color-background-soft);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateZ(0);
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  height: 168px; /* 统一卡片高度 */
}

.note-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border-color: var(--color-accent);
}

.note-card:active {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.note-card h3 {
  margin-top: 0;
  color: var(--color-accent);
  flex: 0 0 auto;
}

.date {
  color: var(--color-text-secondary);
  font-size: 0.8rem; /* 调小时间字体 */
  margin: 5px 0 0 0;
  flex: 0 0 auto;
}

.content-preview {
  margin: 10px 0 0 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2em; /* 2行文本的最小高度 */
  font-size: 0.8rem; /* 调大梗概字体 */
  flex: 1 1 auto;
}

/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
}

.pagination-btn {
  padding: 8px 16px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateZ(0);
}

.pagination-btn:hover:not(:disabled) {
  background-color: var(--color-accent);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pagination-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.page-info {
  font-weight: 500;
  color: var(--color-accent);
  font-size: 1rem;
}
</style>