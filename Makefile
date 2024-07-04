install:
	npm install
reset:
	rm -rf out/

# Output Directories
out/:
	mkdir out/
out/lib/: out/
	mkdir out/lib/

# Prebuilds
_build-lib-reset:
	rm -rf out/lib/
_build-lib: _build-lib-reset out/lib/
	cp backend/test/api.js out/lib/api.js

_build-styles-reset:
	rm -rf out/styles/
_build-styles-sass: _build-styles-reset
	npm run _build-styles
_build-styles-tests: _build-styles-sass
	npm run _build-styles-tests
_build-styles-dump:
	mv styles/out/ out/styles/

# Builders
build-lib: _build-lib
build-styles: out/ _build-styles-sass _build-styles-dump
build-styles-tests: out/ _build-styles-tests _build-styles-dump

# Development
styles-dev: build-styles-tests
	npm run _styles-dev
backend-dev:
	npm run _backend-dev

# Test
test-backend:
	npm run _test-backend