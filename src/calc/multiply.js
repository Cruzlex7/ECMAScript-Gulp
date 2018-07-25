import 'add.js'

let substract = (x = 0, y = 0) => {
    let result = x
    for (let index = 0; index <= y ; index++) {        
        result += y
    }
    return result
}