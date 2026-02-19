"use client";

import { useState } from "react";
import type { CategorizationRule, Category } from "@/types";

export interface RuleFormData {
  keyword: string;
  category_id: string;
  priority: number;
}

interface RuleFormProps {
  open: boolean;
  rule?: CategorizationRule | null;
  categories: Category[];
  loading?: boolean;
  onSubmit: (data: RuleFormData) => void;
  onClose: () => void;
}

function initialFormData(rule?: CategorizationRule | null): RuleFormData {
  if (rule) {
    return {
      keyword: rule.keyword,
      category_id: rule.category_id,
      priority: rule.priority,
    };
  }
  return { keyword: "", category_id: "", priority: 0 };
}

export function RuleForm({
  open,
  rule,
  categories,
  loading = false,
  onSubmit,
  onClose,
}: RuleFormProps) {
  const [form, setForm] = useState<RuleFormData>(() => initialFormData(rule));
  const [errors, setErrors] = useState<
    Partial<Record<keyof RuleFormData, string>>
  >({});

  function validate(): boolean {
    const newErrors: Partial<Record<keyof RuleFormData, string>> = {};
    if (!form.keyword.trim()) newErrors.keyword = "Le mot-clé est requis";
    if (!form.category_id) newErrors.category_id = "La catégorie est requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(form);
  }

  if (!open) return null;

  const isEdit = !!rule;
  const inputBase =
    "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl">
        <h2 className="text-lg font-semibold">
          {isEdit ? "Modifier la règle" : "Nouvelle règle"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Mot-clé</label>
            <input
              type="text"
              value={form.keyword}
              onChange={(e) => setForm({ ...form, keyword: e.target.value })}
              className={`${inputBase} ${errors.keyword ? "border-danger" : "border-border"}`}
              placeholder="Ex: CARREFOUR"
            />
            <p className="mt-1 text-xs text-muted">
              Le mot-clé sera recherché (sans tenir compte de la casse) dans le
              libellé des transactions.
            </p>
            {errors.keyword && (
              <p className="mt-1 text-xs text-danger">{errors.keyword}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Catégorie</label>
            <select
              value={form.category_id}
              onChange={(e) =>
                setForm({ ...form, category_id: e.target.value })
              }
              className={`${inputBase} ${errors.category_id ? "border-danger" : "border-border"}`}
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="mt-1 text-xs text-danger">{errors.category_id}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Priorité</label>
            <input
              type="number"
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: parseInt(e.target.value, 10) })
              }
              className={`${inputBase} border-border`}
              placeholder="0"
            />
            <p className="mt-1 text-xs text-muted">
              Une priorité plus élevée (ex: 10) sera appliquée avant une priorité plus basse (ex: 0).
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-card-hover hover:text-foreground disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
            >
              {loading
                ? "Enregistrement..."
                : isEdit
                  ? "Enregistrer"
                  : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
