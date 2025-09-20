// import React from "react";
// import { useAuthStore } from "../../../store/authStore";
// import InviteUserForm from "../components/InviteUserForm";

// export default function AdminPage() {
//   const { user } = useAuthStore();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
//       <p>Signed in as: <strong>{user?.email}</strong></p>
//       <p className="mt-4">This is a minimal admin page for testing permissions.</p>

//       <InviteUserForm />
//     </div>
//   );
// }

import React, { useState } from "react";
import UserList from "../components/UserList";
import AddUser from "../components/AddUser";
import EditUser from "../components/EditUser";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const AdminPages = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleAddUser = (user) => {
    const newUser = { ...user, id: Date.now() };
    setUsers([...users, newUser]);
  };
  const handleDeleteUser = (user) => {
    setUserToDelete(user);
  };

  const confirmDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    setUserToDelete(null);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setSelectedUser(null);
  };

  const cancelEdit = () => {
    setSelectedUser(null);
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-50 overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-bl from-sky-200 to-indigo-200 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 opacity-50"></div>
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="absolute top-1/4 left-1/2 w-[36rem] h-[36rem] bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 rounded-full blur-3xl -translate-x-1/2 -z-10 opacity-60"></div>
        <div className="space-y-8">
          <div>
            <div className="overflow-x-auto bg-white/60 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-6">
              <UserList
                users={users}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            </div>
          </div>
          <div>
            <div className="bg-white/60 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-6">
              <AddUser onAdd={handleAddUser} />
            </div>
          </div>
        </div>
      </main>
      {selectedUser && (
        <EditUser
          key={selectedUser.id}
          selectedUser={selectedUser}
          onUpdate={handleUpdateUser}
          onCancel={cancelEdit}
        />
      )}
      <DeleteConfirmationModal
        user={userToDelete}
        onConfirm={confirmDelete}
        onCancel={() => setUserToDelete(null)}
      />
    </div>
  );
};

export default AdminPages;
