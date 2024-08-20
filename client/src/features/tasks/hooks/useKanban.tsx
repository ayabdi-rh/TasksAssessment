import { useSensors, useSensor, PointerSensor, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useEffect, useMemo, useState } from 'react'
import { ColumnType } from '../components/KanbanBoard'
import { TaskStatus, TaskType } from '../../../dto/tasks.dto'
import { useGetTasks, useUpdateTask } from '../api/tasks'
import { arrayMove } from '@dnd-kit/sortable'

export const useKanbanBoard = () => {
  const { data: tasksData } = useGetTasks()
  const { mutate: updateTaskMutation } = useUpdateTask()

  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null)
  const [activeTask, setActiveTask] = useState<TaskType | null>(null)
  const [tasks, setTasks] = useState<TaskType[]>([])

  const columnDefinitions = [
    { name: 'BACKLOG', color: 'gray' },
    { name: 'TODO', color: 'blue' },
    { name: 'IN_PROGRESS', color: 'orange' },
    { name: 'COMPLETE', color: 'green' }
  ]

  const columns = columnDefinitions.map(column => ({
    ...column,
    tasks: tasks?.filter(task => task.status === column.name) || []
  }))

  const columnsId = useMemo(() => (columns?.map(col => col.name || '') as any) || [], [columns])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )

  const onUpdateTask = (id: string, status: TaskStatus) => {
    updateTaskMutation({ id: id, body: { status } })
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
      return
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'

    if (!isActiveATask) return

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      const activeIndex = tasks.findIndex(t => t.id === activeId)
      const overIndex = tasks.findIndex(t => t.id === overId)
      setTasks(tasks => {
        if (tasks[activeIndex].status != tasks[overIndex].status) {
          tasks[activeIndex].status = tasks[overIndex].status
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }
        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId)
        tasks[activeIndex].status = String(overId) as any

        onUpdateTask(tasks[activeIndex].id, overId as TaskStatus)
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData)
    }
  }, [tasksData])

  return {
    activeColumn,
    activeTask,
    setActiveColumn,
    setActiveTask,
    columnsId,
    sensors,
    columns,
    onDragEnd,
    onDragStart,
    tasks
  }
}
