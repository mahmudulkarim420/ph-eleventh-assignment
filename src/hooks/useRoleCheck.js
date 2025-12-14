import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useRoleCheck = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);
      // backend response structure: { data: { role: "admin" } }
      return res.data?.role || "user"; 
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
  });

  return { role, roleLoading: roleLoading || authLoading };
};

export default useRoleCheck;
