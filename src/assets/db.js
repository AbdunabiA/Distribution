import asosiy from './icons/AsosiyIcon.png'
import bigLeap from './icons/BigLeapIcon.png'
import filiallar from './icons/FiliallarIcon.png'
import mahsulot from './icons/MahsulotIcon.png'
import pulAylanmasi from './icons/PulAylanmasiIcon.png'
import qollabQuvvatlash from './icons/QollabQuvvatlashIcon.png'
import sozlamalar from './icons/SozlamalarIcon.png'
import statistika from './icons/StatistikaIcon.png'
import obunalar from './icons/obunalarIcon.png'
import shoppingCart from './icons/ShoppingCart.png'

export const carts = [
					{
						cart_text: 'Daromadlar',
						total_amount: 5.402,
						r_b_amount: 34,
					},
					{
						cart_text: 'Kirim',
						total_amount: 244,
						r_b_amount: -23,
					},
				]

export const menus = {
					admin: [
						{
							title: 'Asosiy',
							path: '/',
							icon: asosiy,
						},
						{
							title: 'Filiallar',
							path: '/branches',
							icon: filiallar,
						},
						{
							title: 'Mahsulotlar',
							path: '/products',
							icon: mahsulot,
						},
						{
							title: 'Arxiv',
							path: '/users',
							icon: statistika,
						},
						{
							title: 'Xodimlar',
							path: '/money-circulation',
							icon: pulAylanmasi,
						},
						{
							title: 'Statistika',
							path: '/statistics',
							icon: statistika,
						},
						{
							title: 'Obunalar',
							path: '/subscriptions',
							icon: obunalar,
						},
					],
					ordinary_user: [
						{
							title: 'Asosiy',
							path: '/',
							icon: asosiy,
						},
						{
							title: 'Mahsulotlar',
							path: '/products',
							icon: mahsulot,
						},
						{
							title: 'Pul aylanmasi',
							path: '/money-circulation',
							icon: pulAylanmasi,
						},
						{
							title: 'Obunalar',
							path: '/subscriptions',
							icon: obunalar,
						},
						{
							title: 'Buyurtmalar',
							path: '/orders',
							icon: shoppingCart,
						},
					],
					employee: [
						{
							title: 'Asosiy',
							path: '/',
							icon: asosiy,
						},
						{
							title: 'Filiallar',
							path: '/branches',
							icon: filiallar,
						},
						{
							title: 'Mahsulotlar',
							path: '/products',
							icon: mahsulot,
						},
						//  {
						//    title: "Pul aylanmasi",
						//    path: "/money-circulation",
						//    icon: pulAylanmasi,
						//  },
						//  {
						//    title: "Statistika",
						//    path: "/statistics",
						//    icon: statistika,
						//  },
						{
							title: 'Obunalar',
							path: '/subscriptions',
							icon: obunalar,
						},
					],
				}

export const helpers = {
	admin: [
		{
			title: 'Sozlamalar',
			path: '/settings',
			icon: sozlamalar,
		},
		{
			title: "Qo'llab quvvatlash",
			path: '/',
			icon: qollabQuvvatlash,
		},
	],
	ordinary_user: [
		{
			title: 'Sozlamalar',
			path: '/',
			icon: sozlamalar,
		},
		{
			title: "Qo'llab quvvatlash",
			path: '/',
			icon: qollabQuvvatlash,
		},
	],
	employee: [
		{
			title: 'Sozlamalar',
			path: '/',
			icon: sozlamalar,
		},
		{
			title: "Qo'llab quvvatlash",
			path: '/',
			icon: qollabQuvvatlash,
		},
	],
}

