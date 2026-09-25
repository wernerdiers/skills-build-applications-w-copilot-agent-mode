import ResourceTable from './ResourceTable.jsx'
import { useResource } from '../hooks/useResource.js'

const columns = [{ key: 'user', label: 'Athlete', render: (row) => row.user?.displayName ?? 'Unknown athlete' }, { key: 'type', label: 'Activity' }, { key: 'durationMinutes', label: 'Minutes' }, { key: 'distanceKm', label: 'Distance (km)', render: (row) => row.distanceKm ?? '—' }, { key: 'points', label: 'Points' }]

export default function Activities() {
  const resource = useResource('activities', '/api/activities/')
  return <ResourceTable {...resource} columns={columns} rows={resource.data} emptyLabel="Activities" />
}