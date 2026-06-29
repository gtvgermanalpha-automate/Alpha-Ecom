import { isEmail, isHexColor, isSlug, isUrl, limitFor } from "@/lib/cms/limits";

export type FieldType =
  | "string"
  | "text"
  | "string[]"
  | "number"
  | "boolean"
  | "object"
  | "object[]";

export type FieldSpec = {
  key: string;
  label?: string;
  type: FieldType;
  required?: boolean;
  format?: "email" | "url" | "slug" | "hex";
  max?: number;
  enum?: readonly string[];
  fields?: FieldSpec[]; // for object / object[]
  itemLabel?: string; // for object[] entries
};

export type ValidationResult = { ok: true } | { ok: false; errors: string[] };

function checkFormat(value: string, format: FieldSpec["format"]): string | null {
  if (!value) return null;
  if (format === "email" && !isEmail(value)) return "must be a valid email";
  if (format === "url" && !isUrl(value)) return "must be a URL (http/https)";
  if (format === "slug" && !isSlug(value)) return "must be a slug (a-z, 0-9, hyphens)";
  if (format === "hex" && !isHexColor(value)) return "must be a hex colour (#rgb or #rrggbb)";
  return null;
}

/** Validate a single object against a field spec. Returns error strings. */
export function validateObject(fields: FieldSpec[], obj: unknown, prefix = ""): string[] {
  const errors: string[] = [];
  if (typeof obj !== "object" || obj === null) {
    return [`${prefix || "value"} must be an object`];
  }
  const rec = obj as Record<string, unknown>;
  const at = (k: string) => `${prefix}${prefix ? "." : ""}${k}`;

  for (const f of fields) {
    const v = rec[f.key];
    const present = v !== undefined && v !== null && v !== "";

    if (f.required && !present && f.type !== "boolean") {
      errors.push(`${at(f.key)} is required`);
      continue;
    }
    if (!present) continue;

    const max = f.max ?? limitFor(f.key);

    switch (f.type) {
      case "string":
      case "text": {
        if (typeof v !== "string") errors.push(`${at(f.key)} must be text`);
        else {
          if (v.length > max) errors.push(`${at(f.key)} is too long (max ${max})`);
          const fmt = checkFormat(v, f.format);
          if (fmt) errors.push(`${at(f.key)} ${fmt}`);
          if (f.enum && !f.enum.includes(v)) errors.push(`${at(f.key)} must be one of: ${f.enum.join(", ")}`);
        }
        break;
      }
      case "number":
        if (typeof v !== "number" || Number.isNaN(v)) errors.push(`${at(f.key)} must be a number`);
        break;
      case "boolean":
        if (typeof v !== "boolean") errors.push(`${at(f.key)} must be true/false`);
        break;
      case "string[]": {
        if (!Array.isArray(v)) errors.push(`${at(f.key)} must be a list`);
        else
          v.forEach((item, i) => {
            if (typeof item !== "string") errors.push(`${at(f.key)}[${i}] must be text`);
            else if (item.length > max) errors.push(`${at(f.key)}[${i}] is too long (max ${max})`);
          });
        break;
      }
      case "object":
        if (f.fields) errors.push(...validateObject(f.fields, v, at(f.key)));
        break;
      case "object[]": {
        if (!Array.isArray(v)) errors.push(`${at(f.key)} must be a list`);
        else if (f.fields)
          v.forEach((item, i) => errors.push(...validateObject(f.fields!, item, `${at(f.key)}[${i}]`)));
        break;
      }
    }
  }
  return errors;
}

/**
 * Validate a whole collection payload.
 * - object mode: validate the single object.
 * - list mode: validate each entry + enforce a present, unique id field.
 */
export function validateCollection(
  opts: { mode: "object" | "list"; idField?: string; fields: FieldSpec[] },
  data: unknown
): ValidationResult {
  if (opts.mode === "object") {
    const errors = validateObject(opts.fields, data);
    return errors.length ? { ok: false, errors } : { ok: true };
  }

  if (!Array.isArray(data)) return { ok: false, errors: ["expected a list of entries"] };
  const errors: string[] = [];
  const idField = opts.idField ?? "slug";
  const seen = new Set<string>();

  data.forEach((entry, i) => {
    const rec = entry as Record<string, unknown>;
    const id = rec?.[idField];
    if (typeof id !== "string" || !id.trim()) {
      errors.push(`entry[${i}].${idField} is required`);
    } else if (seen.has(id)) {
      errors.push(`duplicate ${idField} "${id}"`);
    } else {
      seen.add(id);
    }
    errors.push(...validateObject(opts.fields, entry, id ? String(id) : `entry[${i}]`));
  });

  return errors.length ? { ok: false, errors } : { ok: true };
}
