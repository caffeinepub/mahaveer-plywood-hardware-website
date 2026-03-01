import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useWhatsAppTemplates } from '@/hooks/useWhatsAppTemplates';

interface TemplateEditorProps {
  templateName: string;
  templateValue: string;
  onChange: (value: string) => void;
  availablePlaceholders: Array<{ key: string; description: string }>;
  sampleData: Record<string, string>;
}

export default function TemplateEditor({
  templateName,
  templateValue,
  onChange,
  availablePlaceholders,
  sampleData,
}: TemplateEditorProps) {
  const { replacePlaceholders } = useWhatsAppTemplates();

  const previewMessage = replacePlaceholders(templateValue, sampleData);

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={templateName} className="text-sm font-medium mb-2 block">
          {templateName}
        </Label>
        <Textarea
          id={templateName}
          value={templateValue}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[120px] rounded-14 border-white/10 bg-white/3 text-[13px] font-mono"
          placeholder="Enter template with placeholders..."
        />
      </div>

      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Available Placeholders:</Label>
        <div className="flex flex-wrap gap-2">
          {availablePlaceholders.map((placeholder) => (
            <Badge
              key={placeholder.key}
              variant="outline"
              className="text-xs bg-gold/8 border-gold/20 cursor-help"
              title={placeholder.description}
            >
              {`{${placeholder.key}}`}
            </Badge>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-14 border border-white/10 bg-white/2">
        <Label className="text-xs text-muted-foreground mb-2 block">Preview (with sample data):</Label>
        <pre className="text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed">
          {previewMessage}
        </pre>
      </div>
    </div>
  );
}
