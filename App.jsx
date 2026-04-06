import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText || !language) {
      alert("Enter text and select language");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://google-translator9.p.rapidapi.com/v2",
        {
          q: inputText,
          source: "en",
          target: language,
          format: "text",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "cb2939900bmsh7879a9cbd0fd962p13ae65jsn7c2b05879654",
            "X-RapidAPI-Host": "google-translator9.p.rapidapi.com",
          },
        }
      );

      const translated =
        response.data?.data?.translations?.[0]?.translatedText ||
        "No result";

      setOutputText(translated);
    } catch (error) {
      console.log("ERROR:", error);
      alert("API not working");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">

      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-6 w-full max-w-2xl flex flex-col gap-5 transition-all duration-300 hover:scale-[1.01]">

        <h1 className="text-3xl font-bold text-center text-white drop-shadow">
           Text Translator
        </h1>

        <textarea
          placeholder="Enter text..."
          className="w-full h-32 rounded-lg p-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <textarea
          placeholder="Translated text..."
          className="w-full h-32 rounded-lg p-3 bg-white/80 focus:outline-none"
          value={outputText}
          readOnly
        />

        <select
          className="w-full p-2 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Select language</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="gu">Gujarati</option>
        </select>

        <button
          onClick={handleTranslate}
          disabled={loading}
          className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Translating...
            </>
          ) : (
            "Translate"
          )}
        </button>

      </div>
    </div>
  );
}

export default App;