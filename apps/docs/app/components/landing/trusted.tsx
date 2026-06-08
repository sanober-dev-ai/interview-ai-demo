// components/landing/trusted.tsx

const companies = ["Google", "Amazon", "Microsoft", "Meta", "Netflix", "Adobe"];

export function Trusted() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Trusted by professionals from
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {companies.map((company) => (
              <div
                key={company}
                className="text-2xl font-semibold text-muted-foreground/60 transition hover:text-foreground"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
