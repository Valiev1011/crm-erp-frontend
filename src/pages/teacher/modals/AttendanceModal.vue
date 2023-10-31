<template>
  <div>
    <AppModal v-model="dialog">
      <h1
        class="text-[24px] font-bold w-full text-center mb-[20px] text-color1"
      >
        Check the attendees
      </h1>
      <vee-form
        :validation-schema="schema"
        :initial-values="forms"
        @submit="checkAttendance"
      >
        <div
          v-for="(item, index) in attendees.attendes"
          :key="index"
          class="w-full flex justify-between"
        >
          <span>{{
            item.student.first_name + " " + item.student.last_name
          }}</span>
          <span
            @click="change(index)"
            :class="item.participated ? 'text-[green]' : ' text-[red]'"
            >{{ item.participated ? "participate" : "absent" }}</span
          >
        </div>
        <VButton
          btn_type="primary"
          :isLoading="store.loading"
          type="submit"
          @click="checkAttendance"
          class="mt-5 w-full text-[18px]"
        >
          {{ btn_title }}
        </VButton>
      </vee-form>
    </AppModal>
    <!-- <AppModal v-model="dialog2">
      <VDeleteModal
        v-model="dialog2"
        :deleteUser="deleteStudent"
      ></VDeleteModal>
    </AppModal> -->
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import AppModal from "@/components/ui/app-modal.vue";
import { danger, success, warning } from "@/plugins/Notification.js";
import VInput from "@/components/form/VInput.vue";
import VButton from "@/components/form/VButton.vue";
import { useAdminStoreGroup } from "../../../stores/admin/group";
import VDeleteModal from "../../../components/form/VDeleteModal.vue";
import { useTeacherStoreLesson } from "../../../stores/teacher/thelesson";

import { useRoute, useRouter } from "vue-router";

const store = useAdminStoreGroup();
const attendees = useTeacherStoreLesson();

const route = useRoute();

const dialog = ref(false);
const yoqlama = ref(true);

const dialog2 = ref(false);
const title = ref("Add New Student");
const ID = ref("");

const change = (index) => {
  attendees.attendes[index].participated =
    !attendees.attendes[index].participated;
};

ID.value = route.params.id;

const btn_title = computed(() => {
  if (store.loading) {
    return "Loading";
  } else {
    return "Save";
  }
});

const forms = ref({
  first_name: "",
  last_name: "",
  phone: "",
});

watch(dialog, (val) => {
  if (!val) {
    forms.value = {};
    title.value = "Add New Student";
  }
});

const openModal = (item) => {
  dialog.value = true;
};

const closeModal = () => {
  dialog.value = false;
};

const save = () => {};

const schema = computed(() => {
  return {
    phone: "required|phone:19",
  };
});
console.log(dialog2.value);

const deleteStudent = async () => {
  const res = await store.deleteStudent(ID.value);
  if (res) {
    success("Deleted successfully");
  } else {
    danger("Delete failed");
  }
  dialog2.value = false;
  location.reload();
};

const deleteStudentModal = (id) => {
  ID.value = id;
  // await store.deleteStudent(ID.value);
  dialog2.value = true;
  console.log(dialog2.value);
};

const checkAttendance = async (value) => {
  console.log(attendees.attendes);
  const res = await attendees.updateTeacherSingleLesson(attendees.attendes);

  if (res) {
    success("successfully added ");
    dialog.value = false;
    location.reload();
  } else {
    danger(store.error);
  }
};

defineExpose({ openModal, closeModal, deleteStudentModal });
</script>

<style lang="scss" scoped></style>
