import Header from '../components/Header'
import TaskBoard from '../components/TaskBoard'
import TaskEditor from '../components/TaskEditor'

const Tasks = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 q-full font-Inter">
      <div className="w-[1240px] mx-auto">
      <Header/>
        <TaskBoard />
        <TaskEditor/>
      </div>
    </div>
  )
}

export default Tasks
