import clipboard from "clipboardy";

const setClipboard = (text) => {
  clipboard.writeSync(text);
};

export default setClipboard;
