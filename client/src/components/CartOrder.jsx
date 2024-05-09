import React from 'react'

const CartOrder = () => {
  return (
    <div>
                <div className="px-20 py-10 items-center justify-center content-center">
          <div className='flex items-center gap-20 '>
            <img className='w-60 h-60' src={image} alt="Product Image" />
            <div className='flex flex-col gap-4'>
              <div className="flex items-center gap-4">
                <h1 className='text-xl font-semibold'>{h}</h1>
                <h1 className='text-xl font-semibold'>{p}</h1>
              </div>
              <select value={selectedOption} onChange={handleOptionChange} className="border border-gray-300 rounded-lg px-2 py-1 w-14">
                <option value="Option 1"> 1</option>
                <option value="Option 2"> 2</option>
                <option value="Option 3">3</option>
              </select>
            </div>
          </div>
         
        </div>
    </div>
  )
}

export default CartOrder