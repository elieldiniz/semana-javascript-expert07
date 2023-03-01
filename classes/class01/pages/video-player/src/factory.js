import Camera from "../../../lib/shared/camera.js"
import { supportWorkerType } from "../../../lib/shared/util.js"
import controller from "./controller.js"
import Service from "./service.js"
import View from "./views.js"


async function getWorker(){
  if (supportWorkerType()) {

    console.log('supora!')

    const worker = new worker('./src/worker.js', {type: 'module'})
    return worker

  }

  const workerMork = {
    async postMessage() {},
    onmessage(msg) {}
  }

  console.log('nao suporta')
  return workerMork
}

const worker = await getWorker()
worker.postMessage('hey from factory')


const [rootPath] = window.location.href.split('/pages/')
const camera = await  Camera.init()
const factory = {
  async initalize() {
    return controller.initialize({
         view: new View({}),
        service: new Service({

      })
    })
  }
}

export default factory