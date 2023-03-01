export default class View {
    #btnInit = document.querySelector('#init')
    #statusElement = document.querySelector('#status')
    

    anableButton(){
        this.#btnInit.disabled = false
    }

    consfigureOnBtnClick(fn) {
        this.#btnInit.addEventListener('click' . fn)
    }

    log(text) {
       this.#statusElement.innerHTML = text 
    }
}