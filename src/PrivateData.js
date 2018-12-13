// import Validator from "./Validator";

class PrivateData {
  _data = {
    name: null,
    address: {
      full: null,
      postCode: null,
      province: null
    },
    phone: null,
    gender: null,
    ageRange: []
  };

  set name(name) {
    if (typeof name !== "string") {
      throw new Error("Name must be string, " + typeof name + " given.");
    }
    const notEmptyValidator = {
      validator: value => value !== "" || value !== " ",
      description: "Name must not be empty"
    };
    const regexValidator = {
      validator: v => v !== " " && /^[a-zA-Z ก-๙]+$/g.test(name),
      description: "Name must be a-z, A-Z, ก-๙ with/without space"
    };
    const validators = [notEmptyValidator, regexValidator];

    this._setData("name", name.trim(), validators);
  }

  _setData(key, data, validatorObjs = []) {
    let validatedData;

    if (Array.isArray(validatorObjs)) {
      validatedData = validatorObjs.reduce(
        (d, { test, describe, replacer }) => {
          let validatedData;

          if (typeof test === "string") {
            validatedData = Validator.getValidator(test, replacer)(d);
          } else {
            validatedData = Validator.createValidator(test, describe)(replacer)(
              d
            );
          }

          return validatedData;
        },
        data
      );
    } else {
      validatedData = this._validate(data, validatorObj);
    }

    this._data[key] = validatedData;
  }

  _validate(data, { validator, description }) {
    if (
      typeof validator === "undefined" ||
      typeof description === "undefined"
    ) {
      throw new Error("No validator or description given.");
    }

    if (!validator(data)) {
      throw new Error("Invalid data given: " + description);
    }

    return data;
  }
}
