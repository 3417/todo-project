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
            <i class="todo-del cursor" @click="todoDelSingle(it)">X</i>
          </li>
        </ul>
      </section>
      <!-- 操作栏 -->
      <section class="todo-tool">
        <div class="items cursor">
          <strong>{{ showAitems }}</strong>
          {{ showAitems > 1 ? "items" : "item" }} left
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
import { reactive, ref, toRefs, computed, onMounted } from "vue";
import useStorage from "../utils/storage";
export default {
  comments: true,
  setup() {
    const state = reactive({
      msg: "TODOS",
      value: "",
      panel: true,
      list: [],
      jsonkey: "TODO-LIST",
    });
    const todoChange = function (item) {
      console.log("change==>", item.id, item.complete);
      const local = useStorage.getItem(state.jsonkey);
      let newLoca = local.map((el) => (el.id === item.id ? item : el));
      useStorage.setItem(state.jsonkey, newLoca);
    };
    // 控制显示隐藏
    const RotateItem = function () {
      state.panel = !state.panel;
    };

    // 获取所有的条目源数据
    const getAllCount = function () {
      return useStorage.getItem(state.jsonkey);
    };

    const addTodo = function () {
      const text = state.value.trim();
      state.list.unshift({
        text,
        id: new Date().valueOf(),
        complete: false,
      });
      state.value = "";
      useStorage.setItem(state.jsonkey, state.list);
    };

    const todoAll = function () {
      console.log("切换到全部");
      state.list = getAllCount();
    };
    // 切换显示不同的items
    const showAitems = computed(() => {
      return state.list.length;
    });

    const todoActive = function () {
      console.log("切换到正在进行中的");
      state.list = getAllCount().filter((el) => !el.complete);
    };
    const todoComplete = function () {
      console.log("切换到已经完成的");
      state.list = getAllCount().filter((el) => el.complete);
    };
    const todoClearCompl = function () {
      console.log("清除已经完成的todo");
    };
    const todoDelSingle = function (item) {
      console.log("删除单个的todo",item.id);
      let del_id = state.list.findIndex(el=>el.id === item.id);
      let del_local = getAllCount().findIndex(ele=>ele.id === item.id);
      let del_data = JSON.parse(JSON.stringify(getAllCount()));
      del_data.splice(del_local,1);
      state.list.splice(del_id,1);
      useStorage.setItem(state.jsonkey,del_data );
    };
    onMounted(() => {
      const sourceDate = useStorage.getItem(state.jsonkey) || [];
      state.list = sourceDate;
    });
    return {
      todoChange,
      RotateItem,
      addTodo,
      state,
      todoAll,
      todoActive,
      todoComplete,
      todoClearCompl,
      todoDelSingle,
      showAitems,
    };
  },
};
</script>

<style scoped>
@import "./todo.css";
</style>