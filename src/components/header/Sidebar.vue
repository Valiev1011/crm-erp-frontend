<template>
  <div class="flex bg-white">
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-10 transition-opacity opacity-50 lg:hidden bg-[#00111380]"
      @click="isOpen = false"
    ></div>
    <div
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      class="w-[223px] bg-color1 pt-[70px] inset-y-0 fixed left-0 z-10 overflow-y-auto duration-300 lg:translate-x-0 lg:static"
    >
      <span v-for="(item, index) in menu" :key="index">
        <router-link
          class="flex justify-start gap-4 items-center font-normal text-white text-[20px] pl-[30px] py-[15px] select-none transition-all duration-200"
          :to="item.path"
          :class="{ 'router-link-active': $route.meta.child == item.keys }"
          ><Icon type="mdi" :path="item.icon" class="text-[20px]"></Icon>
          {{ item.label }}</router-link
        >
      </span>
    </div>
  </div>
</template>

<script setup>
import Icon from "@jamescoyle/vue-icon";
import { useSideBar } from "@/hooks/UseSideBar.js";
import { AdminMenu } from "@/components/menu/AdminMenu.js";
import { TeacherMenu } from "../menu/TeacherMenu";
import { DirectorMenu } from "../menu/DirectorMenu";

const role = localStorage.getItem("role");

const returnMenu = () => {
  if (role == "admin") {
    return AdminMenu;
  } else if (role == "teacher") {
    return TeacherMenu;
  } else if (role == "director") {
    return DirectorMenu;
  }
};
const menu = returnMenu();
const isOpen = useSideBar();
const props = defineProps({
  menu: Array,
});
</script>

<style lang="scss" scoped>
.router-link-active {
  background: #f5fccd;
  color: #12486b;
}
</style>
