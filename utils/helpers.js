module.exports = {
    formatDate: (date) => {
        return date.toLocaleDateString()
    },
    compareID: (value1, value2, options) => {
        if (value1 == value2) {
            return options.fn(this)
        } else {
            return
        }
    }
}