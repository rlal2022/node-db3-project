/* eslint-disable */

const Schema = require("./scheme-model");
const db = require("../../data/db-config");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
async function checkSchemeId(req, res, next) {
  const schemaId = await db("schema").where("id", req.params.id).first();
  if (!schemaId) {
    next({
      status: 404,
      message: `scheme with scheme_id ${req.params.id} not found`,
    });
  } else {
    req.schema = schema;
    next();
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/

const validateScheme = (req, res, next) => {
  const { schema_name } = req.body;
  if (!schema_name || schema_name.length < 0) {
    next({ status: 400, message: "invalid schema_name" });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/

const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if (
    !instructions ||
    instructions.length < 0 ||
    instructions.typeof !== "string" ||
    step_number.typeof !== "number" ||
    step_number < 1
  ) {
    next({ status: 400, message: "invalid step" });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
