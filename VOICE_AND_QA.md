# Voice and document Q&A implementation

The home screen includes a clearly labeled fictional sample agreement so the voice and chat experience can be explored without uploading a real document.

## Server-side settings

Configure these values in the deployment's server environment (not client-side `VITE_` variables):

- `GNANI_API_KEY` — required for Gnani Prisma v3.0 transcription and Timbre v2.5 speech output.
- `LLM_API_KEY`, `LLM_BASE_URL`, and `LLM_MODEL` — required for document-grounded question answering. The configured LLM endpoint must accept OpenAI-compatible chat-completions requests.

Without these settings, the app shows a setup or service error instead of pretending an integration succeeded. Speech capture is limited to 30 seconds; the browser is used only to record and play audio. Gnani credentials and provider calls stay on the server.

The current interactive sample uses a fictional agreement embedded in the demo. Uploaded-file extraction and private document persistence are not part of this voice/chat implementation.
