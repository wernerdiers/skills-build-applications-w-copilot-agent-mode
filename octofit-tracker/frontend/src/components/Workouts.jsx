import ResourceTable from './ResourceTable.jsx'
import { useResource } from '../hooks/useResource.js'

const columns = [{ key: 'title', label: 'Workout' }, { key: 'type', label: 'Focus' }, { key: 'difficulty', label: 'Level' }, { key: 'durationMinutes', label: 'Minutes' }, { key: 'description', label: 'Description' }]

export default function Workouts() {
  const resource = useResource('workouts', '/api/workouts/')
  return <ResourceTable {...resource} columns={columns} rows={resource.data} emptyLabel="Workouts" />
}