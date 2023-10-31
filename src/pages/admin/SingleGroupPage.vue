<template>
  <div class="w-full pt-5">
    <div class="w-full">
      <AddStudent ref="group_modal"></AddStudent>
    </div>
    <loader v-if="store.loading"></loader>
    <div v-else class="flex justify-between content-between w-full">
      <!-- <div class="w-full flex justify-between items-center pr-5">
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
      </div> -->
      <div
        class="w-[315px] h-full p-5 flex flex-col gap-[15px] font-medium rounded-[10px] border bg-white border-[#12486B]"
      >
        <div class="w-full flex justify-between items-center">
          <span class="text-[#3D444F] text-[12px]">ID:</span>
          <span class="text-[#065FD4] text-[14px]">{{ group?._id }}</span>
        </div>
        <span class="w-full h-[1px] bg-[#CFD0D3]"></span>
        <div class="w-full flex justify-between items-center">
          <span class="text-[#3D444F] text-[12px]">Group Name:</span>
          <span class="text-[#065FD4] text-[14px]">{{ group?.name }}</span>
        </div>
        <span class="w-full h-[1px] bg-[#CFD0D3]"></span>
        <div class="w-full flex justify-between items-center">
          <span class="text-[#3D444F] text-[12px]">Started date:</span>
          <span class="text-[#065FD4] text-[14px]">{{
            formatDate(group?.start_date)
          }}</span>
        </div>
        <span class="w-full h-[1px] bg-[#CFD0D3]"></span>
        <div class="w-full flex justify-between items-center">
          <span class="text-[#3D444F] text-[12px]">Ended date:</span>
          <span class="text-[#065FD4] text-[14px]">{{
            formatDate(group?.end_date)
          }}</span>
        </div>
        <span class="w-full h-[1px] bg-[#CFD0D3]"></span>
        <div class="w-full flex justify-between items-center">
          <span class="text-[#3D444F] text-[12px]">Start time:</span>
          <span class="text-[#065FD4] text-[14px]">{{
            formatTime(group?.start_time)
          }}</span>
        </div>
        <span class="w-full h-[1px] bg-[#CFD0D3]"></span>
        <div class="w-full flex justify-between items-center">
          <span class="text-[#3D444F] text-[12px]">End time:</span>
          <span class="text-[#065FD4] text-[14px]">{{
            formatTime(group?.end_time)
          }}</span>
        </div>
        <span class="w-full h-[1px] bg-[#CFD0D3]"></span>
        <div class="w-full flex justify-between items-center">
          <span class="text-[#3D444F] text-[12px]">Days:</span>
          <span v-if="group?.days" class="text-[#065FD4] text-[14px]"
            >Mon Wed Fri</span
          >
          <span v-else class="text-[#065FD4] text-[14px]">Tue Thu Sat</span>
        </div>
        <span class="w-full h-[1px] bg-[#CFD0D3]"></span>
        <div class="w-full flex justify-between items-center">
          <span class="text-[#3D444F] text-[12px]">Status:</span>
          <span class="text-[#065FD4] text-[14px]">{{ group?.status }}</span>
        </div>
        <span class="w-full h-[1px] bg-[#CFD0D3]"></span>
        <div class="w-full flex justify-between items-center">
          <span class="text-[#3D444F] text-[12px]">Course:</span>
          <router-link
            :to="'/courses/' + group?.course?._id"
            class="text-[#065FD4] text-[14px] underline"
          >
            {{ group?.course?.name }}
          </router-link>
        </div>
        <span class="w-full h-[1px] bg-[#CFD0D3]"></span>
        <div class="w-full flex justify-between items-center">
          <span class="text-[#3D444F] text-[12px]">Room:</span>
          <router-link
            :to="'/rooms/' + group?.room?._id"
            class="text-[#065FD4] text-[14px] underline"
          >
            {{ group?.room?.name }}
          </router-link>
        </div>
      </div>
      <div class="w-1/2">
        <div class="w-full flex justify-end items-end">
          <VButton
            btn_type="primary"
            :isLoading="store.loading"
            type="button"
            class="mt-5 text-[18px] px-8"
            @click="openModal"
            >Add Student</VButton
          >
        </div>
        <div class="w-full">
          <div class="demo-collapse">
            <accordionlesson :data="group_lessons"> </accordionlesson>
          </div>
        </div>
        <div class="w-full">
          <div class="demo-collapse">
            <accordion :data="group_students"></accordion>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GroupModal from "../../pages/admin/Modals/GroupModal.vue";
import AddStudent from "../../pages/admin/Modals/AddStudentModal.vue";
import accordion from "../../components/ui/accordion.vue";
import accordionlesson from "../../components/ui/accordionlesson.vue";
import Loader from "@/components/loader/Loader.vue";
import { onMounted, ref } from "vue";
import { useAdminStoreGroup } from "../../stores/admin/group";
import { useAdminStoreLesson } from "../../stores/admin/lesson";
import VButton from "@/components/form/VButton.vue";
import Table from "@/components/ui/Table.vue";
import { danger, success, warning } from "@/plugins/Notification";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";
import { useRouter, useRoute } from "vue-router";
import { formatDate, formatTime } from "../../hooks/formatDate";

const router = useRouter();
const store = useAdminStoreGroup();
const lessonStore = useAdminStoreLesson();

const route = useRoute();
const group = ref();
const group_students = ref();
const group_lessons = ref();

const ID = route.params.id;

console.log(ID, "IID");

onMounted(async () => {
  [group.value, group_students.value, group_lessons.value] = await Promise.all([
    store.getGroupById(ID),
    lessonStore.getAttendanceStudents(ID),
    lessonStore.getLessonsByGroupId(ID),
  ]);
  // group.value = await store.getGroupById(ID);
  // group_students.value = await lessonStore.getAttendanceStudents(ID);
  // group_lessons.value = await lessonStore.getLessonsByGroupId(ID);

  console.log(group_students.value);
});

const onClickHandler = async () => {
  count.value = await store.getGroups(params.value);
};

const params = ref({
  page: 1,
  limit: 10,
});
const group_modal = ref();

const openModal = (item) => {
  group_modal.value.openModal();
};

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

// onMounted(async () => {
//   console.log(store, "store...");

//   count.value = await store.getGroups(params.value);
// });

// const selectOne = (id) => {
//   router.push({ path: `/group/${id}` });
// };
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
