import { useCategories } from '../context/categories-provider';
import { CategoryFormModal } from './category-form-modal';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { useDeleteCategory } from '../api/delete-category';

export function CategoriesDialogs({ availableParents = [] }: { availableParents?: any[] }) {
  const { open, setOpen, currentRow, setCurrentRow } = useCategories();
  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  return (
    <>
      <CategoryFormModal
        key="category-create"
        open={open === 'create'}
        onOpenChange={(isOpen) => setOpen(isOpen ? 'create' : null)}
        availableParents={availableParents}
      />

      {currentRow && (
        <>
          <CategoryFormModal
            key={`category-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'update' : null);
              if (!isOpen) {
                setTimeout(() => {
                  setCurrentRow(null);
                }, 500);
              }
            }}
            currentRow={currentRow}
            availableParents={availableParents}
          />

          <ConfirmDialog
            key="category-delete"
            destructive
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'delete' : null);
              if (!isOpen) {
                setTimeout(() => {
                  setCurrentRow(null);
                }, 500);
              }
            }}
            handleConfirm={() => {
              deleteCategory(currentRow.id, {
                onSuccess: () => {
                  setOpen(null);
                  setTimeout(() => {
                    setCurrentRow(null);
                  }, 500);
                }
              });
            }}
            className="max-w-md"
            title={`Delete this category: ${currentRow.name}?`}
            confirmText={isPending ? "Deleting..." : "Delete"}
            desc={
              <>
                You are about to delete the category <strong>{currentRow.name}</strong>.
                <br />
                This action cannot be undone and may affect related products and subcategories.
              </>
            }
          />
        </>
      )}
    </>
  );
}
