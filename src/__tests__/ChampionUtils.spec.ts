import { describe, it, expect } from 'vitest'
import { getChampionImageUrl } from '@/utils/ChampionUtils'

describe('getChampionImageUrl', () => {
  it('should return default image if photo is null/empty', () => {
    const championMock = { photo: '', name: 'Test', role: 'top' } as any
    expect(getChampionImageUrl(championMock)).toBe('/default-champion.png')

    championMock.photo = 'null'
    expect(getChampionImageUrl(championMock)).toBe('/default-champion.png')
  })

  it('should return provided photo if valid', () => {
    const championMock = { photo: 'http://example.com/image.png', name: 'Test', role: 'top' } as any
    expect(getChampionImageUrl(championMock)).toBe('http://example.com/image.png')
  })
})
