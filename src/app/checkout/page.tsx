"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/useCheckout";

type Checkout = ReturnType<typeof useCheckout>;
type ShippingMethods = Awaited<ReturnType<Checkout["submitShippingAddress"]>>;
type ShippingResult = Awaited<ReturnType<Checkout["submitShippingMethod"]>>;
type PaymentMethods = NonNullable<
  NonNullable<ShippingResult>["available_payment_methods"]
>;
type Stage = "address" | "shipping" | "payment";
type Total = { value?: number | null; currency?: string | null } | null;

const inputClass =
  "w-full bg-panel border border-line rounded-md px-3.5 py-3 text-sm text-cream placeholder:text-muted focus:outline-none focus:border-cold";
const primaryButton =
  "bg-accent text-cream rounded-md px-8 py-3.5 text-sm font-semibold disabled:opacity-50";
const secondaryButton =
  "border border-line rounded-md px-6 py-3.5 text-sm text-cream/80 hover:border-[#333338] transition";

const hiddenRegionCodes = ["UA-43"];

const stages: { id: Stage; label: string }[] = [
  { id: "address", label: "Address" },
  { id: "shipping", label: "Delivery" },
  { id: "payment", label: "Payment" },
];

const emptyForm = {
  firstname: "",
  lastname: "",
  street: "",
  city: "",
  region: "",
  postcode: "",
  countryCode: "US",
  telephone: "",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs text-muted">
      {label}
      {children}
    </label>
  );
}

