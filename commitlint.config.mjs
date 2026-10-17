export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'test', 'refactor', 'chore', 'docs', 'ci', 'build', 'perf'],
    ],
  },
}
