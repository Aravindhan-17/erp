"use client";

import { useState } from "react";

interface Specification {
  label: string;
  value: string;
}

interface QA {
  question: string;
  answer: string;
}

interface Product {
  reviews?: number;
  description?: string;
  specifications?: Specification[];
  boxItems?: string[];
  qa?: QA[];
}

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [tab, setTab] = useState("Description");

  const tabs = [
    "Description",
    "Specifications",
    "What's in the Box",
    `Reviews (${product.reviews ?? 0})`,
    "Q&A",
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200">
        {tabs.map((item) => {
          const value = item.startsWith("Reviews") ? "Reviews" : item;

          return (
            <button
              key={item}
              onClick={() => setTab(value)}
              className={`whitespace-nowrap border-b-2 px-6 py-4 text-sm font-medium transition-all
              ${
                tab === value
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Description */}
        {tab === "Description" && (
          <div>
            <p className="leading-8 text-gray-600">
              {product.description ?? "No description available"}
            </p>
            <button className="text-primary hover:text-primary-hover mt-5 font-semibold transition-colors">
              Read More ▼
            </button>
          </div>
        )}

        {/* Specifications */}
        {tab === "Specifications" && (
          <table className="w-full">
            <tbody>
              {product.specifications && product.specifications.length > 0 ? (
                product.specifications.map((item: Specification) => (
                  <tr key={item.label} className="border-b border-gray-200">
                    <td className="py-3 text-gray-500">{item.label}</td>

                    <td className="py-3 text-right font-medium">{item.value}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 text-gray-500">No specifications available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* What's in Box */}
        {tab === "What's in the Box" && (
          <ul className="ml-5 list-disc space-y-3 text-gray-600">
            {product.boxItems && product.boxItems.length > 0 ? (
              product.boxItems.map((item: string) => <li key={item}>{item}</li>)
            ) : (
              <li>No items available</li>
            )}
          </ul>
        )}

        {/* Reviews */}
        {tab === "Reviews" && (
          <div>
            <h3 className="text-lg font-semibold">{product.reviews ?? 0} Reviews</h3>

            <p className="mt-4 text-gray-500">⭐⭐⭐⭐⭐ Excellent Product</p>
          </div>
        )}

        {/* Q&A */}
        {tab === "Q&A" && (
          <div className="space-y-4">
            {product.qa && product.qa.length > 0 ? (
              product.qa.map((item: QA, index: number) => (
                <div key={index}>
                  <p className="font-semibold">Q. {item.question}</p>

                  <p className="text-gray-500">A. {item.answer}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No questions available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
