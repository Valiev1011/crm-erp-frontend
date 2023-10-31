<template>
  <div>
    <AppModal v-model="dialog">
      <h1
        class="text-[24px] font-bold w-full text-center mb-[20px] text-color1"
      >
        {{ title }}
      </h1>
      <!-- <vee-form
        :validation-schema="schema"
        :initial-values="forms"
        @submit="addGroup"
      > -->
      <!-- <VInput
          type="text"
          name="name"
          label="Group name"
          placeholder="Enter group name"
        ></VInput> -->
      <input
        type="text"
        v-model="form.name"
        class="w-full border p-1 outline-none"
        placeholder="Group name"
      />
      <div class="demo-date-picker">
        <div class="block">
          <span class="demonstration">Start date</span>
          <el-date-picker
            v-model="form.start_date"
            type="date"
            :placeholder="new Date().toLocaleDateString()"
            :default-value="
              form.start_date ? new Date(form.start_date) : new Date()
            "
          />
        </div>
      </div>
      <!-- <VInput
          type="text"
          name="phone"
          label="Phone"
          placeholder="(+998)-90-123-45-67"
          :mask="'(+998)-##-###-##-##'"
        ></VInput> -->
      <div>
        <span class="demonstration">Select Days</span>
        <div class="w-full border">
          <select
            id=""
            class="w-full p-3"
            v-model="form.days"
            @change="getSelected(form.days)"
          >
            <option value="" selected hidden>Select Days</option>
            <option :value="true">Odd days</option>
            <option :value="false">Even days</option>
          </select>
        </div>
      </div>
      <div>
        <span class="demonstration">Select Time</span>
        <div class="demo-time-range flex">
          <el-time-select
            v-model="date_time_picker.time[0]"
            :max-time="date_time_picker.time[1]"
            class="mr-4"
            placeholder="Start time"
            start="06:00"
            step="00:15"
            end="21:00"
          />
          <el-time-select
            v-model="date_time_picker.time[1]"
            :min-time="date_time_picker.time[0]"
            placeholder="End time"
            start="07:45"
            step="00:15"
            end="22:45"
            @change="getRooms"
          />
        </div>
      </div>
      <div v-if="store?.availableRooms?.length">
        <span class="demonstration">Select Room</span>
        <div class="w-full border">
          <select
            class="w-full p-3"
            v-model="form.room"
            @change="send(form.room)"
          >
            <option value="" selected hidden>Select a course</option>
            <option
              :value="item._id"
              v-for="(item, index) in store.availableRooms"
              :key="index"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <span class="demonstration">Select Course</span>
        <div class="w-full border">
          <select
            class="w-full p-3"
            v-model="form.course._id"
            @change="send(form.course._id)"
          >
            <option value="" selected hidden>Select a course</option>
            <option
              :value="item._id"
              v-for="(item, index) in courses"
              :key="index"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div v-if="teachers?.length">
        <span class="demonstration">Select Teacher</span>
        <div class="w-full border">
          <select
            class="w-full p-3"
            v-model="form.teacher"
            @change="send1(form?.teacher)"
          >
            <option value="" selected hidden>Select a Teacher</option>
            <option
              :value="item._id"
              v-for="(item, index) in teachers"
              :key="index"
            >
              {{ item?.first_name }}
            </option>
          </select>
        </div>
      </div>
      <VButton
        btn_type="primary"
        :isLoading="store.loading"
        type="submit"
        class="mt-5 w-full text-[18px]"
        @click="addGroup"
      >
        {{ btn_title }}
      </VButton>
      <!-- </vee-form> -->
    </AppModal>
    <AppModal v-model="dialog2">
      <VDeleteModal v-model="dialog2" :deleteUser="deleteGroup"></VDeleteModal>
    </AppModal>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import AppModal from "@/components/ui/app-modal.vue";
import { danger, success, warning } from "@/plugins/Notification.js";
import VInput from "@/components/form/VInput.vue";
import VButton from "@/components/form/VButton.vue";
import { useAdminStoreGroup } from "../../../stores/admin/group";
import { useAdminCourseStore } from "../../../stores/admin/course";
import VDeleteModal from "../../../components/form/VDeleteModal.vue";
import { formatTime, getTimeInMinutes } from "../../../hooks/formatDate";
import moment from "moment";

