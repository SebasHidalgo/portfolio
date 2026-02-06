export const navLinks = [
  {
    id: 1,
    name: "Portfolio",
  },
  {
    id: 2,
    name: "Contact",
  },
  {
    id: 3,
    name: "Projects",
  },
];

export const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
    isClickable: false,
  },
  {
    id: 2,
    img: "/icons/search.svg",
    isClickable: false,
  },
  {
    id: 3,
    img: "/icons/user.svg",
    isClickable: false,
  },
  {
    id: 4,
    img: "/icons/mode.svg",
    isClickable: true,
  },
];

export const dockApps = [
  {
    id: "finder",
    name: "Portfolio",
    icon: "/images/finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles",
    icon: "/images/safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery",
    icon: "/images/photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact",
    icon: "/images/contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills",
    icon: "/images/terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive",
    icon: "/images/trash.png",
    canOpen: false,
  },
];

export const initialZIndex = 1000;

export const windowConfig = {
  finder: { isOpen: false, zIndex: initialZIndex, data: null },
  contact: { isOpen: false, zIndex: initialZIndex, data: null },
  resume: { isOpen: false, zIndex: initialZIndex, data: null },
  safari: { isOpen: false, zIndex: initialZIndex, data: null },
  photos: { isOpen: false, zIndex: initialZIndex, data: null },
  terminal: { isOpen: false, zIndex: initialZIndex, data: null },
  txtfile: { isOpen: false, zIndex: initialZIndex, data: null },
  imgfile: { isOpen: false, zIndex: initialZIndex, data: null },
};
