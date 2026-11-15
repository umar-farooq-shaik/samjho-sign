# Samjho Sign

Build SamjhoSign – AI-Powered Agreement Understanding Platform

Act as a senior full-stack software engineer, AI engineer, UI/UX designer, and product architect.

Build a complete, production-quality web application called SamjhoSign.

1. Product vision

SamjhoSign – Understand Before You Sign.

SamjhoSign is an AI-powered, multilingual, voice-first agreement understanding assistant.

People frequently sign employment agreements, rental contracts, loan documents, service agreements, and terms and conditions without understanding what they are agreeing to.

This affects:

People with limited literacy who struggle to read formal documents.

Educated people who don't understand complicated legal terminology.

Job seekers who overlook employment bonds and exit penalties.

Tenants who miss restrictive rental agreement clauses.

Consumers who accept lengthy terms and conditions without understanding their obligations.

The solution allows users to upload a document and understand it in simple everyday language through text and voice.

The platform must do more than summarize documents. It must explain what users are agreeing to, identify potentially problematic clauses, show exact original clauses with page references, and allow users to ask questions through natural voice conversations.

Core tagline: Don't just sign. Understand.

2. Technology stack

Use a modern, maintainable full-stack architecture.

Frontend:

React

TypeScript

Vite

Tailwind CSS

shadcn/ui

Lucide icons

Framer Motion for subtle animations

Backend:

Node.js

Express.js

TypeScript

REST APIs

Document processing:

PDF text extraction using a suitable PDF parser.

DOCX extraction using mammoth.

OCR for scanned PDFs and uploaded images using a suitable OCR library or service.

Preserve page numbers and source references.

AI:

Integrate a configurable LLM provider for document understanding, structured summaries, risk analysis, and question answering.

Keep the LLM provider separate from Gnani speech APIs.

Read LLM configuration from environment variables.

Do not invent a Gnani text-generation endpoint.

Speech:

Gnani Prisma v3.0 for STT.

Gnani Timbre v2.5 for TTS.

Use reusable components, proper TypeScript types, clear error handling, and a clean project structure.

3. Brand identity and visual design

Do NOT use the typical purple, pink, blue-gradient, neon, or dark AI vibe-coder aesthetic.

SamjhoSign should feel like a trustworthy legal document companion: approachable, secure, calm, accessible, and professional.

Design inspiration:

Modern fintech applications.

Premium legal-tech SaaS products.

Minimal document management platforms.

Warm editorial typography.

Color palette

Use this palette consistently:

Primary: Deep Navy #18324B

Secondary: Muted Teal #397C78

Background: Warm Ivory #F8F6F0

Surface: White #FFFFFF

Main Text: Charcoal #27323A

Secondary Text: #718096

Warning: Amber #D99A32

Critical Risk: Muted Red #C65D58

Success: Sage Green #668B70

Borders: #E7E5DD

Use deep navy for navigation, headings, and primary actions.

Use muted teal for positive actions, voice interactions, and important highlights.

Use amber for clauses requiring attention.

Use muted red only for high-priority potential risks.

Avoid excessive shadows, gradients, glassmorphism, and decorative animations.

Typography:

Use Inter or Manrope for general UI.

Use a readable serif font sparingly for editorial headings if appropriate.

The interface must be fully responsive, accessible, and comfortable for older users and people with limited digital literacy.

4. Application structure

Create these main routes:

/ – Landing page.

/dashboard – User dashboard.

/upload – Document upload.

/document/:id – Document analysis and results.

/settings – Language, voice, and preferences.

Landing page

Create a premium, conversion-focused landing page.

Hero section:

Heading:
"Before You Sign, Understand What You're Signing."

Subheading:
"Upload any agreement. Get simple explanations, identify hidden risks, and ask questions in your own language."

Primary CTA: "Understand My Agreement"

Secondary CTA: "See How It Works"

Add a visually attractive document-analysis illustration showing:

An uploaded agreement.

Highlighted clauses.

A warning about an employment bond.

A simple AI-generated explanation.

A voice assistant interface.

Other sections:

The problem – People sign documents they don't fully understand.

How SamjhoSign works – Upload, Analyze, Understand, Ask.

Key features.

Supported use cases – Employment, rental, loans, insurance, services, and terms and conditions.

Multilingual voice assistance.

Privacy and document security.

FAQ.

Final CTA.

Do not make unsupported claims about legal accuracy or guaranteed protection.

5. Dashboard

Create a clean dashboard with:

