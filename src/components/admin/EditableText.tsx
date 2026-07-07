import { useState, useRef, useEffect } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onSave: (v: string) => void | Promise<void>;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}

export default function EditableText({
  value,
  onSave,
  as = "span",
  className,
  multiline = false,
  placeholder = "Clique para editar",
}: Props) {
  const { editMode } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);
  const ref = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => setText(value), [value]);

  useEffect(() => {
    if (editing && ref.current) ref.current.focus();
  }, [editing]);

  const commit = async () => {
    setEditing(false);
    if (text !== value) await onSave(text);
  };

  const Tag = as as any;

  if (!editMode) return <Tag className={className}>{value}</Tag>;

  if (editing) {
    return multiline ? (
      <textarea
        ref={ref as any}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        rows={Math.min(10, Math.max(2, text.split("\n").length + 1))}
        className={cn(
          "w-full bg-background/50 border border-primary/50 rounded px-2 py-1 outline-none focus:border-primary resize-y",
          className
        )}
      />
    ) : (
      <input
        ref={ref as any}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          if (e.key === "Escape") {
            setText(value);
            setEditing(false);
          }
        }}
        className={cn(
          "bg-background/50 border border-primary/50 rounded px-2 py-0.5 outline-none focus:border-primary",
          className
        )}
      />
    );
  }

  return (
    <Tag
      className={cn(
        className,
        "cursor-text ring-1 ring-primary/30 hover:ring-primary/60 rounded px-1 transition-all"
      )}
      onClick={() => setEditing(true)}
      title="Clique para editar"
    >
      {value || <span className="italic opacity-50">{placeholder}</span>}
    </Tag>
  );
}
