<template>
  <!-- this is todolist -->
  <section class="todo">
    <h1>{{ state.msg }}</h1>
    <!-- 输入框 -->
    <section class="todo-input">
      <label class="todo-label cursor" :class="{ roate: state.panel }">
        <img
          src="../assets/down.png"
          @click.stop="RotateItem"
          class="img-icon"
        />
      </label>
      <input
        type="text"
        v-model="state.value"
        @keyup.enter="addTodo"
        class="todo-ips"
        placeholder="What needs to be done?"
      />
    </section>
    <section :class="['container-warp', { 'fade-up': state.panel }]">
      <!-- 列表 -->
      <section class="todo-container">
        <ul>
          <li v-for="it in state.list" :key="it.id">
            <div :class="['todo__checked', it.complete ? 'checked' : '']">
              <input
                type="checkbox"
                name="chcekced"
                v-model="it.complete"
                @change="todoChange(it)"
                class="check__input"
              />
            </div>
            <div class="todo__value" :class="{ 'is-ok': it.complete }">
              {{ it.text }}
            </div>
            <i class="todo-del cursor" @click="todoDelSingle">X</i>
          </li>
        </ul>
      </section>
      <!-- 操作栏 -->
      <section class="todo-tool">
        <div class="items cursor">
          <strong>{{ 999 }}</strong> {{ 99 > 1 ? "items" : "item" }} left
        </div>
        <div class="bar">
          <p class="cursor" @click="todoAll">All</p>
          <p class="cursor" @click="todoActive">Active</p>
          <p class="cursor" @click="todoComplete">Complete</p>
        </div>
        <div class="clear cursor" @click="todoClearCompl">Clear complete</div>
      </section>
    </section>
  </section>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import useStorage from "../utils/storage";
export default {
  comments: true,
  setup() {
    const state = reactive({
      msg: "TODOS",
      value: "",
      panel: true,
      list: [
        {
          text: "这是待完成的事项1",
          complete: false,
        },
        {
          text: "这是待完成的事项2",
          complete: false,
        },
        {
          text: "这是待完成的事项3",
          complete: true,
        },
      ],
    });
    const todoChange = function (item) {
      console.log("change==>", item.text, item.complete);
    };
    // 控制显示隐藏
    const RotateItem = function () {
      state.panel = !state.panel;
    };

    const addTodo = function () {
      const text = state.value.trim();
      state.list.unshift({
        text,
        complete: false,
      });
      state.value = "";
    };

    const todoAll = function () {
      console.log("切换到全部");
    };

    const todoActive = function () {
      console.log("切换到正在进行中的");
      // state.list = state.list.filter(el=>!el.complete)
    };
    const todoComplete = function () {
      console.log("切换到已经完成的");
      // state.list = state.list.filter(el=>el.complete)
    };
    const todoClearCompl = function () {
      console.log("清除已经完成的todo");
    };
    const todoDelSingle = function(){
      console.log('删除单个的todo')
    }
    return {
      todoChange,
      RotateItem,
      addTodo,
      state,
      todoAll,
      todoActive,
      todoComplete,
      todoClearCompl,
      todoDelSingle
    };
  },
};
</script>

<style scoped>
@import "./todo.css";
</style>