module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
		// 'plugin:react-hooks/recommended' not installed
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'keyword-spacing': [
			'error',
			{ 'before': true, 'after': true }
		],
		'func-call-spacing': [
			'error',
			'never'
		],
		'space-before-function-paren': [
			'error',
			'always'
		],
		'eol-last': [
			'error',
			'always'
		],
		'comma-dangle': [
			'error',
			'never'
		],
		'no-trailing-spaces': 'error',
		'no-unused-vars': 'warn',
		// React
		'react/prop-types': 0
	}
}
