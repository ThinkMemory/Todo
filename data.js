window.DATA = {
    data: {
        items: [],
        message: '',
        selectText: 'All',
    },
    key: 'TODO',
};

(function() {
    var Data = window.DATA;
    Object.assign(Data, {
        init: function(callback) {
            var temp = window.localStorage.getItem(Data.key);
            try {
                if (temp) {
                    Data.data = JSON.parse(temp);
                }
            }
            catch (e) {
                window.localStorage.setItem(Data.key, '');
                console.error(e);
            }
      
            if (callback) callback();
        },
        flush: function(callback) {
            try {
                window.localStorage.setItem(Data.key, JSON.stringify(Data.data));
            }
            catch (e) {
                console.error(e);
            }
            if (callback) callback();
        }
    });
})();