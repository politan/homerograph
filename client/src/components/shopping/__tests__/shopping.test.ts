import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShoppingList from '../ShoppingList.vue'
import ShoppingForm from '../ShoppingForm.vue'
import ShoppingFilter from '../ShoppingFilter.vue'
import ShoppingListItem from '../ShoppingListItem.vue'
import type { ShoppingItem } from '@/types/shopping'

const mockItems: ShoppingItem[] = [
  { id: 1, name: 'Milk', quantity: 1, category: 'groceries', purchased: false },
  { id: 2, name: 'Soap', quantity: 2, category: 'household', purchased: true },
  { id: 3, name: 'Bread', quantity: 1, category: 'groceries', purchased: false }
]

describe('ShoppingList', () => {
  it('renders all items when filter is "all"', () => {
    const wrapper = mount(ShoppingList, {
      props: {
        items: mockItems,
        filter: 'all'
      }
    })
    expect(wrapper.findAllComponents(ShoppingListItem)).toHaveLength(3)
  })

  it('filters pending items correctly', () => {
    const wrapper = mount(ShoppingList, {
      props: {
        items: mockItems,
        filter: 'pending'
      }
    })
    expect(wrapper.findAllComponents(ShoppingListItem)).toHaveLength(2)
  })

  it('emits toggle and remove events', async () => {
    const wrapper = mount(ShoppingList, {
      props: {
        items: mockItems,
        filter: 'all'
      }
    })
    
    const firstItem = wrapper.findComponent(ShoppingListItem)
    await firstItem.vm.$emit('toggle')
    await firstItem.vm.$emit('remove')
    
    expect(wrapper.emitted('toggle')?.[0]).toEqual([1])
    expect(wrapper.emitted('remove')?.[0]).toEqual([1])
  })
})

describe('ShoppingForm', () => {
  it('emits add event with correct data', async () => {
    const wrapper = mount(ShoppingForm)
    
    await wrapper.find('input[type="text"]').setValue('Test Item')
    await wrapper.find('input[type="number"]').setValue(3)
    await wrapper.find('select').setValue('household')
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.emitted('add')?.[0]).toEqual([{
      name: 'Test Item',
      quantity: 3,
      category: 'household'
    }])
  })

  it('does not emit add event when name is empty', async () => {
    const wrapper = mount(ShoppingForm)
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('add')).toBeFalsy()
  })
})

describe('ShoppingFilter', () => {
  it('emits update:modelValue when filter changes', async () => {
    const wrapper = mount(ShoppingFilter, {
      props: {
        modelValue: 'all'
      }
    })
    
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click') // Click 'pending' button
    
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['pending'])
  })
})

describe('ShoppingListItem', () => {
  it('renders item details correctly', () => {
    const wrapper = mount(ShoppingListItem, {
      props: {
        item: mockItems[0]
      }
    })
    
    expect(wrapper.text()).toContain('Milk')
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('groceries')
  })

  it('emits toggle and remove events', async () => {
    const wrapper = mount(ShoppingListItem, {
      props: {
        item: mockItems[0]
      }
    })
    
    await wrapper.find('input[type="checkbox"]').trigger('change')
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('toggle')).toBeTruthy()
    expect(wrapper.emitted('remove')).toBeTruthy()
  })
})
