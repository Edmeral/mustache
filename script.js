// Displaying stream from the camera to page
const height = 640, width = 480
const video = document.querySelector('video')

const errCallback = e => console.log('Better luck next time!')
const successCallback = localMediaStream => {
  video.src  = window.URL.createObjectURL(localMediaStream)
  window.localMediaStream = localMediaStream
}

navigator.getUserMedia(
  { video: 
    { mandatory: { maxHeight: height, maxWidth: width } 
    },
    audio: false }, 
  successCallback, 
  errCallback
)

// taking a picture
const canvas = document.querySelector('canvas')
canvas.width = width
canvas.height = height
const ctx = canvas.getContext('2d')
const snapshot = (event) => {
  console.log(event.clientX, event.clientY)
  if (window.localMediaStream) {
    ctx.drawImage(video, 0, 0)
    // draw the vector image using ctx
    let x = event.clientX - video.offsetTop
    let y = event.clientY - video.offsetLeft + window.pageYOffset
    // ctx.strokeRect(x - 25, y - 25, 50, 50)

    let mustacheSVG = document.querySelector('#mustache')
    
    ctx.drawImage(mustacheSVG, x - mustacheSVG.width / 2, y - mustacheSVG.width / 2)

    let src = canvas.toDataURL('image/png')
    document.querySelector('img').src = src
    window.location.href = src // downloading
  }
}

document.querySelector('video').addEventListener('click', snapshot)
