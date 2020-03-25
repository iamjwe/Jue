import {Jue} from './core/Jue'
let vm = new Jue({
    el: '#template',
    data: {
        msg: 'haha'
    },
    methods: {
        eventTest: function() {
            alert("success,Good Job");
        }
    }
});
window.vm = vm;