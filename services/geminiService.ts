import { GoogleGenAI, ThinkingLevel } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAIInstance = (): GoogleGenAI => {
  if (!ai) {
    // Check Vite-compatible environment variables first, falling back to defined process.env keys
    const apiKey = (import.meta.env.VITE_GEMINI_API_KEY as string) ||
                   (import.meta.env.VITE_API_KEY as string) ||
                   (process.env.GEMINI_API_KEY as string) ||
                   (process.env.API_KEY as string) ||
                   '';

    if (!apiKey) {
      console.error("Gemini API Key is missing from environment variables (checked import.meta.env and process.env)");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

const SYSTEM_INSTRUCTION = `
You are Ankesh's professional AI Assistant, an intelligent and highly knowledgeable Compliance Assistant for this portfolio website. Your goal is to provide accurate, concise, and natural responses regarding Ankesh's professional experience, as well as domain-specific guidance on Audit, GST, Income Tax, ROC Compliance, Company Law, Transfer Pricing, and general finance topics.

Ankesh Kumar is a CA Finalist & CA Article Assistant currently pursuing his training at GPHK & Associates. He holds a B.Com in Computer Applications.

PORTFOLIO & WEBSITE CONTEXT (CRITICAL):
You are the AI Assistant for *this specific portfolio website*. Always prioritize the information on this website first.
- **PDF Toolkit (#pdf-toolkit)**: An entirely browser-based, client-side PDF processing utility. It contains the following tools:
  * Merge PDF: Combine multiple PDF files into one.
  * Split PDF: Divide a PDF into separate files.
  * Compress PDF: Optimize and reduce file size.
  * Rotate PDF: Turn pages clockwise or counter-clockwise.
  * Delete Pages: Remove specific pages from a document.
  * Extract Pages: Save designated pages as a new PDF.
  * Watermark PDF: Overlay custom text or image watermarks with precise angle, scale, and opacity controls.
  * Protect PDF: Add strong password encryption.
  * Unlock PDF: Remove password protection (requires password).
  * Images to PDF: Convert JPG, PNG, WEBP files into a single PDF.
  * PDF to Images: Export pages as downloadable image formats.
  * OCR (Extract Text): Extract structured text from scanned documents using client-side OCR.
  *Privacy & Security*: All PDF Toolkit operations run completely on the client-side/browser. Files are processed locally and securely in the sandboxed browser environment; they never leave the user's device (no backend uploads, no external databases, no tracking).
- **Compliance Hub (#compliance-hub)**: An interactive section on this website featuring compliance resources.
- **Compliance Suite (#tech-compliance-desk)**: A specialized interface built into the portfolio.
- **Navigation Sections**:
  * About (#about): Background on Ankesh's CA training.
  * Services (#services): Areas of training/exposure.
  * Compliance Hub (#compliance-hub)
  * Compliance Suite (#tech-compliance-desk)
  * PDF Toolkit (#pdf-toolkit)
  * Contact (#contact): Ways to connect.
- **Recommendation Rule**: When asked about PDF or compliance tools, always describe the built-in features on this website first. Do NOT recommend external software (Adobe Acrobat, iLovePDF, PDF24, etc.) unless the user explicitly asks for alternatives or comparisons.

CRITICAL CONVERSATIONAL & PERSONA GUIDELINES:
1. **Natural, Conversational & Professional Tone:** Act as a helpful compliance expert. Be clear, warm, and highly professional.
2. **No Repetitive Self-Introductions:** Do not begin responses with "I am Ankesh's Professional AI Assistant" or repeat his entire bio unless specifically requested. Assume the user knows where they are.
3. **Answer Briefly First:** Keep initial answers highly concise, direct, and focused. Provide a brief overview first, and expand with more detailed sections or breakdowns ONLY if explicitly requested by the user.
4. **Never Invent Facts:** If information is uncertain, clearly state that you do not have that specific information.
5. **Secure Local Processing / Privacy:** For uploaded invoices, receipts, GST notices, ROC documents, balance sheets, or financial statements, reassure the user that their files are processed entirely securely and privately within their browser session (no external data sharing).
6. **Technical & CA Finalist Status:** Represent Ankesh strictly as a CA Finalist and Article Assistant currently in training. Provide domain guidance on Tax, Audit, and Law neutrally, accurately, and professionally.
7. **Contact & Hiring Details:** Only share his email ('ankeshkumar9949@gmail.com') if the user explicitly asks how to contact him, or inquiries about hiring/networking.
8. **WhatsApp inquiries:** If asked for WhatsApp details, suggest sending an email to 'ankeshkumar9949@gmail.com'.
9. **Casual Greetings:** Keep greetings short (e.g., "Hello! How can I assist you with your compliance or tax inquiries today?"). No lists or menus for a simple greeting.

Key Expertise & Experience Details:
- CA Article Assistant at GPHK & Associates (Dec 2024 – Present)
- Coordinated fieldwork for 30+ Statutory & 15+ Tax Audits.
- Filed and reconciled 100+ GST Returns.
- Supported Form 3CEB, Study Reports, and Benchmarking for clients with turnover > ₹300 Cr.
- Proficient in Tally Prime, QuickBooks, Focus, and Advanced Excel.
`;

const cleanSourceTitle = (title: string, uri: string): string => {
  const isGeneric = !title || 
                    title.toLowerCase().includes('vertexaisearch') || 
                    title.toLowerCase().includes('google.com') ||
                    title.startsWith('http://') || 
                    title.startsWith('https://');
  
  if (isGeneric && uri) {
    try {
      const url = new URL(uri);
      const hostname = url.hostname.replace('www.', '');
      if (hostname === 'incometax.gov.in') return 'Income Tax Department';
      if (hostname === 'gst.gov.in') return 'GST Portal';
      if (hostname === 'icai.org') return 'ICAI Official Portal';
      if (hostname === 'mca.gov.in') return 'MCA Portal';
      if (hostname === 'cbic.gov.in') return 'CBIC Portal';
      
      const urlParts = hostname.split('.');
      if (urlParts.length > 1) {
        const domainName = urlParts[urlParts.length - 2];
        return domainName.charAt(0).toUpperCase() + domainName.slice(1) + ` (${hostname})`;
      }
      return hostname;
    } catch {
      return title || "Web Resource";
    }
  }
  return title;
};

export interface GeminiResponse {
    text: string;
    sources?: { title: string; uri: string }[];
}

export const sendMessageToGemini = async (
    message: string, 
    history: { role: string, parts: { text: string }[] }[],
    image?: { mimeType: string; data: string }
): Promise<GeminiResponse> => {
    try {
        const client = getAIInstance();
        
        // 1. Determine query characteristics
        // Complex reasoning task detection
        const isComplex = /planning|calculate|calculation|compounding|interest|depreciation|audit|case study|legal|section|interpretation|analysis|corporate law|companies act|transfer pricing|compliance analysis|evaluate|formula|financial statement|notice|reply|reconciliation/i.test(message);
        const hasImage = !!image;
        const useProModel = isComplex || hasImage;
        const model = useProModel ? 'gemini-3.1-pro-preview' : 'gemini-3.5-flash';
        
        // Real-time information detection for Google Search Grounding
        const isRealTime = /latest|recent|current|now|today|notification|circular|announcement|update|RBI|Budget|MCA|GST|ICAI|CBDT|amendment|amendments|tax rate 2026|news|finance bill|finance act|rules|recent notification/i.test(message);
        const tools = isRealTime ? [{ googleSearch: {} }] : undefined;

        // 2. Build contents array with message history
        const contents: any[] = [];
        for (const turn of history) {
            contents.push({
                role: turn.role === 'user' ? 'user' : 'model',
                parts: turn.parts.map(p => ({ text: p.text }))
            });
        }

        // Add current user turn with optional image
        const currentParts: any[] = [];
        if (image) {
            currentParts.push({
                inlineData: {
                    mimeType: image.mimeType,
                    data: image.data
                }
            });
        }
        currentParts.push({ text: message });

        contents.push({
            role: 'user',
            parts: currentParts
        });

        // 3. Build model config
        const config: any = {
            systemInstruction: SYSTEM_INSTRUCTION,
        };

        if (tools) {
            config.tools = tools;
        }

        if (useProModel && isComplex) {
            config.thinkingConfig = {
                thinkingLevel: ThinkingLevel.HIGH
            };
            // Note: maxOutputTokens is omitted for HIGH thinking level
        }

        // 55 seconds timeout helper
        const timeoutPromise = new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error("Request timed out")), 55000)
        );

        const responsePromise = client.models.generateContent({
            model,
            contents,
            config
        });

        const response = await Promise.race([
            responsePromise,
            timeoutPromise
        ]);
        
        const sources: { title: string; uri: string }[] = [];
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
            for (const chunk of chunks) {
                if (chunk.web?.uri) {
                    sources.push({
                        title: cleanSourceTitle(chunk.web.title || '', chunk.web.uri),
                        uri: chunk.web.uri
                    });
                }
            }
        }

        // Deduplicate sources
        const uniqueSourcesMap = new Map<string, string>();
        sources.forEach(src => {
            uniqueSourcesMap.set(src.uri, src.title);
        });
        const uniqueSources = Array.from(uniqueSourcesMap.entries()).map(([uri, title]) => ({
            title,
            uri
        }));

        return {
            text: response.text || "I apologize, I couldn't process that request.",
            sources: uniqueSources.length > 0 ? uniqueSources : undefined
        };
    } catch (error: any) {
        console.error("Error communicating with Gemini:", error);
        
        if (error?.message === "Request timed out") {
            return {
                text: "I apologize, but the search query timed out while scanning official tax portals. Please try again, or rephrase your question to be more specific."
            };
        }
        
        return {
            text: "I apologize, but I am currently experiencing a connection issue or unable to access the required portals at this moment. Please try again shortly."
        };
    }
};