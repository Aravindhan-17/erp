import { InputField } from "./input-field";

interface DealInformationProps {
  dealTitle: string;
  setDealTitle: (val: string) => void;
  dealSubtitle: string;
  setDealSubtitle: (val: string) => void;
}

export function DealInformation({ dealTitle, setDealTitle, dealSubtitle, setDealSubtitle }: DealInformationProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h2 className="text-lg font-bold text-gray-800">
          Deal information
        </h2>
        <p className="text-sm text-gray-500">
          Basic details shown across the storefront.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputField
          label="Deal title"
          placeholder="Enter deal title"
          value={dealTitle}
          onChange={setDealTitle}
        />
        <InputField
          label="Deal subtitle"
          placeholder="Enter short subtitle"
          value={dealSubtitle}
          onChange={setDealSubtitle}
        />
        <div className="md:col-span-2">
          <InputField
            label="Deal banner image URL"
            placeholder="assets/deal_home.jpg"
          />
        </div>
        <InputField
          label="Start date & time"
          type="datetime-local"
          defaultValue="2026-08-20T16:19"
        />
        <InputField
          label="End date & time"
          type="datetime-local"
          defaultValue="2026-08-20T17:19"
        />
        <InputField
          label="Registration fee (₹)"
          defaultValue="1"
        />
        <InputField
          label="Cart reservation (minutes)"
          defaultValue="10"
        />
        <InputField
          label="Minimum order value (₹)"
          defaultValue="5000"
        />
        <InputField
          label="Minimum number of products"
          defaultValue="2"
        />
      </div>
    </section>
  );
}
