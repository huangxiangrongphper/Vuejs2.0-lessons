// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import App from './App'
import Todos from './components/Todos'
import Todo from './components/Todo'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
    {path:'/',component:Todos},
    {path:'/todo/:id',component:Todo,name : 'todo'}
]

const router = new VueRouter({
    routes
})

const store = new Vuex.Store({
    state: {
        todos: [],
        newTodo:{id:null,title:'',completed:false}
    },
    mutations: {
        get_todos_list (state,todos) {
            state.todos = todos
        },
        complete_todo (state,todo) {
            todo.completed = ! todo.completed
        },
        delete_todo (state , index) {
            state.todos.splice(index,1)
        },
        add_todo (state,todo) {
            state.todos.push(todo)
        }
    },
    actions : {
        getTodos(store) {
            Vue.axios.get('http://zhihu.test/api/todos').then(response => {
                store.commit('get_todos_list',response.data)
            })
        },
        completeTodo (store,todo){
            Vue.axios.patch('http://zhihu.test/api/todo/'+todo.id+'/completed').then(response => {
                store.commit('complete_todo',todo)
            })
        },
        removeTodo (store,payload) {
            Vue.axios.delete('http://zhihu.test/api/todo/'+payload.todo.id+'/delete').then(response => {
                console.log(response.data)
                store.commit('delete_todo',payload.index)
            })
        },
        saveTodo (store,todo) {
                Vue.axios.post('http://zhihu.test/api/todo/create',{title:todo.title}).then(response => {
                    console.log(response.data)
                    store.commit('add_todo',response.data)
                })
            store.state.newTodo = { id:null,title:'',completed:false }
        }
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
  router
})
