export type HospitalBagItem = {
  id: string;
  label: string;
  done: boolean;
  priority: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string | null;
};
