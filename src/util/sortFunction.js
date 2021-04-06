const sortFunction = (arraySort) => arraySort.sort((a, b) => {
        if (a.id < b.id) {
            return -1;
         }
         if (a.id > b.id) {
            return 1;
         }
         return 0;
    });

module.exports = sortFunction;
