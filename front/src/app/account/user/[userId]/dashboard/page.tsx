import DashboardMenu from "@/src/components/dashboard/User/DashboardMenu";

const UserDashboard = ({ params }: { params: { userId: string } }) =>{
    const { userId: userId } = params;
    const userIdNumber = parseInt(userId, 10); 

    console.log("User ID Number:", userIdNumber);
    
    return <DashboardMenu userId={userIdNumber} />;
};

export default UserDashboard;