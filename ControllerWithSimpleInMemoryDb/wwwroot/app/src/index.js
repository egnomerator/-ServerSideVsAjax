import { default as Components } from "./components";
import Shared from "./shared";

/* webpack-strip-code-block:start */

// global intellisense for the same API that webpack exposes globally
const clientApp = {
    Components: Components,
    Shared: Shared
}

globalThis.ClientApp = clientApp;

/* webpack-strip-code-block:end */

export { Components, Shared }
