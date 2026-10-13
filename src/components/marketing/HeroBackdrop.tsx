import type { CSSProperties } from "react";

/**
 * CSS-only gradient mesh behind the hero: a teal -> periwinkle base with four
 * accent blobs softened by `--mesh-blur` and drifting over `--dur-drift`, plus a
 * 4% grain layer. Every colour comes from an accent token, so the mesh is
 * identical in dark and light themes and ships no bitmap.
 */
interface Blob {
  /** Accent token reference, fed to the blob's radial gradient. */
  color: string;
  left: string;
  top: string;
  width: string;
  height: string;
  /** Negative delays desynchronise the shared drift animation. */
  delay: string;
}

const BLOBS: Blob[] = [
  { color: "var(--teal)", left: "-16%", top: "-34%", width: "66%", height: "84%", delay: "0s" },
  { color: "var(--periwinkle)", left: "16%", top: "6%", width: "74%", height: "90%", delay: "-8s" },
  { color: "var(--periwinkle-alt)", left: "48%", top: "28%", width: "70%", height: "88%", delay: "-15s" },
  { color: "var(--lilac)", left: "64%", top: "-24%", width: "44%", height: "58%", delay: "-21s" },
];

export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="gradient-teal-blue absolute inset-0" />

      {BLOBS.map((blob) => (
        <div
          key={blob.delay}
          className="mesh-blob"
          style={
            {
              "--mesh-blob-color": blob.color,
              left: blob.left,
              top: blob.top,
              width: blob.width,
              height: blob.height,
              animationDelay: blob.delay,
            } as CSSProperties
          }
        />
      ))}

      <div className="grain-overlay" />
    </div>
  );
}