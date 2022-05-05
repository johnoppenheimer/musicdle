module.exports = { // eslint-disable-line unicorn/prefer-module
	extends: 'xo-react',
	ignores: [
		'./next-env.d.ts',
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/function-component-definition': ['error', {namedComponents: 'arrow-function'}],
	},
};
