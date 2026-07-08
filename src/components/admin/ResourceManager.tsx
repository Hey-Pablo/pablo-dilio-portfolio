import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import type { ResourceConfig, FieldConfig } from "./resourceConfigs";

const emptyRecord = (fields: FieldConfig[]) => {
  const r: Record<string, any> = {};
  fields.forEach((f) => {
    if (f.default !== undefined) r[f.name] = f.default;
    else if (f.type === "array") r[f.name] = [];
    else if (f.type === "boolean") r[f.name] = false;
    else if (f.type === "number") r[f.name] = 0;
    else r[f.name] = "";
  });
  return r;
};

const arrayToText = (v: any) => (Array.isArray(v) ? v.join(", ") : "");
const textToArray = (v: string) =>
  v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const ResourceManager = ({ config }: { config: ResourceConfig }) => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyRecord(config.fields));
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(config.table)
      .select("*")
      .order("order_index", { ascending: true });
    if (error) {
      toast({ title: "Erro ao carregar", description: error.message, variant: "destructive" });
    } else {
      setRows(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.table]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyRecord(config.fields));
    setDialogOpen(true);
  };

  const openEdit = (row: any) => {
    setEditing(row);
    const f: Record<string, any> = {};
    config.fields.forEach((fld) => {
      f[fld.name] = row[fld.name] ?? emptyRecord([fld])[fld.name];
    });
    setForm(f);
    setDialogOpen(true);
  };

  const save = async () => {
    setSaving(true);
    const payload: Record<string, any> = { ...form };
    // normalize numbers
    config.fields.forEach((f) => {
      if (f.type === "number") payload[f.name] = Number(payload[f.name]) || 0;
    });
    const table = supabase.from(config.table) as any;
    const { error } = editing
      ? await table.update(payload).eq("id", editing.id)
      : await table.insert(payload);
    setSaving(false);
    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Atualizado" : "Criado" });
    setDialogOpen(false);
    load();
  };

  const remove = async (row: any) => {
    if (!confirm(`Excluir "${row[config.titleField]}"?`)) return;
    const { error } = await supabase.from(config.table).delete().eq("id", row.id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Excluído" });
    load();
  };

  const move = async (row: any, direction: -1 | 1) => {
    const idx = rows.findIndex((r) => r.id === row.id);
    const swapIdx = idx + direction;
    if (idx < 0 || swapIdx < 0 || swapIdx >= rows.length) return;
    const a = rows[idx];
    const b = rows[swapIdx];
    const table = supabase.from(config.table) as any;
    const { error: errA } = await table
      .update({ order_index: b.order_index })
      .eq("id", a.id);
    if (errA) {
      toast({ title: "Erro ao reordenar", description: errA.message, variant: "destructive" });
      return;
    }
    const { error: errB } = await table.update({ order_index: a.order_index }).eq("id", b.id);
    if (errB) {
      toast({ title: "Erro ao reordenar", description: errB.message, variant: "destructive" });
      return;
    }
    toast({ title: "Ordem atualizada" });
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {rows.length} {rows.length === 1 ? "registro" : "registros"}
        </p>
        <Button size="sm" onClick={openCreate}>
          <Plus size={14} className="mr-2" /> Novo
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-2">
          {rows.map((row, index) => (
            <div
              key={row.id}
              className="p-4 rounded-lg border border-border bg-card/50 flex justify-between items-start gap-4"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-base leading-snug break-words">
                  {row[config.titleField]}
                </p>
                {config.subtitleField && (
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed break-words line-clamp-3">
                    {row[config.subtitleField]}
                  </p>
                )}
                {!row.is_active && (
                  <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    Inativo
                  </span>
                )}
              </div>
              <div className="flex gap-1 shrink-0">
                <div className="flex flex-col gap-0.5">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    disabled={index === 0}
                    onClick={() => move(row, -1)}
                  >
                    <ChevronUp size={14} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    disabled={index === rows.length - 1}
                    onClick={() => move(row, 1)}
                  >
                    <ChevronDown size={14} />
                  </Button>
                </div>
                <Button size="icon" variant="ghost" onClick={() => openEdit(row)}>
                  <Pencil size={14} />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => remove(row)}>
                  <Trash2 size={14} className="text-destructive" />
                </Button>
              </div>
            </div>
          ))}
          {rows.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">
              Nenhum registro. Clique em "Novo" para adicionar.
            </p>
          )}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar" : "Novo"} — {config.label}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {config.fields.map((f) => (
              <div key={f.name} className="grid gap-2">
                <Label>
                  {f.label}
                  {f.required && <span className="text-destructive"> *</span>}
                </Label>
                {f.type === "text" && (
                  <Input
                    value={form[f.name] ?? ""}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  />
                )}
                {f.type === "textarea" && (
                  <Textarea
                    rows={3}
                    value={form[f.name] ?? ""}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  />
                )}
                {f.type === "number" && (
                  <Input
                    type="number"
                    value={form[f.name] ?? 0}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  />
                )}
                {f.type === "array" && (
                  <Input
                    value={arrayToText(form[f.name])}
                    onChange={(e) => setForm({ ...form, [f.name]: textToArray(e.target.value) })}
                    placeholder="item1, item2, item3"
                  />
                )}
                {f.type === "boolean" && (
                  <Switch
                    checked={Boolean(form[f.name])}
                    onCheckedChange={(v) => setForm({ ...form, [f.name]: v })}
                  />
                )}
                {f.type === "select" && f.options && (
                  <Select
                    value={form[f.name] ?? ""}
                    onValueChange={(v) => setForm({ ...form, [f.name]: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {f.options.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? <Loader2 size={14} className="animate-spin" /> : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourceManager;
