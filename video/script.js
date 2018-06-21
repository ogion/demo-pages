const text = document.createElement('h1')
document.body.appendChild(text)
text.innerHTML = ''
const button = document.createElement('button')
document.body.appendChild(button)
button.style = "width: 100px;height: 100px;"
button.addEventListener('click', () => {
  const v = document.createElement('video')
  document.body.appendChild(v)
  v.style = 'width: 300px;height:250px'
  v.src = 'https://cdn.vidible.tv/prod/2016-10/05/57f4ef5744c8a309a7283b69_v1.orig.mp4'
  v.load()
  v.muted = true
  const date = new Date()
  v.addEventListener('playing', () => {
    const d = (new Date() - date)
    text.innerHTML += "Playing: " + d + '<br>'
  })
  let impFired = false
  v.addEventListener('play', () => {
    const d = (new Date() - date)
    text.innerHTML += "Play: " + d + '<br>'
  })
  v.addEventListener('seeked', () => {
    const d = (new Date() - date)
    text.innerHTML += "Seeked: " + d + '<br>'
  })
  v.addEventListener('timeupdate', () => {
    if (!impFired && v.currentTime > 0) {
      impFired = true
      const d = (new Date() - date)
      text.innerHTML += "Y! imp: " + d + '<br>'
    }
  })
  v.play()
})
