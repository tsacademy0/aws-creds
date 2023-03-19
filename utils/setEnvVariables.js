import setClipboard from "./setClipboard.js";

const setEnvVariables = async (envVaribales) => {
  let command = "";
  const noOfEnvVariables = envVaribales.length / 2;

  switch (process.platform) {
    case "win32":
      for (let i = 0; i < noOfEnvVariables; i++) {
        command += "setx ";
        command += `${envVaribales[i * 2]} ${envVaribales[i * 2 + 1]}`;
        if (i < noOfEnvVariables - 1) {
          command += " && ";
        }
      }
      setClipboard(command);
      break;

    case "darwin":
      for (let i = 0; i < noOfEnvVariables; i++) {
        command += "export ";
        command += `${envVaribales[i * 2]}=${envVaribales[i * 2 + 1]}`;
        if (i < noOfEnvVariables - 1) {
          command += " && ";
        }
      }
      setClipboard(command);
      break;

    default:
      for (let i = 0; i < noOfEnvVariables; i++) {
        command += `${envVaribales[i * 2]}=${envVaribales[i * 2 + 1]}`;
        if (i < noOfEnvVariables - 1) {
          command += " && ";
        }
      }
      setClipboard(command);
      break;
  }
};

export default setEnvVariables;
