"use client"


// components/ProtectedRoute.js
import { useEffect, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/components/AuthContext";


interface ProtectedRouteProps {
    children: ReactNode;
    adminOnly: boolean;
  }

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children, adminOnly }) => {
  const router = useRouter();
  const { user} = useAuth();


  useEffect(() => {
    if (!user) {
      router.push("/login"); 
  } else if (adminOnly && !user.admin) {
      router.push(`/account/user/${user.id}/dashboard`); 
  }else if (!adminOnly && user.admin) {
    router.push(`/account/admin/${user.id}/dashboard`); 
} 
  }, [user,adminOnly,router]);
  

  if (!user || (adminOnly && !user.admin)) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
