function supportWorkerType() {
    let supoports = false
    const tester = {
        get type() {supoports = true}
    }

    try {
        new Worker ('blob://', {type :'module'}).terminate()
        
    } finally{
        return supoports
    }
        
}

export{
    supportWorkerType
}