import { useState } from "react";
import { RotateCcw } from "lucide-react";

/**
 * Generates a clean, positive arithmetic problem
 * Supporting addition, multiplication, and subtraction
 */
export function generateMathProblem() {
  const ops = ["*", "+", "-"] ;
  // Weighted: multiplication often appears like in user example "6 * 5 = ?"
  const op = ops[Math.floor(Math.random() * ops.length)];
  let num1, num2, answer;

  if (op === "*") {
    num1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
    num2 = Math.floor(Math.random() * 8) + 2; // 2 to 9
    answer = num1 * num2;
  } else if (op === "+") {
    num1 = Math.floor(Math.random() * 12) + 2; // 2 to 13
    num2 = Math.floor(Math.random() * 9) + 1;  // 1 to 9
    answer = num1 + num2;
  } else {
    num1 = Math.floor(Math.random() * 10) + 10; // 10 to 19
    num2 = Math.floor(Math.random() * 8) + 1;   // 1 to 8
    answer = num1 - num2;
  }

  return {
    num1,
    num2,
    op,
    question: `${num1} ${op} ${num2}`,
    answer,
  };
}

/**
 * Custom hook to easily add math captcha to any form
 */
export function useMathCaptcha() {
  const [problem, setProblem] = useState(() => generateMathProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState("");

  const refreshProblem = () => {
    setProblem(generateMathProblem());
    setUserAnswer("");
    setError("");
  };

  const validateCaptcha = () => {
    if (!userAnswer || userAnswer.toString().trim() === "") {
      setError("Please answer the math question");
      return false;
    }
    const parsed = parseInt(userAnswer.toString().trim(), 10);
    if (isNaN(parsed) || parsed !== problem.answer) {
      setError(`Incorrect answer. Please solve: ${problem.question} = ?`);
      return false;
    }
    setError("");
    return true;
  };

  return {
    problem,
    userAnswer,
    setUserAnswer,
    error,
    setError,
    refreshProblem,
    validateCaptcha,
  };
}

/**
 * MathCaptcha Component
 * Renders the exact UI requested:
 * "Solve: 6 * 5 = ?"
 * [Enter answer]
 */
export default function MathCaptcha({
  problem,
  value,
  onChange,
  error,
  onRefresh,
  className = "",
  labelClassName = "",
  inputClassName = "",
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          className={`block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-gray-300 ${labelClassName}`}
        >
          Solve: <span className="font-bold text-[#111827] dark:text-white">{problem.question} = ?</span>
        </label>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            title="Get another question"
            className="text-gray-400 hover:text-[#84CC16] transition-colors p-1 flex items-center gap-1 text-xs shrink-0"
          >
            <RotateCcw size={12} />
            <span className="text-[10px]">New</span>
          </button>
        )}
      </div>
      <input
        type="number"
        placeholder="Enter answer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full min-w-0 h-10 sm:h-11 rounded-xl border border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-3.5 sm:px-4 py-2 text-xs sm:text-sm focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 focus:outline-none transition-all placeholder:text-gray-400 ${inputClassName}`}
      />
      {error && <p className="text-red-500 text-xs font-medium mt-1">{error}</p>}
    </div>
  );
}
