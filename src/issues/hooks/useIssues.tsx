import { useQuery } from "@tanstack/react-query"
import { getIssues } from "../actions/get-issues.actions"

const useIssues = () => {

  const issuesQuery = useQuery({
    queryKey: ['issues'],
    queryFn: getIssues,
    staleTime: 1000 * 60 
  })


  console.log(issuesQuery.data)
  return {
    issuesQuery
  }
}

export default useIssues
