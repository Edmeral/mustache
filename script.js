const errCallback = e => console.log('Better luck next time!')
const successCallback = localMediaStream => {
  let video = document.querySelector('video')
  video.src  = window.URL.createObjectURL(localMediaStream)
}

navigator.getUserMedia(
  { video: true, audio: true }, 
  successCallback, 
  errCallback
)

