/* eslint-disable no-param-reassign */
function To90 (self) {
  let timer
  timer = setInterval(() => {
    if (self.num >= 90) {
      clearInterval(timer)
      timer = null
      return
    }
    self.num += 1
  }, 60)
}

function To100 (self) {
  let timer
  timer = setInterval(() => {
    if (self.num >= 100) {
      clearInterval(timer)
      timer = null
      return
    }
    self.num += 1
  }, 200)
}

function loading (self) {
  To90(self)
  To100(self)
}

export default loading
