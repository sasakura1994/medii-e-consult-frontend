"use strict";

module.exports = {
  meta: {
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
              if (value && !value.startsWith('http') && value !== '#') {
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