# SamjhoSign implementation plan

## Product experience
- Replace the blank home screen with a branded, responsive agreement-understanding experience and shared navigation.
- Build the dashboard, upload flow, document analysis, and settings pages. Include a clearly fictional employment-agreement demo with cited sample clauses and a document-grounded question panel.
- Support PDF, DOCX, JPG/JPEG, and PNG selection with type/size checks, progress/error states, and accessible controls. Extract selectable PDF/DOCX text with page references where available; explain when scanned pages need OCR rather than claiming they were reviewed.
- Present validated structured analysis, exact source excerpts, page/section references, severity, clarification questions, overall informational assessment, and a non-legal-advice notice.

## AI and voice
- Use the project-supported TanStack Start server routes and Lovable AI Gateway for document analysis and grounded follow-up answers; validate model output before displaying it.
- Implement Gnani Prisma v3.0 STT and Timbre v2.5 TTS as server-only calls using the specified endpoints, bounded inputs/timeouts, language/voice mapping, and clear missing-key/service errors. Never substitute browser speech recognition or synthesis.
- Keep recording/playback and file parsing in browser APIs. Do not log document contents or return secrets.

## Privacy and project constraints
- This project is TanStack Start on a Worker runtime, not a Replit Express/Node server. Implement compatible server routes rather than adding Express or Node-only parsers.
- Honor the no-account decision: keep user documents and history on the device, do not create shared accounts or a database, and do not upload or publicly store original files. Server requests receive only the content needed for analysis.
- Lovable Cloud is needed for server-side AI features. Gnani live-service checks require a configured server-side API key; no such key is currently present.

## Validation
- Run the existing routing tests and relevant new business-rule tests.
- Verify route navigation, the fictional demo and its question flow, file validation and failure states, responsive layouts, and preview/build diagnostics. Report external AI/voice checks that remain blocked by missing credentials.

## Technical decisions
- Use TanStack Start route files and server handlers instead of Express because this project deploys as a Worker.
- Use device-local browser storage for the no-account document history; do not create a backend database that would expose one visitor's records to another.
- Keep original-file storage out of the server; only send extracted text to the selected analysis service.
