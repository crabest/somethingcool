import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Refund Policy - QWMC" },
    { name: "description", content: "Refund Policy for QWMC Minecraft server" },
  ];
};

export default function Refund() {
  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-fixed bg-center">
      <div className="flex min-h-screen items-start justify-center page-gradient pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="minecraft-panel text-center">
              <h1 className="font-minecraft text-5xl">
                <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                  Refund Policy
                </span>
              </h1>
              <p className="mt-4 text-gray-300">
                Last updated: March 14, 2024
              </p>
            </div>

            <div className="mt-12 space-y-6">
              <Section title="1. Digital Goods">
                <p>
                  Due to the nature of digital goods, all purchases on QWMC are final and non-refundable. 
                  This includes but is not limited to ranks, cosmetics, and other virtual items.
                </p>
              </Section>

              <Section title="2. Exceptions">
                <p>
                  Refunds may be considered in the following exceptional circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                  <li>Unauthorized transactions</li>
                  <li>Technical errors resulting in items not being delivered</li>
                  <li>Duplicate charges for the same purchase</li>
                </ul>
              </Section>

              <Section title="3. How to Request a Refund">
                <div className="space-y-4">
                  <p>
                    If you believe you qualify for a refund, please provide the following information:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Your Minecraft username</li>
                    <li>Transaction ID or proof of purchase</li>
                    <li>Detailed reason for the refund request</li>
                    <li>Date of purchase</li>
                  </ul>
                  <p className="mt-4">
                    Submit your refund request to: <span className="text-emerald-400">support@qwmc.net</span>
                  </p>
                </div>
              </Section>

              <Section title="4. Processing Time">
                <p>
                  Refund requests are typically processed within 3-5 business days. If approved, 
                  refunds will be issued to the original payment method used for the purchase.
                </p>
              </Section>

              <Section title="5. Chargebacks">
                <p>
                  Filing a chargeback without first attempting to resolve the issue with our support team 
                  may result in permanent account suspension. We encourage you to contact us first to 
                  resolve any concerns.
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