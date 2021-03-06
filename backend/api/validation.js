module.exports = app => {    
    function existsOrError(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }
    
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    function notEqualsOrError(valueA, valueB, msg) {
        if(valueA === valueB) throw msg
    }

    function accountTypeOrError(valueA, valueB, valueC, msg) {
        if(valueA === valueC && valueB === valueC) throw msg
    }

    function updatePasswordError(id, value, msg) {
        if(!id) existsOrError(value, msg)
    }

    return { existsOrError, notExistsOrError, equalsOrError, notEqualsOrError, updatePasswordError, accountTypeOrError }
}