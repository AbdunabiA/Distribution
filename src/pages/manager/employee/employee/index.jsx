import Loader from "components/loader"
import { GetAll } from "modules"
import { ProfileData } from "pages/profile/profiledata"
import { useParams } from "react-router-dom"


const ManagerEmployee = () => {
    const { employeeId} = useParams()
  return (
    <GetAll
        url={`/users/details/${employeeId}`}
        queryKey={["oneEmployee"]}
    >
        {({data, isLoading, isError, error}) => {
            if(isLoading) return <Loader/>
            if(isError) return <h1>Error</h1>
            console.log(data?.data);
            return (
              <div className="container">
                <div>
                  <ProfileData />
                  
                </div>
              </div>
            );
        }}
    </GetAll>
  )
}

export default ManagerEmployee