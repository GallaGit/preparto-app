import { useState, type FormEvent } from 'react';
import { Button } from '@/components/Button';
import { TextField } from '@/components/Form';
import { HospitalBagChecklist } from '@/components/HospitalBagChecklist';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { useI18n } from '@/i18n/I18nProvider';
import { useHospitalBag } from '@/hooks/useHospitalBag';

export function HospitalBag() {
  const { t } = useI18n();
  const {
    active,
    done,
    isLoading,
    error,
    addItem,
    updateItem,
    removeItems,
  } = useHospitalBag();
  const [newLabel, setNewLabel] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  async function handleAdd(event: FormEvent) {
    event.preventDefault();
    if (!newLabel.trim() || isAdding) {
      return;
    }
    setIsAdding(true);
    const ok = await addItem(newLabel);
    if (ok) {
      setNewLabel('');
    }
    setIsAdding(false);
  }

  return (
    <Layout>
      <PageHeader
        title={t('hospitalBag.title')}
        subtitle={t('hospitalBag.subtitle')}
        backTo="/"
      />

      <p className="mt-4 text-sm leading-relaxed text-primary-700">
        {t('hospitalBag.help')}
      </p>

      <form
        onSubmit={handleAdd}
        className="mt-5 flex flex-col gap-3 rounded-2xl border-2 border-primary-200 bg-white p-4"
      >
        <TextField
          id="hospital-bag-new-item"
          label={t('hospitalBag.addLabel')}
          value={newLabel}
          onChange={(event) => setNewLabel(event.target.value)}
          placeholder={t('hospitalBag.addPlaceholder')}
          autoComplete="off"
        />
        <Button type="submit" fullWidth disabled={!newLabel.trim() || isAdding}>
          {isAdding ? t('hospitalBag.adding') : t('hospitalBag.add')}
        </Button>
      </form>

      {error ? (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-6">
        {isLoading ? (
          <p className="text-sm text-primary-600">{t('hospitalBag.loading')}</p>
        ) : (
          <HospitalBagChecklist
            active={active}
            done={done}
            onToggleDone={(id, nextDone) => {
              void updateItem(id, { done: nextDone });
            }}
            onTogglePriority={(id, priority) => {
              void updateItem(id, { priority });
            }}
            onRename={(id, label) => {
              void updateItem(id, { label });
            }}
            onRemoveSelected={(ids) => {
              void removeItems(ids);
            }}
            labels={{
              activeTitle: t('hospitalBag.activeTitle'),
              doneTitle: t('hospitalBag.doneTitle'),
              emptyActive: t('hospitalBag.emptyActive'),
              emptyDone: t('hospitalBag.emptyDone'),
              selectMode: t('hospitalBag.selectMode'),
              cancelSelect: t('hospitalBag.cancelSelect'),
              deleteSelected: t('hospitalBag.deleteSelected'),
              confirmDelete: t('hospitalBag.confirmDelete'),
              done: t('hospitalBag.markDone'),
              select: t('hospitalBag.selectItem'),
              priority: t('hospitalBag.priority'),
              edit: t('hospitalBag.edit'),
            }}
          />
        )}
      </div>
    </Layout>
  );
}
