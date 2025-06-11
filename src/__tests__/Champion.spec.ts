// src/__tests__/Champion.spec.ts
import { describe, it, expect } from 'vitest'
import { Champion } from '@/domain/models/Champion'

describe('Champion model', () => {
  it('should return correct display name', () => {
    const champion = new Champion(
      1, 'photo.png', 'Aatrox', 'Top', 'Fighter', true,
      false, true, false, false, true, false, true, false, false, false, false,
      true, false, true, false, true, false, false, true, false, true, false,
    )

    expect(champion.getDisplayName()).toBe('Aatrox')
  })
})
