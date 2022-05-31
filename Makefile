install:
	npm ci
publish:
	npm publish --dry-run
link:
	npm link
lint:
	npx eslint .
test:
	npx jest
test-coverage:
	npx jest --coverage