import Image from "next/image";

export default function Message({
  role,
  content,
}: {
  role: string;
  content: string;
}) {
  return (
    <div
      className={`flex gap-3 ${
        role === "assistant" ? "items-start" : "items-end"
      }`}
    >
      {role === "assistant" && (
        <Image
          src="/images/furia.svg"
          alt="Logo FURIA"
          width={100}
          height={100}
          className="h-16 w-16 flex-shrink-0"
        />
      )}
      <div
        className={`p-3 rounded-lg ${
          role === "assistant" ? "bg-furia-orange text-white" : "bg-gray-200"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
