import Search from '@/shared/search/Search'
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '@/redux/api/todo.api'
import { useDebounce } from '@/hooks/debounce'
import { useEffect } from 'react'
import SearchItem from '@/shared/search/components/SearchItem'
import { useRouter } from 'next/router'
import { useSearch } from '@/shared/search/hooks'
import Profile from '@/shared/profile/Profile'
import { useAuth } from '@/hooks/auth'

export default function Home() {
  const { registerData, values, setLabel } = useSearch({
    name: 'search',
    label: 'Поиск пользователей GitHub',
  })
  const { push } = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      push('auth/login')
    }
  }, [user])

  const debouncedValue = useDebounce(values?.search, 500)
  const { data, isFetching } = useSearchUsersQuery(debouncedValue, {
    skip: debouncedValue?.length < 3 || !debouncedValue,
  })
  const [fetchRepos, { data: repos = null, isFetching: areReposFetching }] =
    useLazyGetUserReposQuery()

  useEffect(() => {
    if (isFetching) {
      setLabel('Получение данных...')
    } else {
      setLabel('Поиск пользователей GitHub')
    }
  }, [isFetching])

  const searchResults =
    data?.items?.map((item) => {
      return {
        name: item.login,
        link: item.html_url,
      }
    }) ?? []

  const searchItemHandler = (username: string) => {
    fetchRepos(username)
  }

  return (
    <div className='p-5 pb-32'>
      <div className="flex">
        <Search
          searchItemHandler={searchItemHandler}
          registerData={registerData}
          data={debouncedValue?.length >= 3 ? searchResults : []}
        />

        <div className="ml-20 border p-5 w-full ">
          {repos ? (
            areReposFetching ? (
              <span>Получаем репозитории...</span>
            ) : (
              <h2 className="text-xl font-bold">
                Репозитории <span className="text-green-500">{repos?.[0]?.owner?.login}</span>:
              </h2>
            )
          ) : (
            'Выберите пользователя для просмотра его репозиториев'
          )}
          <div className="mt-2 max-h-[500px] overflow-auto">
            {repos
              ? repos?.length > 0
                ? repos?.map((repo) => {
                    return (
                      <SearchItem
                        className="mb-1 last:mb-0"
                        key={repo.name}
                        item={{ name: repo.name, link: repo.html_url }}
                      />
                    )
                  })
                : 'Репозитории отсутствуют...'
              : ''}
          </div>
        </div>
      </div>
      <Profile />
    </div>
  )
}
