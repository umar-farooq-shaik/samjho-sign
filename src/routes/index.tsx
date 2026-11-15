import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, CircleHelp, FileText, Headphones, LoaderCircle, Mic, Pause, Play, ShieldCheck, Sparkles, Square, Volume2, X } from "lucide-react";
import { askAboutDocument, synthesizeSpeech, transcribeSpeech } from "../lib/voice-assistant.server";

export const Route = createFileRoute("/")({ component: Home });

type Message = { role: "user" | "assistant"; content: string };
const agreement = `FICTIONAL SAMPLE EMPLOYMENT AGREEMENT\n\nPage 1 — Employment term\n1.1 The Employee agrees to work for SamjhoSign Demo Company for a period of two (2) years from the joining date.\n\nPage 2 — Training and repayment\n4.2 If the Employee resigns before completing two years, the Employee must repay ₹2,00,000 as training costs.\n\nPage 3 — Notice and restrictions\n8.1 Either party must give ninety (90) days written notice to end employment.\n8.2 For one year after employment ends, the Employee shall not work for a competing company in India.\n\nPage 4 — Confidentiality\n10.1 The Employee must not disclose confidential company information during or after employment.`;
const suggested = ["What happens if I resign early?", "How much notice is required?", "Can I work for a competitor?"];
const languageOptions = [
  ["en-IN", "English"], ["hi-IN", "Hindi"], ["te-IN", "Telugu"], ["ta-IN", "Tamil"],
  ["kn-IN", "Kannada"], ["ml-IN", "Malayalam"], ["mr-IN", "Marathi"], ["bn-IN", "Bengali"],
  ["gu-IN", "Gujarati"], ["pa-IN", "Punjabi"], ["hinglish", "Hinglish"],
] as const;

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
function Home() {
  const [language, setLanguage] = useState<(typeof languageOptions)[number][0]>("en-IN");
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [transcript, setTranscript] = useState("");
  const [busy, setBusy] = useState<"transcribe" | "answer" | "speak" | null>(null);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const [playing, setPlaying] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const audio = useRef<HTMLAudioElement | null>(null);
  const recordingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (recordingTimer.current) clearTimeout(recordingTimer.current);
    audio.current?.pause();
    recorder.current?.stream.getTracks().forEach((track) => track.stop());
  }, []);

  const startRecording = async () => {
    setError(""); setTranscript("");
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Audio recording is not supported in this browser. You can type your question instead."); return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const instance = new MediaRecorder(stream);
      recorder.current = instance; chunks.current = [];
      instance.ondataavailable = (event) => { if (event.data.size) chunks.current.push(event.data); };
      instance.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        if (recordingTimer.current) clearTimeout(recordingTimer.current);
        setRecording(false);
        const blob = new Blob(chunks.current, { type: instance.mimeType || "audio/webm" });
        if (blob.size > 10 * 1024 * 1024) { setError("This recording is too large. Please record a shorter clip."); return; }
        setBusy("transcribe");
        try {
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader(); reader.onerror = () => reject(new Error("Could not read the recording."));
            reader.onload = () => resolve(String(reader.result).split(",")[1] ?? ""); reader.readAsDataURL(blob);
          });
          const result = await transcribeSpeech({ data: { audioBase64: base64, mimeType: blob.type || "audio/webm", language } });
          setTranscript(result.transcript); setQuestion(result.transcript);
        } catch (caught) { setError(errorMessage(caught)); }
        finally { setBusy(null); }
      };
      instance.start(); setRecording(true);
      recordingTimer.current = setTimeout(() => { if (instance.state === "recording") instance.stop(); }, 30_000);
    } catch (caught) {
      setError(caught instanceof DOMException && caught.name === "NotAllowedError"
        ? "Microphone permission was denied. Allow microphone access or type your question." : errorMessage(caught));
    }
  };
  const stopRecording = () => { if (recorder.current?.state === "recording") recorder.current.stop(); };

  const sendQuestion = async (value = question) => {
    const prompt = value.trim(); if (!prompt || busy) return;
    setError(""); setQuestion(""); setTranscript("");
    const updated: Message[] = [...messages, { role: "user", content: prompt }];
    setMessages(updated); setBusy("answer");
    try {
      const result = await askAboutDocument({ data: {
        question: prompt, documentText: agreement, history: messages.slice(-8),
        language: languageOptions.find(([code]) => code === language)?.[1] ?? "English",
      } });
      setMessages((current) => [...current, { role: "assistant", content: result.answer }]);
    } catch (caught) { setError(errorMessage(caught)); }
    finally { setBusy(null); }
  };
  const speak = async (text: string) => {
    setError(""); setBusy("speak"); audio.current?.pause(); setPlaying(false);
    try {
      const result = await synthesizeSpeech({ data: { text, language } });
      const bytes = Uint8Array.from(atob(result.audioBase64), (char) => char.charCodeAt(0));
      const player = new Audio(URL.createObjectURL(new Blob([bytes], { type: result.contentType })));
      audio.current = player; player.onended = () => { setPlaying(false); URL.revokeObjectURL(player.src); };
      player.onerror = () => { setPlaying(false); setError("Could not play the generated audio. Please try again."); };
      await player.play(); setPlaying(true);
    } catch (caught) { setError(errorMessage(caught)); }
    finally { setBusy(null); }
  };
  const stopPlayback = () => { audio.current?.pause(); setPlaying(false); };

  return (
    <main className="app-shell">
      <header className="topbar"><a className="brand" href="#top" aria-label="SamjhoSign home"><span className="brand-mark"><FileText size={20}/></span><span>Samjho<span className="brand-accent">Sign</span></span></a><nav><a href="#how">How it works</a><a href="#ask">Ask about a document</a></nav><span className="privacy-tag"><ShieldCheck size={15}/> Private by design</span></header>
      <section className="hero" id="top"><div className="hero-copy"><span className="eyebrow"><Sparkles size={15}/> UNDERSTAND BEFORE YOU SIGN</span><h1>Big agreements.<br/><em>Plain-language</em> answers.</h1><p>Ask questions about an agreement, speak naturally, and hear explanations in your language. Answers are grounded in the document—not guesswork.</p><a className="primary-button" href="#ask">Try the voice assistant <ArrowRight size={17}/></a><div className="trust-note"><ShieldCheck size={16}/>Your microphone audio is sent securely to Gnani for transcription.</div></div><div className="hero-card"><div className="hero-card-top"><span className="file-icon"><FileText size={20}/></span><div><strong>Employment agreement</strong><small>Fictional sample · 4 pages</small></div><span className="demo-chip">DEMO</span></div><div className="sample-clause"><span>CLAUSE 4.2 · PAGE 2</span><p>If the Employee resigns before completing two years, the Employee must repay ₹2,00,000 as training costs.</p><div><CircleHelp size={15}/> Ask what this means in simple words</div></div><div className="mini-answer"><span className="bot-avatar"><Sparkles size={15}/></span><p><strong>In plain language</strong><br/>Leaving before two years may require repayment of ₹2,00,000, according to clause 4.2.</p></div></div></section>

      <section className="assistant-section" id="ask"><div className="section-heading"><div><span className="eyebrow">YOUR DOCUMENT, YOUR QUESTIONS</span><h2>Ask SamjhoSign</h2></div><label className="language-select">Answer language<select value={language} onChange={(event) => setLanguage(event.target.value as typeof language)}>{languageOptions.map(([code, name]) => <option key={code} value={code}>{name}</option>)}</select></label></div>
        <div className="assistant-grid"><aside className="document-panel"><div className="panel-heading"><BookOpen size={18}/><strong>Agreement sources</strong></div><div className="document-label"><FileText size={17}/><div><strong>Fictional employment agreement</strong><small>Sample document · not legal advice</small></div></div><div className="source-list"><div><b>4.2</b><span>Early resignation repayment<small>Page 2</small></span></div><div><b>8.1</b><span>Notice period<small>Page 3</small></span></div><div><b>8.2</b><span>Competing company restriction<small>Page 3</small></span></div><div><b>10.1</b><span>Confidentiality<small>Page 4</small></span></div></div><p className="source-note"><ShieldCheck size={15}/>Answers use the sample agreement as their source. Missing terms will be identified as not specified.</p></aside>
          <div className="chat-panel"><div className="chat-header"><div className="assistant-avatar"><Sparkles size={16}/></div><div><strong>Your agreement assistant</strong><span><i/> Ready to help</span></div><span className="grounded-badge"><Check size={13}/> Document-grounded</span></div>
            <div className="chat-messages" aria-live="polite">{messages.length === 0 ? <div className="welcome-message"><div className="welcome-icon"><Headphones size={22}/></div><h3>What would you like to understand?</h3><p>Ask by typing or use the microphone. Answers refer to the sample agreement's clauses and pages.</p><div className="suggestions">{suggested.map((prompt) => <button key={prompt} onClick={() => void sendQuestion(prompt)}>{prompt}<ArrowRight size={14}/></button>)}</div></div> : messages.map((message, index) => <div className={`message ${message.role}`} key={`${index}-${message.role}`}><div className="message-bubble"><span>{message.content}</span>{message.role === "assistant" && <button className="listen-button" onClick={() => playing ? stopPlayback() : void speak(message.content)} disabled={busy !== null && busy !== "speak"} aria-label={playing ? "Stop spoken answer" : "Listen to answer"}>{busy === "speak" ? <LoaderCircle className="spin" size={15}/> : playing ? <Pause size={15}/> : <Volume2 size={15}/>}<span>{playing ? "Stop" : "Listen"}</span></button>}</div>{message.role === "assistant" && <small className="citation-label">Based on the fictional sample agreement</small>}</div>)}{busy === "answer" && <div className="typing-indicator"><LoaderCircle className="spin" size={16}/> Checking the agreement…</div>}</div>
            {transcript && <div className="transcript-preview"><div><Check size={15}/> Transcription preview — edit before sending</div><textarea aria-label="Edit transcribed question" value={transcript} onChange={(event) => {setTranscript(event.target.value); setQuestion(event.target.value);}} rows={2}/></div>}
            {error && <div className="error-message" role="alert"><X size={16}/><span>{error}</span><button aria-label="Dismiss error" onClick={() => setError("")}><X size={14}/></button></div>}
            <div className="composer"><button className={`mic-button ${recording ? "recording" : ""}`} onClick={recording ? stopRecording : startRecording} disabled={busy !== null && busy !== "transcribe"} aria-label={recording ? "Stop recording" : "Record a question"}>{busy === "transcribe" ? <LoaderCircle className="spin" size={20}/> : recording ? <Square size={17} fill="currentColor"/> : <Mic size={20}/>}</button><div className="input-wrap"><input value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => {if (event.key === "Enter" && !event.shiftKey) {event.preventDefault(); void sendQuestion();}}} placeholder={recording ? "Listening… tap stop when you're done" : busy === "transcribe" ? "Transcribing your recording…" : "Ask about a clause, cost, or condition…"} aria-label="Ask a question about this document" disabled={recording || busy !== null}/>{recording && <span className="recording-label"><i/> Recording · up to 30 seconds</span>}</div><button className="send-button" onClick={() => void sendQuestion()} disabled={!question.trim() || busy !== null || recording} aria-label="Send question">{busy === "answer" ? <LoaderCircle className="spin" size={18}/> : <ArrowRight size={19}/>}</button></div><div className="composer-caption">{recording ? "Your recording stops automatically at 30 seconds." : "Enter sends · Microphone uses Gnani Prisma speech recognition"}</div>
          </div>
        </div><p className="legal-note">SamjhoSign provides general information, not legal advice. Verify important terms with a qualified professional.</p>
      </section>
      <section className="how-section" id="how"><span className="eyebrow">SIMPLE, CLEAR, GROUNDED</span><h2>Understand the details that matter.</h2><div className="steps"><article><span>01</span><h3>Ask your way</h3><p>Type or speak a question in the language you’re comfortable with.</p></article><article><span>02</span><h3>Get cited answers</h3><p>Understand the relevant clause and where it appears in the agreement.</p></article><article><span>03</span><h3>Listen and learn</h3><p>Hear answers read aloud with Gnani voice generation.</p></article></div></section>
      <footer><a className="brand" href="#top"><span className="brand-mark"><FileText size={17}/></span><span>Samjho<span className="brand-accent">Sign</span></span></a><span>Don't just sign. Understand.</span></footer>
    </main>
  );
}
