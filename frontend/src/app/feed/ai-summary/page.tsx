"use client";

import Modal from "@/components/reusables/Modal";
import Image from "next/image";
import { useState } from "react";

import ChatGPTLogo from "@/assets/chatgpt.png";
import ClaudeLogo from "@/assets/claude.png";
import GeminiLogo from "@/assets/gemini.webp";
import GrokLogo from "@/assets/grok.png";

const tools = [
  {
    name: "ChatGPT",
    desc: "AI chatbot for text generation.",
    score: "92%",
    category: "Text",
    logo: ChatGPTLogo,
  },
  {
    name: "Claude AI",
    desc: "AI assistant by Anthropic.",
    score: "90%",
    category: "Text",
    logo: ClaudeLogo,
  },
  {
    name: "Gemini",
    desc: "Google’s multimodal AI model.",
    score: "87%",
    category: "Text + Vision",
    logo: GeminiLogo,
  },
  {
    name: "Grok",
    desc: "X's newly launched AI model.",
    score: "69%",
    category: "Text + AI",
    logo: GrokLogo,
  },
];

const getScoreColor = (score: string) => {
  const num = parseInt(score.replace("%", ""));
  if (num >= 90) return "text-green-400"; // High trust
  if (num >= 70) return "text-yellow-400"; // Medium trust
  return "text-red-400"; // Low trust
};