export default function CheckoutPage() {
  const { cart, items, loading, resetCart } = useCart();
  const { countries, submitShippingAddress, submitShippingMethod, completeOrder } =
    useCheckout();

  const [stage, setStage] = useState<Stage>("address");
  const [email, setEmail] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethods>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods>([]);
  const [selectedShipping, setSelectedShipping] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [grandTotal, setGrandTotal] = useState<Total>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const cartId = cart?.id;
  const selectedCountry = countries.find(
    (country) => country?.id === form.countryCode
  );
  const regions = (selectedCountry?.available_regions ?? [])
    .filter(
      (region) =>
        region &&
        !region.name?.startsWith("Armed Forces") &&
        !hiddenRegionCodes.includes(region.code ?? "")
    )
    .sort((a, b) => (a?.name ?? "").localeCompare(b?.name ?? ""));
  const total: Total = grandTotal ?? cart?.prices?.grand_total ?? null;

  const setField = (name: keyof typeof emptyForm, value: string) =>
    setForm((previous) => ({ ...previous, [name]: value }));

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const handleAddress = (event: React.FormEvent) => {
    event.preventDefault();
    if (!cartId) return;
    run(async () => {
      const methods = await submitShippingAddress(cartId, form);
      const first = methods[0];
      if (!first) {
        setError("No delivery methods are available for this address");
        return;
      }
      setShippingMethods(methods);
      setSelectedShipping(`${first.carrier_code}:${first.method_code}`);
      setStage("shipping");
    });
  };

  const handleShipping = (event: React.FormEvent) => {
    event.preventDefault();
    if (!cartId) return;
    const [carrierCode, methodCode] = selectedShipping.split(":");
    run(async () => {
      const result = await submitShippingMethod(cartId, carrierCode, methodCode);
      const methods = result?.available_payment_methods ?? [];
      setPaymentMethods(methods);
      setSelectedPayment(methods[0]?.code ?? "");
      setGrandTotal(result?.prices?.grand_total ?? null);
      setStage("payment");
    });
  };

  const handlePlaceOrder = (event: React.FormEvent) => {
    event.preventDefault();
    if (!cartId) return;
    run(async () => {
      const number = await completeOrder(cartId, email, selectedPayment);
      setOrderNumber(number);
      resetCart();
    });
  };

  if (orderNumber) {
    return (
      <>
        <Header />
        <section className="px-6 md:px-12 py-20 max-w-xl">
          <span className="block text-accent text-xs font-semibold mb-3">
            ORDER PLACED
          </span>
          <h1 className="text-3xl md:text-4xl mb-4">Thank you for your order</h1>
          <p className="text-muted mb-2">Your order number is</p>
          <div className="font-display font-bold text-2xl mb-10">
            {orderNumber}
          </div>
          <Link href="/" className={`inline-block ${primaryButton}`}>
            Continue shopping
          </Link>
        </section>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header />
        <p className="px-6 md:px-12 py-14 text-muted">Loading...</p>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <section className="px-6 md:px-12 py-14 text-muted">
          Your cart is empty.{" "}
          <Link href="/" className="text-accent">
            Continue shopping →
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <Header />

      <section className="px-6 md:px-12 py-14">
        <h1 className="text-3xl md:text-4xl mb-6">Checkout</h1>

        <div className="flex gap-6 mb-10 text-sm">
          {stages.map((item, index) => (
            <span
              key={item.id}
              className={item.id === stage ? "text-cream" : "text-muted"}
            >
              {index + 1}. {item.label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            {error && (
              <p className="text-sm text-accent border border-line rounded-md p-3 mb-6">
                {error}
              </p>
            )}

            {stage === "address" && (
              <form onSubmit={handleAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field label="First name">
                  <input
                    required
                    value={form.firstname}
                    onChange={(event) => setField("firstname", event.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Last name">
                  <input
                    required
                    value={form.lastname}
                    onChange={(event) => setField("lastname", event.target.value)}
                    className={inputClass}
                  />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Street address">
                    <input
                      required
                      value={form.street}
                      onChange={(event) => setField("street", event.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field label="City">
                  <input
                    required
                    value={form.city}
                    onChange={(event) => setField("city", event.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Postal code">
                  <input
                    required
                    value={form.postcode}
                    onChange={(event) => setField("postcode", event.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Country">
                  <select
                    value={form.countryCode}
                    onChange={(event) => {
                      setField("countryCode", event.target.value);
                      setField("region", "");
                    }}
                    className={inputClass}
                  >
                    {countries.map(
                      (country) =>
                        country && (
                          <option key={country.id} value={country.id ?? ""}>
                            {country.full_name_english}
                          </option>
                        )
                    )}
                  </select>
                </Field>
                <Field label="Region">
                  {regions.length > 0 ? (
                    <select
                      required
                      value={form.region}
                      onChange={(event) => setField("region", event.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select region</option>
                      {regions.map(
                        (region) =>
                          region && (
                            <option key={region.code ?? region.name} value={region.code ?? ""}>
                              {region.name}
                            </option>
                          )
                      )}
                    </select>
                  ) : (
                    <input
                      required
                      value={form.region}
                      onChange={(event) => setField("region", event.target.value)}
                      className={inputClass}
                    />
                  )}
                </Field>
                <div className="md:col-span-2">
                  <Field label="Phone">
                    <input
                      required
                      value={form.telephone}
                      onChange={(event) => setField("telephone", event.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" disabled={busy} className={primaryButton}>
                    {busy ? "Saving..." : "Continue to delivery"}
                  </button>
                </div>
              </form>
            )}

            {stage === "shipping" && (
              <form onSubmit={handleShipping} className="flex flex-col gap-3">
                {shippingMethods.map((method) => {
                  if (!method) return null;
                  const key = `${method.carrier_code}:${method.method_code}`;
                  return (
                    <label
                      key={key}
                      className="flex items-center justify-between gap-4 bg-panel border border-line rounded-md p-4 cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          className="accent-accent"
                          checked={selectedShipping === key}
                          onChange={() => setSelectedShipping(key)}
                        />
                        <span>
                          {method.carrier_title} — {method.method_title}
                        </span>
                      </span>
                      <span className="text-muted text-sm">
                        {method.amount.currency} {method.amount.value?.toFixed(2)}
                      </span>
                    </label>
                  );
                })}
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setStage("address")} className={secondaryButton}>
                    Back
                  </button>
                  <button type="submit" disabled={busy} className={primaryButton}>
                    {busy ? "Saving..." : "Continue to payment"}
                  </button>
                </div>
              </form>
            )}

            {stage === "payment" && (
              <form onSubmit={handlePlaceOrder} className="flex flex-col gap-3">
                {paymentMethods.map((method) => {
                  if (!method) return null;
                  return (
                    <label
                      key={method.code}
                      className="flex items-center gap-3 bg-panel border border-line rounded-md p-4 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="payment"
                        className="accent-accent"
                        checked={selectedPayment === method.code}
                        onChange={() => setSelectedPayment(method.code)}
                      />
                      <span>{method.title}</span>
                    </label>
                  );
                })}
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setStage("shipping")} className={secondaryButton}>
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={busy || !selectedPayment}
                    className={primaryButton}
                  >
                    {busy ? "Placing order..." : "Place order"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="bg-panel border border-line rounded-md p-6 h-fit">
            <div className="flex flex-col gap-3 mb-5">
              {items.map((item) => (
                <div key={item?.uid} className="flex justify-between gap-4 text-sm">
                  <span>
                    {item?.product?.name} × {item?.quantity}
                  </span>
                  <span className="text-muted">
                    {item?.prices?.row_total?.currency}{" "}
                    {item?.prices?.row_total?.value?.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between border-t border-line pt-4">
              <span className="text-muted">Total</span>
              <span className="font-display font-bold text-xl">
                {total?.currency} {total?.value?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
