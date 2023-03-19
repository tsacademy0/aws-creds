import ask from "./ask.js";
import getAwsCLIProfiles from "./getAwsCLIProfiles.js";

const setQuestions = async () => {
  const tempOrLongTerm = await ask({
    type: "select",
    name: `TempOrLongTerm`,
    message: `Select the type of Credentials you want to set:`,
    choices: ["Temporary", "Long-Term"],
  });

  const profileOrEnv = await ask({
    type: "select",
    name: `ProfileOrEnv`,
    message: `Store the Credentials in an AWS CLI Profile or Environment Variables:`,
    choices: ["Profile", "Environment Variables"],
  });

  if (profileOrEnv === "Profile") {
    const newProfileOrNot = await ask({
      type: "select",
      name: `NewProfileOrNot`,
      message: `Create a new AWS CLI Profile or overwrite an existing one:`,
      choices: ["New", "Existing"],
    });

    let profileName = "";

    if (newProfileOrNot === "New") {
      profileName = await ask({
        type: "input",
        name: `profileName`,
        message: `Enter the name of the AWS CLI Profile you want to create:`,
      });
    } else if (newProfileOrNot === "Existing") {
      const profiles = await getAwsCLIProfiles();

      profileName = await ask({
        type: "select",
        name: `profileName`,
        message: `Enter the name of the AWS CLI Profile you want to overwrite:`,
        choices: profiles,
      });
    }

    const accessKeyId = await ask({
      type: "input",
      name: `sourceAccessKeyId`,
      message: `Enter the source AWS Access Key ID:`,
    });

    const secretAccessKey = await ask({
      type: "input",
      name: `sourceSecretAccessKey`,
      message: `Enter the source AWS Secret Access Key:`,
    });

    if (tempOrLongTerm === "Temporary") {
      const sessionToken = await ask({
        type: "input",
        name: `sessionToken`,
        message: `Enter the source AWS Session Token (optional):`,
      });

      return {
        profileName,
        accessKeyId,
        secretAccessKey,
        sessionToken,
      };
    }

    return {
      profileName,
      accessKeyId,
      secretAccessKey,
    };
  } else if (profileOrEnv === "Environment Variables") {
    // check if env varibale are set or not
    // No Creds or Overwrite

    const accessKeyId = await ask({
      type: "input",
      name: `sourceAccessKeyId`,
      message: `Enter the source AWS Access Key ID:`,
    });

    const secretAccessKey = await ask({
      type: "input",
      name: `sourceSecretAccessKey`,
      message: `Enter the source AWS Secret Access Key:`,
    });

    if (tempOrLongTerm === "Temporary") {
      const sessionToken = await ask({
        type: "input",
        name: `sessionToken`,
        message: `Enter the source AWS Session Token (optional):`,
      });

      return {
        accessKeyId,
        secretAccessKey,
        sessionToken,
      };
    }

    return {
      accessKeyId,
      secretAccessKey,
    };
  }
};

export default setQuestions;
