export const expectBySelector = (wrapper, selector) => {
  const result = wrapper.find(selector)

  expect(result.element).toBeTruthy()

  return result
}

export const expectByTestId = (wrapper, dataTestId) => {
  return expectBySelector(wrapper, `[data-testid="${dataTestId}"]`)
}
