import { Link } from "@remix-run/react";
import { useState } from "react";

export const meta = () => {
  return [
    { title: "Ban Appeal - QWMC" },
    { name: "description", content: "Submit a ban appeal for QWMC Minecraft server" },
  ];
};

export default function BanAppeal() {
  const [formData, setFormData] = useState({
    username: "",
    reason: "",
    explanation: "",
    future: "",
    evidence: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement ban appeal submission
    console.log('Ban appeal submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-black/50 to-black/70">
        <div className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="font-minecraft text-4xl text-emerald-400">
                Ban Appeal
              </h1>
              <p className="mt-2 text-gray-400">
                Submit an appeal to have your ban reviewed
              </p>
            </div>

            {/* Guidelines */}
            <div className="mb-8 rounded-lg border border-gray-800 bg-black/50 p-4">
              <h2 className="mb-2 font-minecraft text-lg text-emerald-400">Guidelines</h2>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-400">
                <li>Be honest about the reason for your ban</li>
                <li>Provide any evidence that supports your appeal</li>
                <li>Explain what you've learned from this experience</li>
                <li>Appeals are reviewed within 24-48 hours</li>
              </ul>
            </div>

            {/* Appeal Form */}
            <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-gray-800 bg-black/50 p-6">
              <div>
                <label className="mb-2 block text-sm text-gray-400">Minecraft Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="minecraft-border w-full bg-black/50 p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">Why were you banned?</label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  className="minecraft-border w-full bg-black/50 p-2 text-white"
                  required
                  placeholder="Enter the reason for your ban"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">Explain your side of the story</label>
                <textarea
                  value={formData.explanation}
                  onChange={(e) => setFormData(prev => ({ ...prev, explanation: e.target.value }))}
                  className="minecraft-border min-h-[120px] w-full resize-y bg-black/50 p-2 text-white"
                  required
                  placeholder="Provide details about what happened..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">What will you do differently in the future?</label>
                <textarea
                  value={formData.future}
                  onChange={(e) => setFormData(prev => ({ ...prev, future: e.target.value }))}
                  className="minecraft-border min-h-[100px] w-full resize-y bg-black/50 p-2 text-white"
                  required
                  placeholder="How will you prevent this from happening again?"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">Evidence (Optional)</label>
                <textarea
                  value={formData.evidence}
                  onChange={(e) => setFormData(prev => ({ ...prev, evidence: e.target.value }))}
                  className="minecraft-border min-h-[100px] w-full resize-y bg-black/50 p-2 text-white"
                  placeholder="Screenshots, chat logs, or other evidence (provide links)"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="minecraft-button bg-emerald-600 hover:bg-emerald-700"
                >
                  Submit Appeal
                </button>
              </div>
            </form>

            {/* Appeal Status */}
            <div className="mt-6 rounded-lg border border-gray-800 bg-black/50 p-4">
              <p className="text-center text-sm text-gray-400">
                <span className="text-yellow-500">NOTE:</span> You can check the status of your appeal in the{' '}
                <Link to="/profile" className="text-emerald-400 hover:underline">
                  profile section
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 