import { supabase } from '@/supabase/client'
import { useQuery } from '@tanstack/react-query'
import { Filter } from './inventory.type'

export default function fetchInventory({
  queryKey,
  filters,
}: {
  queryKey: string[]
  filters: Filter
}) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await supabase
        .from('inventory')
        .select('*, products!inner(*)')
        .ilike('products.name', `%${filters.search.trim()}%`)

      return data
    },
  })
}
