<template>
  <AppModal v-model="dialog">
    <div class="flex justify-between">
      <div class="w-1/2 mt-[30px] mb-5">
        <h1 class="text-[20px] mb-2 text-global1">Choose profile picture</h1>
        <input type="file" @change="handleImage($event)" />
      </div>
      <div class="w-1/3 flex items-center justify-center rounded-full">
        <img
          :src="
            image
              ? image
              : `https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png`
          "
          alt="new profile image"
          class="w-full h-full rounded-full bg-cover object-cover"
        />
      </div>
    </div>
    <vee-form
      :validation-schema="schema"
      :initial-values="store?.profile"
      @submit="send"
    >
      <VInputVue
        type="text"
        label="First name"
        name="first_name"
        placeholder="First name"
      />
      <VInputVue
        type="text"
        label="Last name"
        name="last_name"
        placeholder="Last name"
      />
      <VInputVue
        type="text"
        label="Phone number"
        mask="+998-##-###-##-##"
        name="phone"
        placeholder="+998-00-000-00-00"
      />
      <VButton
        type="submit"
        btn_type="primary"
        :is-loading="loading"
        class="w-full mt-4"
        >{{ loading ? "Loading" : "Edit profile" }}</VButton
      >
    </vee-form>
  </AppModal>
</template>

<script setup>
import VButton from "../../../components/form/VButton.vue";
import VInputVue from "../../../components/form/VInput.vue";
import AppModal from "../../../components/ui/app-modal.vue";
import { useAuthStore } from "../../../stores/auth";
import { onMounted, ref } from "vue";

const dialog = ref(false);
const store = useAuthStore();
const image = ref("");
const loading = ref(false);
// const form = ref({
//   first_name: "",
//   last_name: "",
//   phone: "",
// });

const schema = ref({
  first_name: "required|min:2|max:30",
  last_name: "required|min:2|max:30",
  phone: "required|min:17|max:30",
});

const handleImage = async (e) => {
  const form = new FormData();
  form.append("image", e.target.files[0]);
  const res = await store.updateImage(form);
  // image.value = `${store?.profile?.image}`;
  console.log(res);
  if (res) {
    image.value = res;
  }
};

const send = async (values) => {
  loading.value = true;
  let a = values.phone.split("");
  let b = a.filter((item) => !isNaN(+item));
  let c = "+" + b.join("");

  let payload = {
    first_name: values.first_name,
    last_name: values.last_name,
    phone: c,
    image: image.value,
  };
  await store.updateProfile(payload);
  loading.value = false;
  // location.reload();
};

const openModal = (item) => {
  // form.value = { ...item };
  console.log(store?.profile?.image);
  if (store?.profile?.image) image.value = `${store?.profile?.image}`;
  console.log(item);
  dialog.value = true;
};

defineExpose({ openModal });
</script>

<style scoped></style>
