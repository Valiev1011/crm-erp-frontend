<template>
  <div class="w-full h-full flex items-center justify-center">
    <ProfileModal ref="profile_modal" />
    <div class="w-[500px] flex flex-col gap-3">
      <div
        class="w-[150px] h-[150px] flex items-center justify-center rounded-full"
      >
        <img
          :src="
            image
              ? image
              : `https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png`
          "
          alt="profile image"
          class="w-full h-full rounded-full object-cover bg-cover"
        />
      </div>
      <p>
        First name: <span>{{ store?.profile?.first_name }}</span>
      </p>
      <p>
        Last name: <span>{{ store?.profile?.last_name }}</span>
      </p>
      <p>
        Phone number: <span>{{ store?.profile?.phone }}</span>
      </p>
      <VButton btn_type="primary" @click="updateProfile"
        >Update profile</VButton
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProfileModal from "./Modal/ProfileModal.vue";
import { useAuthStore } from "../../stores/auth";
import VButton from "../../components/form/VButton.vue";

const store = useAuthStore();
const profile_modal = ref("");

const image = ref("");

const updateProfile = () => {
  profile_modal.value.openModal(store?.profile);
};

onMounted(async () => {
  await store.getProfile();
  // console.log(store.profile);
  try {
    if (store.profile.image) {
      image.value = `${store?.profile?.image}`;
    }
  } catch (error) {
    console.log(error);
  }
  console.log(image.value);
});
</script>

<style lang="scss" scoped></style>
