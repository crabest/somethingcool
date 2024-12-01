import { useState, useCallback, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

type ColorOption = {
  name: string;
  value: string;
};

const COLORS: ColorOption[] = [
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Pink', value: '#ec4899' },
];

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [selectedText, setSelectedText] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormat = useCallback((format: string, additionalValue?: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selection = text.substring(start, end) || 'text';

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selection}**`;
        break;
      case 'italic':
        formattedText = `*${selection}*`;
        break;
      case 'underline':
        formattedText = `__${selection}__`;
        break;
      case 'link':
        formattedText = `[${selection}](${additionalValue || 'url'})`;
        break;
      case 'image':
        formattedText = `![${selection || 'image'}](${additionalValue || 'url'})`;
        break;
      case 'color':
        formattedText = `{color:${additionalValue}}${selection}{/color}`;
        break;
      case 'list':
        formattedText = `\n- ${selection}`;
        break;
      case 'quote':
        formattedText = `> ${selection}`;
        break;
      case 'code':
        formattedText = `\`${selection}\``;
        break;
    }

    const newValue = text.substring(0, start) + formattedText + text.substring(end);
    onChange(newValue);

    // Reset selection
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + formattedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, [onChange]);

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormat('link', linkUrl);
    setShowLinkModal(false);
    setLinkUrl('');
  };

  const handleSelect = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    setSelectedText(textarea.value.substring(textarea.selectionStart, textarea.selectionEnd));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: Implement actual image upload
    // For now, we'll just use a mock URL
    const imageUrl = URL.createObjectURL(file);
    handleFormat('image', imageUrl);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 rounded-t-lg border border-b-0 border-gray-800 bg-black/30 p-2">
        <div className="flex gap-1">
          <FormatButton onClick={() => handleFormat('bold')} title="Bold">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h8a4 4 0 0 0 0-8H6v8zm0 0h10a4 4 0 0 1 0 8H6v-8z"/>
            </svg>
          </FormatButton>
          
          <FormatButton onClick={() => handleFormat('italic')} title="Italic">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4M14 20h-4M15 4L9 20"/>
            </svg>
          </FormatButton>

          <FormatButton onClick={() => handleFormat('underline')} title="Underline">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h10M5 20h14"/>
            </svg>
          </FormatButton>
        </div>

        <div className="h-6 w-px bg-gray-700" />

        <div className="flex gap-1">
          <FormatButton onClick={() => setShowLinkModal(true)} title="Add Link">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
            </svg>
          </FormatButton>

          <div className="relative">
            <label className="cursor-pointer">
              <FormatButton onClick={() => {}} title="Upload Image">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </FormatButton>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div className="relative">
            <FormatButton 
              onClick={() => setShowColorPicker(!showColorPicker)} 
              title="Text Color"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h14a2 2 0 012 2v12a4 4 0 01-4 4H7zm0 0h12M7 3v18M17 3v18"/>
              </svg>
            </FormatButton>

            {showColorPicker && (
              <div className="absolute left-0 top-full z-10 mt-1 grid grid-cols-4 gap-1 rounded-lg border border-gray-800 bg-black/95 p-2">
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => {
                      handleFormat('color', color.value);
                      setShowColorPicker(false);
                    }}
                    className="h-6 w-6 rounded-full"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="h-6 w-px bg-gray-700" />

        <div className="flex gap-1">
          <FormatButton onClick={() => handleFormat('list')} title="Add List Item">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </FormatButton>

          <FormatButton onClick={() => handleFormat('quote')} title="Add Quote">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10.5h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2.5a2 2 0 0 0 2 2zm8 0h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2.5a2 2 0 0 0 2 2z"/>
            </svg>
          </FormatButton>

          <FormatButton onClick={() => handleFormat('code')} title="Add Code">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </FormatButton>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        id="content"
        className="minecraft-border min-h-[200px] w-full resize-y bg-black/50 p-3 text-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleSelect}
        placeholder="Write your announcement content here..."
      />

      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-4 font-minecraft text-lg text-white">Add Link</h3>
            <form onSubmit={handleLinkSubmit}>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL"
                className="minecraft-border mb-4 w-full bg-black/50 p-2 text-white"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="rounded bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
                >
                  Add Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-400">
        Formatting Guide:
        <ul className="ml-4 list-disc">
          <li>**text** for bold</li>
          <li>*text* for italic</li>
          <li>__text__ for underline</li>
          <li>[text](url) for links</li>
          <li>![alt](url) for images</li>
          <li>{'{color:#hex}text{/color}'} for colored text</li>
          <li>- text for list items</li>
          <li>&gt; text for quotes</li>
          <li>`text` for code</li>
        </ul>
      </div>
    </div>
  );
}

function FormatButton({ 
  onClick, 
  children, 
  title 
}: { 
  onClick: () => void; 
  children: React.ReactNode; 
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="rounded p-2 text-gray-400 transition-colors hover:bg-emerald-500/20 hover:text-emerald-400"
    >
      {children}
    </button>
  );
} 