import { IconBrightness, IconHome, IconSearch } from "@tabler/icons-react";
import React from "react";
import SearchBoxHeader from "./SearchBoxHeader";

interface FeedHeaderProps {
  onToggleView: () => void;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({ onToggleView }) => {
  return (
    <div className="bg-gray-500/10 sticky top-0 z-10 backdrop-blur-md">
      <header className="container mx-auto p-4 flex justify-between items-center">
        {/* <div>Logo</div> */}
        <div></div>
        <div className="flex items-center space-x-4">
          <SearchBoxHeader />
          <div>
            <IconBrightness />
          </div>
        </div>
      </header>
    </div>
  );
};

export default FeedHeader;
