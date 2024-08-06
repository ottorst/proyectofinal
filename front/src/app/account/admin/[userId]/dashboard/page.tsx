//Components
import DashboardAdmin from "@/src/components/dashboard/Admin/DashboardAdmin";
import ProtectedRoute from "@/src/helpers/dashboardAuth";

const AdminDashboard = ({ params }: { params: { userId: string } }) =>{
    const { userId: userId } = params;
    const userIdNumber = parseInt(userId, 10); 

    console.log("User ID Number:", userIdNumber);
    
    return (
        <ProtectedRoute adminOnly = {true}>
            <DashboardAdmin userId={userIdNumber} />
        </ProtectedRoute>
    )
};

export default AdminDashboard;