import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vitest from '@vitest/eslint-plugin';

export default [
    {
        files: ['*.ts'],
        plugins: {
            '@typescript-eslint': ts
        },
        languageOptions: {
            parser: tsParser
        },
        rules: {
            ...ts.configs['eslint-recommended'].overrides[0].rules,
            ...ts.configs['recommended'].rules
        }
    },
    {
        files: ['**/*.test.ts', '**/*.spec.ts'],
        plugins: {
            vitest
        },
        rules: {
            ...vitest.configs.recommended.rules,
            '@typescript-eslint/unbound-method': 'off'
        }
    }
];
