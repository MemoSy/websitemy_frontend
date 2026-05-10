import React from "react";
import "./MayaAvatar.css";

type MayaAvatarSize = "xs" | "sm" | "md" | "lg";

interface MayaAvatarProps {
  size?: MayaAvatarSize;
  interactive?: boolean;
  className?: string;
}

const MayaAvatar: React.FC<MayaAvatarProps> = ({
  size = "md",
  interactive = false,
  className = "",
}) => {
  const rootClass = [
    "maya-avatar",
    `maya-avatar--${size}`,
    interactive ? "maya-avatar--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} aria-label="Maya secretary avatar" role="img">
      <div className="maya-avatar__card">
        <div className="maya-avatar__face maya-avatar__face--front" aria-hidden="true">
          <svg
            className="maya-avatar__illustration"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="mayaGlow" cx="32%" cy="26%" r="74%">
                <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.44" />
                <stop offset="58%" stopColor="#0f172a" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="mayaHair" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1f2937" />
                <stop offset="100%" stopColor="#111827" />
              </linearGradient>
              <linearGradient id="mayaBlazer" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0ea5a3" />
                <stop offset="60%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#155e75" />
              </linearGradient>
              <linearGradient id="mayaSkin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8dfc8" />
                <stop offset="100%" stopColor="#efc5a7" />
              </linearGradient>
            </defs>

            <circle cx="50" cy="50" r="50" fill="url(#mayaGlow)" />
            <ellipse cx="50" cy="86" rx="29" ry="14" fill="url(#mayaBlazer)" />
            <path d="M22 44c0-17 12-28 28-28s28 11 28 28v9H22z" fill="url(#mayaHair)" />
            <circle cx="50" cy="49" r="18.5" fill="url(#mayaSkin)" />
            <path d="M33 40c3-9 10-15 17-15s14 6 17 15" stroke="#111827" strokeWidth="3.4" fill="none" strokeLinecap="round" />
            <ellipse cx="42" cy="49" rx="2.2" ry="2.5" fill="#111827" />
            <ellipse cx="58" cy="49" rx="2.2" ry="2.5" fill="#111827" />
            <path d="M39 46h6M55 46h6" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M44.5 58c2.1 1.9 8.9 1.9 11 0" stroke="#be185d" strokeWidth="1.7" fill="none" strokeLinecap="round" />
            <ellipse cx="35.5" cy="54" rx="2.5" ry="1.2" fill="#f9a8d4" opacity="0.55" />
            <ellipse cx="64.5" cy="54" rx="2.5" ry="1.2" fill="#f9a8d4" opacity="0.55" />
            <path d="M39 73h22" stroke="#e2e8f0" strokeWidth="2.6" strokeLinecap="round" opacity="0.9" />
          </svg>
        </div>

        <div className="maya-avatar__face maya-avatar__face--back" aria-hidden="true">
          <span className="maya-avatar__brand">MAYA</span>
        </div>
      </div>
    </div>
  );
};

export default MayaAvatar;