export default function AISummaryPage() {
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [news, setNews] = useState<string>("");

  const fetchNews = async (toolName: string) => {
    const response = await fetch(`/api/fetch-news?tool=${toolName}`);
    const data = await response.json();
    setNews(data.summary);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, idx) => (
        <div
          key={idx}
          className="p-5 rounded-2xl bg-gray-500/10 hover:bg-gray-500/20 cursor-pointer transition shadow-lg hover:shadow-xl flex flex-col items-start"
          onClick={() => {
            setSelectedTool(tool);
            fetchNews(tool.name);
          }}
        >
          {/* Logo */}
          <div className="w-12 h-12 mb-3 relative">
            <Image
              src={tool.logo}
              alt={`${tool.name} logo`}
              fill
              className="object-contain rounded-xl"
            />
          </div>

          {/* Text content */}
          <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
          <p className="text-sm text-white/60">{tool.desc}</p>
          <div className="mt-3 text-sm">
            <span className="font-medium text-white/70">Trust Score:</span>{" "}
            <span className={getScoreColor(tool.score)}>{tool.score}</span>
          </div>
        </div>
      ))}

      <Modal
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        title={`Last 24 Hours News Summary by ${selectedTool?.name}`}
        className="max-h-[80vh] relative pb-10"
      >
        <div className="overflow-y-auto max-h-[68vh] pr-3">
          <p className="text-sm text-white/60 mb-4 ">
            News from last 24 hrs related to{" "}
            <strong>{selectedTool?.name}</strong>:
          </p>
          {news ? (
            <div className="space-y-3 text-white/80">
              {news.split("\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          ) : (
            <p className="text-white/60">Fetching latest news...</p>
          )}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          assumenda fugit dolor, iure soluta ullam sit iste laboriosam nisi
          suscipit dolore voluptates quaerat aut doloremque recusandae
          aspernatur nam quo quibusdam quidem blanditiis earum. Tempore optio
          nesciunt quod odit deleniti aliquam vitae praesentium laudantium minus
          delectus voluptas vel expedita, tenetur earum! Cupiditate aliquam
          dignissimos fugit quia harum, commodi itaque! Vitae delectus quod illo
          architecto quam molestiae nam repudiandae asperiores repellendus
          dolorem, neque placeat odit rem deleniti facere perspiciatis
          distinctio aspernatur iusto ducimus consequuntur in ullam praesentium.
          Iusto quo porro eaque sint nihil neque, quos consectetur soluta
          reiciendis quam nostrum ut atque nisi dolorem voluptas consequuntur
          recusandae odio eius magnam hic magni non officia sequi? Et, minus
          totam quis eos tenetur repellendus adipisci veniam tempora esse
          quibusdam ab numquam saepe quae dolorem culpa omnis incidunt sapiente
          quaerat ipsum. Dolores pariatur explicabo placeat id assumenda in.
          Cupiditate provident eos tempora, a deserunt vel quo id recusandae. Id
          maiores sequi ex aut asperiores explicabo, totam impedit assumenda
          vitae at suscipit dolorem culpa corrupti? Quisquam nulla ullam
          eligendi dolorum architecto velit sapiente accusamus minima, odio,
          vitae iste, aspernatur officia? Architecto dolor totam accusantium
          ratione harum, molestias eius blanditiis labore, explicabo corporis,
          vel nihil? Sunt, itaque quibusdam ipsum cum rerum ducimus eaque odio
          quas quam excepturi amet sint vero tempora autem non accusantium
          cumque. Laborum quod voluptates quis inventore quisquam modi, quam
          cumque nostrum repudiandae, officia hic sit sed error voluptatibus
          neque dolorum voluptatum fugit quo adipisci pariatur earum placeat
          atque obcaecati dignissimos. Vitae voluptate illo quaerat rerum
          sapiente, magni quo, reiciendis, temporibus beatae id assumenda minus
          placeat illum! Expedita qui maiores neque accusamus quisquam. Sapiente
          odio saepe nemo, deserunt nobis rem, enim, ducimus sint eaque dolorum
          sunt omnis odit quam vitae exercitationem officiis iusto voluptatem
          amet. Blanditiis, cum voluptatum! Maxime animi laudantium officiis
          vero consequuntur, in aliquam tempore eius veniam autem dolorum ipsa
          non assumenda dolorem velit! Autem officiis quasi facilis? Cum est
          aspernatur voluptatem nobis at non repellat consequatur voluptate
          reprehenderit sapiente, minus eveniet rerum ex quos amet quia quo illo
          quidem hic culpa enim earum ad error. Quibusdam blanditiis
          repudiandae, consectetur voluptatum a optio aspernatur asperiores
          error quo at sed modi ducimus quam sequi distinctio facere omnis
          incidunt quisquam veritatis ratione. Exercitationem recusandae a
          quibusdam ut modi veniam nihil veritatis molestias saepe magnam amet
          accusamus animi delectus tempora quasi nobis voluptatibus minus,
          perspiciatis sint. Eveniet doloremque quod quidem nostrum officiis, ad
          in similique placeat tempore odit quae voluptate modi incidunt?
          Eveniet, adipisci. Illo praesentium deserunt numquam delectus ex at
          quibusdam a temporibus eveniet. Modi optio, architecto minus similique
          nisi nostrum quisquam corrupti debitis at sunt temporibus cum
          doloremque quod! Quibusdam reprehenderit nemo, sequi, perspiciatis
          eligendi, ad at ipsam beatae necessitatibus minima hic totam molestiae
          voluptates quam! Corporis sed officiis saepe, ipsa vitae voluptates
          tempore molestiae aliquam. Similique minima quae dicta quaerat
          dignissimos! Veniam similique porro possimus tenetur distinctio nulla
          totam, atque saepe cumque sed maiores fugit sint pariatur molestiae
          harum, facilis, accusantium aperiam. Recusandae nesciunt nostrum
          voluptatum autem possimus incidunt, error non nulla!
          {/* ⚠️ Disclaimer */}
          <div className="mt-6 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-400 flex items-center">
            <div className="w-6 h-6 mr-3 relative">
              <Image
                src={selectedTool?.logo}
                alt={`${selectedTool?.name} logo`}
                fill
                className="object-contain rounded-md"
              />
            </div>
            <p>
              Disclaimer: This content is generated using ai. It may contain
              inaccuracies or errors.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
