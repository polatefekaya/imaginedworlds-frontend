# Imagined Worlds - Frontend

This is the frontend for Imagined Worlds, an AI-native world simulator. This application provides the user interface for dreaming up a world and watching it come to life in real-time. It's built with a modern, professional-grade tech stack designed for performance and a superior user experience.

I get a little help from AI on frontend but don't mix this with vibe coded apps, I wrote the codes pretty much myself for frontend.

---
## Key Features & Architecture

it's a high-performance, real-time visualization engine.

### 1. **Live, High-Performance Canvas**
The world is rendered on an HTML `<canvas>` element, not with thousands of DOM nodes. All updates are pushed from the server via **SignalR** as tiny, single-pixel "patches." This allows for a smooth, high-framerate timelapse of the world's creation, even with thousands of updates per second. We bypass React's render loop for drawing, using it only for state management to achieve maximum performance.

### 2. **Modern, Type-Safe Stack**
* **Next.js & React:** A robust foundation for a server-rendered, component-based UI.
* **TypeScript:** Ensures end-to-end type safety, from the API contract to the state store, eliminating entire classes of bugs.
* **Tailwind CSS:** Allows for rapid, utility-first styling to create a clean, minimalist, and fully responsive interface.
* **Zustand:** A minimal, powerful state management library. It acts as the central "brain" for the UI, managing all states from agent selection to the live construction plan, without the boilerplate of traditional state managers.

### 3. **The "Live Dashboard" UI**
The interface is designed to give the user a direct window into the AI's "thought process." The side panels are not static info dumps; they are live dashboards that update in real-time based on SignalR events, showing the AI's strategic plan and tactical actions as they happen.

### 4. **Clean, Reusable Components**
The UI is built with a focus on reusability and separation of concerns. Core UI elements like the floating side panels are encapsulated in a single `<Panel>` component, making the main page layout clean and declarative.

---
## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Configure Environment:**
    Create a `.env.local` file in the root directory and add the URL of your backend server:
    ```env
    NEXT_PUBLIC_API_URL=https://localhost:7236
    ```
3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the application.