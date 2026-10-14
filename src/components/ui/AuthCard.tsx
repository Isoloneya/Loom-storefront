export function AuthCard({
  title,
  error,
  footer,
  children,
}: {
  title: string;
  error: string | null;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 py-14 md:py-20 flex justify-center">
      <div className="w-full max-w-md bg-panel border border-line rounded-md p-8">
        <h1 className="text-3xl mb-8">{title}</h1>

        {error && (
          <p className="text-sm text-accent border border-line rounded-md p-3 mb-6">
            {error}
          </p>
        )}

        {children}

        <div className="text-muted text-sm mt-8">{footer}</div>
      </div>
    </section>
  );
}
