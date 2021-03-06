import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: "fontawesome",
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => payload.msg ? payload.msg : "Operation successfully.",
    { icon: "check", type: "success"}
)

Vue.toasted.register(
    'defaultError',
    payload => payload.msg ? payload.msg : "Unexpected error has occurred.",
    { icon: "times", type: "error"}
)