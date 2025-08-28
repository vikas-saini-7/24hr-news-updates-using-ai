import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 hidden lg:block bg-gradient-to-l from-white/5 to-transparent border border-white/10"></div>
      <div className="w-full lg:w-1/2">{children}</div>
    </div>
  );
};

export default AuthLayout;
