import Drawer from '../../../components/Drawer'
import Input from '../../../components/Input'
import ListBox from '../../../components/ListBox'
import Button from '../../../components/Button'
import { useTaskEditor } from '../hooks/useTaskEditor'
import trashicon from '../../../assets/Trash.svg'
import Modal from '../../../components/Modal'

const TaskEditor = () => {
  const {
    selectedTask,
    formData,
    handleChange,
    isOpen,
    close,
    onSubmit,
    onDelete,
    loading,
    isDeleting,
    deleteModalOpen,
    setDeleteModalOpen
  } = useTaskEditor()
  return (
    <Drawer isOpen={isOpen} close={close} title={selectedTask ? 'Edit Task' : 'Create Task'}>
      <img
        src={trashicon}
        className="h-5 w-5 ml-auto cursor-pointer -mt-11"
        onClick={() => setDeleteModalOpen(true)}
      />
      <form className="mt-5 flex flex-col gap-3 h-full" onSubmit={onSubmit}>
        <Input
          name="name"
          type="text"
          value={formData.name}
          onChange={e => handleChange({ name: e.target.name, value: e.target.value })}
          required
          label="Task Name"
        />

        <Input
          name="description"
          type="text"
          value={formData.description || ''}
          onChange={e => handleChange({ name: e.target.name, value: e.target.value })}
          label="Task Description"
        />

        <ListBox
          label="Status"
          options={['COMPLETE', 'IN_PROGRESS', 'BACKLOG', 'TODO']}
          selected={formData.status}
          setSelected={s => handleChange({ name: 'status', value: s })}
        />
        <div className="mt-auto flex gap-2">
          <Button className="bg-white !text-black border hover:bg-stone-50" onClick={close}>
            Cancel
          </Button>
          <Button loading={loading} type="submit">
            Save
          </Button>
        </div>
      </form>

      {/* Delete Task Dialog Modal */}
      <Modal isOpen={deleteModalOpen} close={() => setDeleteModalOpen(false)} title="Delete Task?">
        <p className="text-sm text-gray-500">
          Are you sure you want to deactivate your account? All of your data will be permanently removed. This
          action cannot be undone.
        </p>

        <div className="mt-8 pb-2 flex gap-2">
          <Button className="bg-white !text-black border hover:bg-stone-50" onClick={close}>
            Cancel
          </Button>
          <Button loading={isDeleting} onClick={onDelete}>
            Save
          </Button>
        </div>
      </Modal>
    </Drawer>
  )
}

export default TaskEditor
