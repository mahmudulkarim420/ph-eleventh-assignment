import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthProvider";
import { toast } from "react-hot-toast";

// ===== Fetch all users =====
const fetchUsers = async () => {
  const res = await fetch("https://ph-eleventh-assignment-server.vercel.app//users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

// ===== Fetch backend user by email =====
const fetchLoggedInUser = async (email) => {
  const res = await fetch(`https://ph-eleventh-assignment-server.vercel.app//users?email=${email}`);
  if (!res.ok) throw new Error("Failed to fetch your profile");
  const data = await res.json();
  return data[0]; // backend user with role
};

// ===== Update user role =====
const updateUserRole = async ({ id, newRole, adminEmail }) => {
  const res = await fetch(
    `https://ph-eleventh-assignment-server.vercel.app/users/${id}/role?adminEmail=${adminEmail}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    }
  );

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to update role");
  }
  return res.json();
};

const AdminPanel = () => {
  const { user: loggedInUser } = useContext(AuthContext); // Firebase user
  const queryClient = useQueryClient();

  // ===== Fetch backend user (with role) =====
  const { data: backendUser, isLoading: loadingUser } = useQuery({
    queryKey: ["loggedInUser", loggedInUser?.email],
    queryFn: () => fetchLoggedInUser(loggedInUser.email),
    enabled: !!loggedInUser?.email,
  });

  // ===== Fetch all users =====
  const {
    data: users = [],
    isLoading: loadingUsers,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // ===== Role change mutation =====
  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      toast.success("Role updated successfully!");
      // Invalidate and refetch users to show updated role
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleRoleChange = (id, newRole) => {
    if (!backendUser || backendUser.role !== "admin")
      return toast.error("Only admin can change roles");
    mutation.mutate({ id, newRole, adminEmail: backendUser.email });
  };

  if (loadingUser || loadingUsers) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel - Manage Users</h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {backendUser?.role === "admin" && u.email !== backendUser.email && (
                  <select
                    className="border px-2 py-1 rounded text-white font-bold"
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                  >
                    <option className="bg-black text-white" value="user">
                      User
                    </option>
                    <option className="bg-black text-white" value="decorator">
                      Decorator
                    </option>
                    <option className="bg-black text-white" value="admin">
                      Admin
                    </option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
