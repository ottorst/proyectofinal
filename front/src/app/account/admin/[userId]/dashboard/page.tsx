import DashboardAdmin from "@/src/components/dashboard/Admin/DashboardAdmin";

const AdminDashboard = ({ params }: { params: { userId: string } }) =>{
    const { userId: userId } = params;
    const userIdNumber = parseInt(userId, 10); 

    console.log("User ID Number:", userIdNumber);
    
    return <DashboardAdmin userId={userIdNumber} />;
};

export default AdminDashboard;