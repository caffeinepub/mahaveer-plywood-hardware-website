import React, { useState } from 'react';
import { Eye, Edit3 } from 'lucide-react';

interface TemplateEditorProps {
  templateName: string;
  templateValue: string;
  availablePlaceholders: string[];
  sampleData: Record<string, string>;
  onChange: (value: string) => void;
}

export default function TemplateEditor({
  templateName,
  templateValue,
  availablePlaceholders,
  sampleData,
  onChange,
}: TemplateEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  const getPreview = () => {
    let preview = templateValue;
    Object.entries(sampleData).forEach(([key, value]) => {
      preview = preview.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return preview;
  };

  const insertPlaceholder = (placeholder: string) => {
    onChange(templateValue + `{{${placeholder}}}`);
  };

  return (
    <div className="bg-white border border-gold-200 rounded-2xl shadow-luxury overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gold-100">
        <h4 className="font-serif font-bold text-foreground">{templateName}</h4>
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gold-200 text-gold-700 hover:bg-gold-50 transition-colors"
        >
          {isPreview ? (
            <>
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              Preview
            </>
          )}
        </button>
      </div>

      <div className="p-5">
        {/* Placeholder Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          {availablePlaceholders.map(ph => (
            <button
              key={ph}
              onClick={() => insertPlaceholder(ph)}
              className="px-2.5 py-1 rounded-full bg-gold-100 text-gold-700 text-xs font-mono font-medium hover:bg-gold-200 transition-colors"
              title={`Insert {{${ph}}}`}
            >
              {`{{${ph}}}`}
            </button>
          ))}
        </div>

        {/* Editor / Preview */}
        {isPreview ? (
          <div className="min-h-32 p-4 rounded-xl bg-gold-50 border border-gold-200 text-sm text-foreground whitespace-pre-wrap font-mono">
            {getPreview() || <span className="text-muted-foreground italic">No template content</span>}
          </div>
        ) : (
          <textarea
            value={templateValue}
            onChange={e => onChange(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-sm font-mono resize-y transition-all"
            placeholder={`Enter ${templateName} template...`}
          />
        )}
      </div>
    </div>
  );
}
