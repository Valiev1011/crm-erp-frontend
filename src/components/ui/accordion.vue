<template>
  <div class="demo-collapse">
    <el-collapse accordion>
      <el-collapse-item
        :name="index"
        v-for="(item, index) in data"
        :key="index"
        class="mt-2"
      >
        <template #title>
          <span class="text-[20px] text-color1 pl-5">{{
            index +
            1 +
            ". " +
            item?.student?.first_name +
            " " +
            item?.student?.last_name
          }}</span>
        </template>
        <div class="flex flex-wrap gap-2 p-5">
          <div
            v-for="(attend, id) in item?.attendance"
            :key="id"
            class="w-[50px] text-center py-1 text-[14px] text-color1 border border-color1 rounded-md hover:bg-color1/10 cursor-pointer"
            :class="
              attend.comment
                ? 'bg-[#20f25f] border-none text-white'
                : !attend.participated
                ? 'bg-[red] border-none text-white'
                : ''
            "
          >
            <el-popover
              placement="top-start"
              :title="formatDate(attend?.date)"
              :width="200"
              trigger="hover"
              :content="attend.comment"
            >
              <template #reference>
                {{ formatDay(attend?.date) }}
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
import { formatDate, formatDay } from "../../hooks/formatDate";

const props = defineProps({
  data: Array,
});
console.log(props.data);
</script>
