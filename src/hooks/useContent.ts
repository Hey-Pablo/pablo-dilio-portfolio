import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// ============ Generic list hook ============
type TableName =
  | "projects"
  | "certificates"
  | "experiences"
  | "education_items"
  | "skills";

export function useList<T = any>(
  table: TableName,
  filter?: { column: string; value: any }
) {
  return useQuery({
    queryKey: ["list", table, filter?.column ?? "", filter?.value ?? ""],
    queryFn: async () => {
      let q = (supabase.from(table) as any).select("*").order("order_index", { ascending: true });
      if (filter) q = q.eq(filter.column, filter.value);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });
}

export function useUpsertItem(table: TableName) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      const { id, ...rest } = payload;
      if (id) {
        const { error } = await (supabase.from(table) as any).update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await (supabase.from(table) as any).insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["list", table] });
      toast.success("Salvo");
    },
    onError: (e: any) => toast.error(e?.message ?? "Erro ao salvar"),
  });
}

export function useDeleteItem(table: TableName) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase.from(table) as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["list", table] });
      toast.success("Excluído");
    },
    onError: (e: any) => toast.error(e?.message ?? "Erro ao excluir"),
  });
}

export function useReorderItem(table: TableName) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, order_index }: { id: string; order_index: number }) => {
      const { error } = await (supabase.from(table) as any)
        .update({ order_index })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["list", table] }),
  });
}

// ============ Site content (key/value) ============
export function useSiteContent<T = any>(key: string) {
  return useQuery({
    queryKey: ["site_content", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", key)
        .maybeSingle();
      if (error) throw error;
      return (data?.value ?? null) as T | null;
    },
  });
}

export function useUpdateSiteContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { error } = await supabase
        .from("site_content")
        .upsert({ key, value }, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["site_content", vars.key] });
      toast.success("Salvo");
    },
    onError: (e: any) => toast.error(e?.message ?? "Erro ao salvar"),
  });
}
