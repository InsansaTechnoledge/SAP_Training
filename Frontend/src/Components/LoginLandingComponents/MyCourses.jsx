import React from 'react'

const MyCourses = () => {
  return (
    <div className='border grid grid-cols-5 p-3'>
        <div>

        </div>
        <div className='col-span-4'>
            <div className='flex justify-between'>
                <h3>
                    Course title
                </h3>
                <div>pending</div>
            </div>
            <div>Course description</div>
            <button>Start now</button>
        </div>
    </div>
  )
}

export default MyCourses