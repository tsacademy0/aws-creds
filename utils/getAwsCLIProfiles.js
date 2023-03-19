import { homedir } from "os";
import { join } from "path";
import { existsSync, createReadStream } from "fs";
import { createInterface } from "readline";

import chalk from "chalk";

const getAwsCLIProfiles = async () => {
  const awsConfigurationProfilesPath = join(homedir(), ".aws", "credentials");
  const profiles = [];

  return new Promise((resolve, reject) => {
    if (!existsSync(awsConfigurationProfilesPath)) {
      reject(
        Error(
          `Not able to find the credentials file at path ${chalk.bold.yellow(
            awsConfigurationProfilesPath
          )}`
        )
      );
    } else {
      const lineReader = createInterface(
        createReadStream(awsConfigurationProfilesPath)
      );

      lineReader.on("line", (line) => {
        const isProfile = line.match(/(?<=\[)([a-zA-Z0-9-]+)/);
        const [profile] =
          isProfile !== null && isProfile !== undefined ? isProfile : [];

        if (profile) {
          profiles.push(profile);
        }
      });

      lineReader.on("close", () => resolve(profiles));
    }
  });
};

export default getAwsCLIProfiles;
