import { createRoot } from "react-dom/client";
import App from "./App";
import "./main.css";

declare global {
    interface Window {
        electronAPIs?: {
            send: (channel: string, ...args: any[]) => void;
            on: (channel: string, listener: (...args: any[]) => void) => void;
        };
    }
}

const container = document.querySelector("#root");

if (container) {
    const root = createRoot(container);
    root.render(<App />)
} else {
    console.error("#root not found");
}