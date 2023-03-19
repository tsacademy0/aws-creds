import { execa } from "execa";
import ora from "ora";

import setEnvVariables from "./setEnvVariables.js";

const spinner = ora({ text: "" });

const setCredentials = async (
  profileName,
  accessKeyId,
  secretAccessKey,
  sessionToken
) => {
  spinner.start(`Configuring AWS Credentials…\n`);

  if (profileName !== undefined) {
    await execa(`aws`, [
      `configure`,
      `set`,
      `aws_access_key_id`,
      accessKeyId,
      `--profile`,
      profileName,
    ]);
    await execa(`aws`, [
      `configure`,
      `set`,
      `aws_secret_access_key`,
      secretAccessKey,
      `--profile`,
      profileName,
    ]);

    if (sessionToken !== undefined) {
      await execa(`aws`, [
        `configure`,
        `set`,
        `aws_session_token`,
        sessionToken,
        `--profile`,
        profileName,
      ]);
    }
    spinner.succeed(`AWS Credentials configured!`);
  } else {
    let envVaribales = [
      "AWS_ACCESS_KEY_ID",
      accessKeyId,
      "AWS_SECRET_ACCESS_KEY",
      secretAccessKey,
    ];
    if (sessionToken !== undefined) {
      envVaribales.push("AWS_SESSION_TOKEN", sessionToken);
    }

    setEnvVariables(envVaribales);

    spinner.succeed(
      `AWS Credentials copied! Plese paste them in your terminal.`
    );
  }
};

export default setCredentials;
