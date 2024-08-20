import { useSensors, useSensor, PointerSensor, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {  useMemo, useState } from 'react'
import { ColumnType } from '../components/KanbanBoard'
import { TaskStatus, TaskType } from '../../../dto/tasks.dto'
import { useGetTasks, useUpdateTask } from '../api/tasks'

export const useKanbanBoard = () => {
  const { data: tasks } = useGetTasks()
  const { mutate: updateTaskMutation } = useUpdateTask()

  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null)
  const [activeTask, setActiveTask] = useState<TaskType | null>(null)


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
    if (!tasks) return

    setActiveColumn(null)
    setActiveTask(null)
  
    const { active, over } = event
    if (!over || active.id === over.id || active.data.current?.type !== 'Task') return
  
    const activeId = active.id
    const overId = over.id
    const activeIndex = tasks?.findIndex(t => t.id === activeId)
  
    // Determine new status based on drop target
    const newStatus = over.data.current?.type === 'Column' 
      ? overId as TaskStatus 
      : tasks.find(t => t.id === overId)?.status as TaskStatus
  
    // Update task status
    if (newStatus) {
      tasks[activeIndex].status = newStatus
      onUpdateTask(tasks[activeIndex].id, newStatus)
    }
  }


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
