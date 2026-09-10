import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Category } from '../components/columns';
import useDialogState from '@/hooks/use-dialog-state';

type DialogType = 'create' | 'update' | 'delete';

interface CategoriesContextType {
  open: DialogType | null;
  setOpen: (open: DialogType | null) => void;
  currentRow: Category | null;
  setCurrentRow: (row: Category | null) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useDialogState<DialogType>(null);
  const [currentRow, setCurrentRow] = useState<Category | null>(null);

  return (
    <CategoriesContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
}
