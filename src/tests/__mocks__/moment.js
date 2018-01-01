// @doc https://facebook.github.io/jest/docs/en/manual-mocks.html#content
const moment = require.requireActual('moment')

// Mock the moment function
export default (timestamp = 0) => {
	return moment(timestamp)
}