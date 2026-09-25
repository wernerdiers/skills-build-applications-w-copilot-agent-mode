import ResourceTable from './ResourceTable.jsx'
import { useResource } from '../hooks/useResource.js'

const columns = [{ key: 'rank', label: 'Rank', render: (row) => <strong className="rank">{String(row.rank).padStart(2, '0')}</strong> }, { key: 'user', label: 'Athlete', render: (row) => row.user?.displayName ?? 'Unknown athlete' }, { key: 'points', label: 'Points' }]

export default function Leaderboard() {
  const resource = useResource('leaderboard')
  return <ResourceTable {...resource} columns={columns} rows={resource.data} emptyLabel="Rankings" />
}