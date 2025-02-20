import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions/get-issues.actions";
import { State } from "../interfaces";
import { useEffect, useState } from "react";

interface Props {
  state: State;
  selectedLabels: string[];
}

const useIssues = ({ state, selectedLabels }: Props) => {
  //console.log(state)

  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ["issues", { page, state, selectedLabels }],
    queryFn: () => getIssues(state, selectedLabels, page),
    staleTime: 1000 * 60,
  });

  useEffect(()=>{
    setPage(1)
  },[state])

  useEffect(()=>{
    setPage(1)
  },[selectedLabels])

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) {
      // Ya no nos vamos a mover a otra página
      return;
    }

    // Hay registros en la página anterior
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 1) {
      return;
    }

    setPage((prevPage) => prevPage - 1);
  };

  //console.log(issuesQuery.data)
  return {
    issuesQuery,
    // Getters
    page, 
    // Actions
    nextPage,
    prevPage
  };
};

export default useIssues;
