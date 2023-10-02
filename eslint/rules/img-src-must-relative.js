"use strict";

module.exports = {
  meta: {
    // type (string) indicates the type of rule, which is one of "problem", "suggestion", or "layout":
    type: "problem",
    docs: {
      description: "img src must be relative",
    },
  },
  create: context => {
    return {
      JSXOpeningElement: (node) => {
        if (node.name.name === 'img') {
          node.attributes.forEach((attr) => {
            if (attr.name.name === 'src') {
              const value = attr.value.value;
              if (value && value.startsWith('/')) {
                context.report({
                  node: attr,
                  message: '外部連携で<base>タグを指定しているため、"/"を削除してください',
                });
              }
            }
          });
        }
      },
    };
  },
};