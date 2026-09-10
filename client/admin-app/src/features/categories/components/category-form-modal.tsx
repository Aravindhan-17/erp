import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { categorySchema, type CategoryFormData, type CategoryFormInput } from "../schema/category.schema";
import { useCreateCategory } from "../api/create-category";
import { useUpdateCategory } from "../api/update-category";
import { useUploadFile } from "../../storage/api/upload";

type CategoryFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: any;
  availableParents?: any[];
};

export function CategoryFormModal({ open, onOpenChange, currentRow: category, availableParents = [] }: CategoryFormModalProps) {
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutateAsync: uploadFile } = useUploadFile();
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isPending = isCreating || isUpdating || isUploading;

  const { register, handleSubmit, reset, setValue, control, formState: { errors, dirtyFields } } = useForm<CategoryFormInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      parentId: null,
      status: "ACTIVE",
      description: "",
      imageUrl: "",
    }
  });

  const imageUrl = useWatch({ control, name: "imageUrl" });
  const nameValue = useWatch({ control, name: "name" });

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  useEffect(() => {
    // Auto-generate slug from name if the user hasn't manually edited the slug field
    if (!category && nameValue !== undefined && !dirtyFields.slug) {
      const generatedSlug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [nameValue, category, setValue, dirtyFields.slug]);

  useEffect(() => {
    if (open) {
      if (category) {
        reset({
          name: category.name,
          slug: category.slug,
          parentId: category.parentId || null,
          status: category.status,
          description: category.description || "",
          imageUrl: category.imageUrl || "",
        });
      } else {
        reset({
          name: "",
          slug: "",
          parentId: null,
          status: "ACTIVE",
          description: "",
          imageUrl: "",
        });
      }
    }
  }, [open, category, reset]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 5MB.");
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPEG, PNG, WebP, and PDF are allowed.");
      return;
    }

    setIsUploading(true);
    setImageError(false);
    try {
      const { publicUrl } = await uploadFile({ file, folder: "categories" });
      setValue("imageUrl", publicUrl, { shouldValidate: true, shouldDirty: true });
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Failed to upload image to storage. Please try again later.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!open) return null;

  const onSubmit = (formData: CategoryFormInput) => {
    // The zod resolver transforms the data to CategoryFormData at runtime
    const data = formData as unknown as CategoryFormData;
    
    if (category) {
      updateCategory({ id: category.id, data }, {
        onSuccess: () => onOpenChange(false)
      });
    } else {
      createCategory(data, {
        onSuccess: () => onOpenChange(false)
      });
    }
  };

  const onError = (errors: any) => {
    console.error("Form validation errors:", errors);
    toast.error("Please fix the validation errors in the form.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm">
      {/* Slide-over panel */}
      <div className="h-full w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900">
            {category ? "Edit Category" : "Add New Category"}
          </h3>
          <button 
            onClick={() => onOpenChange(false)}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form id="category-form" onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Category Name *</label>
              <input 
                type="text" 
                placeholder="e.g. Electronics" 
                {...register("name")}
                className={`h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none transition-colors focus:ring-1 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-primary'}`}
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
            </div>
            
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Slug *</label>
              <input 
                type="text" 
                placeholder="e.g. electronics" 
                {...register("slug")}
                className={`h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none transition-colors focus:ring-1 ${errors.slug ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-primary'}`}
              />
              {errors.slug && <p className="mt-1.5 text-xs text-red-500">{errors.slug.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Parent Category</label>
              <select 
                {...register("parentId")}
                className={`h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none transition-colors focus:ring-1 ${errors.parentId ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-primary'}`}
              >
                <option value="">None (Top Level Category)</option>
                {availableParents
                  .filter((p) => p.id !== category?.id) // Prevent selecting itself
                  .map((parent) => (
                  <option key={parent.id} value={parent.id}>
                    {parent.name}
                  </option>
                ))}
              </select>
              {errors.parentId && <p className="mt-1.5 text-xs text-red-500">{errors.parentId.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Status</label>
              <select 
                {...register("status")}
                className={`h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none transition-colors focus:ring-1 ${errors.status ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-primary'}`}
              >
                <option value="ACTIVE">Active</option>
                <option value="UPCOMING">Upcoming</option>
                <option value="INACTIVE">Inactive</option>
              </select>
              {errors.status && <p className="mt-1.5 text-xs text-red-500">{errors.status.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Description</label>
              <textarea 
                placeholder="Brief description of the category..." 
                {...register("description")}
                rows={3}
                className={`w-full rounded-xl border bg-white p-3 text-sm outline-none transition-colors focus:ring-1 resize-none ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-primary'}`}
              />
              {errors.description && <p className="mt-1.5 text-xs text-red-500">{errors.description.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Image</label>
              
              <div className="relative flex items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 overflow-hidden group">
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/webp" 
                  onChange={handleImageUpload}
                  className="absolute inset-0 z-10 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  disabled={isUploading}
                />
                
                {isUploading ? (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-primary">
                    <Loader2 size={20} className="animate-spin" />
                  </div>
                ) : imageUrl && !imageError ? (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-200">
                    <img 
                      src={imageUrl} 
                      alt="Category preview" 
                      className="h-full w-full object-cover" 
                      onError={() => setImageError(true)}
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <ImageIcon size={20} />
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  <span className="font-semibold text-primary">Click to upload</span> or drag and drop<br/>
                  SVG, PNG, JPG (max 2MB)
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onOpenChange(false);
            }}
            disabled={isPending}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="category-form"
            disabled={isPending}
            className="bg-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Saving..." : category ? "Save Changes" : "Create Category"}
          </button>
        </div>
      </div>
    </div>
  );
}

