import { useEffect, useRef, useState } from 'react';
import type { HospitalBagItem } from '@/types/hospitalBag';

interface HospitalBagItemRowProps {
  item: HospitalBagItem;
  selectionMode: boolean;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onToggleDone: (id: string, done: boolean) => void;
  onTogglePriority: (id: string, priority: boolean) => void;
  onRename: (id: string, label: string) => void;
  labels: {
    done: string;
    select: string;
    priority: string;
    edit: string;
  };
}

export function HospitalBagItemRow({
  item,
  selectionMode,
  selected,
  onToggleSelect,
  onToggleDone,
  onTogglePriority,
  onRename,
  labels,
}: HospitalBagItemRowProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.label);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editing) {
      setDraft(item.label);
    }
  }, [item.label, editing]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function commitEdit() {
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft(item.label);
      setEditing(false);
      return;
    }
    if (trimmed !== item.label) {
      onRename(item.id, trimmed);
    }
    setEditing(false);
  }

  function cancelEdit() {
    setDraft(item.label);
    setEditing(false);
  }

  return (
    <li
      className={[
        'flex items-start gap-3 rounded-2xl border-2 px-3 py-3',
        item.done
          ? 'border-primary-100 bg-primary-50/80'
          : 'border-primary-200 bg-white',
        item.priority && !item.done ? 'border-amber-300' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {selectionMode ? (
        <input
          type="checkbox"
          className="mt-1 size-5 shrink-0 accent-primary-600"
          checked={selected}
          onChange={() => onToggleSelect(item.id)}
          aria-label={`${labels.select}: ${item.label}`}
        />
      ) : null}

      <input
        type="checkbox"
        className="mt-1 size-5 shrink-0 accent-primary-600"
        checked={item.done}
        onChange={(event) => onToggleDone(item.id, event.target.checked)}
        aria-label={`${labels.done}: ${item.label}`}
        disabled={selectionMode}
      />

      <div className="min-w-0 flex-1">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commitEdit}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                commitEdit();
              }
              if (event.key === 'Escape') {
                event.preventDefault();
                cancelEdit();
              }
            }}
            className="w-full rounded-xl border-2 border-primary-300 bg-white px-3 py-2 text-base text-primary-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200"
            aria-label={labels.edit}
          />
        ) : (
          <button
            type="button"
            className={[
              'w-full min-h-11 rounded-xl px-1 py-1 text-left text-base text-primary-900',
              'hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200',
              item.done ? 'line-through text-primary-500' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => {
              if (!selectionMode) {
                setEditing(true);
              }
            }}
            disabled={selectionMode}
          >
            {item.label}
          </button>
        )}
      </div>

      <button
        type="button"
        className={[
          'mt-0.5 inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl text-lg',
          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200',
          item.priority
            ? 'bg-amber-100 text-amber-700'
            : 'bg-transparent text-primary-400 hover:bg-primary-50',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-pressed={item.priority}
        aria-label={labels.priority}
        disabled={selectionMode || item.done}
        onClick={() => onTogglePriority(item.id, !item.priority)}
      >
        {item.priority ? '★' : '☆'}
      </button>
    </li>
  );
}
