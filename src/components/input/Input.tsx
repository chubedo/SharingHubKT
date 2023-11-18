/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string
  classNameWrapper?: string
  register?: UseFormRegister<any>
  ruleMessage?: string
  idError?: string
}

export default function Input({
  type,
  placeholder,
  id,
  classNameWrapper,
  register,
  name,
  errors,
  ruleMessage,
  idError,
  ...rest
}: InputProps) {
  return (
    <div className={classNameWrapper}>
      <div className='relative'>
        <input
          type={type}
          id={id}
          className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
          placeholder=' '
          {...(register && name ? register(name) : '')}
          {...rest}
        />
        <label
          htmlFor={id}
          className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
        >
          {placeholder}
        </label>
      </div>
      {ruleMessage && <span className='text-gray-500 ml-1'>{ruleMessage}</span>}
      <div id={idError} className='mt-1 min-h-[1.5rem] text-red-600 text-sm'>
        {errors}
      </div>
    </div>
  )
}
