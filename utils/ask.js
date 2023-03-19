// import { homedir } from "os";
import { existsSync } from "fs";
// import { join } from "path";
import enquirer from "enquirer";
import { to } from "await-to-js";
import handleError from "cli-handle-error";
// import Store from "data-store";

import shouldCancel from "./shouldCancel.js";

export default async ({ type, name, message, choices, hint, initial }) => {
  // let history = false;
  // if (
  //   !initial &&
  //   name !== `name` &&
  //   name !== `command` &&
  //   name !== `description`
  // ) {
  //   history = {
  //     autosave: true,
  //     store: new Store({
  //       path: join(homedir(), `.history/aws-creds/${name}.json`),
  //     }),
  //   };
  // }

  if (type === "select") {
    const [selectErr, selectResponse] = await to(
      new enquirer.Select({
        name,
        message,
        choices,
      })
        .on(`cancel`, () => shouldCancel())
        .run()
    );
    handleError(`SELECT`, selectErr);

    return selectResponse;
  } else if (type === "input") {
    const [inputErr, inputResponse] = await to(
      new enquirer.Input({
        name,
        message,
        hint,
        initial,
        // history,
        validate(value, state) {
          if (state && state.name === `command`) return true;
          if (state && state.name === `name`) {
            if (existsSync(value)) {
              return `Directory already exists: ./${value}`;
            } else {
              return true;
            }
          }
          return !value ? `Please add a value.` : true;
        },
      })
        .on(`cancel`, () => shouldCancel())
        .run()
    );
    handleError(`INPUT`, inputErr);
    return inputResponse;
  }
};
