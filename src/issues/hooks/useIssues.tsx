import { useQuery } from "@tanstack/react-query"
import { getIssues } from "../actions/get-issues.actions"
import { State } from "../interfaces"


interface Props {
  state: State;
  selectedLabels: string[];
}

const useIssues = ({state,selectedLabels}:Props) => {
  //console.log(state)

  const issuesQuery = useQuery({
    queryKey: ['issues',{state, selectedLabels}],
    queryFn: () => getIssues(state,selectedLabels),
    staleTime: 1000 * 60 
  })


  //console.log(issuesQuery.data)
  return {
    issuesQuery
  }
}

export default useIssues
