"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Paperclip, Send, X, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  contactSchema,
  type ContactValues,
  MAX_FILE_BYTES,
  ACCEPTED_FILE_TYPES,
  ACCEPTED_FILE_EXT,
} from "@/lib/validations";
import { interestOptions, budgetOptions, sourceOptions } from "@/lib/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      interest: "",
      budget: "",
      source: "",
      message: "",
      nda: false,
    },
  });

  const [status, setStatus] = React.useState<Status>("idle");
  const [file, setFile] = React.useState<File | null>(null);
  const [fileError, setFileError] = React.useState<string | null>(null);

  function handleFile(selected: File | null) {
    setFileError(null);
    if (!selected) return setFile(null);
    if (selected.size > MAX_FILE_BYTES) {
      setFile(null);
      return setFileError("File must be under 10 MB.");
    }
    if (!ACCEPTED_FILE_TYPES.includes(selected.type)) {
      setFile(null);
      return setFileError("Please upload a PDF, DOC or DOCX file.");
    }
    setFile(selected);
  }

  async function onSubmit(values: ContactValues) {
    setStatus("submitting");
    try {
      const fd = new FormData();
      Object.entries(values).forEach(([key, value]) => fd.append(key, String(value)));
      if (file) fd.append("file", file);

      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      reset();
      setFile(null);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-border bg-white p-10 text-center shadow-soft">
        <span className="grid size-16 place-items-center rounded-full bg-aster-100 text-aster-700">
          <CheckCircle2 className="size-8" />
        </span>
        <h3 className="mt-6 text-2xl font-bold text-navy">Thank you — message sent!</h3>
        <p className="mt-3 max-w-md text-muted-foreground">
          Our team will get back to you within one business day. For anything urgent, call us
          directly and we&apos;ll jump right on it.
        </p>
        <Button className="mt-8" variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required error={errors.name?.message}>
          <Input
            id="name"
            placeholder="Jane Doe"
            aria-invalid={!!errors.name}
            aria-required="true"
            {...register("name")}
          />
        </Field>

        <Field label="Email address" htmlFor="email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            placeholder="jane@company.com"
            aria-invalid={!!errors.email}
            aria-required="true"
            {...register("email")}
          />
        </Field>

        <Field label="Phone number" htmlFor="phone" required error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            aria-invalid={!!errors.phone}
            aria-required="true"
            {...register("phone")}
          />
        </Field>

        <Field label="Company" htmlFor="company" error={errors.company?.message}>
          <Input id="company" placeholder="Company name" {...register("company")} />
        </Field>

        <Field label="I'm interested in" htmlFor="interest" required error={errors.interest?.message}>
          <Controller
            control={control}
            name="interest"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="interest" aria-invalid={!!errors.interest}>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {interestOptions.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field label="Project budget" htmlFor="budget" required error={errors.budget?.message}>
          <Controller
            control={control}
            name="budget"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="budget" aria-invalid={!!errors.budget}>
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field label="How did you find us?" htmlFor="source" className="sm:col-span-2">
          <Controller
            control={control}
            name="source"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="source">
                  <SelectValue placeholder="Select an option (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {sourceOptions.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field
          label="Project details"
          htmlFor="message"
          required
          error={errors.message?.message}
          className="sm:col-span-2"
        >
          <Textarea
            id="message"
            rows={5}
            placeholder="Tell us about your project, goals and timeline…"
            aria-invalid={!!errors.message}
            aria-required="true"
            {...register("message")}
          />
        </Field>

        {/* File upload */}
        <div className="sm:col-span-2">
          <Label htmlFor="file">Attach a brief (optional)</Label>
          <label
            htmlFor="file"
            className={cn(
              "mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-input bg-white px-4 py-3.5 text-sm transition-colors hover:border-aster hover:bg-aster-50",
              fileError && "border-destructive"
            )}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-aster-100 text-aster-700">
              <Paperclip className="size-4" />
            </span>
            {file ? (
              <span className="flex flex-1 items-center justify-between gap-2">
                <span className="truncate font-medium text-navy">{file.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFile(null);
                  }}
                  aria-label="Remove file"
                  className="grid size-7 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-aster-100 hover:text-navy"
                >
                  <X className="size-4" />
                </button>
              </span>
            ) : (
              <span className="text-muted-foreground">
                Drop a file or <span className="font-semibold text-aster-700">browse</span> — PDF, DOC,
                DOCX up to 10&nbsp;MB
              </span>
            )}
            <input
              id="file"
              type="file"
              accept={ACCEPTED_FILE_EXT}
              className="sr-only"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
          </label>
          {fileError ? (
            <p className="mt-1.5 flex items-center gap-1 text-sm text-destructive" role="alert">
              <AlertCircle className="size-3.5" /> {fileError}
            </p>
          ) : null}
        </div>

        {/* NDA */}
        <div className="flex items-start gap-3 sm:col-span-2">
          <Controller
            control={control}
            name="nda"
            render={({ field }) => (
              <Checkbox
                id="nda"
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v === true)}
                className="mt-0.5"
              />
            )}
          />
          <Label htmlFor="nda" className="font-medium leading-relaxed text-muted-foreground">
            I&apos;d like to sign an NDA before sharing project details.
          </Label>
        </div>
      </div>

      {status === "error" ? (
        <p
          className="mt-5 flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          <AlertCircle className="size-4" /> Something went wrong. Please try again or email us
          directly.
        </p>
      ) : null}

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="size-4" /> Send message
          </>
        )}
      </Button>
      <p className="mt-4 text-xs text-muted-foreground">
        By submitting, you agree to our privacy policy. We&apos;ll never share your details.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {required ? <span className="text-aster-700">*</span> : null}
      </Label>
      {children}
      {error ? (
        <p className="flex items-center gap-1 text-sm text-destructive" role="alert">
          <AlertCircle className="size-3.5" /> {error}
        </p>
      ) : null}
    </div>
  );
}
