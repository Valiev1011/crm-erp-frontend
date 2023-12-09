<template>
  <div>
    <AppModal v-model="dialog">
      <h1
        class="text-[24px] font-bold w-full text-center mb-[20px] text-color1"
      >
        Add the description
      </h1>
      <vee-form
        :validation-schema="schema"
        :initial-values="forms"
        @submit="checkAttendance"
      >
        <div class="w-full h-[100px] flex justify-between">
          <textarea
            name="text"
            id="text"
            cols="30"
            rows="10"
            class="w-full resize-none outline-none border text-[20px]"
            placeholder="Text"
            v-model="itemm.description"
          ></textarea>
        </div>
        <VButton
          btn_type="primary"
          :isLoading="store.loading"
          type="submit"
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

import VButton from "@/components/form/VButton.vue";
import { useAdminStoreGroup } from "../../stores/admin/group";

import { useAdminStoreLesson } from "../../stores/admin/lesson";

import { useRoute, useRouter } from "vue-router";

const store = useAdminStoreGroup();
const attendees = useAdminStoreLesson();

const route = useRoute();

const dialog = ref(false);

const dialog2 = ref(false);
const title = ref("Add New Student");
const ID = ref("");

ID.value = route.params.id;

const btn_title = computed(() => {
  if (store.loading) {
    return "Loading";
  } else {
    return "Save";
  }
});

watch(dialog, (val) => {
  if (!val) {
    title.value = "Add New Student";
  }
});
let itemm = reactive({});

const closeModal = () => {
  dialog.value = false;
};

const save = () => {};
console.log(dialog2.value);

const openModal = (item) => {
  itemm = { ...item };
  console.log(itemm);
  dialog.value = true;
};

const checkAttendance = async (value) => {
  console.log(attendees);
  const res = await attendees.updateLessonDescription(itemm._id, {
    description: itemm.description,
  });

  if (res) {
    success("successfully added ");
    dialog.value = false;
    location.reload();
  } else {
    danger(store.error);
  }
};

defineExpose({ openModal, closeModal });
</script>

<style lang="scss" scoped></style>
