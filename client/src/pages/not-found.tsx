import { Link } from "wouter";
import { BrandLogo } from "@/components/chat/BrandLogo";

export default function NotFound() {
  return (
    <div className="hp hp-auth">
      <div className="hp-auth__card" style={{ textAlign: "center" }}>
        <div className="hp-auth__brand">
          <BrandLogo size="lg" />
          <h1 className="hp-auth__title">This page isn't here.</h1>
          <p className="hp-auth__sub">
            The page you were looking for doesn't exist. Let's get you back.
          </p>
        </div>
        <Link href="/" className="hp-button hp-button--primary hp-button--lg hp-button--block">
          Go home
        </Link>
      </div>
    </div>
  );
}
