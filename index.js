#!/usr/bin/env node

import cli from "./utils/cli.js";
import log from "./utils/log.js";

import set from "./utils/set.js";
import curr from "./utils/curr.js";

const input = cli.input;
const flags = cli.flags;
const { debug } = flags;

(async () => {
  try {
    input.includes("help") && cli.showHelp(0);
    debug && log(flags);

    if (input.includes("set")) {
      await set();
    } else if (input.includes("curr")) {
      await curr(flags.profile);
    }
  } catch (err) {
    console.log(err, err.stack);
  }
})();
