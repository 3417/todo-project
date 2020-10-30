<template>
  <!-- this is todolist -->
  <section class="todo">
    <h1>TODOS</h1>
    <!-- 输入框 -->
    <section class="todo-input">
      <label class="todo-label cursor" :class="{'roate':panel}">
        <img src="../assets/down.png" @click.stop="RotateItem" class="img-icon"/>
      </label>
      <input
        type="text"
        v-model="value"
        @keyup.enter="addTodo"
        class="todo-ips"
        placeholder="What needs to be done?"
      />
    </section>
    <!-- 列表 -->
    <section class="todo-container">
      <ul>
        <li>
          <div class="todo__checked">
            <input type="checkbox" name="chcekced" v-model="check" class="check__input" @change="todoChange"/>
          </div>
          <div class="todo__value">这是待完成的事项</div>
        </li>
        <li class="is-ok">
          <div class="todo__checked checked">
            <input type="checkbox" name="chcekced" v-model="check" class="check__input" @change="todoChange"/>
          </div>
          <div class="todo__value ">这是已完成的事项</div>
        </li>
      </ul>
    </section>
    <!-- 操作栏 -->
    <section class="todo-tool">
      <div class="items cursor">{{999}} items left</div>
      <div class="bar">
        <p class="cursor">All</p>
        <p class="cursor">Active</p>
        <p class="cursor">Complete</p>
      </div>
      <div class="clear cursor">Clear complete</div>
    </section>
  </section>
</template>

<script>
import { ref } from "vue";
export default {
  comments: true,
  setup() {
    const value = ref("");
    const panel = ref(true);
    const todoChange = function(){
        console.log(1111)
    }

    const RotateItem = function(){
        this.panel = !this.panel;
    }
    return {
      value,
      todoChange,
      RotateItem,
      panel
    };
  },
};
</script>

<style scoped>
@import './todo.css';
</style>