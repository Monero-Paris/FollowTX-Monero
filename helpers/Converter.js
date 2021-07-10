const Converter = {
    xmrToAtomicUnits(number) {
        return number * 1_000_000_000_000
    },

    atomicUnitsToXmr(number) {
        return (number / 1_000_000_000_000).toFixed(12)
    }
}

module.exports = Converter