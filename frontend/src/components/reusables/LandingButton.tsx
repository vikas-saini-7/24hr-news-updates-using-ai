import React from "react";

const LandingButton = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="border border-white/20 text-white px-5 py-2 rounded-2xl text-sm cursor-pointer hover:bg-white/10 transition font-medium shadow-lg backdrop-blur-sm bg-white/5"
    >
      {children}
    </button>
  );
};

export default LandingButton;