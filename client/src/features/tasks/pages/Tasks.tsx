import KanbanBoard from '../components/KanbanBoard'
import TaskEditor from '../components/TaskEditor'

const Tasks = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 q-full font-Inter">
      <div className="w-[1240px] mx-auto">
        <div className="text-3xl w-full border-b pb-1 flex justify-between">
          <h1>Tasks</h1>
          <div className='text-sm mt-auto text-blue-500 cursor-pointer pb-1 hover:underline'>Sign Out →</div>
        </div>
        <KanbanBoard />
        <TaskEditor/>
      </div>
    </div>
  )
}

export default Tasks
