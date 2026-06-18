"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import type { Option } from "@/data/shapeContent";

type MultiSelectFieldProps = {
  label: string;
  help?: string;
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  otherLabel?: string;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  searchable?: boolean;
  maxSelections?: number;
};

function matches(option: Option, query: string) {
  return `${option.label} ${option.description || ""} ${option.children?.map((child) => child.label).join(" ") || ""}`.toLowerCase().includes(query);
}

export function MultiSelectField({ label, help, options, selected, onChange, otherLabel, otherValue = "", onOtherChange, searchable, maxSelections }: MultiSelectFieldProps) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const visible = useMemo(() => normalized ? options.filter((option) => matches(option, normalized)) : options, [normalized, options]);
  const toggle = (id: string) => {
    if (selected.includes(id)) return onChange(selected.filter((item) => item !== id));
    if (maxSelections && selected.length >= maxSelections) return;
    onChange([...selected, id]);
  };

  return (
    <fieldset className="multi-field">
      <legend>{label}</legend>
      {help && <p className="field-help">{help}</p>}
      {maxSelections && <p className="selection-count">Select up to {maxSelections} · {selected.length} selected</p>}
      {searchable && <label className="search-field"><Search size={18} /><span className="sr-only">Search options</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this list…" /></label>}
      <div className="option-grid">
        {visible.map((option) => option.children ? (
          <details className="nested-option" key={option.id} open={Boolean(normalized)}>
            <summary><span>{option.label}</span><ChevronDown size={18} /></summary>
            {option.description && <p>{option.description}</p>}
            <div className="nested-grid">
              {option.children.map((child) => <OptionButton key={`${option.id}-${child.id}`} option={child} id={`${option.id}:${child.id}`} selected={selected.includes(`${option.id}:${child.id}`)} disabled={Boolean(maxSelections && selected.length >= maxSelections && !selected.includes(`${option.id}:${child.id}`))} onClick={toggle} />)}
            </div>
          </details>
        ) : <OptionButton key={option.id} option={option} id={option.id} selected={selected.includes(option.id)} disabled={Boolean(maxSelections && selected.length >= maxSelections && !selected.includes(option.id))} onClick={toggle} />)}
      </div>
      {otherLabel && onOtherChange && <label className="other-field"><span>{otherLabel}</span><input value={otherValue} onChange={(event) => onOtherChange(event.target.value)} placeholder="Type your own response" /></label>}
    </fieldset>
  );
}

function OptionButton({ option, id, selected, disabled, onClick }: { option: Option; id: string; selected: boolean; disabled: boolean; onClick: (id: string) => void }) {
  return <button type="button" className={`option-button ${selected ? "selected" : ""}`} aria-pressed={selected} disabled={disabled} onClick={() => onClick(id)}><span className="choice-check">{selected && <Check size={14} strokeWidth={3} />}</span><span><strong>{option.label}</strong>{option.description && <small>{option.description}</small>}</span></button>;
}
