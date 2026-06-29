import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageSquare, X, Send, Loader2, Shield, Globe, Paperclip } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
  sources?: { title: string; uri: string }[];
  image?: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "👋 Welcome! Ask about GST, Audit, Income Tax, MCA, Company Law, or upload a PDF or image for secure analysis."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedImage, setAttachedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isGeneratingRef = useRef(false);
  const errorTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerError = useCallback((msg: string) => {
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
    }
    setErrorMsg(msg);
    errorTimerRef.current = setTimeout(() => {
      setErrorMsg(null);
      errorTimerRef.current = null;
    }, 5000);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  // Escape key support to close chat
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDownGlobal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDownGlobal);
    return () => document.removeEventListener('keydown', handleKeyDownGlobal);
  }, [isOpen]);

  // Focus message input automatically when chat opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Client-side image validation
      if (file.size === 0) {
        triggerError("The selected file is empty. Please select a valid image.");
        return;
      }

      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
      if (file.size > MAX_FILE_SIZE) {
        triggerError("File is too large. Maximum allowed size is 5MB.");
        return;
      }

      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        triggerError("Unsupported format. Please select a PNG, JPG, JPEG, or WEBP image.");
        return;
      }
      
      setAttachedImage(file);
      setErrorMsg(null); // Clear active errors when a correct file is selected
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          setImagePreview(event.target.result);
        }
      };
      reader.onerror = () => {
        triggerError("Failed to read the image file.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!inputValue.trim() && !attachedImage) || isLoading || isGeneratingRef.current) return;

    const userText = inputValue.trim();
    const currentPreview = imagePreview;
    const currentImageFile = attachedImage;
    
    // Reset input and attachment states immediately
    setInputValue('');
    setAttachedImage(null);
    setImagePreview(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    isGeneratingRef.current = true;
    setIsLoading(true);

    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userText || "Analyzed attached document", 
      image: currentPreview || undefined 
    }]);

    try {
      const history = messages.map(m => ({
          role: m.role === 'user' ? ('user' as const) : ('model' as const),
          parts: [{ text: m.text }]
      }));

      let imageParam = undefined;
      if (currentImageFile && currentPreview) {
        const commaIndex = currentPreview.indexOf(',');
        if (commaIndex !== -1) {
          const mimeType = currentImageFile.type;
          const data = currentPreview.substring(commaIndex + 1);
          imageParam = { mimeType, data };
        }
      }

      const response = await sendMessageToGemini(
        userText || "Please analyze this compliance document, invoice, notice, or financial statement.", 
        history, 
        imageParam
      );

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: response.text, 
        sources: response.sources 
      }]);
    } catch (error) {
      const errorMessageString = error instanceof Error ? error.message : "Unexpected system error";
      console.error("Critical error in ChatWidget send loop:", errorMessageString);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I apologize, but an unexpected system error occurred. Please try sending your inquiry again."
      }]);
    } finally {
      setIsLoading(false);
      isGeneratingRef.current = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuery = (queryText: string) => {
    setInputValue(queryText);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div 
          role="dialog"
          aria-label="Compliance Assistant Chat Window"
          className="bg-white dark:bg-darkCard rounded-t-lg rounded-bl-lg shadow-2xl w-[340px] sm:w-[380px] h-[500px] flex flex-col mb-4 border border-slate-200 dark:border-slate-700 animate-fade-in-up overflow-hidden transition-colors"
        >
          {/* Header */}
          <div className="bg-navy dark:bg-slate-900 p-4 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-3 text-slate-50">
                <div className="bg-white/10 p-1.5 rounded" aria-hidden="true">
                    <Shield size={18} className="text-gold" />
                </div>
                <div>
                    <h3 className="font-bold text-sm tracking-wide font-sans">Compliance Assistant</h3>
                    <p className="text-[10px] text-slate-300 uppercase tracking-wider font-sans">Ankesh Kumar | CA Finalist</p>
                </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none rounded"
              aria-label="Close chat window"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div 
            role="log"
            aria-live="polite"
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-darkBg/50"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-corporate dark:bg-gold text-slate-50 dark:text-navy font-medium' 
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                }`}>
                  {msg.image && (
                    <div className="mb-2 max-w-full overflow-hidden rounded border border-white/20 dark:border-slate-700">
                      <img 
                        src={msg.image} 
                        alt="Uploaded compliance or financial document preview" 
                        className="max-h-48 object-contain w-full rounded"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  {msg.role === 'model' ? (
                    <div className="prose dark:prose-invert prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="pl-0.5">{children}</li>,
                          strong: ({ children }) => <strong className="font-bold text-slate-900 dark:text-white">{children}</strong>,
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-corporate dark:text-gold hover:underline font-semibold break-all focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none rounded"
                            >
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code className="bg-slate-100 dark:bg-slate-900 text-pink-600 dark:text-pink-400 px-1 py-0.5 rounded font-mono text-xs">
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div>{msg.text}</div>
                  )}
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1">
                        <Globe size={10} className="text-slate-400 dark:text-gold" aria-hidden="true" /> Checked Sources:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.sources.map((src, sIdx) => {
                          let label = src.title;
                          try {
                            const urlObj = new URL(src.uri);
                            label = urlObj.hostname.replace('www.', '');
                          } catch (e) {}

                          return (
                            <a 
                              key={sIdx} 
                              href={src.uri} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center gap-1 text-[11px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-corporate dark:hover:border-gold hover:text-corporate dark:hover:text-gold text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded transition-all max-w-full truncate font-mono focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                              title={src.title}
                            >
                              <span className="truncate">{label}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {messages.length === 1 && (
              <div className="space-y-2 animate-fade-in px-2">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Suggested Queries:</p>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => handleSuggestedQuery("What are the key compliance deadlines for an Indian Private Limited Company?")}
                    className="text-left text-xs bg-white dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                    aria-label="Ask suggested query: What are the key compliance deadlines for an Indian Private Limited Company?"
                  >
                    🏢 Pvt Ltd Filing Deadlines?
                  </button>
                  <button 
                    onClick={() => handleSuggestedQuery("Can you describe Ankesh's expertise and audit portfolio?")}
                    className="text-left text-xs bg-white dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                    aria-label="Ask suggested query: Can you describe Ankesh's expertise and audit portfolio?"
                  >
                    💼 Learn about Ankesh's audit background
                  </button>
                  <button 
                    onClick={() => handleSuggestedQuery("Analyze this invoice image for GST and compliance accuracy.")}
                    className="text-left text-xs bg-white dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                    aria-label="Ask suggested query: Analyze document image compliance"
                  >
                    📄 Analyze document image compliance
                  </button>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded shadow-sm">
                  <Loader2 size={16} className="animate-spin text-corporate dark:text-gold" aria-hidden="true" />
                  <span className="sr-only">Analyzing document or generating response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Attached Image Preview Strip */}
          {imagePreview && (
            <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 animate-fade-in shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <img 
                  src={imagePreview} 
                  alt="Attachment preview" 
                  className="w-8 h-8 object-cover rounded border border-slate-300 dark:border-slate-600"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                  {attachedImage?.name}
                </span>
              </div>
              <button 
                onClick={() => {
                  setAttachedImage(null);
                  setImagePreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="p-1 text-slate-400 hover:text-rose-500 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
                title="Remove image attachment"
                aria-label="Remove image attachment"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Inline Error Message Banner */}
          {errorMsg && (
            <div className="px-4 py-2 bg-rose-50 dark:bg-rose-950/30 border-t border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 text-xs flex justify-between items-center animate-fade-in shrink-0">
              <span role="alert" className="font-medium leading-normal">{errorMsg}</span>
              <button 
                onClick={() => setErrorMsg(null)} 
                className="text-rose-400 hover:text-rose-650 dark:hover:text-rose-300 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none p-0.5 rounded"
                aria-label="Dismiss error notification"
              >
                <X size={12} aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Input Box Area */}
          <div className="p-4 bg-white dark:bg-darkCard border-t border-slate-100 dark:border-slate-700">
            <div className="flex gap-2 items-center">
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
                id="chat-file-upload-input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-400 hover:text-corporate dark:text-slate-400 dark:hover:text-gold hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                title="Upload invoice, tax notice, balance sheet, or other business documents for secure local explanation and analysis"
                aria-label="Upload document image"
              >
                <Paperclip size={18} aria-hidden="true" />
              </button>

              <input
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask compliance or portfolio query..."
                className="flex-1 bg-light dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-corporate dark:focus:border-gold focus:ring-1 text-navy dark:text-white placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                aria-label="Chat input query"
              />
              <button 
                onClick={handleSend}
                disabled={(!inputValue.trim() && !attachedImage) || isLoading}
                className="bg-navy hover:bg-corporate dark:bg-gold dark:hover:bg-white dark:hover:text-navy text-white p-2.5 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                aria-label="Send query"
              >
                <Send size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 text-center select-none font-medium">
              🔒 Privacy-First: All query and document processing is local & secure.
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button with Helper Bubble */}
      <div className="flex items-center gap-3">
        {!isOpen && (
          <div className="hidden md:flex flex-col items-end bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl shadow-xl max-w-[280px] animate-bounce-gentle">
            <span className="text-xs font-extrabold text-corporate dark:text-gold block">🤖 AI Compliance Assistant</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 text-right leading-snug">
              Ask tax/law questions & upload document images for private, secure browser analysis.
            </span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Compliance Assistant chat window" : "Open Compliance Assistant chat window"}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="group relative flex items-center justify-center w-14 h-14 bg-navy dark:bg-gold hover:bg-corporate dark:hover:bg-white dark:hover:text-navy text-white dark:text-navy rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-white dark:border-slate-700 shrink-0 focus-visible:ring-4 focus-visible:ring-gold focus-visible:outline-none"
        >
          {isOpen ? <X size={24} aria-hidden="true" /> : <MessageSquare size={24} aria-hidden="true" />}
          {!isOpen && (
               <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold dark:bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gold dark:bg-white"></span>
              </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;