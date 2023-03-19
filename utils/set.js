import setQuestions from "./setQuestions.js";
import setCredentials from "./setCredentials.js";

const set = async () => {
  const { profileName, accessKeyId, secretAccessKey, sessionToken } =
    await setQuestions();

  await setCredentials(profileName, accessKeyId, secretAccessKey, sessionToken);
};

export default set;
