<template>
  <div class="demo-collapse">
    <el-collapse accordion>
      <el-collapse-item class="mt-2">
        <template #title>
          <span class="text-[20px] text-color1 pl-5">All lessons</span>
        </template>
        <div class="flex flex-wrap gap-2 p-5">
          <DescriptionModal ref="desc_modal"></DescriptionModal>
          <div
            v-for="(item, index) in data"
            :key="index"
            class="w-[50px] text-center py-1 text-[14px] text-color1 border border-color1 rounded-md hover:bg-color1/10 cursor-pointer"
            :class="
              item?.description
                ? 'bg-[#e84f2c] border-none text-white'
                : item?.pass
                ? 'bg-[green] border-none text-white'
                : ''
            "
            @click="openModal(item)"
          >
            <el-popover
              placement="top-start"
              :title="formatDate(item?.date)"
              :width="200"
              trigger="hover"
              :content="
                item?.description
                  ? change(item?.description, item.admin)
                  : item.title
              "
            >
              <template #reference>
                {{ formatDay(item?.date) }}
              </template>
            </el-popover>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { InfoFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import { formatDate, formatDay } from "../../hooks/formatDate";
import DescriptionModal from "../modal/DescriptionModal.vue";

const desc_modal = ref("");

const openModal = (item) => {
  desc_modal.value.openModal(item);
};

const props = defineProps({
  data: Array,
});

const change = (first, second) => {
  return `${first} \n\n ${second}`;
};
</script>
