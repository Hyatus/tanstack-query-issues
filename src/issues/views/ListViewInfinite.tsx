import { useState } from "react";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { State } from "../interfaces";
import useIssuesInfinite from "../hooks/useIssuesInfinite";

export const ListViewInfinite = () => {

  const [state, setState] =  useState<State>(State.All)
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const { issuesQuery } = useIssuesInfinite({
    state: state,
    selectedLabels: selectedLabels,
  });

  // [ [issue1, issue2], [issue3, issue4], [...]]
  // [ issue1, issue2, issue3, issue4 ]
  const issues = issuesQuery.data?.pages.flat() ?? [];


  const onLabelSelected = (label:string) => {
    if(selectedLabels.includes(label)){
      setSelectedLabels( selectedLabels.filter( l => l !== label));
    }else{
      setSelectedLabels([...selectedLabels, label])
    }

  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col justify-center">
            <IssueList issues={issues} onStateChange={setState} state={state}/>
               <button
                className="p-2 mb-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all"
                disabled={issuesQuery.isFetchingNextPage}
                onClick={()=>issuesQuery.fetchNextPage()}
               > 
                {
                  issuesQuery.isFetchingNextPage ?
                  'Cargando más...' : 'Cargar más...'
                }
               </button>
          </div>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker 
          onLabelSelected={onLabelSelected}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};
