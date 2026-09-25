module.exports = [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                document: 'readonly',
                console: 'readonly',
                fetch: 'readonly'
            }
        },
        rules: {
            'semi': ['error', 'always'],
            'quotes': ['error', 'single']
        }
    }
];