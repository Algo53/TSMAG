import React from 'react';
import MyList from '../components/MyList';

function CompletedTask() {
  return (
    <div className="flex flex-col w-full h-full sm:p-3 xs:p-1 gap-3">
      {/* Title */}
      <div className="text-3xl font-bold text-indigo-600">Completed Tasks</div>

      {/* List of Completed Tasks */}
      <div className="flex w-full overflow-y-auto hide-scrollbar">
        <MyList type="Completed" />
      </div>
    </div>
  );
}

export default CompletedTask;
