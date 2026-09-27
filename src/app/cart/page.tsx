"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Header } from "@/components/Header";

export default function CartPage() {
  const { items, cart, loading } = useCart();

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
              {items.map((item) => (
                <div
                  key={item?.id}
                  className="flex gap-4 bg-panel border border-line rounded-md p-4"
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
                    <div>
                      <div className="font-medium">{item?.product?.name}</div>
                      <div className="text-muted text-sm">
                        Qty: {item?.quantity}
                      </div>
                    </div>
                    <div className="text-muted text-sm">
                      {item?.prices?.row_total?.currency}{" "}
                      {item?.prices?.row_total?.value?.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
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