import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`section-padding ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </motion.section>
  );
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
}: {
  badge?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : ""}`}>
      {badge && <span className="badge-gold mb-4 inline-block">{badge}</span>}
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
