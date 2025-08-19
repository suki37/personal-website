import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 定义网站数据类型
interface WebsiteData {
  title: string
  description: string
  author: string
}

interface Note {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  images?: string[] // 添加图片数组字段
}

interface Blog {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  images?: string[] // 添加图片数组字段
}

interface Interest {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  images?: string[] // 添加图片数组字段
}

export const useWebsiteStore = defineStore('website', () => {
  // 网站基本信息
  const websiteData = ref<WebsiteData>({
    title: 'My Personal Website',
    description: 'A personal website built with Vue 3',
    author: 'Your Name'
  })

  // Notes数据
  const notes = ref<Note[]>([])

  // Blogs数据
  const blogs = ref<Blog[]>([])

  // Interests数据
  const interests = ref<Interest[]>([])

  // 从JSON文件加载数据
  const loadData = async () => {
    try {
      console.log('Loading data from JSON files...')
      
      // 加载网站基本信息
      const websiteResponse = await fetch('/data/website.json')
      if (websiteResponse.ok) {
        websiteData.value = await websiteResponse.json()
        console.log('Website data loaded:', websiteData.value)
      }

      // 加载Notes数据
      const notesResponse = await fetch('/data/notes.json')
      if (notesResponse.ok) {
        notes.value = await notesResponse.json()
        console.log('Notes data loaded:', notes.value.length)
      }

      // 加载Blogs数据
      const blogsResponse = await fetch('/data/blogs.json')
      if (blogsResponse.ok) {
        blogs.value = await blogsResponse.json()
        console.log('Blogs data loaded:', blogs.value.length)
      }

      // 加载Interests数据
      const interestsResponse = await fetch('/data/interests.json')
      if (interestsResponse.ok) {
        interests.value = await interestsResponse.json()
        console.log('Interests data loaded:', interests.value.length)
      }
    } catch (error) {
      console.error('Failed to load data from JSON files:', error)
    }
  }

  // 在store初始化时加载数据
  loadData().then(() => {
    console.log('Data loading completed')
    console.log('Notes count:', notes.value.length)
    console.log('Blogs count:', blogs.value.length)
    console.log('Interests count:', interests.value.length)
  })

  // 计算属性
  const notesCount = computed(() => notes.value.length)
  const blogsCount = computed(() => blogs.value.length)
  const interestsCount = computed(() => interests.value.length)

  // Actions
  function updateWebsiteData(data: Partial<WebsiteData>) {
    websiteData.value = { ...websiteData.value, ...data }
  }

  function addNote(note: Omit<Note, 'id'>) {
    const newNote = {
      ...note,
      id: notes.value.length > 0 ? Math.max(...notes.value.map(n => n.id)) + 1 : 1
    }
    notes.value.push(newNote)
  }

  function addBlog(blog: Omit<Blog, 'id'>) {
    const newBlog = {
      ...blog,
      id: blogs.value.length > 0 ? Math.max(...blogs.value.map(b => b.id)) + 1 : 1
    }
    blogs.value.push(newBlog)
  }

  function addInterest(interest: Omit<Interest, 'id'>) {
    const newInterest = {
      ...interest,
      id: interests.value.length > 0 ? Math.max(...interests.value.map(i => i.id)) + 1 : 1
    }
    interests.value.push(newInterest)
  }

  return { 
    websiteData, 
    notes, 
    blogs, 
    interests,
    notesCount,
    blogsCount,
    interestsCount,
    updateWebsiteData,
    addNote,
    addBlog,
    addInterest,
    loadData
  }
})