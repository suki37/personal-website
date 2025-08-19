import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home-alt',
      component: HomeView,
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('../views/Notes/NotesView.vue'),
      children: [
        {
          path: ':id',
          name: 'note-detail',
          component: () => import('../views/Notes/NoteDetailView.vue'),
        }
      ]
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: () => import('../views/Blogs/BlogsView.vue'),
      children: [
        {
          path: ':id',
          name: 'blog-detail',
          component: () => import('../views/Blogs/BlogDetailView.vue'),
        }
      ]
    },
    {
      path: '/interests',
      name: 'interests',
      component: () => import('../views/Interests/InterestsView.vue'),
      children: [
        {
          path: ':id',
          name: 'interest-detail',
          component: () => import('../views/Interests/InterestDetailView.vue'),
        }
      ]
    },
  ],
})

export default router
