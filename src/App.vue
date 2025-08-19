<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <nav>
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/notes">Notes</RouterLink>
      <RouterLink to="/blogs">Blogs</RouterLink>
      <RouterLink to="/interests">Interests</RouterLink>
    </nav>

    <div class="page-content">
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 防止滚动条导致的布局偏移 */
</style>
