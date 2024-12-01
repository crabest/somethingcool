import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

interface Application {
  id: string;
  type: "staff" | "builder" | "youtuber";
  status: "pending" | "approved" | "rejected";
  applicant: {
    minecraft_username: string;
    discord: string;
  };
  submittedAt: string;
  fields: Record<string, string>;
}

// Mock data
const MOCK_APPLICATIONS: Application[] = [
  {
    id: "app_1",
    type: "staff",
    status: "pending",
    applicant: {
      minecraft_username: "TarboushMC",
      discord: "TarboushMC",
    },
    submittedAt: "2024-03-15T10:30:00Z",
    fields: {
      age: "9",
      timezone: "UTC+4",
      experience: "I've been a moderator on two other servers...",
      about_yourself: "I'm a dedicated Minecraft player...",
      why_join: "I want to help maintain a positive community...",
      time_available: "60 hours per week",
    },
  },
  {
    id: "app_2",
    type: "builder",
    status: "pending",
    applicant: {
      minecraft_username: "MasterBuilder456",
      discord: "Builder#5678",
    },
    submittedAt: "2024-03-14T15:45:00Z",
    fields: {
      portfolio: "https://imgur.com/gallery/...",
      building_style: "Medieval and Fantasy",
      worldedit: "Advanced",
      about_yourself: "I've been building in Minecraft for 5 years...",
      availability: "Evenings and weekends",
      project_idea: "I'd love to create a medieval marketplace...",
    },
  },
  {
    id: "app_3",
    type: "youtuber",
    status: "approved",
    applicant: {
      minecraft_username: "StreamerPro",
      discord: "Streamer#9012",
    },
    submittedAt: "2024-03-13T09:15:00Z",
    fields: {
      channel_link: "https://youtube.com/...",
      subscriber_count: "15000",
      server_video: "https://youtube.com/watch?v=...",
      content_plans: "Weekly survival series and build showcases",
      upload_schedule: "Weekly",
      previous_experience: "3 years of Minecraft content creation",
    },
  },
];

export const loader = async () => {
  // In the future, this will fetch from your API
  return json({ applications: MOCK_APPLICATIONS });
};

export default function Applications() {
  const { applications } = useLoaderData<typeof loader>();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const filteredApps = applications.filter(
    (app) => filter === "all" || app.status === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-minecraft text-3xl text-emerald-400">Applications</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="rounded-lg bg-gray-800/80 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        >
          <option value="all">All Applications</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Applications List */}
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className={`w-full rounded-lg bg-gray-900/90 p-4 text-left transition-all hover:bg-gray-900 ${
                selectedApp?.id === app.id ? 'ring-2 ring-emerald-500/50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-minecraft text-emerald-400">
                  {app.applicant.minecraft_username}
                </span>
                <span className={`rounded-full px-3 py-1 text-sm ${
                  app.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                  app.status === "approved" ? "bg-green-500/20 text-green-400" :
                  "bg-red-500/20 text-red-400"
                }`}>
                  {app.status}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                <p>Type: {app.type}</p>
                <p>Submitted: {new Date(app.submittedAt).toLocaleDateString()}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Application Details */}
        {selectedApp ? (
          <div className="minecraft-panel">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-minecraft text-2xl text-emerald-400">
                Application Details
              </h3>
              {selectedApp.status === "pending" && (
                <div className="flex gap-3">
                  <button 
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-green-500/20 px-6 py-3 font-minecraft text-green-400 transition-all hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      // Add approve logic here
                    }}
                  >
                    <span className="absolute h-0 w-0 rounded-full bg-green-400 transition-all duration-300 group-hover:h-56 group-hover:w-56"></span>
                    <span className="relative flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Approve
                    </span>
                  </button>
                  <button 
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-red-500/20 px-6 py-3 font-minecraft text-red-400 transition-all hover:bg-red-500 hover:text-white"
                    onClick={() => {
                      // Add reject logic here
                    }}
                  >
                    <span className="absolute h-0 w-0 rounded-full bg-red-400 transition-all duration-300 group-hover:h-56 group-hover:w-56"></span>
                    <span className="relative flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Reject
                    </span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-minecraft text-lg text-emerald-400">Applicant Info</h4>
                <div className="mt-2 space-y-2 text-gray-300">
                  <p>Minecraft: {selectedApp.applicant.minecraft_username}</p>
                  <p>Discord: {selectedApp.applicant.discord}</p>
                </div>
              </div>

              {Object.entries(selectedApp.fields).map(([key, value]) => (
                <div key={key}>
                  <h4 className="font-minecraft text-lg text-emerald-400">
                    {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </h4>
                  <p className="mt-2 text-gray-300">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="minecraft-panel text-center text-gray-400">
            Select an application to view details
          </div>
        )}
      </div>
    </div>
  );
} 