//import axios from 'axios'

const state = {
    todos: [
        {
            id: 1,
            title: 'One'
        },
        {
            id: 2,
            title: 'Two'
        }
    ]
}

const getters = {
    allTodos: state => state.todos
}

const action = {}

const mutations = {}

export default {
    state,
    getters,
    action,
    mutations
}
