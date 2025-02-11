import { FiRefreshCcw } from "react-icons/fi"

const LoadingSpinner = () => {
  return (
    <div className="loading">
      <div className="animate-spin">
            <FiRefreshCcw size={40}/>
      </div>
    </div>
  )
}

export default LoadingSpinner
