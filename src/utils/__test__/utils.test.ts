import { describe, it, expect } from 'vitest'
import { isAxiosError } from '../utils'
import { AxiosError } from 'axios'

//describe: mô tả tập hợp các ngữ cảnh or 1 đơn vị cần test: function, component...
describe('isAxiosError', () => {
  // it: mô tả case test
  it('isAxiosError return false', () => {
    // expect: mong đợi value trả về
    expect(isAxiosError(new Error())).toBe(false)
  })
  it('isAxiosError return true', () => {
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})