Greeting: "Understand your agreements before signing."

Large document upload card.

Recent documents.

Document status: Analyzing, Completed, Failed.

Number of documents analyzed.

Number of potential risks identified.

Quick action: Upload New Agreement.

Each document card should show:

Document name.

Document category.

Upload date.

Analysis status.

Risk indicator.

View Analysis action.

Allow users to delete documents.

Include a first-time empty state with a clear upload CTA.

6. Document upload experience

Build an intuitive drag-and-drop upload interface.

Supported files:

PDF

DOCX

JPG

JPEG

PNG

Include:

Browse files.

Drag-and-drop upload.

File size validation.

Upload progress.

File preview where possible.

Remove and replace options.

Analyze Document button.

Show a privacy notice:
"Your document is processed to generate your analysis. Avoid uploading documents you do not have permission to share."

After upload, display a progress interface with these stages:

Extracting document content.

Understanding agreement structure.

Identifying important obligations.

Checking potentially problematic clauses.

Preparing your simplified explanation.

Do not simulate successful analysis if the backend fails.

7. AI document analysis engine

This is the most important feature.

Once a document is uploaded:

A. Extract its content while preserving page numbers and section information.

B. Classify the document:

Employment agreement.

Employment bond.

Rental agreement.

Loan agreement.

Insurance agreement.

Service agreement.

Non-disclosure agreement.

Terms and conditions.

Other.

C. Generate a structured analysis.

The AI must identify:

Document overview.

Parties involved.

Purpose of the agreement.

Duration and effective dates.

Financial commitments.

User responsibilities.

Company or other party responsibilities.

Termination conditions.

Notice periods.

Renewal conditions.

Penalties and financial liabilities.

Restrictions and obligations.

Missing or unclear information.

Important deadlines.

D. Identify potentially problematic clauses.

Look specifically for:

Employment bonds.

Early resignation penalties.

Excessive or unclear financial penalties.

Salary deductions.

Unpaid training obligations.

Long notice periods.

Non-compete clauses.

Exclusivity restrictions.

Automatic renewal clauses.

One-sided termination rights.

Broad indemnity clauses.

Unclear refund conditions.

Unusual liability obligations.

Waivers of important rights.

Unclear dispute resolution provisions.

These are indicators for review, not automatic proof of illegality.

For each flagged clause, return:

Risk title.

Severity: High, Medium, or Low.

Original clause exactly as written.

Page number.

Section or clause number if available.

Simple-language explanation.

Why it matters to the user.

Potential real-world consequences.

Questions the user should ask before signing.

Never invent clauses, page numbers, amounts, or obligations.

If a risk cannot be established from the document, explain the uncertainty.

E. Generate an overall risk assessment:

Needs careful review.

Some clauses require clarification.

No major issues detected in the reviewed content.

Do not label a document legally safe or unsafe. State that the analysis is informational and not a substitute for professional legal advice.

8. Document analysis results interface

Design this as the primary product experience.

Use a two-column desktop layout.

Left column:

Original document preview.

Page navigation.

Highlighted clauses.

Clickable clause references.

Right column:

AI-generated simplified summary.

Important information.

Potential risks.

Ask SamjhoSign chat assistant.

On mobile, stack these sections vertically.

Results sections

A. Document overview

Display:

Document type.

Parties.

Duration.

Financial obligations.

Important dates.

B. What are you agreeing to?

Explain in simple language:

"Here is what this agreement means for you."

Use short sentences and everyday vocabulary.

C. Potentially problematic clauses

Display risk cards with clear severity indicators.

When the user clicks a risk card:

Navigate to the relevant document page.

Highlight the exact original text.

Show its explanation next to it.

D. Important things to clarify

Generate a checklist of questions the user should ask the other party before signing.

E. Final summary

Show:

What you are agreeing to.

Your major responsibilities.

Financial risks.

Exit conditions.

Clauses requiring clarification.

Add a "Listen to Summary" button.

Add an option to download the summary as a PDF.

9. Gnani AI API integration – Mandatory

Official documentation:
https://docs.gnani.ai/api/introduction/introduction

Base URL:
https://api.vachana.ai

API authentication:
X-API-Key-ID: YOUR_GNANI_API_KEY

Store the key securely in server-side environment variables.

Never expose API keys in frontend code.

A. Speech-to-Text (STT)

Use Gnani Prisma v3.0.

Endpoint:
POST https://api.vachana.ai/stt/v3

Headers:

X-API-Key-ID

Multipart form data

Fields:

