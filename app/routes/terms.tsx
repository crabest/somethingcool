import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Terms of Service - QWMC" },
    { name: "description", content: "Terms of Service for QWMC Minecraft server" },
  ];
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-fixed bg-center">
      <div className="flex min-h-screen items-start justify-center page-gradient pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="minecraft-panel text-center">
              <h1 className="font-minecraft text-5xl">
                <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                  Terms of Service
                </span>
              </h1>
              <p className="mt-4 text-gray-300">
                Last updated: March 14, 2024
              </p>
            </div>

            <div className="mt-12 space-y-6">
              <Section title="1. Acceptance of Terms">
                <p>
                  By accessing and using QWMC services, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </Section>

              <Section title="2. User Conduct">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Respect all server rules and guidelines</li>
                  <li>Do not use unauthorized modifications or cheats</li>
                  <li>Do not attempt to exploit bugs or glitches</li>
                  <li>Maintain appropriate behavior in all communications</li>
                  <li>Respect the privacy and rights of other players</li>
                </ul>
              </Section>

              <Section title="3. Account Security">
                <p>
                  You are responsible for maintaining the security of your account and password. 
                  QWMC cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
                </p>
              </Section>

              <Section title="4. Virtual Items and Currency">
                <p>
                  All virtual items, currency, and ranks are licensed to you and remain the property of QWMC. 
                  These items have no monetary value and cannot be transferred or sold outside of the game.
                </p>
              </Section>

              <Section title="5. Modifications to Service">
                <p>
                  QWMC reserves the right to modify or discontinue, temporarily or permanently, the service with or without notice. 
                  We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
                </p>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="minecraft-border bg-gray-900/90 p-6">
      <h2 className="font-minecraft text-2xl text-emerald-400 mb-4">{title}</h2>
      <div className="text-gray-300 space-y-4">
        {children}
      </div>
    </div>
  );
} 