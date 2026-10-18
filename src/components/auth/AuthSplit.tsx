"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The sign-up funnel, in order. The sign-in page renders the same stepper with
 * no step marked, because signing in is not one of these steps.
 */
export type AuthStepId = "signup" | "about" | "letsgo";

export const AUTH_STEPS: { id: AuthStepId; label: string }[] = [
  { id: "signup", label: "Sign up" },
  { id: "about", label: "About you" },
  { id: "letsgo", label: "Let\u2019s go" },
];

/**
 * Original sample code for the backdrop: a GARCH(1,1) fit by maximum likelihood.
 * Illustrative only - the numbers in it come from a seeded generator, not from a
 * market. It is decorative and marked aria-hidden, so a screen reader skips it.
 */
const SAMPLE_CODE = [
  '"""GARCH(1,1) by maximum likelihood - illustrative sample code."""',
  "",
  "import numpy as np",
  "from scipy.optimize import minimize",
  "",
  "",
  "def conditional_variance(returns, omega, alpha, beta):",
  '    """Recursion: sigma2[t] = omega + alpha * r[t-1]**2 + beta * sigma2[t-1]."""',
  "    sigma2 = np.empty_like(returns)",
  "    sigma2[0] = np.var(returns)",
  "    for t in range(1, returns.size):",
  "        sigma2[t] = omega + alpha * returns[t - 1] ** 2 + beta * sigma2[t - 1]",
  "    return sigma2",
  "",
  "",
  "def neg_log_likelihood(params, returns):",
  "    omega, alpha, beta = params",
  "    if omega <= 0 or alpha < 0 or beta < 0 or alpha + beta >= 1:",
  "        return np.inf",
  "    sigma2 = conditional_variance(returns, omega, alpha, beta)",
  "    return 0.5 * np.sum(np.log(sigma2) + returns ** 2 / sigma2)",
  "",
  "",
  "def fit(returns, start=(1e-6, 0.08, 0.90)):",
  "    grid = minimize(",
  "        neg_log_likelihood,",
  "        x0=np.array(start),",
  "        args=(returns,),",
  '        method="Nelder-Mead",',
  '        options={"maxiter": 2000, "xatol": 1e-8},',
  "    )",
  "    omega, alpha, beta = grid.x",
  '    return {"omega": omega, "alpha": alpha, "beta": beta, "persistence": alpha + beta}',
  "",
  "",
  'if __name__ == "__main__":',
  "    rng = np.random.default_rng(seed=7)",
  "    sample = rng.standard_normal(2500) * 0.01",
  "    print(fit(sample))",
].join("\n");

export interface AuthSplitProps {
  /** Highlighted funnel step; omit on the sign-in page. */
  activeStep?: AuthStepId | null;
  /** Present only when the stepper should navigate (the mocked sign-up flow). */
  onStepSelect?: (step: AuthStepId) => void;
  children: ReactNode;
}

/**
 * The split-screen auth shell (brief F6), shared by sign-up and sign-in.
 *
 * Left: whatever the page passes in - the provider panel, or an ABOUT YOU step.
 * Right: the dimmed monospace backdrop with the centred serif headline. Below
 * `lg` the two columns stack and the backdrop collapses into a slim band above
 * the panel, so the page never needs a horizontal scroll on a phone.
 *
 * The masthead is absolutely positioned inside `main` rather than placed in the
 * grid, because it spans the seam between the two columns. It clears the fixed
 * header (76px) by 20px and ignores pointer events except on the steps
 * themselves, so it never blocks the panel underneath.
 */
export function AuthSplit({ activeStep = null, onStepSelect, children }: AuthSplitProps) {
  return (
    <main className="relative">
      <div className="grid grid-cols-1 lg:min-h-[100dvh] lg:grid-cols-[545px_minmax(0,1fr)]">
        {/* Panel */}
        <div className="order-2 flex flex-col items-center justify-center gap-6 px-gutter pt-10 pb-16 lg:order-1 lg:px-8 lg:py-24">
          {children}
        </div>

        {/* Backdrop: a slim band on small screens, the full right column above lg. */}
        <div className="relative order-1 overflow-hidden border-b border-line px-gutter pt-20 pb-10 lg:order-2 lg:border-b-0 lg:border-l lg:px-0 lg:py-0">
          <pre
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 select-none overflow-hidden p-6 font-mono text-[0.6875rem] leading-[1.75] whitespace-pre text-text/[0.09] lg:p-10 lg:text-xs"
          >
            {SAMPLE_CODE}
          </pre>

          <div className="relative flex items-center justify-center text-center lg:absolute lg:inset-0 lg:px-12">
            <h2 className="text-section-heading max-w-[18ch] text-text">
              Every model. Every metric. All explained.
            </h2>
          </div>
        </div>
      </div>

      {/*
        Stepper. Below `lg` the labels step down and the gaps tighten, because
        the three steps plus their separators are wider than a phone viewport at
        the desktop size - the row is `nowrap` by design, so it would otherwise
        push the document wider than the screen. `text-mono-label` sits on the
        list so the children inherit the family, weight, tracking, case and
        leading. `uppercase` is repeated on each label because a `button` does
        not inherit `text-transform`; the size is the only thing that changes
        with the breakpoint.
      */}
      <nav
        aria-label="Sign-up progress"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-gutter pt-12"
      >
        <ol className="text-mono-label pointer-events-auto flex flex-nowrap items-center justify-center gap-0.5 lg:gap-2">
          {AUTH_STEPS.map((step, index) => {
            const current = activeStep === step.id;

            return (
              <li key={step.id} className="flex items-center gap-0.5 lg:gap-2">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-text-dim">
                    {"\u203A"}
                  </span>
                ) : null}

                {onStepSelect ? (
                  <button
                    type="button"
                    aria-current={current ? "step" : undefined}
                    onClick={() => onStepSelect(step.id)}
                    className={cn(
                      "rounded-pill px-1 py-1 text-[0.6875rem] whitespace-nowrap uppercase transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] lg:px-1.5 lg:text-[0.8125rem]",
                      current
                        ? "bg-text text-bg"
                        : "text-text-dim hover:text-text",
                    )}
                  >
                    {step.label}
                  </button>
                ) : (
                  <span
                    className={cn(
                      "rounded-pill px-1 py-1 text-[0.6875rem] whitespace-nowrap uppercase lg:px-1.5 lg:text-[0.8125rem]",
                      current ? "bg-text text-bg" : "text-text-dim",
                    )}
                  >
                    {step.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </main>
  );
}

