const { parse } = require("postcss-values-parser");
const {
  createPlugin,
  utils: { report, validateOptions },
} = require("stylelint");

const createRuleMessages = require("../../utils/createRuleMessages");
const getClosest = require("../../utils/getClosest");
const getValue = require("../../utils/getValue");
const hasNumericScale = require("../../utils/hasNumericScale");
const isOnNumericScale = require("../../utils/isOnNumericScale");
const setValue = require("../../utils/setValue");

const ruleName = "scales/z-indices";
const messages = createRuleMessages(ruleName);

const propertyFilter = "z-index";

const rule = (primary, secondary, { fix }) => {
  return (root, result) => {
    if (
      !validateOptions(result, ruleName, {
        actual: primary,
        possible: hasNumericScale,
      })
    )
      return;

    root.walkDecls(propertyFilter, (decl) => {
      const value = getValue(decl);
      let hasFix = false;

      const valueRoot = parse(value, {
        ignoreUnknownWords: true,
      });

      valueRoot.walkNumerics((node) => {
        check(node);
      });

      function check(node) {
        const { value, unit } = node;

        if (unit) return;

        if (isOnNumericScale(primary, value)) return;

        if (fix) {
          node.value = getClosest(primary, value);
          hasFix = true;
          return;
        }

        report({
          message: messages.expected(value, primary.join(", ")),
          node: decl,
          result,
          ruleName,
          word: value,
        });
      }

      if (hasFix) setValue(decl, valueRoot.toString());
    });
  };
};

rule.primaryOptionArray = true;

module.exports = createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
