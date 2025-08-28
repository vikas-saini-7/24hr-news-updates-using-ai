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
      className="border border-white/10 text-white px-5 py-2 rounded-2xl text-sm cursor-pointer hover:bg-white/5 transition"
    >
      {children}
    </button>
  );
};

export default LandingButton;
