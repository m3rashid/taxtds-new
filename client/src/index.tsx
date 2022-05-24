import { StrictMode } from "react";
import { RecoilRoot } from "recoil";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    {/* @ts-ignore */}
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>
);
