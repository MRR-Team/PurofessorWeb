import { describe, it, expect } from 'vitest'
import { Item } from '@/domain/models/Item'

describe('Item model', () => {
  it('should return correct display name', () => {
    const item = new Item(
      1, 'Infinity Edge', 'Marksman',
      true, false, false, false, false, false, false, false, false, false, false, false,
      true, false, true, false, true, false, false, true, false, true,
    )

    expect(item.getDisplayName()).toBe('Infinity Edge')
  })
})