audio_file

model = prisma-v3.0

language_code

Use indic-auto when automatic multilingual detection is appropriate.

Support language selection:

English: en-IN

Hindi: hi-IN

Telugu: te-IN

Tamil: ta-IN

Kannada: kn-IN

Malayalam: ml-IN

Marathi: mr-IN

Bengali: bn-IN

Gujarati: gu-IN

Punjabi: pa-IN

Use Prisma v3.0's format=codemix where appropriate for code-mixed speech.

For short voice questions, record audio using the browser MediaRecorder API and upload it to the backend STT route.

Important:
The REST endpoint supports audio clips up to 30 seconds. Validate this limit and provide clear feedback for longer recordings. Do not silently truncate audio.

Backend endpoint:
POST /api/speech/stt

The backend should:

Receive recorded audio.

Validate the file.

Forward it to Gnani STT.

Parse the transcript.

Return transcript and detected language.

Handle API errors properly.

B. Text-to-Speech (TTS)

Use Gnani Timbre v2.5.

Endpoint:
POST https://api.vachana.ai/api/v1/tts/inference

Example request:

{
"text": "You are agreeing to work for this company for two years.",
"voice": "Suhana",
"model": "timbre-v2.5",
"language": "te-IN",
"speed": 1.0,
"audio_config": {
"sample_rate": 48000,
"num_channels": 1,
"sample_width": 2,
"encoding": "linear_pcm",
"container": "wav"
}
}

Use the actual binary audio response from Gnani, not an assumed JSON audio response.

Backend endpoint:
POST /api/speech/tts

The backend should:

Accept text and selected language.

Select the corresponding voice.

Call Gnani TTS.

Return the generated audio with the correct content type.

Handle errors and unavailable services.

Suggested voice mapping for Timbre v2.5:

English: Kaveri or Pranav.

Hindi: Bhavna or Vikrant.

Hinglish: Poorvi.

Telugu: Suhana or Varuni.

Tamil: Trisha.

Kannada: Saanvi.

Malayalam: Reshma.

Marathi: Zahira.

Bengali: Kirra.

Gujarati: Falak.

Punjabi: Zayan.

Use only valid voices for the selected model. Allow the user to change their preferred voice where possible.

C. Voice interaction interface

Build a polished voice interaction component.

Features:

Microphone button.

Recording indicator.

Listening animation.

Stop recording.

Transcribed text preview.

Edit transcript before sending.

Submit question.

AI text response.

Listen to response.

Replay audio.

Stop audio playback.

Use a clear visual distinction between listening, processing, speaking, and idle states.

Make sure STT and TTS are genuinely connected to Gnani APIs. Do not use browser speech synthesis or browser speech recognition as a substitute for the required Gnani integration.

Browser APIs may be used only for audio recording and playback.

10. Ask SamjhoSign – Conversational assistant

Create an interactive AI chat interface for each analyzed document.

Users should be able to type or speak questions.

Example questions:

What exactly am I agreeing to?

What happens if I resign after six months?

Do I have to pay any money if I leave early?

Can the company deduct money from my salary?

Is there any employment bond?

Can I work for another company after leaving?

What happens if I terminate this agreement?

Explain clause 8 in simple Telugu.

Which clauses should I clarify before signing?

The AI must answer using the uploaded document as its primary source.

Requirements:

Ground answers in extracted document content.

Reference the relevant page and clause.

Clearly state when information is missing.

Never invent terms.

Explain legal terminology with simple examples.

Support multilingual responses.

Provide voice playback using Gnani TTS.

Accept spoken questions using Gnani STT.

Use conversation context, but never let earlier AI responses override the actual agreement text.

11. Multilingual and accessibility experience

Build language selection into the onboarding and settings.

Allow users to select:

English.

Hindi.

Telugu.

Hinglish.

Other supported Indian languages.

The chosen language should influence:

Document summary.

Risk explanations.

Chat responses.

Voice playback.

Preserve original legal clauses in their original language. Show translations separately.

Use simple language by default.

Accessibility:

Large readable text.

High-contrast buttons.

Clear icons with labels.

Keyboard navigation.

Screen-reader-friendly components.

Avoid relying only on color to communicate risk.

Clear recording and playback controls.

12. Demo experience

Include a sample agreement so evaluators can explore the application without uploading their own document.

Create a clearly labeled fictional employment agreement with:

A two-year employment bond.

An early-exit financial penalty.

A 90-day notice period.

A confidentiality clause.

A non-compete clause.

