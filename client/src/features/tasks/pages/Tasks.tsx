import Header from '../components/Header'
import KanbanBoard from '../components/KanbanBoard'
import TaskEditor from '../components/TaskEditor'

const Tasks = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 q-full font-Inter">
      <div className="w-[1240px] mx-auto">
      <Header/>
        <KanbanBoard />
        <TaskEditor/>
      </div>
    </div>
  )
}

export default Tasks
