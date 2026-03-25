import type { ReactNode } from "react";
import { classify, type ClassValue } from "reclassify";

type BadgeProps = {
  children: ReactNode;
  className?: ClassValue;
};

type ExampleRowProps = {
  className: ClassValue;
  code: string;
  label: string;
  note: string;
};

function Badge({ children, className }: BadgeProps) {
  return <span className={classify(["badge", className])}>{children}</span>;
}

function ExampleRow({ className, code, label, note }: ExampleRowProps) {
  return (
    <article className="row-card">
      <div className="row-card__copy">
        <span className="row-card__label">{label}</span>
        <p>{note}</p>
      </div>
      <div className="row-card__preview">
        <button className={className}>Preview state</button>
      </div>
      <code>{code}</code>
    </article>
  );
}

export default function Page() {
  const primaryClasses: ClassValue = [
    "panel-button",
    ["panel-button--berry"],
    {
      "panel-button--glow": true,
    },
  ];

  const stackedClasses: ClassValue = [
    "panel-button",
    ["panel-button--slate", "panel-button--caps"],
    {
      "panel-button--frame": true,
    },
  ];

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero__copy">
          <span className="hero__eyebrow">next.js example</span>
          <h1>Framework usage through tsconfig.json.</h1>
          <p>
            This example sets <code>jsxImportSource</code> in <code>tsconfig.json</code> so
            intrinsic elements accept array and object class names directly in TypeScript
            components.
          </p>
        </div>
        <div className="hero__preview">
          <button className={primaryClasses}>Deploy dashboard</button>
          <code>{classify(primaryClasses)}</code>
        </div>
      </section>

      <section className="examples">
        <ExampleRow
          className={primaryClasses}
          code={classify(primaryClasses)}
          label="Objects + nested arrays"
          note="Author class toggles the same way you would in Vue or Svelte, while React still receives a final string."
        />
        <ExampleRow
          className={stackedClasses}
          code={classify(stackedClasses)}
          label="Readable composition"
          note="Nested arrays preserve authored structure and flatten in order when the runtime serializes the className."
        />
      </section>

      <section className="footer-card">
        <div className="footer-card__copy">
          <span className="hero__eyebrow">custom component note</span>
          <h2>Custom components still opt in manually.</h2>
          <p>
            The runtime transforms intrinsic elements only. A component can reuse the same API by
            calling <code>classify</code> internally.
          </p>
        </div>
        <div className="footer-card__preview">
          <Badge
            className={[
              "badge--mint",
              {
                "badge--outline": true,
              },
            ]}
          >
            constructed in a custom component
          </Badge>
        </div>
      </section>
    </main>
  );
}
