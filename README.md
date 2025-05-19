# AI Voice Agent Workflow

This project outlines the workflow for an AI voice assistant system using **Vapi**, **Google Gemini**, and **Firebase Firestore**. The system captures user voice input, processes it with an AI agent, generates a response using Gemini, and stores the relevant question in Firestore.

---

## 🧠 System Workflow

1. **User Input (Voice)**
   - The user provides information via voice.
   - Input is captured and interpreted by the **Vapi AI Agent**.

2. **Vapi AI Agent**
   - Processes voice data and extracts intent.
   - Sends a `POST` request to `/api/vapi/gen` with the following request body:
     ```json
     {
       "role": "user",
       "style": "formal",
       "level": "easy",
       // other relevant details
     }
     ```

3. **Gemini API**
   - Backend receives the request and sends it to **Google Gemini** to generate a relevant question or response based on the input.

4. **Firestore**
   - The generated question/response is then **stored in Firebase Firestore** for future use, such as analytics or user history tracking.

---

## 🧰 Technologies Used

- **Vapi AI Agent** - For capturing and converting voice input
- **Google Gemini API** - For generating smart responses or questions
- **Firebase Firestore** - For storing generated questions


---



