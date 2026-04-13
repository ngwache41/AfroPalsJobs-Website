export const colors = {
  bg: "#f5f7fb",
  bgSoft: "#eef2ff",
  surface: "#ffffff",
  surfaceSoft: "#f8fafc",
  text: "#111827",
  textSoft: "#475569",
  textMuted: "#64748b",
  border: "#e5e7eb",
  borderStrong: "#d1d5db",
  primary: "#111827",
  primarySoft: "#1f2937",
  primaryText: "#ffffff",
  accent: "#3730a3",
  accentSoft: "#e0e7ff",
  successBg: "#dcfce7",
  successText: "#166534",
  warningBg: "#fef3c7",
  warningText: "#92400e",
  dangerBg: "#fee2e2",
  dangerText: "#991b1b",
};

export const shadows = {
  sm: "0 6px 18px rgba(15, 23, 42, 0.05)",
  md: "0 10px 30px rgba(15, 23, 42, 0.08)",
  lg: "0 18px 40px rgba(15, 23, 42, 0.10)",
};

export const radii = {
  sm: "12px",
  md: "18px",
  lg: "24px",
  pill: "999px",
};

export const layout = {
  pageWidth: "1200px",
  pagePadding: "48px 24px",
  sectionGap: "28px",
};

export const typography = {
  heroTitle: {
    fontSize: "48px",
    lineHeight: 1.1,
    fontWeight: 800,
  } as React.CSSProperties,
  pageTitle: {
    fontSize: "42px",
    lineHeight: 1.15,
    fontWeight: 800,
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: "32px",
    lineHeight: 1.2,
    fontWeight: 800,
  } as React.CSSProperties,
  cardTitle: {
    fontSize: "24px",
    lineHeight: 1.25,
    fontWeight: 700,
  } as React.CSSProperties,
  body: {
    fontSize: "16px",
    lineHeight: 1.75,
    color: colors.textSoft,
  } as React.CSSProperties,
  bodyLg: {
    fontSize: "18px",
    lineHeight: 1.75,
    color: colors.textSoft,
  } as React.CSSProperties,
};

export const ui = {
  pageWrap: {
    maxWidth: layout.pageWidth,
    margin: "0 auto",
    padding: layout.pagePadding,
  } as React.CSSProperties,

  heroCard: {
    background: colors.surface,
    borderRadius: radii.lg,
    padding: "36px",
    boxShadow: shadows.md,
    border: `1px solid ${colors.border}`,
    marginBottom: layout.sectionGap,
  } as React.CSSProperties,

  sectionCard: {
    background: colors.surface,
    borderRadius: "22px",
    padding: "28px",
    boxShadow: shadows.md,
    border: `1px solid ${colors.border}`,
  } as React.CSSProperties,

  statCard: {
    background: colors.surface,
    borderRadius: "20px",
    padding: "24px",
    boxShadow: shadows.md,
    border: `1px solid ${colors.border}`,
  } as React.CSSProperties,

  softCard: {
    background: colors.surfaceSoft,
    borderRadius: radii.md,
    padding: "20px",
    border: `1px solid ${colors.border}`,
  } as React.CSSProperties,

  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: `1px solid ${colors.borderStrong}`,
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    background: colors.surface,
    color: colors.text,
  } as React.CSSProperties,

  label: {
    display: "block",
    fontWeight: 700,
    marginBottom: "8px",
    color: colors.text,
    fontSize: "14px",
  } as React.CSSProperties,

  primaryButton: {
    background: colors.primary,
    color: colors.primaryText,
    border: "none",
    borderRadius: "12px",
    padding: "14px 20px",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
  } as React.CSSProperties,

  secondaryButton: {
    background: colors.surface,
    color: colors.text,
    border: `1px solid ${colors.borderStrong}`,
    borderRadius: "12px",
    padding: "14px 20px",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
  } as React.CSSProperties,
};

export function statusBadge(status: string): React.CSSProperties {
  const normalized = status.toLowerCase();

  if (normalized === "approved") {
    return {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: radii.pill,
      background: colors.successBg,
      color: colors.successText,
      fontWeight: 700,
      fontSize: "13px",
    };
  }

  if (normalized === "rejected") {
    return {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: radii.pill,
      background: colors.dangerBg,
      color: colors.dangerText,
      fontWeight: 700,
      fontSize: "13px",
    };
  }

  return {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: radii.pill,
    background: colors.warningBg,
    color: colors.warningText,
    fontWeight: 700,
    fontSize: "13px",
  };
}