<template>
  <div>
    <AppModal v-model="dialog">
      <h1
        class="text-[24px] font-bold w-full text-center mb-[20px] text-color1"
      >
        {{ title }}
      </h1>
      <vee-form
        :validation-schema="schema"
        :initial-values="forms"
        @submit="addStudent"
      >
        <VInput
          type="text"
          name="name"
          label="Name"
          placeholder="Enter the room name"
        ></VInput>
        <VInput
          type="number"
          name="size"
          label="Size"
          placeholder="Enter the room size"
        ></VInput>
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
    <AppModal v-model="dialog2">
      <VDeleteModal
        v-model="dialog2"
        :deleteUser="deleteStudent"
      ></VDeleteModal>
    </AppModal>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import AppModal from "@/components/ui/app-modal.vue";
import { danger, success } from "@/plugins/Notification.js";
import VInput from "@/components/form/VInput.vue";
import VButton from "@/components/form/VButton.vue";
import { useAdminRoomStore } from "../../../stores/admin/room";
import VDeleteModal from "../../../components/form/VDeleteModal.vue";

const store = useAdminRoomStore();

const dialog = ref(false);
const dialog2 = ref(false);
const ID = ref("");
const title = ref("Add New Student");

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
  if (item) {
    forms.value = { ...item };
    title.value = "Edit Student";
    console.log(forms.value, "forms");
  }
  dialog.value = true;
};

const closeModal = () => {
  dialog.value = false;
};

const save = () => {};

const schema = computed(() => {
  return {
    last_name: "required|min:3|max:30",
    first_name: "required|min:3|max:30",
    phone: "required|phone:19",
  };
});

const deleteRoom = (id) => {
  dialog2.value = true;
  ID.value = id;
};

const deleteStudent = async () => {
  const res = await store.deleteRoom(ID.value);
  if (res) {
    success("Deleted Successfully");
  } else {
    danger("Failed");
  }
  dialog2.value = false;
  location.reload();
};

const addStudent = async (value) => {
  if (forms.value?._id) {
    const res = await store.updateRoom(
      {
        ...value,
      },
      forms.value?._id
    );
    if (res) {
      success("successfully updated ");
      dialog.value = false;
      location.reload();
    } else {
      console.log(store.error, "error");
      danger(store.error.message);
    }
  } else {
    const res = await store.addRoom({
      ...value,
    });
    if (res) {
      success("successfully added ");
      dialog.value = false;
      location.reload();
    } else {
      danger(store.error);
    }
  }
};

defineExpose({ openModal, closeModal, deleteRoom });
</script>

<style lang="scss" scoped></style>
