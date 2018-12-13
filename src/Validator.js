class Validator {
  static validators = {
    isString: {
      test: value => typeof value === "string",
      describe: ({ name }) => (name ? name : "Value") + " must be string"
    },
    isNumber: {
      test: value => typeof value === "number",
      describe: ({ name }) => (name ? name : "Value") + " must be number"
    },
    beBoolean: {
      test: value => typeof value === "boolean",
      describe: ({ name }) => (name ? name : "Value") + " must be boolean"
    },
    beArray: {
      test: value => Array.isArray(value),
      describe: ({ name }) => (name ? name : "Value") + " must be array"
    },
    notEmpty: {
      test: value => value !== "" || value !== " ",
      describe: ({ name }) => (name ? name : "Value") + " must not be empty"
    },
    regex: {
      test: (regex, value) => regex.test(Validator.get("isString")())
    }
  };

  static isString(data) {
    const { isString } = Validator.validators;

    return Validator.createValidator(
      isString.test,
      () => "Value must be string, " + typeof data + " given."
    )()(data);
  }

  static pipe(...validators) {
    return replacer => data =>
      validators.reduce((d, validator) => validator(replacer)(d), data);
  }

  static get(type, replacer) {
    const { test, describe } = Validator.validators[type];

    return Validator.createValidator(test, describe)(replacer);
  }

  static createValidator(test, describe) {
    return replacer => data => {
      if (!test(data)) {
        throw new TypeError(describe(replacer));
      }

      return data;
    };
  }
}
