import { afterEach, vi, vitest } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

const mockGeolocation = {
  getCurrentPosition: vi.fn(),
  watchPosition: vi.fn()
}
global.navigator.geolocation = mockGeolocation
