const axios = require("axios");
const cheerio = require("cheerio");
const { genAI, hfClient } = require("../configs/ai.config.js");

/* -------------------------------------------------------------------------- */
/*                           STREAM NEWS SUMMARY API                          */
/* -------------------------------------------------------------------------- */

/**
 * Streams a real-time news summary fetched from the web using Gemini
 * @param {string} userQuery - Search topic or keywords
 * @param {string} length - "short" or "medium" for summary size
 * @param {object} res - Express response (streaming output)
 */
exports.streamNewsSummaryFromWeb = async (userQuery, length, res) => {
  try {
    const modelName =
      length === "medium" ? "gemini-2.5-flash" : "gemini-2.5-flash-lite";

    const lengthInstruction =
      length === "medium"
        ? "Provide a detailed summary with context and analysis."
        : "Provide a brief, concise summary focusing on key points only.";

    const prompt = `
      You are a factual, concise news summarization assistant.
      Based on your knowledge, provide a summary about recent developments regarding: "${userQuery}"
      ${lengthInstruction}
      Focus on factual information and avoid speculation.
    `;

    // Set streaming headers
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const model = genAI.getGenerativeModel({ model: modelName });
    const stream = await model.generateContentStream(prompt);

    // Handle stream
    for await (const chunk of stream.stream) {
      const text = chunk.text();
      if (text) {
        res.write(text);
      }
    }

    res.end();
  } catch (err) {
    console.error("Error in streaming summary:", err);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Error streaming news summary. Please try again later.",
      });
    } else {
      res.write("\n\n[Error: Failed to complete summary. Please try again.]");
      res.end();
    }
  }
};

/* -------------------------------------------------------------------------- */
/*                       SENTIMENT ANALYSIS API (JSON)                       */
/* -------------------------------------------------------------------------- */

exports.getSentimentAnalysisFromUrl = async (articleUrl) => {
  try {
    if (!articleUrl) {
      const error = new Error("Article URL is required");
      error.statusCode = 400;
      throw error;
    }

    // Validate URL format
    try {
      new URL(articleUrl);
    } catch (urlError) {
      const error = new Error("Invalid URL format");
      error.statusCode = 400;
      throw error;
    }

    // Fetch the article HTML
    const { data: html } = await axios.get(articleUrl, {
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NewsBot/1.0)",
      },
    });
    const $ = cheerio.load(html);

    // Extract clean text
    const title = $("title").text();
    const text = $("p")
      .map((_, el) => $(el).text())
      .get()
      .join(" ");
    const content = `${title}\n\n${text}`.slice(0, 5000);

    if (!content.trim()) {
      const error = new Error("Failed to extract article text");
      error.statusCode = 400;
      throw error;
    }

    let sentiment = "UNKNOWN";
    let confidence = 0;
    let usesFallback = false;

    // Try Hugging Face sentiment classification first
    try {
      const hfResponse = await hfClient.post(
        "/models/distilbert-base-uncased-finetuned-sst-2-english",
        {
          inputs: content,
          options: { wait_for_model: true },
        },
        {
          timeout: 15000,
        }
      );

      if (hfResponse.data && hfResponse.data[0]) {
        sentiment = hfResponse.data[0].label || "UNKNOWN";
        confidence = hfResponse.data[0].score || 0;
      }
    } catch (hfError) {
      console.warn(
        "Hugging Face API failed, using Gemini fallback:",
        hfError.message
      );
      usesFallback = true;

      // Fallback to Gemini for sentiment analysis
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const fallbackPrompt = `
          Analyze the sentiment of this article and respond in this exact JSON format:
          {"sentiment": "POSITIVE" or "NEGATIVE", "confidence": number between 0 and 1}
          
          Article content:
          """${content}"""
        `;

        const fallbackResult = await model.generateContent(fallbackPrompt);
        const fallbackText = fallbackResult.response.text();

        // Try to parse JSON response
        try {
          const jsonMatch = fallbackText.match(/\{[^}]+\}/);
          if (jsonMatch) {
            const parsedResult = JSON.parse(jsonMatch[0]);
            sentiment = parsedResult.sentiment || "NEUTRAL";
            confidence = parsedResult.confidence || 0.5;
          }
        } catch (parseError) {
          console.warn("Failed to parse Gemini sentiment response");
          sentiment = "NEUTRAL";
          confidence = 0.5;
        }
      } catch (geminiError) {
        console.error(
          "Both Hugging Face and Gemini sentiment analysis failed:",
          geminiError.message
        );
        sentiment = "NEUTRAL";
        confidence = 0.5;
      }
    }

    // Gemini explanation
    let explanation = "Unable to generate explanation at this time.";
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `
        You are a professional sentiment analysis assistant.
        The analysis detected this article as **${sentiment.toLowerCase()}**
        with confidence ${(confidence * 100).toFixed(2)}%.

        Your tasks:
        1. Confirm if this sentiment makes sense.
        2. Explain *why* the sentiment is expressed (tone, wording, context).
        3. Describe the emotional tone briefly in 2–3 sentences.

        Article content:
        """${content}"""
      `;

      const result = await model.generateContent(prompt);
      explanation = result.response.text();
    } catch (modelError) {
      console.error("Gemini explanation failed:", modelError.message);
    }

    return {
      sentiment: sentiment,
      confidence: parseFloat((confidence * 100).toFixed(2)),
      explanation: explanation,
      articleTitle: title.trim(),
      analysisTimestamp: new Date().toISOString(),
      usesFallback: usesFallback,
    };
  } catch (err) {
    console.error("Error in sentiment analysis:", err);
    const error = new Error(
      err.message || "Error performing sentiment analysis"
    );
    error.statusCode = err.statusCode || 500;
    throw error;
  }
};
