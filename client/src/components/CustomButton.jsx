import React from 'react'

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button 
      type={btnType} 
      className="flex items-center font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]" 
      style={styles} 
      onClick={handleClick}
      >
      {title}
    </button>
  )
}

export default CustomButton