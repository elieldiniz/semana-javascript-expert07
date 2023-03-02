import Camera from "../../../lib/shared/camera.js"
import { supportWorkerType } from "../../../lib/shared/util.js"
import controller from "./controller.js"
import Service from "./service.js"
import View from "./views.js"


async function getWorker(){
  if (supportWorkerType()) {

    console.log('initalizing esm workers!')

    const worker = new worker('./src/worker.js', {type: 'module'})
    return worker

  }

  console.warn(`your browser doesn't support esm on webworkers`)
  console.warn(`import libraries...`)
 await import ("https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js")
 await import ("https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js")
 await import ("https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js")
 await import ("https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js")

 console.warn(`using worker mock instead!`)

 const service = new Service({faceLandmarksDetection: window.faceLandmarksDetection})




  const workerMork = {
    async postMessage(video) {
      const blinked = await service.handBlinked(video)
      if(!blinked) return;
      workerMork.onmessage({data: {blinked}})
    },

    //vai ser sobreescrito pela controller
    onmessage(msg) {}
  }

  console.log('loading tf modol...')
  await service.loadModel()
  console.log('tf model loader...')

  setTimeout(() => worker.onmessage({data: 'READY'}),500);
  return workerMork

  }



const worker = await getWorker()

const [rootPath] = window.location.href.split('/pages/')
const camera = await  Camera.init()
const factory = {
  async initalize() {
    return controller.initialize({
         view: new View(),
      
        worker: worker,

        camera

    })
  }
}

export default factory