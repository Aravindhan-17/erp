import { useState } from 'react';
import { DealHeader } from './deal-header';
import { DealInformation } from './deal-information';
import { DealTerms } from './deal-terms';
import { ProductSelection, type Product } from './product-selection';
import { DealSchedule } from './deal-schedule';
import { PreviewPanel } from './preview-panel';

const products: Product[] = [
  {
    id: 1,
    name: 'UltraSound 65" 4K Smart TV',
    price: "₹52,999",
    image: "/assets/products/tv.jpg",
  },
  {
    id: 2,
    name: "AirPure Noise-Cancel Headphones",
    price: "₹5,499",
    image: "/assets/products/headphones.jpg",
  },
  {
    id: 3,
    name: 'FlexBook 14" Ultraslim Laptop',
    price: "₹41,999",
    image: "/assets/products/laptop.jpg",
  },
  {
    id: 4,
    name: "ChillMax 260L Frost-Free Fridge",
    price: "₹22,499",
    image: "/assets/products/fridge.jpg",
  },
  {
    id: 5,
    name: "SpinPro 8kg Front-Load Washer",
    price: "₹18,999",
    image: "/assets/products/washing-machine.jpg",
  },
  {
    id: 6,
    name: "Linen Weekend Shirt (Pack of 2)",
    price: "₹999",
    image: "/assets/products/shirt.jpg",
  },
];

export function CreateDealPage() {
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("mobile");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([products[0], products[1]]);
  const [dealTitle, setDealTitle] = useState("");
  const [dealSubtitle, setDealSubtitle] = useState("");

  const toggleProduct = (product: Product) => {
    const exists = selectedProducts.some((item) => item.id === product.id);
    if (exists) {
      setSelectedProducts((current) => current.filter((item) => item.id !== product.id));
    } else {
      setSelectedProducts((current) => [...current, product]);
    }
  };

  return (
    <div className="font-poppins min-h-screen bg-[#f8f8fc] text-gray-900">
      <DealHeader />

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,0.85fr)]">
        {/* LEFT FORM */}
        <div className="space-y-3">
          <DealInformation
            dealTitle={dealTitle}
            setDealTitle={setDealTitle}
            dealSubtitle={dealSubtitle}
            setDealSubtitle={setDealSubtitle}
          />
          <DealTerms />
          <ProductSelection
            products={products}
            selectedProducts={selectedProducts}
            toggleProduct={toggleProduct}
          />
          <DealSchedule />
        </div>

        {/* RIGHT PREVIEW */}
        <PreviewPanel
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          dealTitle={dealTitle}
          dealSubtitle={dealSubtitle}
          selectedProducts={selectedProducts}
        />
      </div>
    </div>
  );
}
