// ページトップに移動
const moveTop = () => {
  window.scrollTo ({
    top: 0,
    behavior: "smooth"
  })
}

export default(context, inject) => {
  inject('moveTop', moveTop)
}
