import React from 'react'
import List from '../components/List'
import MyList from '../components/MyList'

function PendingTask() {
  return (
    <div className="flex flex-col w-full h-full p-3 gap-3 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">Pending Tasks</h1>
      <div className="flex w-full overflow-auto bg-white p-4 rounded-lg shadow-md border border-gray-200 hide-scrollbar">
        <MyList type="Pending" />
      </div>
    </div>
  )
}

export default PendingTask