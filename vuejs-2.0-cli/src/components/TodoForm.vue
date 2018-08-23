<template>
    <form v-on:submit.prevent="addTodo(newTodo)">
        <div class="form-group">
            <input
                    type="text"
                    class="form-control"
                    placeholder="Add a new todo"
                    v-model = "newTodo.title"
            >
        </div>
        <div class="from-group">
            <button class="btn btn-success" type="submit">Add Todo</button>
        </div>
    </form>
</template>

<script>
    export default {
        computed :{
            newTodo () {
                return this.$store.state.newTodo
            }
        },
        methods: {
            addTodo(newTodo) {
                this.$store.dispatch('saveTodo',newTodo)
            }
        }
    }
</script>

