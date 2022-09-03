/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useState, useEffect, useMemo} from 'react'
import {useQuery} from 'react-query'
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  QUERIES,
  WithChildren,
} from '../../../../../../_metronic/helpers'
import {getCarList} from './_requests'
import {useQueryRequest} from './QueryRequestProvider'

const QueryResponseContext = createResponseContext<any>(initialQueryResponse)
const QueryResponseProvider: FC<WithChildren> = ({children}) => {
  const {state} = useQueryRequest()
  const [query, setQuery] = useState<any>(state)
  const updatedQuery = useMemo(() => state, [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
      setTimeout(() => {
        refetch()
      }, 500)
    }
  }, [updatedQuery])

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${QUERIES.CAR_LIST}-${query}`,
    () => {
      return getCarList(query)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  }

  const {response} = useQueryResponse()
  if (!response || !response.pager) {
    return defaultPaginationState
  }
  const linkArray = []
  const numberOfPage = Math.ceil(response.pager?.totalRecords / response.pager?.pageSize)
  for (let index = 1; index <= numberOfPage; index++) {
    linkArray.push({
      url: '/?page=' + index,
      label: `${index}`,
      active: response.pager.pageNo == index,
      page: index,
    })
  }
  const newPagination = {
    page: response.pager.pageNo,
    items_per_page: response.pager.pageSize,
    last_page: numberOfPage,
    total: response.pager.totalRecords,
    links: [
      {
        url: null,
        label: '&laquo; Previous',
        active: false,
        page: response.pager.pageNo - 1 < 1 ? response.pager.pageNo : response.pager.pageNo - 1,
      },
      ...linkArray,
      {
        url: '/?page=2',
        label: 'Next &raquo;',
        active: false,
        page:
          response.pager.pageNo + 1 > numberOfPage
            ? response.pager.pageNo
            : response.pager.pageNo + 1,
      },
    ],
  }
  return newPagination
}

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
