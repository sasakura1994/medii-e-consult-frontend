"use strict";

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Unrecommend using URL() in attribute properties",
    },
  },
  create: context => {
    return {
      JSXAttribute: (node) => {
        if (node.value) {
          // className属性にurl()が含まれている場合
          if (node.name.name === "className"
            && node.value.type === "Literal"
            && typeof node.value.value === "string"
            && node.value.value.includes("url(")) {
            context.report({
              node,
              message: 'className要素へのurl()の指定は外部ドメイン展開時に表示されない可能性があります。imgタグなどによるレイアウトの修正を検討してください。',
            });
          }
          // style属性にurl()が含まれている場合
          if (node.name.name === "style"
            && node.value.type === "JSXExpressionContainer") {
            const styleObject = node.value.expression;
            if (styleObject.type === "ObjectExpression") {
              styleObject.properties.forEach((prop) => {
                if (prop.key
                  && prop.key.type === "Identifier"
                  && prop.key.name === "backgroundImage") {
                  if (prop.value && prop.value.type === "Literal"
                    && typeof prop.value.value === "string"
                    && prop.value.value.includes("url(")) {
                    context.report({
                      node,
                      message: 'style要素へのurl()の指定は外部ドメイン展開時に表示されない可能性があります。imgタグなどによるレイアウトの修正を検討してください。',
                    });
                  }
                }
              });
            }
          }
        }
      }
    };
  }
};
