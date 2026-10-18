"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { AuthSplit, type AuthStepId } from "@/components/auth/AuthSplit";
import { EnvelopeMark, GoogleMark } from "@/components/brand/AuthIcons";
import { GitHubIcon } from "@/components/brand/SocialIcons";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input, Select } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth";

export interface AuthPanelProps {
  mode: "login" | "signup";
}

/** The three entry points, each with the original mark it renders. */
const PROVIDERS = [
  { id: "google", name: "Google", Icon: GoogleMark },
  { id: "github", name: "GitHub", Icon: GitHubIcon },
  { id: "email", name: "Email", Icon: EnvelopeMark },
] as const;

type ProviderId = (typeof PROVIDERS)[number]["id"];

const ROLES = ["Researcher", "Trader", "Newcomer"];

/** The shared link treatment for the small print: underlined, dim, brighter on hover. */
const LEGAL_LINK =
  "underline decoration-line underline-offset-[3px] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:decoration-text";

const PANEL = "flex w-full max-w-[400px] flex-col gap-4";

function ProviderPanel({
  mode,
  marketing,
  onMarketing,
  pending,
  onSelect,
}: {
  mode: AuthPanelProps["mode"];
  marketing: boolean;
  onMarketing: (value: boolean) => void;
  pending: ProviderId | null;
  onSelect: (provider: ProviderId) => void;
}) {
  const signUp = mode === "signup";

  return (
    <div className={PANEL}>
      <h1 className="text-section-heading text-center">Welcome to Quantmetrics</h1>

      <div className="flex flex-col gap-3">
        {PROVIDERS.map((provider) => {
          const { Icon } = provider;

          return (
            <Button
              key={provider.id}
              variant="outline"
              fullWidth
              loading={pending === provider.id}
              disabled={pending !== null && pending !== provider.id}
              onClick={() => onSelect(provider.id)}
            >
              <span className="flex items-center gap-2">
                <Icon className="size-2 shrink-0" />
                <span>
                  {(signUp ? "Sign up with " : "Sign in with ") + provider.name}
                </span>
              </span>
            </Button>
          );
        })}
      </div>

      {/*
        The email option is a stand-in: it signs the mock session in directly
        rather than sending a magic link, and no password is collected anywhere in
        this flow. The note says so on the page, not only in this comment.
      */}
      <p className="text-meta text-center">
        Demo build. All three options call the mock adapter and return you home; the
        email option sends nothing.
      </p>

      <Checkbox
        id="auth-marketing"
        size="compact"
        checked={marketing}
        onChange={(event) => onMarketing(event.target.checked)}
        label="I agree to receive product updates and marketing communications from Quantmetrics. This choice is not stored."
      />

      <p className="text-meta text-center">
        {signUp ? "Already have an account? " : "New to Quantmetrics? "}
        <Link href={signUp ? "/auth/login" : "/auth/signup"} className={"text-text " + LEGAL_LINK}>
          {signUp ? "Sign in" : "Create an account"}
        </Link>
      </p>

      <p className="text-center text-[0.6875rem] leading-[1.5] text-text-dim">
        {"By " + (signUp ? "signing up" : "signing in") + " you agree to our "}
        <Link href="/terms" className={LEGAL_LINK}>
          Terms of Service
        </Link>
        {" and "}
        <Link href="/privacy" className={LEGAL_LINK}>
          Privacy Policy</Link>
        {"."}
      </p>
    </div>
  );
}

function AboutYouStep({
  role,
  interest,
  onRole,
  onInterest,
  onContinue,
  onBack,
}: {
  role: string;
  interest: string;
  onRole: (value: string) => void;
  onInterest: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className={PANEL}>
      <h1 className="text-section-heading text-center">About you</h1>
      <p className="text-meta text-center">
        Two questions, so the notes land on the right desk. Mocked, and stored nowhere.
      </p>

      <Select
        id="auth-role"
        label="Role"
        placeholderOption="Choose a role"
        value={role}
        onChange={(event) => onRole(event.target.value)}
      >
        {ROLES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>

      <Input
        id="auth-interest"
        label="Interest"
        placeholder="Volatility, macro, risk metrics ..."
        value={interest}
        onChange={(event) => onInterest(event.target.value)}
      />

      <div className="flex items-center gap-3">
        <Button variant="outline" trailingArrow onClick={onContinue}>
          Continue
        </Button>
        <Button variant="text" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}

function LetsGoStep({
  role,
  interest,
  pending,
  onEnter,
  onBack,
}: {
  role: string;
  interest: string;
  pending: ProviderId | null;
  onEnter: () => void;
  onBack: () => void;
}) {
  return (
    <div className={PANEL}>
      <h1 className="text-section-heading text-center">Let\u2019s go.</h1>
      <p className="text-body text-center text-text-muted">
        {"Role: " + (role || "not set") + ". Interest: " + (interest || "not set") + "."}
      </p>
      <Button
        variant="primary"
        trailingArrow
        fullWidth
        loading={pending === "email"}
        onClick={onEnter}
      >
        Enter the lab
      </Button>
      <Button variant="text" onClick={onBack}>
        Back
      </Button>
    </div>
  );
}

/**
 * The auth panel (brief F6), used by both /auth/signup and /auth/login.
 *
 * Everything after the provider buttons is a mocked funnel: the sign-up page
 * walks SIGN UP -> ABOUT YOU -> LET\u2019S GO with local state only, and the
 * sign-in page renders the same panel with the cross-links reversed. No step
 * posts anywhere, and the only thing a click does is call the mock adapter.
 */
export function AuthPanel({ mode }: AuthPanelProps) {
  const { login } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<AuthStepId>("signup");
  const [role, setRole] = useState("");
  const [interest, setInterest] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [pending, setPending] = useState<ProviderId | null>(null);

  /**
   * The only place this panel touches auth. How the session is created is the
   * adapter\u2019s business (src/lib/auth.tsx), so swapping the mock for a real
   * provider is a change to that file, not to this one.
   *
   * TODO(auth): call the real provider here - an OAuth redirect for Google and
   * GitHub, and a magic link or one-time code for the email option. This build
   * collects no password, stores no credential, and sends no mail.
   */
  const enter = async (provider: ProviderId) => {
    setPending(provider);
    await login();
    router.push("/");
  };

  let panel: ReactNode;

  if (mode === "signup" && step === "about") {
    panel = (
      <AboutYouStep
        role={role}
        interest={interest}
        onRole={setRole}
        onInterest={setInterest}
        onContinue={() => setStep("letsgo")}
        onBack={() => setStep("signup")}
      />
    );
  } else if (mode === "signup" && step === "letsgo") {
    panel = (
      <LetsGoStep
        role={role}
        interest={interest}
        pending={pending}
        onEnter={() => void enter("email")}
        onBack={() => setStep("about")}
      />
    );
  } else {
    panel = (
      <ProviderPanel
        mode={mode}
        marketing={marketing}
        onMarketing={setMarketing}
        pending={pending}
        onSelect={(provider) => void enter(provider)}
      />
    );
  }

  return (
    <AuthSplit
      activeStep={mode === "signup" ? step : null}
      onStepSelect={mode === "signup" ? setStep : undefined}
    >
      {panel}
    </AuthSplit>
  );
}

