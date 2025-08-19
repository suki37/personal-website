<template>
  <div class="home">
    <h1>{{ websiteData.title }}</h1>
    <p>{{ websiteData.description }}</p>
    
    <div class="stats">
      <div class="stat-card">
        <h3>{{ notesCount }}</h3>
        <p>Notes</p>
      </div>
      <div class="stat-card">
        <h3>{{ blogsCount }}</h3>
        <p>Blog Posts</p>
      </div>
      <div class="stat-card">
        <h3>{{ interestsCount }}</h3>
        <p>Interests</p>
      </div>
    </div>
    
    <div class="welcome-section">
      <h2>Welcome to My Website</h2>
      <p>It's a personal website built by Claude-Code and fine-tuned by sukiSophie.</p>
      <p>I used to favor flashy artistic styles when building websites.</p>
      <p>It wasn’t until now that I realized the purpose of everything should be to showcase content—and that’s why you see the webpage in front of you.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWebsiteStore } from '@/stores/website'

const store = useWebsiteStore()
const { websiteData, notesCount, blogsCount, interestsCount } = storeToRefs(store)
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 40px 0;
  flex-wrap: wrap;
}

.stat-card {
  background: var(--color-background-soft);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  min-width: 120px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateZ(0);
  border: 1px solid transparent;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border-color: var(--color-accent);
}

.stat-card h3 {
  font-size: 2rem;
  margin: 0;
  color: var(--color-accent);
}

.welcome-section {
  background: var(--color-background-soft);
  padding: 30px;
  border-radius: 8px;
  margin-top: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateZ(0);
  border: 1px solid transparent;
  font-size:0.8rem;
}

.welcome-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border-color: var(--color-border-hover);
}

.welcome-section h2 {
  margin-top: 0;
  color: var(--color-accent);
}
</style>