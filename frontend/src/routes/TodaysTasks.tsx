import React from 'react'
import MyList from '../components/MyList'

function TodaysTasks() {
  return (
    <div className="flex flex-col w-full h-full p-3 gap-5">
      {/* Heading */}
      <div className="flex text-3xl font-bold" aria-label="Today's Tasks Heading">
        Today's Tasks
      </div>

      {/* Task List with Overflow Control */}
      <div className="flex w-full overflow-x-auto hide-scrollbar">
        <MyList type="Today" />
      </div>
    </div>
  )
}

export default TodaysTasks