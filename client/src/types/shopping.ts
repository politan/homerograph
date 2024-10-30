export interface ShoppingItem {
  id: number
  name: string
  quantity: number
  category: 'groceries' | 'household' | 'other'
  purchased: boolean
}