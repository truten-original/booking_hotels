import { current } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { useRef } from 'react'
const AddFooter = ({ children }) => {
  const wrapper = useRef()
  useEffect(() => {
    console.log(wrapper.current.scrollHeight)
  }, [])
  useEffect()
  return <div ref={wrapper}>{children}</div>
}

export default AddFooter
