import ResourceTable from './ResourceTable.jsx'
import { useResource } from '../hooks/useResource.js'

const columns = [{ key: 'name', label: 'Team' }, { key: 'motto', label: 'Motto' }, { key: 'members', label: 'Members', render: (row) => row.members?.map((member) => member.displayName).join(', ') || '—' }]

export default function Teams() {
  const resource = useResource('teams')
  return <ResourceTable {...resource} columns={columns} rows={resource.data} emptyLabel="Teams" />
}