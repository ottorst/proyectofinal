//Components
import DashboardMenu from "@/src/components/dashboard/User/DashboardMenu";
import ProtectedRoute from "@/src/helpers/dashboardAuth";

const UserDashboard = ({ params }: { params: { userId: string } }) =>{
    const { userId: userId } = params;
    const userIdNumber = parseInt(userId, 10); 

    console.log("User ID Number:", userIdNumber);
              
    return (
<ProtectedRoute adminOnly = {false}>
     <DashboardMenu userId={userIdNumber} />
 </ProtectedRoute>

    )
};


export default UserDashboard;