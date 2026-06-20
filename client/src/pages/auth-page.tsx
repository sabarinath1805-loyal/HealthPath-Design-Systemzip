import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { BrandLogo } from "@/components/chat/BrandLogo";
import { Field, Input } from "@/components/core/Input";
import { Button } from "@/components/core/Button";
import { Disclaimer } from "@/components/core/Disclaimer";
import { Icon } from "@/components/core/Icon";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const pending = loginMutation.isPending || registerMutation.isPending;
  const error =
    mode === "login"
      ? loginMutation.error?.message
      : registerMutation.error?.message;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;
    if (mode === "login") {
      loginMutation.mutate({ email, password });
    } else {
      registerMutation.mutate({ email, name, password });
    }
  };

  return (
    <div className="hp hp-auth">
      <form className="hp-auth__card" onSubmit={submit} noValidate>
        <div className="hp-auth__brand">
          <BrandLogo size="lg" />
          <h1 className="hp-auth__title">
            {mode === "login" ? "Welcome back." : "Let's get started."}
          </h1>
          <p className="hp-auth__sub">
            {mode === "login"
              ? "I'll pick up your cases where we left off."
              : "One small step. Nothing here is medical advice — I help with paperwork and access."}
          </p>
        </div>

        {mode === "register" && (
          <Field label="Your name" htmlFor="name">
            <Input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              placeholder="What should I call you?"
              required
            />
          </Field>
        )}

        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            leftIcon={<Icon name="mail" size={16} />}
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </Field>

        <Field
          label="Password"
          htmlFor="password"
          help={mode === "register" ? "At least 8 characters." : undefined}
          error={error}
        >
          <Input
            id="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            leftIcon={<Icon name="lock" size={16} />}
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </Field>

        <Button variant="primary" size="lg" block type="submit" disabled={pending}>
          {pending
            ? "One moment…"
            : mode === "login"
              ? "Sign in"
              : "Create account"}
        </Button>

        <p className="hp-auth__foot">
          {mode === "login" ? (
            <>
              New here?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  loginMutation.reset();
                  setMode("register");
                }}
              >
                Create an account
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  registerMutation.reset();
                  setMode("login");
                }}
              >
                Sign in
              </a>
            </>
          )}
        </p>

        <Disclaimer />
      </form>
    </div>
  );
}
