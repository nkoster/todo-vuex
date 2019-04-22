import axios from 'axios'
/* eslint-disable */
const uuidv1 = require('uuid/v1');

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
                id: uuidv1(),
                title,
                completed: false
            });
        commit('newTodo', response.data)
    },
    async deleteTodo({ commit }, id) {
        // await axios.delete(`http://my-json-server.typicode.com/typicode/demo/posts/${id}`)
        //     .catch();
        commit('removeTodo', id)
    },
    async filterTodos({ commit }, e) {
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
        const response = 
            await axios.get(`http://my-json-server.typicode.com/typicode/demo/posts?_limit=${limit}`)
        commit('setTodos', response.data)
    }
}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id)
}

export default {
    state,
    getters,
    actions,
    mutations
}
