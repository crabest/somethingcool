import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";
import { getUsers } from "~/models/user.server";
import { UserStatus } from "@prisma/client";

interface Player {
  id: string;
  username: string;
  status: UserStatus;
  lastSeen: string | null;
  joinedAt: string;
  playtime: number; // in minutes
  role: string;
  email: string;
}

interface PlayerUpdate {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  status?: UserStatus;
}

export async function loader() {
  const users = await getUsers();
  return json({ users });
}

export default function PlayersManagement() {
  const { users } = useLoaderData<typeof loader>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const fetcher = useFetcher();
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    role: "",
    status: "" as UserStatus
  });

  // Update formData when a player is selected
  useEffect(() => {
    if (selectedPlayer) {
      setFormData({
        email: selectedPlayer.email,
        username: selectedPlayer.username,
        role: selectedPlayer.role,
        status: selectedPlayer.status
      });
    }
  }, [selectedPlayer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedPlayer) return;

    fetcher.submit(
      { 
        userId: selectedPlayer.id,
        ...formData
      },
      { method: "POST", action: "/admin/updatePlayer" }
    );
  };

  // Filter players based on search term
  const filteredPlayers = users.filter(player => 
    player.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format playtime from minutes to readable string
  const formatPlaytime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Format date to readable string
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  // Format last seen
  const formatLastSeen = (lastSeen: string | null) => {
    if (!lastSeen) return 'Never';
    
    const date = new Date(lastSeen);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // If less than 24 hours, show relative time
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      if (hours < 1) {
        const minutes = Math.floor(diff / (60 * 1000));
        return `${minutes} minutes ago`;
      }
      return `${hours} hours ago`;
    }
    
    // Otherwise show date
    return formatDate(lastSeen);
  };

  const handlePlayerUpdate = async (userId: string, updates: PlayerUpdate) => {
    try {
      const response = await fetcher.submit(
        { userId, ...updates },
        { method: "POST", action: "/admin/updatePlayer" }
      );

      setSelectedPlayer(prev => prev?.id === userId ? { ...prev, ...updates } : prev);
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  const handlePasswordReset = async (userId: string) => {
    if (!newPassword.trim()) return;
    
    try {
      fetcher.submit(
        { userId, password: newPassword },
        { method: "POST", action: "/admin/updatePlayer" }
      );

      setShowResetPassword(false);
      setNewPassword("");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-minecraft text-3xl text-emerald-400">Players</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search players..."
            className="w-64 rounded-lg bg-gray-800/80 px-4 py-2 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Players List */}
        <div className="space-y-4">
          {filteredPlayers.map((player) => (
            <button
              key={player.id}
              onClick={() => setSelectedPlayer(player)}
              className="w-full rounded-lg bg-gray-900/90 p-4 text-left transition-all hover:bg-gray-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://mc-heads.net/avatar/${player.username}`}
                    alt={player.username}
                    className="h-10 w-10 rounded"
                  />
                  <div>
                    <span className="font-minecraft text-emerald-400">
                      {player.username}
                    </span>
                    <div className="text-sm text-gray-400">
                      Last seen: {formatLastSeen(player.lastSeen)}
                    </div>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-sm ${
                    player.status === "ONLINE"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {player.status.toLowerCase()}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Player Details & Actions */}
        {selectedPlayer ? (
          <div className="minecraft-panel space-y-6">
            <div className="flex items-start gap-4">
              <img
                src={`https://mc-heads.net/avatar/${selectedPlayer.username}/100`}
                alt={selectedPlayer.username}
                className="h-20 w-20 rounded"
              />
              <div className="space-y-2 flex-1">
                <input
                  type="text"
                  value={selectedPlayer.username}
                  onChange={(e) => handlePlayerUpdate(selectedPlayer.id, { username: e.target.value })}
                  className="font-minecraft text-2xl text-emerald-400 bg-transparent border-b border-transparent hover:border-gray-700 focus:border-emerald-500 focus:outline-none w-full"
                />
                <p className="text-gray-400">UUID: {selectedPlayer.id}</p>
              </div>
            </div>

            {/* Player Info */}
            <div className="space-y-4">
              <div>
                <h4 className="font-minecraft text-lg text-emerald-400 mb-4">Player Information</h4>
                
                {/* Combined Edit Form */}
                <fetcher.Form method="post" action="/admin/updatePlayer" className="space-y-4" onSubmit={handleSubmit}>
                  <input type="hidden" name="userId" value={selectedPlayer.id} />
                  
                  <div className="rounded-lg bg-gray-800/50 p-4">
                    <label className="text-sm text-gray-400 block mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="minecraft-border w-full rounded bg-black/50 p-2 text-white"
                    />
                  </div>

                  <div className="rounded-lg bg-gray-800/50 p-4">
                    <label className="text-sm text-gray-400 block mb-1">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="minecraft-border w-full rounded bg-black/50 p-2 text-white"
                    />
                  </div>

                  <div className="rounded-lg bg-gray-800/50 p-4">
                    <label className="text-sm text-gray-400 block mb-1">Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="minecraft-border w-full rounded bg-black/50 p-2 text-white"
                    >
                      <option value="user">User</option>
                      <option value="helper">Helper</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                      <option value="builder">Builder</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="minecraft-button bg-emerald-600 hover:bg-emerald-700 px-8"
                    >
                      Save Changes
                    </button>
                  </div>
                </fetcher.Form>

                {/* Read-only Info */}
                <div className="mt-6 grid gap-4">
                  <div className="rounded-lg bg-gray-800/50 p-4">
                    <label className="text-sm text-gray-400 block mb-1">Join Date</label>
                    <div className="text-white">
                      {formatDate(selectedPlayer.joinedAt)}
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-800/50 p-4">
                    <label className="text-sm text-gray-400 block mb-1">Last Seen</label>
                    <div className="text-white">
                      {formatLastSeen(selectedPlayer.lastSeen)}
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-800/50 p-4">
                    <label className="text-sm text-gray-400 block mb-1">Playtime</label>
                    <div className="text-white">
                      {formatPlaytime(selectedPlayer.playtime)}
                    </div>
                  </div>
                </div>

                {/* Password Reset Button */}
                <div className="mt-6">
                  <button
                    onClick={() => setShowResetPassword(true)}
                    className="minecraft-button bg-red-600 hover:bg-red-700 w-full"
                  >
                    Reset Password
                  </button>
                </div>
              </div>

              {/* Status Management */}
              <fetcher.Form method="post" action="/admin/updatePlayer" className="space-y-2" onSubmit={handleSubmit}>
                <input type="hidden" name="userId" value={selectedPlayer.id} />
                <h4 className="font-minecraft text-lg text-emerald-400">Status Management</h4>
                <div className="flex items-center gap-4">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="minecraft-border w-full rounded bg-black/50 p-3 text-white"
                  >
                    {Object.values(UserStatus).map((status) => (
                      <option 
                        key={status} 
                        value={status}
                        className={getStatusTextColor(status)}
                      >
                        {formatStatus(status)}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="minecraft-button bg-emerald-600 hover:bg-emerald-700 px-4"
                  >
                    Update
                  </button>
                  <div className={`px-3 py-1 rounded-full ${getStatusBadgeStyle(formData.status)}`}>
                    {formatStatus(formData.status)}
                  </div>
                </div>
              </fetcher.Form>
            </div>
          </div>
        ) : (
          <div className="minecraft-panel text-center text-gray-400">
            Select a player to view details and actions
          </div>
        )}
      </div>

      {/* Password Reset Modal */}
      {showResetPassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="minecraft-panel w-full max-w-md p-6">
            <h3 className="font-minecraft text-xl text-emerald-400 mb-4">
              Reset Password
            </h3>
            <p className="text-gray-400 mb-4">
              Are you sure you want to reset the password for {selectedPlayer?.username}?
            </p>
            <div className="space-y-4">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="minecraft-border w-full rounded bg-black/50 p-2 text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowResetPassword(false);
                    setNewPassword("");
                  }}
                  className="minecraft-button bg-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePasswordReset(selectedPlayer?.id || "")}
                  className="minecraft-button bg-red-600 hover:bg-red-700"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Replace getStatusButtonStyle with these helper functions
function getStatusBadgeStyle(status: UserStatus): string {
  switch (status) {
    case "ONLINE":
      return "bg-green-500/20 text-green-400";
    case "OFFLINE":
      return "bg-gray-500/20 text-gray-400";
    case "AWAY":
      return "bg-yellow-500/20 text-yellow-400";
    case "BANNED":
      return "bg-red-500/20 text-red-400";
    case "MUTED":
      return "bg-orange-500/20 text-orange-400";
    case "DELETED":
      return "bg-purple-500/20 text-purple-400";
    case "PENDING":
      return "bg-blue-500/20 text-blue-400";
    case "APPROVED":
      return "bg-emerald-500/20 text-emerald-400";
    case "REJECTED":
      return "bg-rose-500/20 text-rose-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
}

function getStatusTextColor(status: UserStatus): string {
  switch (status) {
    case "ONLINE":
      return "text-green-400";
    case "OFFLINE":
      return "text-gray-400";
    case "AWAY":
      return "text-yellow-400";
    case "BANNED":
      return "text-red-400";
    case "MUTED":
      return "text-orange-400";
    case "DELETED":
      return "text-purple-400";
    case "PENDING":
      return "text-blue-400";
    case "APPROVED":
      return "text-emerald-400";
    case "REJECTED":
      return "text-rose-400";
    default:
      return "text-gray-400";
  }
}

// Keep the formatStatus function
function formatStatus(status: UserStatus): string {
  return status.charAt(0) + status.slice(1).toLowerCase();
} 