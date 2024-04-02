import moneyIcon from "assets/icons/money-bag.svg";
import asosiy from "./icons/AsosiyIcon.png";
import filiallar from "./icons/FiliallarIcon.png";
import mahsulot from "./icons/MahsulotIcon.png";
import sozlamalar from "./icons/SozlamalarIcon.png";
import statistika from "./icons/StatistikaIcon.png";
import archive from "./icons/archive.png";
import clients from "./icons/client3.png";
import employee from "./icons/employes.png";

export const menus = {
  admin: [
    {
      title: "Asosiy",
      path: "/",
      icon: asosiy,
    },
    {
      title: "Mijozlar",
      path: "/clients",
      icon: clients,
    },
    {
      title: "Mahsulotlar",
      path: "/products",
      icon: mahsulot,
    },
    {
      title: "Xodimlar",
      path: "/employee",
      icon: employee,
    },
    {
      title: "Filiallar",
      path: "/branches",
      icon: filiallar,
    },
    {
      title: "Statistika",
      path: "/statistics",
      icon: statistika,
    },
    {
      title: "Arxiv",
      path: "/archive",
      icon: archive,
    },
    {
      title: "Sozlamalar",
      path: "/settings",
      icon: sozlamalar,
    },
  ],
  manager: [
    {
      title: "Filiallar",
      path: "/",
      icon: filiallar,
    },
    {
      title: "Mahsulotlar",
      path: "/products",
      icon: mahsulot,
    },
    {
      title: "Mijozlar",
      path: "/clients",
      icon: clients,
    },
    {
      title: "Topshiriqlar",
      path: "/tasks",
      icon: mahsulot,
    },
    {
      title: "Xodimlar",
      path: "/employee",
      icon: employee,
    },
    //  {
    //    title: "Statistika",
    //    path: "/statistics",
    //    icon: statistika,
    //  },
    {
      title: "Arxiv",
      path: "/archive",
      icon: archive,
    },
    //  {
    //    title: "Sozlamalar",
    //    path: "/settings",
    //    icon: sozlamalar,
    //  },
  ],
};

export const cart_data = [
  {
    cart_text: "Daromadlar",
    total_amount: 26520000000,
    r_b_amount: -2525,
    icon: moneyIcon,
  },
  {
    cart_text: "Xarajatlar",
    total_amount: 252,
    r_b_amount: -22,  
    icon: moneyIcon,
  },
  {
    cart_text: "Chiqimlar",
    total_amount: 23,
    r_b_amount: 10,
    icon: moneyIcon,
  },
];

export const data = {
  labels: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun"],
  datasets: [
    {
      label: "Mijozlar soni",
      data: [65, 59, 80, 45, 56, 55],
      backgroundColor: ["orange", "blue", "red", "purple", "green", "pink"],
      borderColor: ["blue", "red", "purple", "green"],
      borderWidth: 1,
    },
  ],
};
export const data1 = {
  labels: ["Yanvar", "Fevral", 'September', 'Oktober', 'Novermber', 'December'],
  datasets: [
    {
      label: "Mijozlar soni",
      data: [65, 59, 80, 45, 56, 55, 68, 90, 67, 34, 23],
      backgroundColor: ["orange", "blue", "red", "purple", "green", 'pink'],
      borderColor: ["blue", "red", "purple", "green"],
      borderWidth: 1,
    },
    {
      label: "Mahsulotlar soni",
      data: [35, 69, 80, 5, 56, 5, 68, 0, 67, 34, 23, 89],
      backgroundColor: ["orange", "blue", "red", "purple", "green", 'pink'],
      borderColor: ["blue", "red", "purple", "green"],
      borderWidth: 1,
    },
    {
      label: "Zakazlar  soni",
      data: [35, 69, 80, 5, 56, 5, 68, 0, 67, 34, 23, 89],
      backgroundColor: ["orange", "blue", "red", "purple", "green", 'pink'],
      borderColor: ["blue", "red", "purple", "green"],
      borderWidth: 1,
    },
  ],
};



