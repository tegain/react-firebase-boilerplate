import React from 'react'
import { shallow } from 'enzyme'
import { AppHeader } from '../../components/AppHeader'

/**
 * Creats a snapshot of the component (logging the rendered component into a file),
 * then, when re-testing it, compares it to the snapshot version.
 * We can then choose to correct the mistakes, or update the snapshot version (pressing 'u')
 */
// test('should render AppHeader correctly using react-test-renderer/shallow', () => {
// 	const renderer = new ReactShallowRenderer
// 	renderer.render(<AppHeader />)
// 	expect(renderer.getRenderOutput()).toMatchSnapshot()
// 	console.log(renderer.getRenderOutput())
// })

test('should render <AppHeader /> correctly', () => {
	const wrapper = shallow(<AppHeader startLogout={() => {}} />)
	expect(wrapper).toMatchSnapshot()
})

test('should call startLogout on button click', () => {
	const startLogout = jest.fn()
	const wrapper = shallow(<AppHeader startLogout={startLogout} />)

	wrapper.find('button').simulate('click')
	expect(startLogout).toHaveBeenCalled()
})