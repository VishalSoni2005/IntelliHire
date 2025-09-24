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
       "level": "easy"
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

## 📌 Endpoint Summary

- `POST /api/vapi/generate`
  - **Purpose**: Accepts processed input from Vapi and interacts with Gemini.
  - **Request Body**:
    ```json
    {
      "role": "user",
      "style": "casual",
      "level": "medium"
    }
    ```
  - **Response**: Generated interview questions from Gemini

---


{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}