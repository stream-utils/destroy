BIN = ./node_modules/.bin/

test:
	@${BIN}mocha \
		--require should \
		--reporter spec

clean:
	@rm -rf node_modules

.PHONY: test