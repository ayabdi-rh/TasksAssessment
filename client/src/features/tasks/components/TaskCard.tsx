import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TaskType } from '../../../dto/tasks.dto'
import editicon from '../../../assets/edit.svg'
import { useTasksStore } from '../store/useTasksStore'

interface Props {
  task?: TaskType
}

function TaskCard({ task }: Props) {
  const { setEditorState } = useTasksStore()
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task?.id || '',
    data: {
      type: 'Task',
      task
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30  p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl cursor-grab relative"
      />
    )
  }

  const selectTask = () => {
    if (!task) return
    setEditorState({
      selectedTask: task,
      isOpen: true
    })
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col border p-4 h-max rounded-md gap-2.5 hover:ring-1 hover:ring-inset hover:ring-background-blue-50 cursor-grab relative task font-Inter"
      onDoubleClick={selectTask}
    >
      <div className="flex w-full max-h-20 overflow-clip">
        {task?.name}
        <div className="flex ml-auto gap-1">
          <img src={editicon} className="h-4 w-4 ml-auto cursor-pointer" onClick={selectTask} />
        </div>
      </div>
    </div>
  )
}

export default TaskCard
