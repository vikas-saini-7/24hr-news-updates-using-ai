"use client";
import { useState, useRef, useEffect } from "react";
import { IconSend, IconChevronDown } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function AISummaryPage() {
  const [inputValue, setInputValue] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [summaryLength, setSummaryLength] = useState("short");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const lengthOptions = [
    { value: "short", label: "Short" },
    { value: "medium", label: "Medium" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSummaryStreaming = async (query: string) => {
    setLoading(true);
    setSummary("");
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/llm/summary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: query,
            length: summaryLength,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      if (!res.body) {
        throw new Error("Streaming not supported in this browser.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let streamContent = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          if (chunk) {
            streamContent += chunk;
            setSummary(streamContent);
          }
        }
      }

      if (!streamContent.trim()) {
        throw new Error("No content received from the AI service.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      setSummary("");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !loading) {
      fetchSummaryStreaming(inputValue.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit(e);
  };

  const handleLengthSelect = (value: string) => {
    setSummaryLength(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="h-[calc(100vh-72px)] flex flex-col p-4 sm:px-2">
      {/* Summary Output */}
      <div className="max-w-[1080px] w-full mx-auto flex-1 overflow-y-auto mb-4 p-4 sm:p-2 rounded-lg">
        {loading ? (
          <div className="text-white/70 text-center flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/70"></div>
            <p>Generating Response...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <div className="text-red-400 mb-4 p-4 bg-red-500/10 rounded-lg">
              <p className="font-medium">Error occurred:</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        ) : summary ? (
          <ReactMarkdown
            children={summary}
            rehypePlugins={[rehypeRaw]}
            components={{
              p: ({ node, ...props }) => (
                <p
                  className="text-white text-base sm:text-sm leading-relaxed my-2"
                  {...props}
                />
              ),
              h1: ({ node, ...props }) => (
                <h1
                  className="text-2xl sm:text-xl font-bold text-white my-4"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-xl sm:text-lg font-semibold text-white my-3"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-lg sm:text-base font-semibold text-white my-2"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li
                  className="text-white text-base sm:text-sm ml-5 list-disc my-1"
                  {...props}
                />
              ),
              code: ({ node, inline, className, children, ...props }: any) => (
                <code
                  className={`${
                    inline
                      ? "bg-gray-700 text-white px-1 rounded"
                      : "block bg-gray-700 text-white p-2 sm:p-1 rounded my-2 overflow-x-auto"
                  }`}
                  {...props}
                >
                  {children}
                </code>
              ),
            }}
          />
        ) : (
          <div className="text-white/50 flex h-full items-center justify-center flex-col gap-4 text-center sm:text-sm">
            <div>
              <h3 className="text-xl sm:text-lg font-semibold mb-2">
                AI-Powered News Summaries
              </h3>
              <p>
                Ask me anything about current events and get instant,
                <span className="text-white/70 font-medium">
                  {" "}
                  AI-generated summaries{" "}
                </span>
                from the last 24 hours news
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center text-xs sm:text-[10px]">
              <span className="bg-gray-500/10 px-3 py-1 rounded-full">
                🌍 World News
              </span>
              <span className="bg-gray-500/10 px-3 py-1 rounded-full">
                ⚡ Real-time
              </span>
              <span className="bg-gray-500/10 px-3 py-1 rounded-full">
                📊 AI Analysis
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Box */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-500/10 rounded-2xl w-full max-w-[500px] mx-auto flex flex-col p-2 gap-2"
      >
        {/* Top row: input */}
        <input
          type="text"
          placeholder="Ask me anything..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className="w-full bg-transparent border-none outline-none px-4 py-3 text-white text-sm sm:text-base rounded-2xl disabled:opacity-50"
        />

        {/* Bottom row: dropdown left, send button right */}
        <div className="flex justify-between items-center">
          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={loading}
              className="flex items-center gap-1 px-3 py-2 text-white/70 hover:text-white transition-colors duration-200 text-sm sm:text-base rounded-2xl disabled:opacity-50"
            >
              <span>
                {
                  lengthOptions.find((opt) => opt.value === summaryLength)
                    ?.label
                }
              </span>
              <IconChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute bottom-full left-0 mb-1 bg-gray-500/5 backdrop-blur-sm rounded-lg shadow-lg border border-white/10 min-w-[80px] z-10">
                {lengthOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleLengthSelect(option.value)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                      summaryLength === option.value
                        ? "bg-gray-500/10 text-white"
                        : "text-white/70 hover:text-white hover:bg-gray-500/5"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Send button */}
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="w-10 h-10 bg-white text-black hover:bg-gray-100 rounded-2xl flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Submit"
          >
            <IconSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
