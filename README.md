**Project Name:** Voice-Activated Vernacular Ledger (Digital 'Khata')
## 1. Executive Summary
[cite_start]The Voice-Activated Vernacular Ledger is a highly focused FinTech prototype designed to remove the literacy and language barriers associated with digital financial tracking[cite: 1, 14, 16]. [cite_start]Targeting local shopkeepers and street vendors who operate heavily on credit ('udhaar'), the application replaces complex English-based graphical user interfaces with a single-button voice capture system[cite: 141, 143]. [cite_start]By leveraging AI to parse regional languages (Pashto and Urdu) into structured financial data, the tool allows underserved communities to accurately track income, recover debts, and manage inventory with zero technical friction[cite: 8, 27].

## 2. Target Audience & Problem Statement
* [cite_start]**The User:** Small business owners, 'kiryana' store operators, and local vendors who rely on handwritten ledgers and lack standard English or digital literacy[cite: 36, 131, 143].
* [cite_start]**The Problem:** Existing financial and budgeting applications mandate manual data entry through complex interfaces, assuming a fixed level of literacy[cite: 22]. [cite_start]This excludes a massive demographic from digitizing their business, resulting in lost revenue from untracked debts and mismanaged inventory[cite: 30].
* [cite_start]**The Moment of Use:** Immediately after a customer transaction, the shopkeeper records the financial event (e.g., credit given or cash received) in seconds using natural spoken language[cite: 37].

## 3. Functional Requirements
Functional requirements define the specific behaviors and capabilities the system must execute.

* **Voice Capture:** The system must provide a prominent UI button that, when held, activates the device microphone to capture spoken vernacular audio.
* **Audio Transcription:** The system must transcribe the captured audio into raw text using a Speech-to-Text service calibrated for regional dialects (Urdu/Pashto).
* **AI Intent Parsing:** The backend must process the raw transcript via a Large Language Model (LLM) to extract structured JSON data, identifying the transaction amount, category, and type (income vs. credit).
* **Contextual Customer Recognition:** The system must match spoken customer names to existing profiles using Context Grounding (supplying a known name array to the AI) and Fuzzy Matching algorithms to prevent duplicate profile creation for minor mispronunciations.
* **Visual Ledger Management:** The frontend must render the parsed JSON data as a new, timestamped card on a continuous daily ledger.
* **Shadow Inventory Deduction:** The system must maintain a hidden database of high-volume items and automatically subtract quantities recognized in the voice prompt from the current stock.
* **Automated Restock Triggers:** If an item's stock drops to a predefined threshold during a transaction, the system must generate a front-end alert or draft a WhatsApp message to the wholesaler.
* **Visual Confirmation & Editing:** The system must display a temporary, highly visible toast notification upon logging a transaction, providing the user with an immediate option to undo or edit the entry.

## 4. Non-Functional Requirements
Non-functional requirements specify system attributes such as performance, usability, and environmental constraints.

* **Frictionless Usability:** The interface must be entirely comprehensible without written instructions, relying on universally understood iconography (e.g., a microphone icon) and color cues.
* **High Availability (Offline Resilience):** The core ledger interface and historical data must remain accessible via LocalStorage even if the active internet connection drops, ensuring reliability in low-connectivity areas.
* **Data Privacy:** The system must not store sensitive financial data in plaintext on external servers. [cite_start]All immediate user states must be handled locally for the prototype to comply with safe data handling practices[cite: 57, 58, 61].
* **Low Latency AI Resolution:** The turnaround time from the user releasing the recording button to the ledger updating must be minimized to maintain the flow of a fast-paced retail environment.
* **Cultural and Linguistic Empathy:** The AI processing layer must accurately interpret mixed-language phrasing (e.g., Roman Urdu mixed with Pashto slang) natively, without forcing the user to adopt formal linguistic structures.

## 5. System Architecture & Technology Stack
* **Frontend Framework:** Next.js (App Router) combined with React Hooks.
* **User Interface:** Tailwind CSS and shadcn/ui components for rapid, accessible, and responsive mobile-first styling.
* [cite_start]**Audio Capture:** Native Browser `MediaRecorder` and `window.SpeechRecognition` (Web Speech API) set to `ur-PK` for free, zero-latency frontend capture[cite: 66].
* **Backend API Engine:** Next.js Route Handlers (`/api/process-audio`) acting as the coordination layer between the frontend and the AI.
* [cite_start]**AI Parsing Layer:** Google Gemini API (or Groq) to parse unstructured transcripts into strictly typed JSON based on a highly engineered prompt template[cite: 68, 72].
* **Database & State Management:** Browser LocalStorage for high-speed MVP persistence, completely avoiding complex database schemas that could break during deployment.

## 6. Hackathon Deliverables Compliance
This project strictly adheres to the Micathon '26 "Money Moves" requirements:
* [cite_start]**No Hardware:** The solution relies entirely on the user's existing mobile device[cite: 53, 65].
* [cite_start]**Defensible AI:** The LLM is not used as a novelty; it is the critical bridge translating unstructured, illiterate speech into structured financial data, a problem traditional hardcoded logic cannot solve[cite: 68, 69, 72].
* [cite_start]**Hyper-Focused Scope:** The project avoids massive, multi-year neobank features and focuses 100% on a single daily friction point for a highly specific demographic[cite: 13, 33, 34].
