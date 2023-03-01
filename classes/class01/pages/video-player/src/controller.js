export default class Controller {
    #view
    #service
    constructor({view, service}){
        this.#view = view
        this.#service = service

        this.#view.consfigureOnBtnClick(this.onBtnSart.bind(this))

    }

    static async initialize(deps) {
        const controller = new Controller (deps)
        controller.log('not yet detecting eye blink! clack in the button to start')
        return controller.init()
    }

    async init() {
        console.log('init')
    }

    log (text) {
        this.#view.log(`looger: ${text}`)
    }
    onBtnSart() {
        this.log('initializin detection')
    }
}