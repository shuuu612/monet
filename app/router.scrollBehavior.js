export default function (to, from, savedPosition) {
  if (savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(savedPosition)
      })
    })
  } else {
    return { x: 0, y: 0 }
  }
}