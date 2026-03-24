import type { ReactNode } from "react";
import { clsx, type ClassValue } from "@yangshun/react-classname";

type ExampleCardProps = {
  className: ClassValue;
  description: string;
  eyebrow: string;
  title: string;
};

type PillProps = {
  children: ReactNode;
  className?: ClassValue;
};

function Pill({ children, className }: PillProps) {
  return <span className={clsx(["pill", className])}>{children}</span>;
}

function ExampleCard({ className, description, eyebrow, title }: ExampleCardProps) {
  return (
    <article className="example-card">
      <div className="example-card__header">
        <span className="example-card__eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="example-card__preview">
        <button className={className}>Save changes</button>
      </div>
      <code className="example-card__code">{clsx(className)}</code>
    </article>
  );
}

export default function App() {
  return (
    <main className="shell">
      <section className="hero">
        <div className="hero__copy">
          <span className="hero__eyebrow">vite example</span>
          <h1>React class names with array and object syntax.</h1>
          <p>
            This app consumes the local <code>@yangshun/react-classname</code> package through the
            workspace while the root library watcher keeps its built output current.
          </p>
        </div>
        <div className="hero__panel">
          <span className="hero__label">Intrinsic element example</span>
          <button
            className={[
              "hero-button",
              ["hero-button--lifted"],
              {
                "hero-button--accent": true,
                "hero-button--muted": false,
              },
            ]}
          >
            Launch preview
          </button>
          <code>
            {clsx([
              "hero-button",
              ["hero-button--lifted"],
              {
                "hero-button--accent": true,
              },
            ])}
          </code>
        </div>
      </section>

      <section className="grid">
        <ExampleCard
          className={[
            "demo-button",
            "demo-button--sunrise",
            {
              "demo-button--ring": true,
            },
          ]}
          description="Strings and object flags work directly on an intrinsic button."
          eyebrow="Strings + objects"
          title="Class maps"
        />
        <ExampleCard
          className={[
            "demo-button",
            ["demo-button--mint", "demo-button--stacked"],
            {
              "demo-button--soft-shadow": true,
            },
          ]}
          description="Nested arrays flatten in order, so authored structure stays readable."
          eyebrow="Nested arrays"
          title="Array composition"
        />
      </section>

      <section className="custom-card">
        <div className="custom-card__copy">
          <span className="custom-card__eyebrow">Custom component note</span>
          <h2>Custom components still opt in manually.</h2>
          <p>
            The runtime only normalizes intrinsic elements. For custom components, call{" "}
            <code>clsx</code> inside the component when you want the same authoring pattern.
          </p>
        </div>
        <div className="custom-card__preview">
          <Pill
            className={[
              "pill--teal",
              {
                "pill--outline": true,
              },
            ]}
          >
            normalized inside a custom component
          </Pill>
        </div>
      </section>
    </main>
  );
}