Use it to demonstrate:

Upload or load sample agreement.

Extracted document preview.

Structured summary.

Highlighted clauses.

Risk identification.

Voice explanation.

Conversational Q&A.

Make clear that this is fictional demo content.

The demo should work without real user documents.

Do not present hardcoded demo results as real AI analysis. Label sample analysis clearly.

13. Backend API architecture

Create clean API routes such as:

POST /api/documents/upload

POST /api/documents/:id/analyze

GET /api/documents/:id

GET /api/documents

DELETE /api/documents/:id

POST /api/chat/:documentId

POST /api/speech/stt

POST /api/speech/tts

GET /api/health

Implement:

Input validation.

File type and size validation.

Safe file handling.

API error handling.

Request timeouts.

Loading and processing states.

Secure environment configuration.

Use a database for document metadata and analysis history if persistent storage is available.

Do not store uploaded documents publicly.

Add appropriate deletion and cleanup functionality.

14. Environment variables

Create .env.example with:

GNANI_API_KEY=
LLM_API_KEY=
LLM_BASE_URL=
LLM_MODEL=
DATABASE_URL=
SESSION_SECRET=

Use the exact environment variable names consistently.

If a required API key is missing:

Show a clear setup error.

Explain which key is missing.

Do not pretend that the service is working.

Allow the sample demo to work independently.

Do not commit actual secrets.

15. AI response structure

Require structured JSON output from the document analysis engine.

Use a validated schema similar to:

{
"documentType": "Employment Agreement",
"overview": "Simple explanation of the document",
"parties": [],
"duration": "",
"financialObligations": [],
"responsibilities": [],
"terminationConditions": [],
"importantDates": [],
"risks": [
{
"title": "Early resignation penalty",
"severity": "high",
"originalClause": "Exact text from document",
"pageNumber": 7,
"clauseNumber": "8.2",
"simpleExplanation": "What this means in everyday language",
"whyItMatters": "Potential consequences",
"questionsToAsk": []
}
],
"missingInformation": [],
"overallAssessment": "needs_careful_review",
"finalSummary": ""
}

Treat this as a schema example, not permission to invent information.

Validate all AI output before rendering it.

If extraction is incomplete, indicate that some pages or sections could not be reviewed.

16. Security and privacy

This application handles sensitive personal and contractual documents.

Implement:

Server-side API key storage.

File validation.

Private document storage.

No public document URLs.

No unnecessary logging of document contents.

Safe deletion of uploaded documents.

Request size limits.

Secure error messages.

No exposure of secrets in API responses.

Clearly inform users how documents are processed and stored.

Do not claim end-to-end encryption unless it is actually implemented.

17. Quality requirements

The finished application must:

Have a polished, cohesive design.

Work on desktop, tablet, and mobile.

Have functional navigation.

Have working upload and document analysis flows.

Have real Gnani STT integration.

Have real Gnani TTS integration.

Have functional conversational Q&A.

Display exact source clauses and page references.

Have useful loading, empty, error, and success states.

Include a working demo experience.

Avoid placeholder buttons.

Avoid fake API responses presented as successful integrations.

Avoid unnecessary features that distract from the core experience.

Prioritize functionality over decorative animations.

18. Implementation instructions

Before coding:

Inspect the Replit project and existing files.

Decide on the cleanest architecture.

Check package compatibility.

Create a short implementation plan.

Then build the complete application.

Work incrementally:

Build the application structure and visual design.

Implement document upload and extraction.

Implement AI document analysis.

Implement risk detection and source highlighting.

Integrate Gnani STT.

Integrate Gnani TTS.

Implement voice-based chat.

Add demo agreement.

Implement privacy and error handling.

Test the complete user journey.

Do not stop after building the frontend.

Do not leave the core functionality as TODOs.

After implementation:

Run the application.

Fix TypeScript and build errors.

Test all major routes.

Test upload and analysis.

Test STT and TTS with configured Gnani credentials.

Test multilingual voice selection.

Test document-grounded Q&A.

Test mobile responsiveness.

If API credentials are unavailable, complete the integration code and clearly report which real API tests require credentials.

Finally, provide:

Features implemented.

Tech stack used.

Environment variables required.

How to run the project.

Which integrations were actually tested.

Any remaining limitations.

Final product objective: Build a real, usable, voice-first legal document understanding assistant that helps ordinary people understand what they are about to sign, in a language they are comfortable with.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e57a9a65-4fdc-415a-9494-8a89e5d06848).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
