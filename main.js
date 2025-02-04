class AFDC {
  #videoWidth = 640;
  #videoHeight = null;
  #mainElementId = null;
  #mainElement = null;
  #displayWrapper = null;
  #videoElement = null;
  #canvasElement = null;
  #canvasContext = null;
  #startButton = null;
  #captureButton = null;
  #clearButton = null;

  constructor(mainElementId) {
    this.#mainElementId = mainElementId;
    this.#mainElement = document.getElementById(
      this.#mainElementId
    );
  }

  #buildSkeleton() {
    this.#videoElement = document.createElement('video');
    this.#videoElement.addEventListener(
      "canplay",
      (event) => {
       // if (!streaming) {
          this.#videoHeight = (this.#videoElement.videoHeight / this.#videoElement.videoWidth) * this.#videoWidth;

          this.#videoElement.setAttribute("width", this.#videoWidth);
          this.#videoElement.setAttribute("height", this.#videoHeight);
          this.#canvasElement.setAttribute("width", this.#videoWidth);
          this.#canvasElement.setAttribute("height", this.#videoHeight);
          //streaming = true;
      //  }
      },
      false,
    );
    this.#displayWrapper = document.createElement('div');
    this.#displayWrapper.classList.add('display-wrapper');
    this.#canvasElement = document.createElement('canvas');
    this.#canvasContext = this.#canvasElement.getContext("2d");
    this.#startButton = document.createElement('button');
    this.#startButton.innerText = 'start';
    this.#startButton.addEventListener('click', () => {this.#startCamera()});
    this.#captureButton = document.createElement('button');
    this.#captureButton.innerText = 'capture';
    this.#captureButton.addEventListener('click', () => {this.#capture()});
    this.#clearButton = document.createElement('button');
    this.#clearButton.innerText = 'capture';
    this.#clearButton.addEventListener('click', () => {this.#clearCapture()});
    this.#mainElement.appendChild(this.#captureButton);
    this.#mainElement.appendChild(this.#clearButton);
    this.#displayWrapper.appendChild(this.#videoElement);
    this.#displayWrapper.appendChild(this.#canvasElement);
    this.#mainElement.appendChild(this.#displayWrapper);
    this.#mainElement.appendChild(this.#startButton);
  }
  
  #getCamera() {
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      this.#videoElement.srcObject = stream;
      this.#videoElement.play();
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });
  }

  #startCamera() {
    this.#getCamera();
  }

  #capture() {
    if (this.#videoWidth && this.#videoHeight) {
      this.#canvasElement.width = this.#videoWidth;
      this.#canvasElement.height = this.#videoHeight;
      this.#canvasContext.drawImage(
        this.#videoElement,
        0,
        0,
        this.#videoWidth,
        this.#videoHeight
      );

      const data = this.#canvasElement.toDataURL("image/png");
      //photo.setAttribute("src", data);
    } else {
      //clearPhoto();
    } 
  }

  #clearCapture() {
    this.#canvasContext.clearRect(
      0,
      0,
      this.#canvasElement.width,
      this.#canvasElement.height
    );

    //const data = canvas.toDataURL("image/png");
    //photo.setAttribute("src", data);
  }

  initialize() {
    this.#buildSkeleton();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const afdcInstance = new AFDC('main');
  afdcInstance.initialize();
});
