import axios from 'axios'

const state = {
    todos: []
}

const getters = {
    allTodos: state => state.todos
}

const actions = {
    async fetchTodos({ commit }) {
        const response = 
            await axios.get('http://my-json-server.typicode.com/typicode/demo/posts')
        commit('setTodos', response.data)
    },
    async addTodo({ commit }, title) {
        const response = 
            await axios.post('http://my-json-server.typicode.com/typicode/demo/posts', {
                title,
                completed: false
            });
        commit('newTodo', response.data)
    }
}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo)
}

export default {
    state,
    getters,
    actions,
    mutations
}
