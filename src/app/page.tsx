import Chat from "@/app/components/Chat";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-furia-black flex flex-col">
      {/* Header (mantido igual) */}
      <header className="bg-furia-black text-white p-4 sm:p-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-2 sm:gap-3">
          <Image
            src="/images/furia.svg"
            alt="Logo FURIA"
            width={128}
            height={128}
            className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain hover:scale-105 transition-transform"
          />
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              FURIA Fan Chat
            </h1>
          </div>
          <p className="text-xs sm:text-sm opacity-80 text-center max-w-xs sm:max-w-none">
            Bot não-oficial - Dados podem não ser precisos
          </p>
        </div>
      </header>

      {/* Área do Chat ajustada */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-3 sm:px-4 pb-4">
        <Chat />
      </div>

      {/* Footer novo */}
      <footer className="py-3 px-4 text-center text-xs sm:text-sm text-gray-400 border-t border-gray-800 bg-furia-black">
        © {new Date().getFullYear()} FURIA Fan Chat - Não afiliado à FURIA
        Esports
      </footer>
    </main>
  );
}
