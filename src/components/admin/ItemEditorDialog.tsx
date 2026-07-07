import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Schema } from "./fieldSchemas";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  schema: Schema;
  initial?: any;
  onSave: (data: any) => Promise<void> | void;
}

const toValue = (v: any, type: string) => {
  if (type === "tags") return Array.isArray(v) ? v.join(", ") : v ?? "";
  return v ?? "";
};

const fromValue = (v: any, type: string) => {
  if (type === "tags")
    return String(v || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  if (type === "number") return v === "" || v == null ? null : Number(v);
  return v;
};

export default function ItemEditorDialog({ open, onOpenChange, schema, initial, onSave }: Props) {
  const [form, setForm] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      const base = { ...(schema.defaults || {}), ...(initial || {}) };
      const mapped: Record<string, any> = { ...base };
      schema.fields.forEach((f) => {
        mapped[f.key] = toValue(base[f.key], f.type);
      });
      setForm(mapped);
    }
  }, [open, initial, schema]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, any> = { ...(schema.defaults || {}) };
      if (initial?.id) payload.id = initial.id;
      // preserve non-schema fields from initial (like kind, group_name, order_index, is_active)
      if (initial) {
        Object.keys(initial).forEach((k) => {
          if (!schema.fields.find((f) => f.key === k)) payload[k] = initial[k];
        });
      }
      schema.fields.forEach((f) => {
        payload[f.key] = fromValue(form[f.key], f.type);
      });
      await onSave(payload);
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial?.id ? "Editar" : "Adicionar"} {schema.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {schema.fields.map((f) => (
            <div key={f.key} className="space-y-1.5">
              <Label htmlFor={f.key}>{f.label}</Label>
              {f.type === "textarea" ? (
                <Textarea
                  id={f.key}
                  value={form[f.key] ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                  rows={4}
                  placeholder={f.placeholder}
                />
              ) : f.type === "select" ? (
                <Select
                  value={form[f.key] ?? ""}
                  onValueChange={(v) => setForm((s) => ({ ...s, [f.key]: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {f.options?.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={f.key}
                  type={f.type === "number" ? "number" : f.type === "url" ? "url" : "text"}
                  min={f.min}
                  max={f.max}
                  value={form[f.key] ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  required={f.required}
                />
              )}
            </div>
          ))}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
