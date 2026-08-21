/**
 * CereBro Design System — Component Layer v1.0
 *
 * Shared primitive components built on DS tokens.
 * Import from here instead of hand-rolling inline styles.
 *
 * Usage:
 *   import { Button, Card, Input, Chip, Overline, Divider } from "@/ds/components";
 */

import React from "react";
import { DS, ButtonVariant, CardVariant } from "./tokens";

// ─── Button ────────────────────────────────────────────────────────────────────

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  disabled,
  style,
  className = "",
  ...rest
}: ButtonProps) {
  const base = DS.button[variant];
  const isDisabled = disabled || loading;

  const sizeOverride: React.CSSProperties =
    size === "sm" ? { padding: "10px 18px", fontSize: "13px", minHeight: "40px" } :
    size === "lg" ? { padding: "18px 32px", fontSize: "16px", minHeight: "56px" } :
    {};

  const computedStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "transform 0.1s ease, box-shadow 0.2s ease, opacity 0.15s ease",
    border: "none",
    width: fullWidth ? "100%" : undefined,
    ...base,
    ...(isDisabled ? DS.button.disabled : {}),
    ...sizeOverride,
    ...style,
  };

  return (
    <button
      disabled={isDisabled}
      className={`cb-btn-ds ${className}`}
      style={computedStyle}
      {...rest}
    >
      {leftIcon && <span style={{ display: "flex", alignItems: "center" }}>{leftIcon}</span>}
      {loading ? (
        <span style={{ display: "inline-block", width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", animation: "spin 0.6s linear infinite" }} />
      ) : children}
      {rightIcon && <span style={{ display: "flex", alignItems: "center" }}>{rightIcon}</span>}
    </button>
  );
}

// ─── Icon Button ───────────────────────────────────────────────────────────────

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
  tinted?: boolean; // violet tint vs frosted glass
}

