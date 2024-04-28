import { GetAll } from "modules"
import { useParams } from "react-router-dom"


const ManagerBranch = () => {
    const {branchId} = useParams()
  return (
    <GetAll
        url={'/'}
    >
        {({data, isLoading, isError, error})=>{

            if(isLoading) return <h1>Loading</h1>
            if(isError) return <h2>Error</h2>
            return (
                <div className="container">

                </div>
            )
        }}
    </GetAll>
  )
}

export default ManagerBranch