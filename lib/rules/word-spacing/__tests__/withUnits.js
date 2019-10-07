const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [[1, 2], { unit: "rem" }],

  accept: [
    {
      code: "a { word-spacing: 1rem; }",
      description: "Value on scale"
    },
    {
      code: "a { width: 3px; }",
      description: "Ignored property"
    },
    {
      code: "a { word-spacing: 3vh; }",
      description: "Ignored unit"
    }
  ],

  reject: [
    {
      code: "a { word-spacing: 3rem }",
      message: messages.expected("3", "1, 2"),
      line: 1,
      column: 19,
      description: "Value off scale"
    },
    {
      code: "a { word-spacing: 2px }",
      message: messages.expected("px", "rem"),
      line: 1,
      column: 19,
      description: "Value off unit scale"
    }
  ]
});