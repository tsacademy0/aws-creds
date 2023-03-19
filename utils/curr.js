import { execa } from "execa";
import ora from "ora";
import chalk from "chalk";

const spinner = ora({ text: "" });

const curr = async (profile) => {
  spinner.start(`Fetching AWS Credentials…\n`);

  let curr_creds;

  try {
    if (profile !== undefined) {
      curr_creds = await execa(`aws`, [
        `sts`,
        `get-caller-identity`,
        `--profile`,
        profile,
        `--debug`,
      ]);
    } else {
      curr_creds = await execa(`aws`, [
        `sts`,
        `get-caller-identity`,
        `--debug`,
      ]);
    }

    spinner.succeed(`AWS Credentials fetched!\n`);

    let creds_source;

    if (
      curr_creds.stderr.search(
        /Looking for credentials via: shared-credentials-file/
      ) !== -1
    ) {
      creds_source = "shared-credentials-file i.e. .aws/credentials file";
    } else if (
      curr_creds.stderr.search(/Looking for credentials via: sso/) !== -1
    ) {
      creds_source = "AWS SSO";
    } else if (
      curr_creds.stderr.search(
        /Looking for credentials via: assume-role-with-web-identity/
      ) !== -1
    ) {
      creds_source = "assume-role-with-web-identity STS API";
    } else if (
      curr_creds.stderr.search(/Looking for credentials via: assume-role/) !==
      -1
    ) {
      creds_source = "assume-role STS API";
    } else if (
      curr_creds.stderr.search(/Looking for credentials via: env/) !== -1
    ) {
      creds_source = "Environment Variables";
    } else {
      creds_source = "No Credentials Found!!";
    }

    let cred_details = JSON.parse(curr_creds.stdout);

    if (creds_source === "No Credentials Found!!") {
      console.log(chalk.bold.red(creds_source));
    } else {
      console.log(chalk.bold.yellow("Credentials Source: "), creds_source);
      console.log(
        chalk.bold.yellow("AWS Account:        "),
        cred_details.Account
      );
      console.log(
        chalk.bold.yellow("IAM Entity ARN:     "),
        cred_details.Arn,
        "\n"
      );
    }
  } catch (error) {
    const errorLog = error.stderr.split("\n").pop();
    spinner.fail(`${chalk.bold.red("Error:")} ${errorLog}`);
  }
};

export default curr;
