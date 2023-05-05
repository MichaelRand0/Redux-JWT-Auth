import Search from '@/shared/search/Search'
import { useSearchUsersQuery } from '@/redux/api/todo.api'
import { useSearch } from '@/shared/search/hooks'
import { useDebounce } from '@/hooks/debounce'

export default function Home() {
  const { registerData, values } = useSearch({ name: 'search', label: 'Поиск пользователей GitHub' })
  const debouncedValue = useDebounce(values?.search, 500)
  const { data } = useSearchUsersQuery(debouncedValue, {
    skip: !debouncedValue,
  })
  const searchResults =
    data?.items?.map((item) => {
      return {
        name: item.login,
        link: item.html_url,
      }
    }) ?? []

  return (
    <div className="p-5">
      <Search registerData={registerData} data={debouncedValue ? searchResults : []} />
    </div>
  )
}
