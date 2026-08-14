import { useState } from 'react';
import { Button } from '@/components/Button';
import { HospitalBagItemRow } from '@/components/HospitalBagChecklist/HospitalBagItemRow';
import type { HospitalBagItem } from '@/types/hospitalBag';

interface HospitalBagChecklistProps {
  active: HospitalBagItem[];
  done: HospitalBagItem[];
  onToggleDone: (id: string, done: boolean) => void;
  onTogglePriority: (id: string, priority: boolean) => void;
  onRename: (id: string, label: string) => void;
  onRemoveSelected: (ids: string[]) => void;
  labels: {
    activeTitle: string;
    doneTitle: string;
    emptyActive: string;
    emptyDone: string;
    selectMode: string;
    cancelSelect: string;
    deleteSelected: string;
    confirmDelete: string;
    done: string;
    select: string;
    priority: string;
    edit: string;
  };
}

export function HospitalBagChecklist({
  active,
  done,
  onToggleDone,
  onTogglePriority,
  onRename,
  onRemoveSelected,
  labels,
}: HospitalBagChecklistProps) {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function exitSelectionMode() {
    setSelectionMode(false);
    setSelectedIds(new Set());
  }

  function handleDeleteSelected() {
    if (selectedIds.size === 0) {
      return;
    }
    if (!window.confirm(labels.confirmDelete)) {
      return;
    }
    onRemoveSelected([...selectedIds]);
    exitSelectionMode();
  }

  const rowLabels = {
    done: labels.done,
    select: labels.select,
    priority: labels.priority,
    edit: labels.edit,
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {selectionMode ? (
          <>
            <Button variant="secondary" onClick={exitSelectionMode}>
              {labels.cancelSelect}
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteSelected}
              disabled={selectedIds.size === 0}
            >
              {labels.deleteSelected}
            </Button>
          </>
        ) : (
          <Button variant="secondary" onClick={() => setSelectionMode(true)}>
            {labels.selectMode}
          </Button>
        )}
      </div>

      <section aria-labelledby="hospital-bag-active-title">
        <h2
          id="hospital-bag-active-title"
          className="mb-3 text-lg font-semibold text-primary-900"
        >
          {labels.activeTitle}
        </h2>
        {active.length === 0 ? (
          <p className="text-sm text-primary-600">{labels.emptyActive}</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {active.map((item) => (
              <HospitalBagItemRow
                key={item.id}
                item={item}
                selectionMode={selectionMode}
                selected={selectedIds.has(item.id)}
                onToggleSelect={toggleSelect}
                onToggleDone={onToggleDone}
                onTogglePriority={onTogglePriority}
                onRename={onRename}
                labels={rowLabels}
              />
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="hospital-bag-done-title">
        <h2
          id="hospital-bag-done-title"
          className="mb-3 text-lg font-semibold text-primary-900"
        >
          {labels.doneTitle}
        </h2>
        {done.length === 0 ? (
          <p className="text-sm text-primary-600">{labels.emptyDone}</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {done.map((item) => (
              <HospitalBagItemRow
                key={item.id}
                item={item}
                selectionMode={selectionMode}
                selected={selectedIds.has(item.id)}
                onToggleSelect={toggleSelect}
                onToggleDone={onToggleDone}
                onTogglePriority={onTogglePriority}
                onRename={onRename}
                labels={rowLabels}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
