import Loader from "components/loader"
import { useParams } from "react-router-dom"


const ManagerBranchOrders = () => {
    const {branchId} = useParams()

  return (
    <GetAll
        // url={}
    >
        {({data,isLoading, isError, error}) => {
            if(isLoading) return <Loader/>
            if(isError) return <h1>Error</h1>
            
            console.log(data?.data);
            return (
                <div className="container">

                </div>
            )
        }}
    </GetAll>
  )
}

export default ManagerBranchOrders