import { Monitor, Smartphone } from "lucide-react";
import { DesktopPreview } from "./desktop-preview";
import { MobilePreview } from "./mobile-preview";
import type { Product } from "./product-selection";

type PreviewMode = "desktop" | "mobile";

interface PreviewPanelProps {
  previewMode: PreviewMode;
  setPreviewMode: (mode: PreviewMode) => void;
  dealTitle: string;
  dealSubtitle: string;
  selectedProducts: Product[];
}

export function PreviewPanel({
  previewMode,
  setPreviewMode,
  dealTitle,
  dealSubtitle,
  selectedProducts,
}: PreviewPanelProps) {
  return (
    <div className="xl:sticky xl:top-5 xl:self-start">
      {/* Preview tabs */}
      <div className="mb-4 flex h-11 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setPreviewMode("desktop")}
          className={`flex flex-1 items-center justify-center gap-2 text-sm font-semibold transition ${
            previewMode === "desktop"
              ? "border-b-2 border-violet-500 text-violet-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Monitor size={15} />
          Desktop preview
        </button>

        <button
          type="button"
          onClick={() => setPreviewMode("mobile")}
          className={`flex flex-1 items-center justify-center gap-2 text-sm font-semibold transition ${
            previewMode === "mobile"
              ? "border-b-2 border-violet-500 text-violet-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Smartphone size={15} />
          Mobile preview
        </button>
      </div>

      {/* Preview area */}
      <div className="flex min-h-162.5 items-start justify-center overflow-hidden rounded-2xl border border-gray-200 bg-[#f4f4f9] p-6 transition-all duration-300">
        {previewMode === "desktop" ? (
          <DesktopPreview
            title={dealTitle}
            subtitle={dealSubtitle}
            products={selectedProducts}
          />
        ) : (
          <MobilePreview
            title={dealTitle}
            subtitle={dealSubtitle}
            products={selectedProducts}
          />
        )}
      </div>
    </div>
  );
}
