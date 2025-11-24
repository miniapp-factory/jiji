"use client";

import { Share } from "./share";

export default function Result({
  animal,
  onRetake,
}: {
  animal: string;
  onRetake: () => void;
}) {
  const imageSrc = `/${animal}.png`;
  const shareText = `I am a ${animal}!`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">You are a {animal}!</h2>
      <img src={imageSrc} alt={animal} width={512} height={512} />
      <Share text={shareText} />
      <button
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
        onClick={onRetake}
      >
        Retake Quiz
      </button>
    </div>
  );
}
