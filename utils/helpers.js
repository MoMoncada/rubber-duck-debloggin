module.exports = { 
    format_date: date => {
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`
        }

        return word;
    }
}