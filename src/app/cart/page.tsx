"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Header } from "@/components/Header";

export default function CartPage() {
  const { items, cart, loading, updateQuantity, removeItem } = useCart();
  const [busyUid, setBusyUid] = useState<string | null>(null);

  const run = async (uid: string, action: () => Promise<void>) => {
    setBusyUid(uid);
    try {
      await action();
    } finally {
      setBusyUid(null);
    }
  };

  return (
    <>
      <Header />

      <section className="px-6 md:px-12 py-14">
        <h1 className="text-3xl md:text-4xl mb-10">Your Cart</h1>

        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : items.length === 0 ? (
          <div className="text-muted">
            Your cart is empty.{" "}
            <Link href="/" className="text-accent">
              Continue shopping →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 flex flex-col gap-4">
              {items.map((item) => {
                const uid = item?.uid ?? "";
                const quantity = item?.quantity ?? 1;
                const busy = busyUid === uid;

                return (
                  <div
                    key={uid}
                    className={`flex gap-4 bg-panel border border-line rounded-md p-4 transition ${
                      busy ? "opacity-50" : ""
                    }`}
                  >
                    <div className="bg-gradient-to-br from-[#dedad1] to-[#eeeceb] w-24 h-28 rounded-md flex items-center justify-center text-[#a19d92] text-xs overflow-hidden shrink-0">
                      {item?.product?.small_image?.url ? (
                        <img
                          src={item.product.small_image.url}
                          alt={item.product.name ?? ""}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "Image"
                      )}
                    </div>

                    <div className="flex flex-col justify-between flex-1">
                      <div className="flex justify-between gap-4">
                        <Link
                          href={`/product/${item?.product?.url_key}`}
                          className="font-medium"
                        >
                          {item?.product?.name}
                        </Link>
                        <button
                          disabled={busy}
                          onClick={() => run(uid, () => removeItem(uid))}
                          className="text-muted text-sm hover:text-accent transition"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-line rounded-md">
                          <button
                            disabled={busy || quantity <= 1}
                            onClick={() =>
                              run(uid, () => updateQuantity(uid, quantity - 1))
                            }
                            className="w-9 h-9 text-lg disabled:opacity-30"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-sm">
                            {quantity}
                          </span>
                          <button
                            disabled={busy}
                            onClick={() =>
                              run(uid, () => updateQuantity(uid, quantity + 1))
                            }
                            className="w-9 h-9 text-lg disabled:opacity-30"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-muted text-sm">
                          {item?.prices?.row_total?.currency}{" "}
                          {item?.prices?.row_total?.value?.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-panel border border-line rounded-md p-6 h-fit">
              <div className="flex justify-between mb-4">
                <span className="text-muted">Total</span>
                <span className="font-display font-bold text-xl">
                  {cart?.prices?.grand_total?.currency}{" "}
                  {cart?.prices?.grand_total?.value?.toFixed(2)}
                </span>
              </div>
              <button className="bg-accent text-cream rounded-md px-6 py-3 text-sm font-semibold w-full">
                Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}