export function IconButton({ size = 44, tinted = false, children, style, ...rest }: IconButtonProps) {
  return (
    <button
      style={{
        ...DS.button.icon,
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        background: tinted ? DS.color.brand.surface : DS.button.icon.background,
        border: tinted ? `1.5px solid rgba(139,92,246,0.2)` : DS.button.icon.border,
        cursor: "pointer",
        transition: "transform 0.1s ease, background 0.15s ease",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────────

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: string | number;
  interactive?: boolean; // adds press scale
  as?: "div" | "button" | "article";
}

export function Card({
  variant = "glass",
  padding = "20px",
  interactive = false,
  as: Tag = "div",
  children,
  style,
  className = "",
  ...rest
}: CardProps) {
  const base = DS.card[variant];

  const computedStyle: React.CSSProperties = {
    ...base,
    padding,
    transition: interactive ? "transform 0.12s ease, box-shadow 0.15s ease" : undefined,
    cursor: interactive ? "pointer" : undefined,
    ...style,
  };

  return (
    // @ts-expect-error polymorphic
    <Tag
      className={`cb-card-ds ${interactive ? "cb-card-interactive" : ""} ${className}`}
      style={computedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ─── Input ─────────────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

export function Input({
  label,
  helperText,
  error,
  leftAdornment,
  rightAdornment,
  style,
  className = "",
  id,
  ...rest
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            ...DS.type.styles.h4,
            color: DS.color.text.heading,
            fontSize: "13px",
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {leftAdornment && (
          <span style={{ position: "absolute", left: 14, display: "flex", alignItems: "center", pointerEvents: "none" }}>
            {leftAdornment}
          </span>
        )}
        <input
          id={inputId}
          style={{
            ...DS.input.default,
            paddingLeft: leftAdornment ? "44px" : DS.input.default.padding.split(" ")[1],
            paddingRight: rightAdornment ? "44px" : DS.input.default.padding.split(" ")[1],
            width: "100%",
            boxSizing: "border-box" as const,
            ...(error ? DS.input.error : {}),
            ...style,
          }}
          className={className}
          {...rest}
        />
        {rightAdornment && (
          <span style={{ position: "absolute", right: 14, display: "flex", alignItems: "center" }}>
            {rightAdornment}
          </span>
        )}
      </div>
      {(error || helperText) && (
        <p style={{
          fontFamily: DS.type.family.sans,
          fontSize: "12px",
          color: error ? DS.color.semantic.error : DS.color.text.secondary,
          marginTop: "2px",
        }}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

// ─── Chip ──────────────────────────────────────────────────────────────────────

interface ChipProps {
  label: string;
  color?: string;      // background color
  textColor?: string;  // text color
  variant?: "category" | "tag" | "badge";
  active?: boolean;
  onClick?: () => void;
  count?: number;
}

export function Chip({
  label,
  color,
  textColor,
  variant = "category",
  active = false,
  onClick,
  count,
}: ChipProps) {
  const base = DS.chip[variant];

  const bg   = active ? DS.color.brand.primary : (color ?? DS.color.brand.surface);
  const text = active ? "#ffffff" : (textColor ?? DS.color.text.heading);

  return (
    <button
      onClick={onClick}
      style={{
        ...base,
        background: bg,
        color: text,
        border: active ? "none" : `1.5px solid rgba(139,92,246,0.15)`,
        cursor: onClick ? "pointer" : "default",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        transition: "background 0.15s ease, color 0.15s ease",
        fontFamily: DS.type.family.sans,
      }}
    >
      {label}
      {count !== undefined && (
        <span style={{
          background: active ? "rgba(255,255,255,0.25)" : DS.color.brand.surface,
          color: active ? "#ffffff" : DS.color.brand.primary,
          borderRadius: "9999px",
          minWidth: "18px",
          height: "18px",
          padding: "0 4px",
          fontSize: "11px",
          fontWeight: 700,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {count}
        </span>
      )}
    </button>
  );
}

// ─── Overline ──────────────────────────────────────────────────────────────────

interface OverlineProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Overline({ children, style }: OverlineProps) {
  return (
    <p style={{ ...DS.overline, ...style }}>
      {children}
    </p>
  );
}

// ─── Divider ───────────────────────────────────────────────────────────────────

interface DividerProps {
  style?: React.CSSProperties;
  spacing?: string;
}

export function Divider({ style, spacing = "16px" }: DividerProps) {
  return (
    <hr
      style={{
        ...DS.divider,
        border: "none",
        margin: `${spacing} 0`,
        ...style,
      }}
    />
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

interface ProgressBarProps {
  value: number;       // 0–100
  max?: number;
  color?: string;
  height?: string;
  style?: React.CSSProperties;
  showLabel?: boolean;
}

export function ProgressBar({ value, max = 100, color, height, style, showLabel = false }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <div
        style={{
          background: DS.progress.track,
          borderRadius: DS.progress.radius,
          height: height ?? DS.progress.height,
          overflow: "hidden",
          ...style,
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color ?? DS.progress.fill,
            borderRadius: DS.progress.radius,
            transition: "width 0.4s ease",
          }}
        />
      </div>
      {showLabel && (
        <p style={{ ...DS.type.styles.caption, textAlign: "right" }}>{Math.round(pct)}%</p>
      )}
    </div>
  );
}

// ─── Score Ring (circular progress) ──────────────────────────────────────────

interface ScoreRingProps {
  value: number;    // 0–100
  size?: number;    // diameter in px
  stroke?: number;  // stroke width
  color?: string;
  label?: string;
  sublabel?: string;
}

export function ScoreRing({ value, size = 80, stroke = 6, color, label, sublabel }: ScoreRingProps) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)", position: "absolute" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={DS.progress.track} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color ?? DS.color.brand.primary}
          strokeWidth={stroke}
          strokeDasharray={`${circ}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {(label || sublabel) && (
        <div style={{ textAlign: "center", zIndex: 1 }}>
          {label    && <p style={{ ...DS.type.styles.h3, color: DS.color.text.heading, lineHeight: 1 }}>{label}</p>}
          {sublabel && <p style={{ ...DS.type.styles.caption }}>{sublabel}</p>}
        </div>
      )}
    </div>
  );
}

// ─── Bell Button (shared header component) ───────────────────────────────────

interface BellButtonProps {
  count?: number;
  onClick?: () => void;
}

export function BellButton({ count = 0, onClick }: BellButtonProps) {
  return (
    <div style={{ position: "relative" }}>
      <IconButton onClick={onClick} aria-label="Notifications">
        {/* Bell icon rendered by the caller — inject via children if needed */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DS.color.icon} strokeWidth={DS.icon.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </IconButton>
      {count > 0 && (
        <div
          aria-label={`${count} unread notifications`}
          style={{
            ...DS.chip.dot,
            position: "absolute",
            top: -2,
            right: -2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "17px",
            height: "17px",
            paddingLeft: 3,
            paddingRight: 3,
          }}
        >
          {count}
        </div>
      )}
    </div>
  );
}

// ─── Back Button ──────────────────────────────────────────────────────────────

interface BackButtonProps {
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function BackButton({ onClick, style }: BackButtonProps) {
  return (
    <IconButton onClick={onClick} style={style} aria-label="Go back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DS.color.icon} strokeWidth={DS.icon.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
    </IconButton>
  );
}
