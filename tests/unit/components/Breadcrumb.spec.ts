import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)

const routes = [
  {
    path: '/',
    children: [{
      path: 'dashboard'
    }]
  },
  {
    path: '/menu',
    children: [{
      path: 'menu1',
      meta: { title: 'menu1' },
      children: [{
        path: 'menu1-1',
        meta: { title: 'menu1-1' }
      },
      {
        path: 'menu1-2',
        redirect: 'noredirect',
        meta: { title: 'menu1-2' },
        children: [{
          path: 'menu1-2-1',
          meta: { title: 'menu1-2-1' }
        },
        {
          path: 'menu1-2-2'
        }]
      }]
    }]
  }]

const router = new VueRouter({
  routes
})

const wrapper = mount(Breadcrumb, {
  localVue,
  router
})

describe('Breadcrumb.vue', () => {
  it('dashboard', async() => {
    router.push('/dashboard')
    await wrapper.vm.$nextTick()
    const len = wrapper.findAll('.el-breadcrumb__item').length
    expect(len).toBe(1)
  })

  it('normal route', async() => {
    router.push('/menu/menu1')
    await wrapper.vm.$nextTick()
    const len = wrapper.findAll('.el-breadcrumb__item').length
    expect(len).toBe(2)
  })

  it('nested route', async() => {
    router.push('/menu/menu1/menu1-2/menu1-2-1')
    await wrapper.vm.$nextTick()
    const len = wrapper.findAll('.el-breadcrumb__item').length
    expect(len).toBe(4)
  })

  it('no meta.title', async() => {
    router.push('/menu/menu1/menu1-2/menu1-2-2')
    await wrapper.vm.$nextTick()
    const len = wrapper.findAll('.el-breadcrumb__item').length
    expect(len).toBe(3)
  })

  it('noredirect', async() => {
    router.push('/menu/menu1/menu1-2/menu1-2-1')
    await wrapper.vm.$nextTick()
    const breadcrumbArray = wrapper.findAll('.el-breadcrumb__item')
    const redirectBreadcrumb = breadcrumbArray.at(2)
    const length = redirectBreadcrumb.findAll('a').length
    expect(length).toBe(0)
  })

  it('click link', async() => {
    router.push('/menu/menu1/menu1-2/menu1-2-2')
    await wrapper.vm.$nextTick()
    const breadcrumbArray = wrapper.findAll('.el-breadcrumb__item')
    const second = breadcrumbArray.at(1)
    const href = second.find('a').text()
    expect(href).toBe('menu1')
  })

  it('last breadcrumb', async() => {
    router.push('/menu/menu1/menu1-2/menu1-2-1')
    await wrapper.vm.$nextTick()
    const breadcrumbArray = wrapper.findAll('.el-breadcrumb__item')
    const redirectBreadcrumb = breadcrumbArray.at(3)
    const length = redirectBreadcrumb.findAll('a').length
    expect(length).toBe(0)
  })
})
