# Defining shell is necessary in order to modify PATH
SHELL := sh
bin := node_modules/.bin/
export PATH := $(bin):$(PATH)

testflags :=

# Since this is the first target, this will be what Make will run when invoked without any arguments
all: install

# In layman's terms: node_modules directory depends on the state of package.json
# Make will compare their timestamps and only if package.json is newer, it will run this target.
node_modules: package.json
	npm install && touch node_modules

install: node_modules

lint: install
	eslint --report-unused-disable-directives --ext .js .

test: install
	NODE_ENV=test LOG_LEVEL=error mocha $(testFlags) "./test/**/*.spec.js"

run:
	node ./src/index.js

# watch: install
# 	nodemon --watch src --ext ts,js,gql --exec make run-ts-node

# coverage: install
# 	NODE_ENV=test nyc mocha $(testFlags) "./test/**/*.spec.js"

# migrate-test: install
# 	ts-node $(bin)typeorm --connection test migration:run

migrate: install
	$(bin)knex migrate:latest --debug

migrate-down: install
	$(bin)knex migrate:rollback

seed: install
	$(bin)knex seed:run

clean:
	rm -rf ./.nyc_output
	rm -rf ./coverage

# persist: install
# 	persistgraphql ./queries ./src/persisted-queries.json --add_typename

.PHONY: coverage
