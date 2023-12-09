<template>
  <div class="w-full pt-5">
    <div class="w-full">
      <course-modal ref="student_modal"></course-modal>
    </div>
    <!-- <div class="w-full">
      <student-modal ref="delete_modal"></student-modal>
    </div> -->
    <loader v-if="store.loading"></loader>
    <div v-else>
      <div class="w-full flex justify-between items-center pr-5">
        <h1 class="text-[#002842] text-[22px] font-semibold uppercase">
          Courses ({{ count }})
        </h1>
        <v-button
          type="button"
          btn_type="primary"
          :isLoading="false"
          @click="openModal()"
          class="px-10"
          >Add Course</v-button
        >
      </div>
      <div class="w-full mt-5">
        <Table
          v-if="store?.courses?.length"
          :header="header"
          :data="store?.courses"
        >
          <template #body_check>
            <span class="w-full flex justify-center items-center"
              ><input type="checkbox" class="w-[18px] h-[18px]"
            /></span>
          </template>
          <!-- <template #body_id="{ item }">
            {{ item._id }}
          </template> -->
          <template #body_full_name="{ item }">
            <span @click="selectOne(item._id)" class="w-full">{{
              `${item.name}`
            }}</span>
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
                @click="deleteStudent(item._id)"
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
import CourseModal from "../../pages/admin/Modals/CourseModal.vue";
import Loader from "@/components/loader/Loader.vue";
import { onMounted, ref } from "vue";
import { useAdminCourseStore } from "../../stores/admin/course";
import VButton from "@/components/form/VButton.vue";
import Table from "../../components/ui/Table.vue";
import { danger, success, warning } from "@/plugins/Notification";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useAdminCourseStore();

const deleteStudent = (id) => {
  student_modal.value.deleteCourseModal(id);
};

const onClickHandler = async () => {
  count.value = await store.getCourses(params.value);
};

const params = ref({
  page: 1,
  limit: 10,
});

const openModal = (item) => {
  student_modal.value.openModal(item);
};

const student_modal = ref();
const delete_modal = ref();

const header = ref([
  { title: "checkbox", value: "check" },
  { title: "ID", value: "_id" },
  { title: "Course name", value: "name" },
  { title: "Price", value: "price" },
  { title: "Period", value: "period" },
  { title: "Action", value: "action" },
]);

const count = ref(0);

onMounted(async () => {
  console.log(store, "store...");

  count.value = await store.getCourses(params.value);
});

const selectOne = (id) => {
  router.push({ path: `/student/${id}` });
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
