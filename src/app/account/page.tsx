"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { primaryButton } from "@/components/ui/styles";

export default function AccountPage() {
  const { customer, isAuthenticated, loading: authLoading } = useAuth();
  const { orders, loading: ordersLoading } = useOrders(isAuthenticated);

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <section className="px-6 md:px-12 py-14">
          <h1 className="text-3xl md:text-4xl mb-6">Account</h1>
          <p className="text-muted mb-8">Sign in to see your orders.</p>
          <Link href="/login" className={`inline-block ${primaryButton}`}>
            Sign in
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <Header />

      <section className="px-6 md:px-12 py-14">
        <h1 className="text-3xl md:text-4xl mb-10">Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-panel border border-line rounded-md p-6 h-fit">
            {authLoading ? (
              <p className="text-muted text-sm">Loading...</p>
            ) : (
              <>
                <span className="block text-accent text-xs font-semibold mb-3">
                  PROFILE
                </span>
                <div className="font-display font-bold text-xl mb-1">
                  {customer?.firstname} {customer?.lastname}
                </div>
                <div className="text-muted text-sm">{customer?.email}</div>
              </>
            )}
          </div>

          <div className="md:col-span-2">
            <h2 className="text-2xl mb-6">Orders</h2>

            {ordersLoading && orders.length === 0 ? (
              <p className="text-muted">Loading...</p>
            ) : orders.length === 0 ? (
              <p className="text-muted">
                You have no orders yet.{" "}
                <Link href="/" className="text-accent">
                  Start shopping →
                </Link>
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <div
                    key={order.number}
                    className="bg-panel border border-line rounded-md p-5"
                  >
                    <div className="flex justify-between gap-4 mb-3">
                      <div>
                        <div className="font-display font-bold">
                          Order {order.number}
                        </div>
                        <div className="text-muted text-sm">
                          {order.order_date?.slice(0, 10)} · {order.status}
                        </div>
                      </div>
                      <div className="font-display font-bold">
                        {order.total?.grand_total?.currency}{" "}
                        {order.total?.grand_total?.value?.toFixed(2)}
                      </div>
                    </div>
                    <ul className="text-sm text-muted flex flex-col gap-1">
                      {order.items?.map(
                        (item, index) =>
                          item && (
                            <li key={index}>
                              {item.product_name} × {item.quantity_ordered}
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
