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

UNIT 3

1. Steps in executing interrupts in PIC18 microcontroller
 Repeated in: May/Jun 2022, 2023, 2024; Nov/Dec 2022, 2023
2. Difference between Interrupt and Polling
 Repeated in: Nov/Dec 2022
3. Explain IVT (Interrupt Vector Table), ISR
 Repeated in: May/Jun 2023, 2024; Nov/Dec 2022, 2023
4. Explain INTCON register with format
 Repeated in: Nov/Dec 2023
5. Explain INTCON2 register bits (e.g., INTEDG1, TMR0IP)
 Repeated in: May/Jun 2022, 2023
6. Explain PIR and IPR registers
 Repeated in: May/Jun 2022, 2024
7. Priority of interrupts and enabling/disabling interrupts
 Repeated in: Implied in register-based questions
8. External hardware interrupts with diagram
 Repeated in: May/Jun 2023; Nov/Dec 2023
9. Serial communication interrupt flags: RCIF, TXIF
 Repeated in: Nov/Dec 2022
10. Interfacing 16x2 LCD with PIC18F
 Repeated in: May/Jun 2022, 2023; Nov/Dec 2022, 2023
11. Function of LCD pins (RS, RW, EN)
 Repeated in: May/Jun 2022, 2024
12. Interfacing 4x4 Matrix Keyboard with PIC18F
 Repeated in: May/Jun 2022, 2024
13. Interfacing Relay and Buzzer with PIC18F
 Repeated in: May/Jun 2024
14. Interfacing LED with PIC18F
 Repeated in: Nov/Dec






UNIT 4

1. Explain Capture Mode in PIC18F with block/operation diagram
 Repeated in: May/Jun 2022, 2023, 2024; Nov/Dec 2023
2. Explain Compare Mode programming / operation in PIC18F
 Repeated in: May/Jun 2022, 2024; Nov/Dec 2022
3. Write a short note on PWM Module in PIC18F
 Repeated in: Nov/Dec 2023
4. Explain function of CCP1CON SFR along with its format
 Repeated in: May/Jun 2023, 2024; Nov/Dec 2023


5. State applications of CCP Module in PIC18
 Repeated in: May/Jun 2023

 
6. Explain interfacing of Stepper Motor with PIC18FXX (with diagram)
 Repeated in: May/Jun 2023; Nov/Dec 2023
7. Explain RS232 standard with suitable diagram
 Repeated in: May/Jun 2022, 2023, 2024
8. Write a short note on SPI Protocol
 Repeated in: May/Jun 2022, 2023; Nov/Dec 2022
9. Write a short note on I2C Protocol
 Repeated in: May/Jun 2022; Nov/Dec 2022
10. Compare SPI and I2C bus protocols
 Repeated in: May/Jun 2024; Nov/Dec 2023
11. Explain UART operation in PIC18FXX with example/diagram
 Repeated in: May/Jun 2024; Nov/Dec 2022





UNIT 5

1. Draw and explain interfacing diagram of DAC0808 with PIC18FXX",
 "May/Jun 2022, 2023, 2024; Nov/Dec 2022"),
2. Explain functions of ADCON0 or ADCON1 SFR",
 "May/Jun 2022, 2023, 2024; Nov/Dec 2022, 2023"),
3. List/Explain steps for A to D conversion in PIC18",
 "May/Jun 2024; Nov/Dec 2023"),
4. Explain ADC signals: EOC, SOC, GO/DONE, ADON",
 "May/Jun 2022, 2023; Nov/Dec 2022, 2023"),
5. Interfacing LM34/LM35 with PIC18FXX using on-chip ADC", 
 "May/Jun 2023, 2024; Nov/Dec 2022, 2023"),
6. RTC DS1306 interfacing with PIC18 using I2C",
 "May/Jun 2023, 2024; Nov/Dec 2022, 2023"),
7. Explain RTC DS1306 pins: SERMODE, SDI, SDO",
 "May/Jun 2024; Nov/Dec 2022"),
8. State features of RTC",
 "May/Jun 2023; Nov/Dec 2022, 2023"),
9. Steps for reading from EEPROM using SPI in PIC18", 
 "May/Jun 2022, 2024")





UNIT 6

1. Describe ARM design philosophy and RISC principles",
 "May/Jun 2022, 2024"),
2. Describe major design rules of RISC and list RISC features in ARM",
 "May/Jun 2022, 2024"),
3. Compare ARM processor with pure RISC processor",
 "May/Jun 2023, 2024"),
4. Compare ARM7, ARM9, ARM11 processors",
 "May/Jun 2023; Nov/Dec 2022, 2023"),
5. Why ARM is suitable for embedded applications", 
"Nov/Dec 2023"),
6. Draw and explain ARM7 core dataflow model",
 "May/Jun 2022, 2024; Nov/Dec 2023"),
7. Explain the Programmer’s model of ARM processor",
 "May/Jun 2022, 2023"),
8. Explain CPSR and SPSR registers with diagram",
 "May/Jun 2023; Nov/Dec 2022, 2023"),
9. Significance of special registers R13, R14, R15",
 "May/Jun 2024; Nov/Dec 2022, 2023"),
10. Modes of operation of ARM7 processor",
 "Nov/Dec 2022, 2023"),
11. Differentiate between PIC microcontroller and ARM processor",
 "May/Jun 2023; Nov/Dec 2023")



