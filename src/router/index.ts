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
              component: () => import('@/playground/PlaygroundShell.vue'),
              children: [
                {
                  path: '',
                  name: 'playground-overview',
                  component: () => import('@/playground/views/PlaygroundOverviewView.vue'),
                },
                {
                  path: 'tokens',
                  name: 'playground-tokens',
                  component: () => import('@/playground/views/TokensView.vue'),
                },
                {
                  path: 'components',
                  name: 'playground-components',
                  component: () => import('@/playground/views/ComponentsView.vue'),
                },
                {
                  path: 'prototypes',
                  name: 'playground-prototypes',
                  component: () => import('@/playground/views/PrototypesPlaceholderView.vue'),
                },
                {
                  path: 'prototypes/:name',
                  name: 'playground-prototype-detail',
                  component: () => import('@/playground/views/PrototypeDetailPlaceholderView.vue'),
                },
              ],
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
