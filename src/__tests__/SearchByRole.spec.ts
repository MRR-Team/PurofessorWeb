import { describe, it, expect } from 'vitest'
import { SearchByRole } from '@/strategies/SearchStrategy'
import type { IChampion } from '@/interfaces/IChampion'

describe('SearchByRole', () => {
  const champions: IChampion[] = [
    { id: 1, name: 'Aatrox', title: '', role: 'fighter', difficulty: 'moderate', image: '', inRotation: true, counters: [], recommendedItems: [], patchNotes: '' },
    { id: 2, name: 'Ahri', title: '', role: 'mage', difficulty: 'easy', image: '', inRotation: false, counters: [], recommendedItems: [], patchNotes: '' },
    { id: 3, name: 'Alistar', title: '', role: 'tank', difficulty: 'moderate', image: '', inRotation: true, counters: [], recommendedItems: [], patchNotes: '' },
    { id: 4, name: 'Akali', title: '', role: 'assassin', difficulty: 'hard', image: '', inRotation: true, counters: [], recommendedItems: [], patchNotes: '' }
  ]

  it('should return only champions with exact role match (case-insensitive)', () => {
    const strategy = new SearchByRole('MAGE')
    const result = strategy.search('', champions)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Ahri')
  })

  it('should return empty array if role not found', () => {
    const strategy = new SearchByRole('support')
    const result = strategy.search('', champions)
    expect(result).toEqual([])
  })
})
