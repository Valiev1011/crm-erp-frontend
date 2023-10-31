<template>
  <vee-form>
    <span class="w-full flex justify-center items-center">
      <svg-icon
        type="mdi"
        :path="mdiAlertCircleOutline"
        class="w-20 h-20 text-red-700 mb-3"
      ></svg-icon>
    </span>
    <h1 class="text-[24px] font-bold w-full text-center mb-[20px] text-color1">
      {{ title }}
    </h1>
    <div class="flex justify-center items-center w-full gap-3">
      <VButton
        btn_type="danger"
        :isLoading="store.loading"
        type="button"
        class="mt-5 text-[18px] px-8"
        @click="deleteUser"
      >
        Delete
      </VButton>
      <VButton
        btn_type="primary"
        :isLoading="false"
        type="button"
        class="mt-5 px-8 text-[18px]"
        @click="$emit('update:modelValue', false)"
      >
        Cancel
      </VButton>
    </div>
  </vee-form>
</template>

<script setup>
import { ref } from "vue";
import AppModal from "@/components/ui/app-modal.vue";
import { warning, danger } from "@/plugins/Notification.js";
import VButton from "@/components/form/VButton.vue";
import { useAdminStore } from "@/stores/admin";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAlertCircleOutline } from "@mdi/js";
import StudentModal from "../../pages/admin/Modals/StudentModal.vue";

const store = useAdminStore();

const dialog = ref(false);
const ID = ref(null);
const title = ref("Are you sure to delete?");

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  deleteUser: { type: Function },
});

// const confirm = async () => {
//   const res = await store.deleteStudent(ID.value);
//   if (res) {
//     warning("Deleted success");
//   } else {
//     danger("Failed!");
//   }
//   dialog.value = false;
//   location.reload();
// };

// const openModal = (id) => {
//   ID.value = id;
//   dialog.value = true;
// };

// const closeModal = () => {
//   dialog.value = false;
// };

// defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
