import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy - QWMC" },
    { name: "description", content: "Privacy Policy for QWMC Minecraft server" },
  ];
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-fixed bg-center">
      <div className="flex min-h-screen items-start justify-center page-gradient pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="minecraft-panel text-center">
              <h1 className="font-minecraft text-5xl">
                <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                  Privacy Policy
                </span>
              </h1>
              <p className="mt-4 text-gray-300">
                Last updated: March 14, 2024
              </p>
            </div>

            <div className="mt-12 space-y-6">
              <Section title="1. Information We Collect">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Minecraft username and UUID</li>
                  <li>IP addresses for security purposes</li>
                  <li>Chat messages and commands used on the server</li>
                  <li>Game statistics and achievements</li>
                  <li>Payment information (processed by third-party providers)</li>
                </ul>
              </Section>

              <Section title="2. How We Use Your Information">
                <ul className="list-disc pl-5 space-y-2">
                  <li>To provide and maintain our services</li>
                  <li>To prevent cheating and ensure fair play</li>
                  <li>To improve our services and user experience</li>
                  <li>To communicate with you about updates and changes</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </Section>

              <Section title="3. Data Security">
                <p>
                  We implement appropriate security measures to protect your information from unauthorized access, 
                  alteration, disclosure, or destruction. However, no method of transmission over the Internet is 
                  100% secure, and we cannot guarantee absolute security.
                </p>
              </Section>

              <Section title="4. Third-Party Services">
                <p>
                  Our service may use third-party services that collect information. These services have their own 
                  privacy policies, and we encourage you to read them.
                </p>
              </Section>

              <Section title="5. Your Rights">
                <p>
                  You have the right to access, correct, or delete your personal information. Contact us if you 
                  wish to exercise these rights or have any privacy-related questions.
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