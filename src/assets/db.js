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

const labels = ["January", "February", "March", "April", "May", "June", "July"];
export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 2",
      data: [65, 59, 80, 45, 56, 55, 40],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [23, 49, 60, 35, 66, 45, 30],
      backgroundColor: "rgba(153,88,246)",
    },
  ],
};
