import { useState, useEffect, useRef } from "react";
import type { News } from "~/types/news";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { createNews } from "~/models/news.server";
import { requireUserId } from "~/session.server";
import type { Quill } from 'quill';

type NewsStatus = 'all' | 'draft' | 'published' | 'scheduled';
type SortOption = 'newest' | 'oldest' | 'mostViewed' | 'mostLiked';

const TOOLBAR_OPTIONS = [
  [{ 'header': [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  ['link', 'image', 'video'],
  ['clean']
];

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const news = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      type: formData.get("type") as News["type"],
      status: formData.get("status") as News["status"],
      priority: formData.get("priority") === "true",
      scheduledFor: formData.get("scheduledFor") 
        ? new Date(formData.get("scheduledFor") as string)
        : null,
    };

    const newNews = await createNews(news, userId);
    return json({ success: true, news: newNews });
  } catch (error) {
    console.error("Failed to create news:", error);
    return json(
      { error: "Failed to create news post. Please try again." },
      { status: 500 }
    );
  }
}

export default function AdminNews() {
  const quillRef = useRef<Quill>();
  const editorRef = useRef<HTMLDivElement>(null);
  const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState<Partial<News>>({
    type: 'general',
    priority: false,
    status: 'draft'
  });

  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [statusFilter, setStatusFilter] = useState<NewsStatus>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showTagManager, setShowTagManager] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !editorRef.current || quillRef.current) return;

    const loadQuill = async () => {
      const Quill = (await import('quill')).default;
      
      // Create container elements
      const toolbarContainer = document.createElement('div');
      const editorContainer = document.createElement('div');
      editorRef.current?.appendChild(toolbarContainer);
      editorRef.current?.appendChild(editorContainer);

      quillRef.current = new Quill(editorContainer, {
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbarContainer,
            options: TOOLBAR_OPTIONS
          }
        }
      });

      quillRef.current.on('text-change', () => {
        setFormData(prev => ({
          ...prev,
          content: quillRef.current?.root.innerHTML || ''
        }));
      });

      // Set initial content if any
      if (formData.content) {
        quillRef.current.root.innerHTML = formData.content;
      }
    };

    loadQuill();

    return () => {
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
      quillRef.current = undefined;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Add all form data
    Object.entries(formData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Show success/error messages */}
      {actionData?.error && (
        <div className="mb-4 rounded-lg bg-red-500/10 p-4 text-red-400">
          {actionData.error}
        </div>
      )}
      {actionData?.success && (
        <div className="mb-4 rounded-lg bg-emerald-500/10 p-4 text-emerald-400">
          News post created successfully!
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-minecraft text-3xl text-emerald-400">Manage News</h1>
          <p className="mt-2 text-gray-400">Create and manage server news</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('create')}
            className={`rounded-lg px-4 py-2 transition-colors ${
              activeTab === 'create' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400'
            }`}
          >
            Create New
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`rounded-lg px-4 py-2 transition-colors ${
              activeTab === 'manage' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400'
            }`}
          >
            Manage Existing
          </button>
        </div>
      </div>

      {activeTab === 'create' ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-gray-800 bg-black/50 p-6">
            <h2 className="mb-6 font-minecraft text-xl text-white">Create News Post</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-400">Title</label>
                <input
                  type="text"
                  className="minecraft-border w-full bg-black/50 p-2 text-white"
                  value={formData.title || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">Content</label>
                <div className="minecraft-border bg-black/50">
                  <div 
                    ref={editorRef} 
                    className="text-white [&_.ql-toolbar]:border-gray-700 [&_.ql-container]:border-gray-700 [&_.ql-toolbar]:bg-black/30 [&_.ql-container]:bg-transparent [&_.ql-editor]:min-h-[200px] [&_.ql-editor]:text-white [&_.ql-snow]:border-gray-700 [&_.ql-stroke]:!text-white [&_.ql-picker]:!text-white [&_.ql-picker-options]:bg-gray-900" 
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Type</label>
                  <select
                    className="minecraft-border w-full bg-black/50 p-2 text-white"
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      type: e.target.value as News['type']
                    }))}
                  >
                    <option value="general">General</option>
                    <option value="event">Event</option>
                    <option value="update">Update</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">Status</label>
                  <select
                    className="minecraft-border w-full bg-black/50 p-2 text-white"
                    value={formData.status}
                    onChange={(e) => {
                      setFormData(prev => ({ 
                        ...prev, 
                        status: e.target.value as News['status']
                      }));
                      if (e.target.value === 'scheduled') {
                        setShowScheduler(true);
                      }
                    }}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Publish Now</option>
                    <option value="scheduled">Schedule</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="priority"
                    checked={formData.priority || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.checked }))}
                    className="h-4 w-4"
                  />
                  <label htmlFor="priority" className="text-sm text-gray-400">
                    Mark as Important
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="pinned"
                    checked={formData.pinned || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, pinned: e.target.checked }))}
                    className="h-4 w-4"
                  />
                  <label htmlFor="pinned" className="text-sm text-gray-400">
                    Pin to Top
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map(tag => (
                    <span 
                      key={tag}
                      className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400"
                    >
                      {tag}
                      <button
                        onClick={() => setSelectedTags(tags => tags.filter(t => t !== tag))}
                        className="ml-2 text-emerald-300 hover:text-emerald-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowTagManager(true)}
                    className="rounded-full border border-dashed border-gray-600 px-3 py-1 text-xs text-gray-400 hover:border-emerald-400 hover:text-emerald-400"
                  >
                    + Add Tag
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ 
                    type: 'general', 
                    priority: false,
                    status: 'draft'
                  })}
                  className="rounded bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="rounded bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
                >
                  {formData.status === 'draft' ? 'Save Draft' : formData.status === 'scheduled' ? 'Schedule' : 'Publish'}
                </button>
              </div>
            </form>
          </div>

          {/* Preview Panel */}
          <div className="rounded-lg border border-gray-800 bg-black/50 p-6">
            <h2 className="mb-6 font-minecraft text-xl text-white">Preview</h2>
            
            {formData.title ? (
              <div className="relative rounded-lg border border-gray-800 bg-black/30 p-4">
                {formData.priority && (
                  <div className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                    Important
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs ${getTypeStyles(formData.type as News['type'])}`}>
                      {formData.type}
                    </span>
                    <h3 className="font-minecraft text-lg text-white">{formData.title}</h3>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/20" />
                  <div>
                    <div className="text-sm font-semibold text-emerald-400">Author Name</div>
                    <div className="text-xs text-gray-400">Role</div>
                  </div>
                </div>
                
                <div className="mt-4 text-gray-300">
                  <div dangerouslySetInnerHTML={{ __html: formData.content || '' }} />
                </div>

                {selectedTags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedTags.map(tag => (
                      <span 
                        key={tag}
                        className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                  <span>0 views</span>
                  <span>0 likes</span>
                  <span>0 comments</span>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                Fill out the form to see a preview
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-black/50 p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              {(['all', 'draft', 'published', 'scheduled'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-lg px-3 py-1 text-sm transition-colors ${
                    statusFilter === status
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="minecraft-border rounded bg-black/50 px-3 py-1 text-sm text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="mostViewed">Most Viewed</option>
                <option value="mostLiked">Most Liked</option>
              </select>

              <input
                type="search"
                placeholder="Search news posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="minecraft-border w-64 rounded bg-black/50 px-3 py-1 text-sm text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* News Post list would go here */}
          <div className="text-center text-gray-400">
            No news posts found
          </div>
        </div>
      )}

      {/* Scheduler Modal */}
      {showScheduler && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-4 font-minecraft text-lg text-white">Schedule News Post</h3>
            <input
              type="datetime-local"
              className="minecraft-border mb-4 w-full bg-black/50 p-2 text-white"
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                scheduledFor: e.target.value
              }))}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowScheduler(false)}
                className="rounded bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowScheduler(false)}
                className="rounded bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tag Manager Modal */}
      {showTagManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-4 font-minecraft text-lg text-white">Manage Tags</h3>
            {/* Tag management UI would go here */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowTagManager(false)}
                className="rounded bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getTypeStyles(type: News['type']) {
  switch (type) {
    case 'update':
      return 'bg-blue-500/20 text-blue-400';
    case 'event':
      return 'bg-purple-500/20 text-purple-400';
    case 'maintenance':
      return 'bg-yellow-500/20 text-yellow-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
} 