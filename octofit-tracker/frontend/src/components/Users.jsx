import ResourceTable from './ResourceTable.jsx'
import { useResource } from '../hooks/useResource.js'

const columns = [{ key: 'displayName', label: 'Athlete' }, { key: 'username', label: 'Username' }, { key: 'email', label: 'Email' }]

export default function Users() {
  const resource = useResource('users', '/api/users/')
  return <ResourceTable {...resource} columns={columns} rows={resource.data} emptyLabel="Athletes" />
}