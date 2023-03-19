import meow from "meow";
import meowHelp from "cli-meow-help";

const commands = {
  set: { desc: `Setup AWS credentials` },
  curr: { desc: `View currently active/used credentials` },
  help: { desc: `Print help info` },
};

const flags = {
  version: {
    type: `boolean`,
    alias: `v`,
    desc: `Print CLI version`,
  },
  clear: {
    type: `boolean`,
    default: false,
    alias: `c`,
    desc: `Clear the console`,
  },
  debug: {
    type: `boolean`,
    default: false,
    alias: `d`,
    desc: `Print debug info`,
  },
};

const helpText = meowHelp({
  name: `aws-creds`,
  flags,
  commands,
  defaults: false,
});

export default meow(helpText, { importMeta: import.meta, flags });
