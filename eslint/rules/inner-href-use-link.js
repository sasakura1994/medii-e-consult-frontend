"use strict";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    // type (string) indicates the type of rule, which is one of "problem", "suggestion", or "layout":
    type: "problem",
    docs: {
      description: "inner link use <Link> tag",
    },
  },
  create: context => {
    return {
      JSXOpeningElement: (node) => {
        if (node.name.name === 'a') {
          node.attributes.forEach((attr) => {
            if (attr.name.name === 'href') {
              const value = attr.value.value;
              if (value && !value.startsWith('http')) {
                context.report({
                  node: attr,
                  message: '外部連携でbasePathを指定しているため、内部ページへのリンクには<Link>タグを利用してください',
                });
              }
            }
          });
        }
      },
    };
  },
};