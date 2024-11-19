import { useState } from "react";
import "./App.css";
import useClipboard from "react-use-clipboard";

function App() {
  const [totalWeight, setTotalWeight] = useState(0);
  const [text, setText] = useState('');
  const [isCopied, setCopied] = useClipboard(text, {
    // `isCopied` will go back to `false` after 1000ms.
    successDuration: 1000,
  });
  // Extended list of words and their weights
  const wordWeights = {
    excellent: 6,
    outstanding: 6,
    fantastic: 5,
    amazing: 4,
    superb: 4,
    wonderful: 4,
    good: 3,
    great: 3,
    positive: 3,
    decent: 2,
    fair: 2,
    average: 2,
    okay: 1,
    acceptable: 1,
    neutral: 0,
    bad: -2,
    poor: -2,
    unsatisfactory: -3,
    disappointing: -3,
    terrible: -5,
    horrible: -5,
    dreadful: -5,
    useless: -4,
    unacceptable: -4,
    awful: -5,
    weak: -3,
    subpar: -3,
    unreliable: -3,
    mediocre: -2,
    lackluster: -2,
    bland: -1,
    boring: -1,
    uninspiring: -1,
    innovative: 4,
    creative: 4,
    impressive: 4,
    nice:3,
    lovely:3,
    outstanding: 5,
    perfect: 5,
    remarkable: 4,
    flawless: 5,
    memorable: 4,
    extraordinary: 5,
    lifechanging: 5,
    impactful: 4,
    inspiring: 4,
    exceptional: 5,
    brilliant: 4,
    majestic: 5,
    astonishing: 5,
    transformative: 4,
    thrilling: 4,
    exhilarating: 4,
    breathtaking: 5,
    enlightening: 4,
    visionary: 5,
    satisfying: 3,
    enjoyable: 3,
    pleasing: 3,
    exciting: 4,
    energizing: 4,
    empowering: 4,
    radiant: 4,
    hopeful: 3,
    lively: 3,
    engaging: 3,
    delightful: 4,
    cheerful: 4,
    optimistic: 4,
    friendly: 3,
    warm: 3,
    loving: 4,
    caring: 4,
    recommend:4
  };
// Sample sentences with scores
const sampleSentences = [
  { text: "He delivered excellent work with great attention to detail.", score: 6 },
  { text: "Her creativity and outstanding skills made this project successful.", score: 8 },
  { text: "The team's flawless execution exceeded all expectations.", score: 10 },
  { text: "Their innovative approach brought fresh perspectives to the task.", score: 7 },
  { text: "Amazing results from a truly dedicated professional.", score: 6 },
  { text: "The remarkable progress in such a short time was impressive.", score: 8 },
  { text: "He provided brilliant solutions to complex challenges.", score: 9 },
  { text: "The extraordinary service and support left a lasting impression.", score: 10 },
];

const maxWeight = 100;

const handleInputChange = (e) => {
  const inputText = e.target.value;
  setText(inputText);
  const words = inputText.split(/\s+/).filter((word) => word.length > 0);

  // Calculate total weight based on matching words
  const weight = words.reduce((total, word) => {
    return total + (wordWeights[word.toLowerCase()] || 1); // Default weight is 1
  }, 0);
  console.log(weight)

  setTotalWeight(weight > 100 ? 100 : weight);
};

return (
  <div className="app bg-white rounded-md shadow-sm ring-1 ring-slate-200 px-12 py-8 max-w-5xl w-full mx-auto">
    <h1 className="font-semibold underline text-emerald-700">RateWords</h1>
    <p className="pt-2 text-sm text-gray-500">
      RateWords helps users draft impactful reviews by dynamically calculating
      and displaying the weight of their text based on predefined word values.
      The app also features a progress bar and a one-click copy functionality
      for easy sharing. <a target="_blank" href="https://kashifsulehria.com/">Kashif Sulehria</a>
    </p>
    <textarea
      placeholder="Type your review here..."
      onChange={handleInputChange}
      rows={10}
      className="px-2 py-2 my-6 ring-1 rounded-md ring-gray-200"
      style={{ width: "100%", marginBottom: "1rem" }}
    ></textarea>
   <div
  className="progress-container"
  style={{
    width: "100%",
    background: "#e0e0e0",
    height: "20px",
    borderRadius: "10px",
    overflow: "hidden",
  }}
>
  <div
    className="progress-bar"
    style={{
      width: `${Math.min((totalWeight / maxWeight) * 100, 100)}%`,
      background: totalWeight <= maxWeight ? "#4caf50" : "#f44336", // Green if under max, Red if over max
      height: "100%",
      transition: "width 0.3s",
    }}
  ></div>
</div>
<p className="py-3">
  {totalWeight > maxWeight ? (
    <span className="text-red-600">
      Total Weight: {totalWeight}/{maxWeight} (Exceeded Limit!)
    </span>
  ) : (
    <span>Total Weight: {totalWeight}/{maxWeight}</span>
  )}
</p>

     
    <button
      onClick={() => setCopied(text)}
      className="px-4 py-2 bg-gray-200 text-gray-900 text-sm py-3"
    >
      Copy
    </button>
    <h2 className="mt-6 font-semibold text-lg">Sample Sentences:</h2>
    <ul className="list-disc list-inside text-gray-700">
      {sampleSentences.map((sentence, index) => (
        <li key={index}>
          <strong> </strong> {sentence.text}
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;