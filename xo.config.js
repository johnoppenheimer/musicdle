module.exports = {
	extends: 'xo-react',
	ignores: [
		'./next-env.d.ts',
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/function-component-definition': ['error', {namedComponents: 'arrow-function'}],
		'node/prefer-global/process': ['error', 'always'],
	},
	overrides: [
		{
			files: './**/*.config.js',
			rules: {
				'unicorn/prefer-module': 'off',
			},
		},
	],
};
