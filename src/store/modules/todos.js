import axios from 'axios'
/* eslint-disable */

const fakeApi = 'https://jsonplaceholder.typicode.com/todos';
//const fakeApi = 'http://my-json-server.typicode.com/typicode/demo/posts';

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
            await axios.get(fakeApi)
        commit('setTodos', response.data)
    },
    async addTodo({ commit }, title) {
        const response = 
            await axios.post(fakeApi, {
                id: uuidv1(),
                title,
                completed: false
            });
            console.log('RESPONSE:')
            console.log(response)
        commit('newTodo', response.data)
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`${fakeApi}/${id}`)
            .catch();
        commit('removeTodo', id)
    },
    async filterTodos({ commit }, e) {
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
        const response = 
            await axios.get(`${fakeApi}?_limit=${limit}`)
        commit('setTodos', response.data)
    },
    async updateTodos({ commit }, updatedTodo) {
        const response = 
            await axios.put(`${fakeApi}/${updatedTodo.id}`, updatedTodo)
        commit('updateTodo', response.data)
        //console.log(response.data)
    }
}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updateTodo: (state, updatedTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index != -1) {
            state.todos.splice(index, 1, updatedTodo)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
