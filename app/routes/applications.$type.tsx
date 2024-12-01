import { json, redirect, type LoaderFunction, type ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation, useActionData } from "@remix-run/react";
import { useState } from "react";

interface FormField {
  id: string;
  label: string;
  type: "text" | "number" | "textarea" | "select";
  required: boolean;
  options?: string[];
}

interface FormConfig {
  title: string;
  fields: FormField[];
}

const APPLICATION_FORMS: Record<string, FormConfig> = {
  staff: {
    title: "Staff Application",
    fields: [
      { id: "minecraft_username", label: "Minecraft Username", type: "text", required: true },
      { id: "age", label: "Age", type: "number", required: true },
      { id: "discord", label: "Discord Username", type: "text", required: true },
      { id: "timezone", label: "Timezone", type: "text", required: true },
      { 
        id: "about_yourself", 
        label: "Tell us about yourself", 
        type: "textarea", 
        required: true 
      },
      { id: "experience", label: "Previous Experience", type: "textarea", required: true },
      { id: "why_join", label: "Why do you want to join our staff team?", type: "textarea", required: true },
      { id: "time_available", label: "How many hours per week can you dedicate?", type: "text", required: true },
    ],
  },
  builder: {
    title: "Builder Application",
    fields: [
      { id: "minecraft_username", label: "Minecraft Username", type: "text", required: true },
      { 
        id: "about_yourself", 
        label: "Tell us about yourself", 
        type: "textarea", 
        required: true 
      },
      { id: "portfolio", label: "Portfolio Links", type: "textarea", required: true },
      { id: "building_style", label: "Preferred Building Style", type: "text", required: true },
      { 
        id: "worldedit", 
        label: "WorldEdit Experience", 
        type: "select", 
        required: true, 
        options: ["None", "Basic", "Intermediate", "Advanced"] 
      },
      { id: "availability", label: "Availability", type: "textarea", required: true },
      { id: "project_idea", label: "Describe a build project you'd like to work on", type: "textarea", required: true },
    ],
  },
  youtuber: {
    title: "YouTuber Application",
    fields: [
      { id: "minecraft_username", label: "Minecraft Username", type: "text", required: true },
      { id: "discord", label: "Discord Username", type: "text", required: true },
      { 
        id: "about_yourself", 
        label: "Tell us about yourself", 
        type: "textarea", 
        required: true 
      },
      { 
        id: "channel_link", 
        label: "Your YouTube Channel URL", 
        type: "text", 
        required: true 
      },
      { 
        id: "server_video", 
        label: "Link to your video about our server", 
        type: "text", 
        required: true 
      },
      { 
        id: "subscriber_count", 
        label: "Current Subscriber Count", 
        type: "number", 
        required: true 
      },
      { 
        id: "content_plans", 
        label: "What type of content do you plan to create about our server?", 
        type: "textarea", 
        required: true 
      },
      { 
        id: "upload_schedule", 
        label: "How often do you plan to upload server-related content?", 
        type: "select", 
        required: true,
        options: [
          "Multiple times per week",
          "Weekly",
          "Bi-weekly",
          "Monthly"
        ]
      },
    ],
  },
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const formConfig = APPLICATION_FORMS[params.type as keyof typeof APPLICATION_FORMS];
  if (!formConfig) {
    throw redirect("/applications");
  }
  return json({ formConfig });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const applicationType = params.type;

  const applicationData = Object.fromEntries(formData);

  try {
    const response = await fetch(`${process.env.API_URL}/applications/${applicationType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
      const error = await response.json();
      return json(
        { error: error.message || 'Failed to submit application' },
        { status: response.status }
      );
    }

    return redirect(`/applications/success`);
  } catch (error) {
    return json(
      { error: 'Failed to connect to the server' },
      { status: 500 }
    );
  }
};

export default function ApplicationForm() {
  const { formConfig } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="minecraft-panel relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1f8f3f33_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)]" />
      
      <h2 className="font-minecraft text-4xl text-center">
        <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
          {formConfig.title}
        </span>
      </h2>

      {actionData?.error && (
        <div className="mt-4 rounded-lg bg-red-500/10 p-4 text-red-400">
          <p>{actionData.error}</p>
        </div>
      )}

      <Form method="post" className="mt-10 space-y-8">
        {formConfig.fields.map((field) => (
          <div key={field.id} className="group">
            <label htmlFor={field.id} className="block font-minecraft text-lg text-emerald-400 group-focus-within:text-emerald-300">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                name={field.id}
                required={field.required}
                className="mt-2 w-full rounded-lg bg-gray-800/80 p-4 text-gray-200 shadow-inner transition-all focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                rows={4}
                disabled={isSubmitting}
              />
            ) : field.type === "select" ? (
              <select
                id={field.id}
                name={field.id}
                required={field.required}
                className="mt-2 w-full rounded-lg bg-gray-800/80 p-4 text-gray-200 shadow-inner transition-all focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                disabled={isSubmitting}
              >
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                required={field.required}
                className="mt-2 w-full rounded-lg bg-gray-800/80 p-4 text-gray-200 shadow-inner transition-all focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                disabled={isSubmitting}
              />
            )}
          </div>
        ))}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="minecraft-button w-full justify-center bg-emerald-600 transition-all hover:-translate-y-0.5 hover:bg-emerald-500 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
          <Link
            to="/applications"
            className="minecraft-button w-full justify-center bg-gray-600 transition-all hover:-translate-y-0.5 hover:bg-gray-500"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
} 