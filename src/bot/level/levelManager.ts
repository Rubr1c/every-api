import { TimeoutManager } from "../utils/timeoutManager";

export const userLevelTimeouts = new TimeoutManager<string>(5000);
