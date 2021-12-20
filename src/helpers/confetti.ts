/* eslint-disable */
export default class ConfettiService {
  initialized = false
  confetti = require('canvas-confetti')
  confettiCanvas: any
  confettiClass: any
  parentElement: any

  constructor(parentElement: HTMLDivElement) {
    this.create(parentElement)
  }

  destroy() {
    if (this.confettiClass) {
      this.parentElement.querySelectorAll('.canvas-confetti').forEach((el: HTMLDivElement) => {
        this.parentElement.removeChild(el)
      })
      this.confettiClass.reset()
      this.confettiClass = null
      this.confettiCanvas = null
      this.parentElement = null
    }
  }

  private create(parentElement: HTMLDivElement) {
    if (!this.confettiClass) {
      this.parentElement = parentElement
      this.confettiCanvas = document.createElement('canvas')
      this.confettiCanvas.classList.add('canvas-confetti')
      this.confettiCanvas.style.position = 'fixed'
      this.confettiCanvas.style.pointerEvents = 'none'
      this.confettiCanvas.style.width = '100%'
      this.confettiCanvas.style.height = '100%'
      this.confettiCanvas.style.left = '0'
      this.confettiCanvas.style.top = '0'
      this.parentElement.appendChild(this.confettiCanvas)
      this.confettiClass = this.confetti.create(this.confettiCanvas, {
        resize: true,
        useWorker: true,
      })
    } else {
      console.log('ConfettiService: already initialized')
    }
  }

  celebrate(style?: any) {
    let opts = {
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
    }
    // other options can be inserted here
    this.confettiClass(opts)
  }
}
