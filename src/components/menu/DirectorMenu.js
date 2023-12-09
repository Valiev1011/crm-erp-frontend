import {
  mdiAccount,
  mdiAccountGroup,
  mdiDoorOpen,
  mdiCog,
  mdiBook,
} from "@mdi/js";

export const DirectorMenu = [
  {
    path: "/staff",
    name: "staff",
    label: "Staff",
    keys: "staff",
    icon: mdiAccountGroup,
  },
  {
    path: "/director_profile",
    name: "director_profile",
    label: "Profile",
    keys: "director_profile",
    icon: mdiCog,
  },
];
