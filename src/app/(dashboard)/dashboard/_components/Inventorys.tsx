import { useReducer } from 'react'
import { Filter } from './inventory.type'
import fetchInventory from './fetchInventory'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'

export default function Inventorys() {
  const [filters, setFilters] = useReducer(
    (prev: Filter, next: Partial<Filter>) => ({ ...prev, ...next }),
    { search: '' },
  )

  const debouncedSearch = useDebounce(filters.search, 500)

  const { data } = fetchInventory({
    queryKey: ['inventory', debouncedSearch],
    filters: { ...filters, search: debouncedSearch },
  })

  return (
    <div>
      <h1>Dashboard</h1>
      <Input
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
