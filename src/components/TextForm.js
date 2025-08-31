import axios from "axios";
import { useState } from "react";

export default function TextForm() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("hi"); // Default Hindi

  const handleTranslate = async (value, lang) => {
    if (!value) {
      setTranslatedText("");
      return;
    }

    try {
      const res = await axios.get("https://api.mymemory.translated.net/get", {
        params: {
          q: value,
          langpair: `en|${lang}`,
        },
      });
      setTranslatedText(res.data.responseData.translatedText);
    } catch (err) {
      setTranslatedText("⚠️ Error fetching translation");
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setText(val);
    handleTranslate(val, targetLang);
  };

  const handleLangChange = (e) => {
    const lang = e.target.value;
    setTargetLang(lang);
    handleTranslate(text, lang);
  };

  const handleClear = () => {
    setText("");
    setTranslatedText("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    alert("✅ Translated text copied!");
  };

  return (
    <div className="container my-4">
      <div className="card shadow-lg p-4 rounded-3" style={{ background: "#f8f9fa" }}>
        <h2 className="text-center mb-4 text-primary">🌍 Language Converter</h2>

        <textarea
          className="form-control mb-3"
          rows="5"
          placeholder="✍️ Enter text in English..."
          value={text}
          onChange={handleChange}
        ></textarea>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <select className="form-select w-50 me-2" value={targetLang} onChange={handleLangChange}>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ar">Arabic</option>
          </select>

          <button className="btn btn-danger me-2" onClick={handleClear}>
            ❌ Clear
          </button>
        </div>

        <div className="border p-3 rounded bg-white shadow-sm">
          <h5 className="text-success">✅ Translated Text:</h5>
          <p style={{ minHeight: "50px" }}>{translatedText || "..."}</p>
          {translatedText && (
            <button className="btn btn-outline-success mt-2" onClick={handleCopy}>
              📋 Copy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
