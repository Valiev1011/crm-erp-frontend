import {
  mdiAccount,
  mdiAccountGroup,
  mdiDoorOpen,
  mdiCog,
  mdiBook,
} from "@mdi/js";

export const AdminMenu = [
  {
    path: "/students",
    name: "students",
    label: "Students",
    keys: "students",
    icon: mdiAccount,
  },
  {
    path: "/groups",
    name: "groups",
    label: "Groups",
    keys: "groups",
    icon: mdiAccountGroup,
  },
  {
    path: "/courses",
    name: "courses",
    label: "Courses",
    keys: "courses",
    icon: mdiBook,
  },
  {
    path: "/rooms",
    name: "rooms",
    label: "Rooms",
    keys: "rooms",
    icon: mdiDoorOpen,
  },
  {
    path: "/profile",
    name: "profile",
    label: "Profile",
    keys: "profile",
    icon: mdiCog,
  },
];
