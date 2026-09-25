export default function ResourceTable({ columns, rows, loading, error, emptyLabel }) {
  if (loading) return <div className="state-panel">Loading {emptyLabel.toLowerCase()}...</div>
  if (error) return <div className="state-panel state-panel-error">{error}</div>
  if (!rows.length) return <div className="state-panel">No {emptyLabel.toLowerCase()} yet.</div>

  return <div className="table-wrap"><table><thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row._id ?? row.id}>{columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key] ?? '—'}</td>)}</tr>)}</tbody></table></div>
}