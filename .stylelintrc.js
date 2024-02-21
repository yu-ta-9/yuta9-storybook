module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-rscss/config', 'stylelint-config-recess-order'],
  rules: {
    'string-quotes': 'single',
    'no-empty-source': true,
    'selector-pseudo-element-no-unknown': true,
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'property-no-unknown': true,
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': [
      '',
      {
        resolveNestedSelectors: true,
      },
    ],
    'max-nesting-depth': [
      2,
      {
        ignore: ['pseudo-classes'],
        ignoreAtRules: ['include'],
      },
    ],
  },
};
