"use client";

import { useState } from "react";
import Result from "./result";

export function Quiz() {
  const questions = [
    {
      text: "What is your favorite activity?",
      options: [
        { label: "Chasing mice", animal: "cat" },
        { label: "Playing fetch", animal: "dog" },
        { label: "Hunting in the woods", animal: "fox" },
        { label: "Nibbling on seeds", animal: "hamster" },
        { label: "Galloping in fields", animal: "horse" },
      ],
    },
    {
      text: "Which environment do you prefer?",
      options: [
        { label: "Quiet indoor spaces", animal: "cat" },
        { label: "Open parks", animal: "dog" },
        { label: "Dense forests", animal: "fox" },
        { label: "Small cages", animal: "hamster" },
        { label: "Wide open plains", animal: "horse" },
      ],
    },
    {
      text: "How do you feel about strangers?",
      options: [
        { label: "Curious but cautious", animal: "cat" },
        { label: "Friendly and eager", animal: "dog" },
        { label: "Sly and observant", animal: "fox" },
        { label: "Shy and hidden", animal: "hamster" },
        { label: "Confident and bold", animal: "horse" },
      ],
    },
    {
      text: "What is your preferred food?",
      options: [
        { label: "Fish and kibble", animal: "cat" },
        { label: "Meat and treats", animal: "dog" },
        { label: "Insects and berries", animal: "fox" },
        { label: "Seeds and nuts", animal: "hamster" },
        { label: "Grass and hay", animal: "horse" },
      ],
    },
    {
      text: "How do you like to spend your day?",
      options: [
        { label: "Sleeping and grooming", animal: "cat" },
        { label: "Running and playing", animal: "dog" },
        { label: "Exploring and hunting", animal: "fox" },
        { label: "Nibbling and sleeping", animal: "hamster" },
        { label: "Running and grazing", animal: "horse" },
      ],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const shuffle = (array: any[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const handleAnswer = (animal: string) => {
    setAnswers([...answers, animal]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const retake = () => {
    setCurrent(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const counts: Record<string, number> = {};
    answers.forEach((a) => (counts[a] = (counts[a] || 0) + 1));
    const resultAnimal = Object.entries(counts).reduce(
      (max, [animal, count]) => (count > max[1] ? [animal, count] : max),
      ["", 0]
    )[0] as string;

    return <Result animal={resultAnimal} onRetake={retake} />;
  }

  const question = questions[current];
  const shuffledOptions = shuffle(question.options);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">{question.text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt) => (
          <button
            key={opt.label}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
