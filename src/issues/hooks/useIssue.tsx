import { useQuery } from "@tanstack/react-query"
import { getIssue } from "../actions/get-issue.actions"
import { getIssueComments } from "../actions"

const useIssue = ( issueNumber: number) => {

  const issueQuery = useQuery({
    queryKey: ['issues',issueNumber],
    queryFn: ()=>getIssue(issueNumber),
    staleTime: 1000 * 60,
    retry:false, 
  })

  // PARALELO
  // const commentsQuery = useQuery({
  //   queryKey: ['issues',issueNumber,'comments'],
  //   queryFn: ()=>getIssueComments(issueNumber),
  //   staleTime: 1000 * 60,
  //   retry:false, 
  // })


  // SECUENCIAL 
  const commentsQuery = useQuery({
    queryKey: ['issues',issueQuery.data?.number,'comments'],
    queryFn: ()=>getIssueComments(issueQuery.data!.number),
    staleTime: 1000 * 60,
    retry:false, 
    enabled: issueQuery.data !== undefined, // Sólo si IssueQuery tiene data
  })

  //console.log(issueQuery.data)
  return {
    issueQuery,
    commentsQuery
  }
}

export default useIssue
