import { useGetAllUsersQuery, useUpdateUserRoleMutation } from '../services/userApi';

const AdminDashboard = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleRoleChange = (userId: string, newRole: string) => {
    updateUserRole({ userId, role: newRole });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="border p-2"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="author">Author</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
