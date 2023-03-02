function supportWorkerType() {
    let supports = false
    const tester = {
        get type() {supports = true}
    }

    try {
        new Worker ('blob://', {type :'module'}).terminate()
        
    } finally{
        return supports
    }
        
}

export{
    supportWorkerType
}