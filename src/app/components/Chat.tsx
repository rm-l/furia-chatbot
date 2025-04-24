"use client";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";

export default function Chat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "assistant",
        content: "Olá! Sou o bot da FURIA! Vamos conversar?",
      },
    ]
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      setMessages([...newMessages, data]);
    } catch (error) {
      console.error("Erro na API:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "⚠️ Ocorreu um erro. Tente novamente mais tarde.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-3 sm:p-4 flex flex-col h-full">
      <div className="space-y-3 mb-4 sm:mb-6 text-black overflow-y-auto flex-1">
        {messages.map((msg, i) => (
          <Message key={i} role={msg.role} content={msg.content} />
        ))}
        {isLoading && (
          <div className="flex justify-center p-3">
            <ArrowPathIcon className="h-5 w-5 animate-spin text-furia-orange" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 sm:p-3 border rounded-lg text-black focus:ring-2 focus:ring-furia-orange focus:outline-none"
          placeholder="Ex: Quem é o capitão da FURIA?"
          aria-label="Digite sua mensagem"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-furia-black text-white hover:bg-furia-orange px-4 py-2 sm:py-3 rounded-lg transition-colors font-medium ${
            isLoading ? "opacity-80" : "hover:bg-opacity-90"
          }`}
        >
          {isLoading ? (
            <ArrowPathIcon className="h-5 w-5 animate-spin mx-auto" />
          ) : (
            <>
              <span className="hidden sm:inline">Enviar</span>
              <span className="sm:hidden">➤</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
