import { default as Components } from "./components";

/* webpack-strip-code-block:start */

// global intellisense for the same API that webpack exposes globally
const clientApp = {
    Components: Components
}

globalThis.ClientApp = clientApp;

/* webpack-strip-code-block:end */

export { Components }