const store = useAdminStoreGroup();
const coursesStore = useAdminCourseStore();

let form = reactive({
  name: "",
  start_date: "",
  start_time: "",
  end_time: "",
  room: "",
  course: {
    _id: "",
  },
  days: "",
  status: true,
  teacher: "",
});

const date_time_picker = reactive({
  date: "",
  time: [
    moment(new Date()).format("HH:mm"),
    moment(new Date()).format("HH:mm"),
  ],
});

console.log(new Date());

const dialog = ref(false);
const dialog2 = ref(false);
const title = ref("Add New Group");
const ID = ref("");
const current_date = new Date();
//---------------------

//-------
const value1 = ref("");
const courses = ref();
const getSelected = (e) => {
  console.log(e);
};
const teachers = ref([]);

//----------------------

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
    teachers.value = null;
    form = reactive({
      name: "",
      start_date: "",
      start_time: "",
      end_time: "",
      room: "",
      course: {
        _id: "",
      },
      days: "",
      status: true,
      teacher: "",
    });
    title.value = "Add New Group";
  }
});
const IDD = ref("");

const openModal = (item) => {
  if (item) {
    form = { ...item };

    title.value = "Edit Group";
    console.log(form, "forms");
  }
  dialog.value = true;
};

const closeModal = () => {
  dialog.value = false;
  teachers.value = [];
  form = reactive({
    name: "",
    start_date: "",
    start_time: "",
    end_time: "",
    room: "",
    course: {
      _id: "",
    },
    days: "",
    status: true,
    teacher: "",
  });
};

const save = () => {};

const schema = computed(() => {
  return {
    last_name: "required|min:3|max:30",
    first_name: "required|min:3|max:30",
    phone: "required|phone:19",
  };
});
console.log(dialog2.value);

onMounted(async () => {
  await coursesStore.getCourses();
  courses.value = coursesStore.courses;
});

const getAvailableRooms = async (data) => {
  console.log(data);
  // const res = await store.getAvailableRooms({...data})
  // console.log(res);
};

const send = async (data) => {
  console.log(data);
  teachers.value = await coursesStore.getTeacherByCourse(data);
};

const deleteGroup = async () => {
  const res = await store.deleteGroup(ID.value);
  if (res) {
    success("Deleted successfully");
  } else {
    danger("Delete failed");
  }
  dialog2.value = false;
  location.reload();
};

const deleteGroupModal = (id) => {
  ID.value = id;
  // await store.deleteGroup(ID.value);
  dialog2.value = true;
  console.log(dialog2.value);
};

const getRooms = async () => {
  const payload = {
    start_date: form.start_date,
    start_time: getTimeInMinutes(date_time_picker.time[0]),
    end_time: getTimeInMinutes(date_time_picker.time[1]),
    days: form.days,
  };
  await store.getAvailableRooms(payload);
};

const addGroup = async () => {
  // form = {...form,start_date:date_time_picker.date,start_time:date_time_picker.time[0],end_time:date_time_picker.time[1]}
  const startTime = getTimeInMinutes(date_time_picker.time[0]);
  const endTime = getTimeInMinutes(date_time_picker.time[1]);
  console.log(form, startTime, endTime);
  console.log(form.start_date);
  // if (forms.value?._id) {
  //   const res = await store.updateGroup(
  //     {
  //       ...value,
  //       phone: value.phone
  //         .split("")
  //         .filter((char) => char === "+" || !isNaN(+char))
  //         .join(""),
  //     },
  //     forms.value?._id
  //   );
  //   if (res) {
  //     success("successfully updated ");
  //     dialog.value = false;
  //     location.reload();
  //   } else {
  //     console.log(store.error, "error");
  //     danger(store.error.message);
  //   }
  // } else {
  const res = await store.addGroup({
    ...form,
    course: form.course._id,
    start_time: startTime,
    end_time: endTime,
  });
  const addTeacher = await store.addTeacherToGroup({
    group: res.group._id,
    teacher: form.teacher,
  });
  // console.log(res.group);
  if (res) {
    success("successfully added ");
    dialog.value = false;
    // location.reload();
  } else {
    danger(store.error);
  }
  // }
};

defineExpose({ openModal, closeModal, deleteGroupModal });
</script>

<style lang="scss" scoped></style>
