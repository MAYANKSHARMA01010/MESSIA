"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172a",
        color: "#e5e7eb",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "420px" }}>
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "20px",
            marginBottom: "12px",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            fontSize: "14px",
            color: "#9ca3af",
            marginBottom: "24px",
          }}
        >
          The page you’re looking for doesn’t exist or was moved.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "10px 18px",
            borderRadius: "6px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
