import { createRouter, createWebHistory, type RouterHistory } from 'vue-router'

export interface CreateAppRouterOptions {
  history?: RouterHistory
  includeUnreleased?: boolean
}

export function createAppRouter(options: CreateAppRouterOptions = {}) {
  const {
    history = createWebHistory(import.meta.env.BASE_URL),
    includeUnreleased = import.meta.env.DEV || import.meta.env.MODE === 'preview',
  } = options

  return createRouter({
    history,
    routes: [
      {
        path: '/',
        redirect: '/cv',
      },
      {
        path: '/cv',
        name: 'cv',
        component: () => import('@/apps/cv/CvView.vue'),
      },
      ...(includeUnreleased
        ? [
            {
              path: '/playground',
              name: 'playground',
              component: () => import('@/views/PlaygroundView.vue'),
            },
          ]
        : []),
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue'),
      },
    ],
  })
}

const router = createAppRouter()

export default router
