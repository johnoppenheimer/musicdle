module.exports = {
	extends: 'xo-react',
	ignores: [
		'./next-env.d.ts',
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/function-component-definition': ['error', {namedComponents: 'arrow-function'}],
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
