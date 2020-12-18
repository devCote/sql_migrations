/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pmg.sql(`
    ALTER TABLE comments
    RENAME COLUMN contents TO body;
  `);
};

exports.down = (pgm) => {
  pmg.sql(`
    ALTER TABLE comments
    RENAME COLUMN body TO contents;
  `);
};
