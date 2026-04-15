"use client";

import { useState } from "react";
import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/Icon";
import { PhotoThumb } from "@/components/PhotoThumb";

/**
 * /min-hund/redigera — formulär för hundprofil.
 * Version C: 24px hero, fält i tre grupper (identitet, kropp, vardag).
 * Spara-knapp stänger och skickar tillbaka till /min-hund.
 */

export default function RedigeraHundPage() {
  const [form, setForm] = useState({
    name: "Luna",
    breed: "Border collie",
    ageYears: "2",
    ageMonths: "3",
    weight: "17",
    allergies: "",
    note: "Lite osäker med stora hundar",
    birthday: "2024-01-18",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">Redigera profil</p>
      </div>

      <PhoneFrame>
        <form
          onSubmit={handleSave}
          className="h-full overflow-y-auto px-5 pb-8 pt-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/min-hund"
              aria-label="Tillbaka till Min hund"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
            >
              <Icon.ArrowLeft size={18} />
            </Link>
          </div>

          {/* Hero */}
          <div className="mb-4">
            <h1 className="font-display text-[24px] leading-[1.15]">
              Redigera{" "}
              <em className="text-sage-600 italic">{form.name}s</em> profil
            </h1>
            <p className="text-[13px] text-text-muted mt-1">
              Ju mer vi vet, desto bättre kan Anna skräddarsy passen.
            </p>
          </div>

          {/* Foto */}
          <div className="flex items-center gap-4 mb-5">
            <PhotoThumb
              src="/photos/dogs/dog-1.svg"
              alt={`Foto av ${form.name}`}
              size={64}
              rounded="full"
              variant="dog"
            />
            <button
              type="button"
              className="text-[12px] font-semibold text-sage-800 hover:text-sage-600 transition-colors"
              onClick={() =>
                alert("Fotouppladdning kommer i nästa version.")
              }
            >
              Byt foto
            </button>
          </div>

          {/* Grupp: Identitet */}
          <FieldGroup title="Identitet">
            <Field
              id="name"
              label="Namn"
              value={form.name}
              onChange={(v) => handleChange("name", v)}
              required
            />
            <Field
              id="breed"
              label="Ras"
              value={form.breed}
              onChange={(v) => handleChange("breed", v)}
            />
            <Field
              id="birthday"
              label="Födelsedatum"
              type="date"
              value={form.birthday}
              onChange={(v) => handleChange("birthday", v)}
            />
          </FieldGroup>

          {/* Grupp: Kropp */}
          <FieldGroup title="Kropp">
            <div className="grid grid-cols-2 gap-3">
              <Field
                id="ageYears"
                label="Ålder, år"
                type="number"
                value={form.ageYears}
                onChange={(v) => handleChange("ageYears", v)}
              />
              <Field
                id="ageMonths"
                label="Ålder, mån"
                type="number"
                value={form.ageMonths}
                onChange={(v) => handleChange("ageMonths", v)}
              />
            </div>
            <Field
              id="weight"
              label="Vikt, kg"
              type="number"
              value={form.weight}
              onChange={(v) => handleChange("weight", v)}
            />
          </FieldGroup>

          {/* Grupp: Vardag */}
          <FieldGroup title="Vardag">
            <Field
              id="allergies"
              label="Allergier (frivilligt)"
              value={form.allergies}
              onChange={(v) => handleChange("allergies", v)}
              placeholder="T.ex. kyckling, gräspollen"
            />
            <FieldTextarea
              id="note"
              label="Anteckning till instruktören"
              value={form.note}
              onChange={(v) => handleChange("note", v)}
              placeholder="Något Anna bör veta om Luna?"
            />
          </FieldGroup>

          {/* Spara */}
          <button
            type="submit"
            className={`w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-pill text-[14px] font-semibold transition-transform duration-150 active:scale-[0.97] mt-2 ${
              saved
                ? "bg-sage-100 text-sage-800 border border-sage-500/40"
                : "bg-action-primary text-bone-50"
            }`}
          >
            {saved ? (
              <>
                <Icon.Check size={16} />
                Sparat
              </>
            ) : (
              "Spara ändringar"
            )}
          </button>
          <p className="text-[11px] text-text-muted text-center mt-2">
            Prototyp — ingen data skickas i den här versionen.
          </p>
        </form>
      </PhoneFrame>
    </div>
  );
}

function FieldGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5">
      <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2">
        {title}
      </p>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-bold tracking-wider text-text-secondary uppercase mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-3 rounded-[12px] bg-bg-surface border border-charcoal-900/10 text-[14px] text-charcoal-900 placeholder:text-text-muted focus:outline-none focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 transition-colors"
      />
    </div>
  );
}

function FieldTextarea({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-bold tracking-wider text-text-secondary uppercase mb-1"
      >
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 rounded-[12px] bg-bg-surface border border-charcoal-900/10 text-[14px] text-charcoal-900 placeholder:text-text-muted focus:outline-none focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 transition-colors resize-none"
      />
    </div>
  );
}
