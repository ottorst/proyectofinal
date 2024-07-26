'use client';
import { useRouter } from "next/navigation";
import { useAuth } from "../../AuthContext";

interface DashboardAdminProps {
  userId: number;
}

const DashboardUser: React.FC<DashboardAdminProps> = ({ userId }) => {
    const router = useRouter();
    const { user } = useAuth();
      
    if (user && userId !== user.id) {
      router.push("/login");
      return null; 
  }
  
    if (user && user.admin) {
        router.push("/login");
        return null; 
    }

    if (!user) {
        return <div>Error loading user data.</div>;
    }
    return (
        <div className="mb-10">
            <div className="flex flex-col items-left bg-gray-800 bg-opacity-75 w-[90%] mx-auto rounded-md p-10">
                <section className="flex flex-col space-y-2 text-left">
                    <p className="font-bold">{`👤Name: ${user?.name}`}</p>
                    <p className="font-bold">{`🎂Birth: ${user?.birthday}`}</p>
                    <p className="font-bold">{`📧Email: ${user?.email}`}</p>
                    <p className="font-bold">{`📍Address: ${user?.address}`}</p>
                    <p className="font-bold">{`🌎Country: ${user?.country}`}</p>
                    <p className="font-bold">{`📱Phone: ${user?.phone}`}</p>
                    <p className="font-bold">{`🤧Allergies: ${user?.allergies}`}</p>
                </section>
            </div>            
        </div>
    );
};
  
  export default DashboardUser;
  