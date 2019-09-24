import waitForExpect from 'wait-for-expect'

function waitFor(thenTry, { wrapper, router, store }) {
  return new Promise((resolve, reject) => {
    try {
      waitForExpect(() => {
        thenTry({ wrapper, router, store })
      })
        .then(() => resolve({ wrapper, router, store }))
        .catch(e => {
          reject(e)
        })
    } catch (e) {
      reject(e)
    }
  })
}

export default thenTry => {
  return waitFor.bind(null, thenTry)
}
