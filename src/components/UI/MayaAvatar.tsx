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
          <div className="maya-avatar__halo" />
          <div className="maya-avatar__hair" />
          <div className="maya-avatar__head">
            <div className="maya-avatar__eyes">
              <span />
              <span />
            </div>
            <div className="maya-avatar__smile" />
          </div>
          <div className="maya-avatar__neck" />
          <div className="maya-avatar__suit" />
        </div>

        <div className="maya-avatar__face maya-avatar__face--back" aria-hidden="true">
          <span className="maya-avatar__brand">MAYA</span>
          <span className="maya-avatar__role">Secretary</span>
        </div>
      </div>
    </div>
  );
};

export default MayaAvatar;