export const mahsulotTarqatish2 = [
	{
		date: '11/11/2022',
		product: 'Ofiyst',
		amount: 400,
		branch: "Farg'ona",
		overallPayment: 10000000,
	},
	{
		date: '11/12/2022',
		product: 'Ofiyst',
		amount: 400,
		branch: "Qo'qon",
		overallPayment: 15000000,
	},
	{
		date: '11/11/2022',
		product: 'Ofiyst',
		amount: 400,
		branch: 'Andijon',
		overallPayment: 1000000,
	},
	{
		date: '11/11/2022',
		product: 'Ofiyst',
		amount: 400,
		branch: 'Namangan',
		overallPayment: 10000000,
	},
	{
		date: '11/11/2022',
		product: 'Ofiyst',
		amount: 400,
		branch: "Farg'ona",
		overallPayment: 10000000,
	},
	{
		date: '11/11/2022',
		product: 'Ofiyst',
		amount: 400,
		branch: 'Toshkent',
		overallPayment: 10000000,
	},
]

export const obunachilar = [
	{
		id: 1,
		full_name: 'Alimov Abror Xabibullayevich',
		subscription: 30000000,
		all_bonus: 7000000,
		clean_out: 5000000,
		date: '15.01.2023',
		status: 'Faol',
	},
	{
		id: 2,
		full_name: 'Alimov Abror Xabibullayevich',
		subscription: 3000000,
		all_bonus: 700000,
		clean_out: 0,
		date: '15.01.2023',
		status: 'Faol emas',
	},
	{
		id: 3,
		full_name: 'Alimov Abror Xabibullayevich',
		subscription: 300000,
		all_bonus: 70000,
		clean_out: 5000,
		date: '15.01.2023',
		status: "To'xtatilgan",
	},
	{
		id: 4,
		full_name: 'Alimov Abror Xabibullayevich',
		subscription: 300000,
		all_bonus: 0,
		clean_out: 500000,
		date: '15.01.2023',
		status: 'Bekor qilingan',
	},
	{
		id: 5,
		full_name: 'Alimov Abror Xabibullayevich',
		subscription: 30000000,
		all_bonus: 7000000,
		clean_out: 5000000,
		date: '15.01.2023',
		status: 'Faol',
	},
]

export const moliyaviyMalumotlar = [
	{
		subscription: 100000000,
		kiritilgan_summa: 150000000,
		yechilgan_summa: 10000000,
		jami_bonus: 6000000,
		debet: 60000000,
	},
	{
		date: '15.01.2023',
		subscription: 1000000,
		kiritilgan_summa: 15000000,
		yechilgan_summa: 10000000,
		jami_bonus: 6000000,
		debet: 30000000,
	},
	{
		date: '15.01.2023',
		subscription: 1000000,
		kiritilgan_summa: 15000000,
		yechilgan_summa: 10000000,
		jami_bonus: 6000000,
		debet: 30000000,
	},
	{
		date: '15.01.2023',
		subscription: 1000000,
		kiritilgan_summa: 15000000,
		yechilgan_summa: 10000000,
		jami_bonus: 6000000,
		debet: 30000000,
	},
	{
		date: '15.01.2023',
		subscription: 1000000,
		kiritilgan_summa: 15000000,
		yechilgan_summa: 10000000,
		jami_bonus: 6000000,
		debet: 30000000,
	},
	{
		date: '15.01.2023',
		subscription: 1000000,
		kiritilgan_summa: 15000000,
		yechilgan_summa: 10000000,
		jami_bonus: 6000000,
		debet: 30000000,
	},
]

export const subscriptionsInfo = [
	{
		id: 1,
		title: 'Bronza',
		sum: 1000000,
		duration: 30,
		cashback: 1,
		subscribers: 100,
		status: 'aktiv',
	},
	{
		id: 2,
		title: 'Bronza',
		sum: 1000000,
		duration: 30,
		cashback: 1,
		subscribers: 100,
		status: 'aktiv',
	},
	{
		id: 3,
		title: 'Bronza',
		sum: 1000000,
		duration: 30,
		cashback: 1,
		subscribers: 100,
		status: 'aktiv',
	},
	{
		id: 4,
		title: 'Bronza',
		sum: 1000000,
		duration: 30,
		cashback: 1,
		subscribers: 100,
		status: 'aktiv',
	},
]
