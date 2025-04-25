const config = {
    types: [
      { value: 'feat', name: 'feat:     A new feature' },
      { value: 'fix', name: 'fix:      A bug fix' },
      { value: 'docs', name: 'docs:     Documentation only changes' },
      { value: 'style', name: 'style:    Code style changes (e.g., formatting, white-space)' },
      { value: 'refactor', name: 'refactor: Code changes that neither fix a bug nor add a feature' },
      { value: 'perf', name: 'perf:     Performance improvements' },
      { value: 'test', name: 'test:     Adding or modifying tests' },
      { value: 'chore', name: 'chore:    Miscellaneous changes' },
      { value: 'build', name: 'build:    Build system or external dependencies changes' },
      { value: 'ci', name: 'ci:       Continuous integration changes' }
    ],
    scopes: [],
    allowCustomScopes: false,
    allowBreakingChanges: ['feat', 'fix'],
    messages: {
      type: 'Select the type of change that you\'re committing:',
      file: 'Specify the file or component name that is being changed:',
      subject: 'Write a SHORT, description of the change (max 50 chars):', 
      body: 'Provide a LONGER description of the change (Press enter to skip this step):',
    },
    skipQuestions: ['breaking', 'footer'], // Skip unnecessary breaking and footer fields
};

export default config;
  