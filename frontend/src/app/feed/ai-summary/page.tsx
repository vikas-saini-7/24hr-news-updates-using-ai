"use client";

import Modal from "@/components/reusables/Modal";
import Image from "next/image";
import { useState } from "react";
import { IconSend } from "@tabler/icons-react";

import ChatGPTLogo from "@/assets/chatgpt.png";
import ClaudeLogo from "@/assets/claude.png";
import GeminiLogo from "@/assets/gemini.webp";
import GrokLogo from "@/assets/grok.png";
import UnderConstruction from "@/assets/under-construction.svg";

export default function AISummaryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsModalOpen(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-[calc(100vh-67px)] flex flex-col">
      {/* body  */}
      <div className="flex-1"></div>

      {/* chat box  */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-500/10 mb-4 rounded-2xl max-w-[500px] w-full flex items-center"
        >
          <input
            type="text"
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 h-full bg-transparent border-none outline-none px-6 py-4"
          />
          <button
            type="submit"
            className="cursor-pointer w-10 h-10 bg-white text-black hover:bg-gray-100 rounded-2xl flex items-center justify-center transition-colors duration-200 mr-2"
            aria-label="Submit"
          >
            <IconSend size={20} />
          </button>
        </form>
      </div>

      {/* Coming Soon Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Coming Soon"
        className="max-w-lg min-h-[400px]"
      >
        <div className="text-center py-8">
          {/* Under Construction Icon */}
          {/* <div className="mb-6 flex justify-center">
            <Image
              src={UnderConstruction}
              alt="Under Construction"
              width={80}
              height={80}
              className="opacity-80"
            />
          </div> */}

          {/* AI Model Logos Grid */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white/90 mb-4">
              Powered by Leading AI Models
            </h3>
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className="flex items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10">
                <Image
                  src={ChatGPTLogo}
                  alt="ChatGPT"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <span className="ml-2 text-sm text-white/80">ChatGPT</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10">
                <Image
                  src={ClaudeLogo}
                  alt="Claude"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <span className="ml-2 text-sm text-white/80">Claude</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10">
                <Image
                  src={GeminiLogo}
                  alt="Gemini"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <span className="ml-2 text-sm text-white/80">Gemini</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10">
                <Image
                  src={GrokLogo}
                  alt="Grok"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <span className="ml-2 text-sm text-white/80">Grok</span>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            AI Summary Feature
          </h3>
          <p className="text-white/70">
            This feature is currently under development. We're working hard to
            bring you an amazing AI-powered news summarization experience!
          </p>
          <button
            onClick={closeModal}
            className="mt-6 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
          >
            Got it!
          </button>
        </div>
      </Modal>
    </div>
  );
}
