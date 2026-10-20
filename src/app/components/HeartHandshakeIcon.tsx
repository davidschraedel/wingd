import React from "react";

interface HeartHandshakeIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  size?: number;
}

export function HeartHandshakeIcon({
  className = "",
  size,
  width,
  height,
  ...props
}: HeartHandshakeIconProps) {
  const resolvedWidth = width ?? size;
  const resolvedHeight = height ?? (size ? (size * 400) / 600 : undefined);

  return (
    <img
      src={`${import.meta.env.BASE_URL}WingdLogo4.svg`}
      alt="Wingd Logo"
      width={resolvedWidth}
      height={resolvedHeight}
      className={className}
      {...props}
    />
  );
}