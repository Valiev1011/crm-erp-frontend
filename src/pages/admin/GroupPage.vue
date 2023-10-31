<template>
  <div class="w-full pt-5">
    <div class="w-full">
      <group-modal ref="group_modal"></group-modal>
    </div>
    <!-- <div class="w-full">
      <group-modal ref="delete_modal"></group-modal>
    </div> -->
    <loader v-if="store.loading"></loader>
    <div v-else>
      <div class="w-full flex justify-between items-center pr-5">
        <h1 class="text-[#002842] text-[22px] font-semibold uppercase">
          Group ({{ count }})
        </h1>
        <v-button
          type="button"
          btn_type="primary"
          :isLoading="false"
          @click="openModal()"
          class="px-10"
          >Add group</v-button
        >
      </div>
      <div class="w-full mt-5">
        <Table
          v-if="store?.groups?.length"
          :header="header"
          :data="store?.groups"
        >
          <template #body_check>
            <span class="w-full flex justify-center items-center"
              ><input type="checkbox" class="w-[18px] h-[18px]"
            /></span>
          </template>
          <!-- <template #body_id="{ item }">
            {{ item._id }}
          </template> -->
          <template #body_name="{ item }">
            <span @click="selectOne(item._id)" class="w-full">{{
              `${item?.name ? item?.name : ""}`
            }}</span>
          </template>
          <template #body_course="{ item }">
            <span @click="selectOne(item._id)" class="w-full">{{
              `${item?.course?.name ? item?.course?.name : ""}`
            }}</span>
          </template>
          <template #body_room="{ item }">
            <span @click="selectOne(item._id)" class="w-full">{{
              `${item?.room?.name ? item?.room?.name : ""}`
            }}</span>
          </template>
          <template #body_days="{ item }">
            <span @click="selectOne(item._id)" class="w-full">{{
              `${item?.days ? "Mon/Wed/Fri" : "Tue/Thu/Sat"}`
            }}</span>
          </template>
          <template #body_start_date="{ item }">
            <span @click="selectOne(item._id)" class="w-full">{{
              `${formatDate(item.start_date)}`
            }}</span>
          </template>
          <template #body_end_date="{ item }">
            <span @click="selectOne(item._id)" class="w-full">{{
              `${formatDate(item.end_date)}`
            }}</span>
          </template>
          <template #body_time="{ item }">
            <div class="flex flex-col">
              <span @click="selectOne(item._id)" class="w-full"
                >{{ `Start Time ${formatTime(item.start_time)}` }}
              </span>
              <span> {{ `End Time ${formatTime(item.end_time)}` }}</span>
            </div>
          </template>
          <template #body_action="{ item }">
            <span class="flex justify-center items-center gap-2 z-90">
              <svg-icon
                type="mdi"
                :path="mdiPencil"
                @click="openModal(item)"
                class="hover:text-orange-600 z-90"
              ></svg-icon>
              <svg-icon
                type="mdi"
                :path="mdiTrashCanOutline"
                @click="deleteGroup(item._id)"
                class="hover:text-red-900 z-90"
              ></svg-icon>
            </span>
          </template>
        </Table>
        <h1
          v-else
          class="w-full text-center text-[20px] text-color1 mt-10 font-medium"
        >
          No data
        </h1>
        <div class="w-full flex justify-end px-5 items-center mt-3">
          <vue-awesome-paginate
            :total-items="count"
            :items-per-page="params.limit"
            :max-pages-shown="2"
            v-model="params.page"
            :on-click="onClickHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GroupModal from "../../pages/admin/Modals/GroupModal.vue";
import Loader from "@/components/loader/Loader.vue";
import { onMounted, ref } from "vue";
import { useAdminStoreGroup } from "../../stores/admin/group";
import VButton from "@/components/form/VButton.vue";
import Table from "@/components/ui/Table.vue";
import { danger, success, warning } from "@/plugins/Notification";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";
import { useRouter } from "vue-router";
import { formatDate, formatTime } from "../../hooks/formatDate";

const router = useRouter();
const store = useAdminStoreGroup();

const deleteGroup = (id) => {
  group_modal.value.deleteGroupModal(id);
};

const onClickHandler = async () => {
  count.value = await store.getGroups(params.value);
};

const params = ref({
  page: 1,
  limit: 10,
});

const openModal = (item) => {
  group_modal.value.openModal(item);
};

const group_modal = ref();
const delete_modal = ref();

const header = ref([
  { title: "checkbox", value: "check" },
  { title: "Group name", value: "name" },
  { title: "Course name", value: "course" },
  { title: "Room name", value: "room" },
  { title: "Started date", value: "start_date" },
  { title: "End date", value: "end_date" },
  { title: "Days", value: "days" },
  { title: "Time", value: "time" },
  { title: "Action", value: "action" },
]);

const count = ref(0);

onMounted(async () => {
  console.log(store, "store...");

  count.value = await store.getGroups(params.value);
});

const selectOne = (id) => {
  router.push({ path: `/groups/${id}` });
};
</script>

<style lang="scss">
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 30px;
  width: 30px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #f2f2f2;
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
