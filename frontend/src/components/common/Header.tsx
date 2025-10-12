import { IconBrightness } from "@tabler/icons-react";
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="bg-gray-500/10">
      <header className="container mx-auto p-4 flex justify-between items-center">
        <div>Logo</div>
        <div>
          <ul className="flex space-x-6">
            <li>Feed</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 border rounded-xl border-gray-500/10"
            />
          </div>
          <div>
            <IconBrightness />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
