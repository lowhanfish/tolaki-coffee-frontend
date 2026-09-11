'use client'

import Link from 'next/link'
import Highcharts from 'highcharts'
import 'highcharts/modules/accessibility'
import HighchartsReact from 'highcharts-react-official'
import {
    BsArrowDownRight,
    BsArrowUpRight,
    BsBoxSeam,
    BsCart3,
    BsChevronRight,
    BsClockHistory,
    BsEnvelope,
    BsEye,
    BsNewspaper,
    BsPeople,
    BsPlusLg,
} from 'react-icons/bs'

const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value)

const summaryCards = [
    {
        title: 'Total Pendapatan',
        value: formatRupiah(18450000),
        note: 'dibanding bulan lalu',
        change: '+12,5%',
        positive: true,
        icon: BsCart3,
        iconClass: 'bg-amber-100 text-amber-700',
    },
    {
        title: 'Produk Aktif',
        value: '24',
        note: '3 stok hampir habis',
        change: '+2',
        positive: true,
        icon: BsBoxSeam,
        iconClass: 'bg-emerald-100 text-emerald-700',
    },
    {
        title: 'Mitra Petani',
        value: '38',
        note: 'dibanding bulan lalu',
        change: '+5,6%',
        positive: true,
        icon: BsPeople,
        iconClass: 'bg-sky-100 text-sky-700',
    },
    {
        title: 'Pesan Masuk',
        value: '17',
        note: '5 belum dibaca',
        change: '-8,2%',
        positive: false,
        icon: BsEnvelope,
        iconClass: 'bg-rose-100 text-rose-700',
    },
]

const salesOptions: Highcharts.Options = {
    chart: {
        type: 'areaspline',
        height: 310,
        backgroundColor: 'transparent',
        spacing: [16, 8, 8, 0],
    },
    title: { text: undefined },
    credits: { enabled: false },
    legend: {
        align: 'right',
        verticalAlign: 'top',
        itemStyle: { color: '#525252', fontSize: '11px', fontWeight: '500' },
        symbolRadius: 8,
    },
    xAxis: {
        categories: ['Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
        tickLength: 0,
        lineColor: '#e5e5e5',
        labels: { style: { color: '#737373', fontSize: '11px' } },
    },
    yAxis: {
        title: { text: undefined },
        min: 0,
        gridLineColor: '#f1f1f1',
        labels: {
            style: { color: '#737373', fontSize: '11px' },
            formatter() {
                return `${Number(this.value) / 1000000} jt`
            },
        },
    },
    tooltip: {
        shared: true,
        borderWidth: 0,
        borderRadius: 8,
        shadow: true,
        valuePrefix: 'Rp ',
        valueDecimals: 0,
    },
    plotOptions: {
        areaspline: {
            lineWidth: 3,
            marker: { enabled: false, symbol: 'circle' },
            states: { hover: { lineWidth: 3 } },
            fillOpacity: 0.12,
        },
    },
    colors: ['#c37c01', '#d4d4d4'],
    series: [
        {
            type: 'areaspline',
            name: '2026',
            data: [8200000, 10500000, 9800000, 13200000, 12600000, 15700000, 18450000],
        },
        {
            type: 'areaspline',
            name: '2025',
            data: [6800000, 7400000, 8100000, 9200000, 10300000, 11100000, 12000000],
        },
    ],
}

const stockOptions: Highcharts.Options = {
    chart: {
        type: 'pie',
        height: 220,
        backgroundColor: 'transparent',
        spacing: [0, 0, 0, 0],
    },
    title: {
        text: '156',
        align: 'center',
        verticalAlign: 'middle',
        y: 4,
        style: { color: '#262626', fontSize: '24px', fontWeight: '700' },
    },
    subtitle: {
        text: 'Total Stok',
        align: 'center',
        verticalAlign: 'middle',
        y: 27,
        style: { color: '#737373', fontSize: '10px' },
    },
    credits: { enabled: false },
    tooltip: { pointFormat: '<b>{point.y} pack</b>' },
    plotOptions: {
        pie: {
            innerSize: '72%',
            borderWidth: 4,
            borderColor: '#ffffff',
            dataLabels: { enabled: false },
            showInLegend: false,
        },
    },
    colors: ['#c37c01', '#f2b84b', '#fde68a', '#e5e5e5'],
    series: [
        {
            type: 'pie',
            name: 'Stok',
            data: [
                { name: 'Arabica', y: 52 },
                { name: 'Robusta', y: 46 },
                { name: 'Kopi Tolaki', y: 38 },
                { name: 'Lainnya', y: 20 },
            ],
        },
    ],
}

const activities = [
    {
        icon: BsCart3,
        title: 'Pesanan baru diterima',
        detail: '#INV-0926 senilai Rp 850.000',
        time: '8 menit lalu',
        color: 'bg-amber-100 text-amber-700',
    },
    {
        icon: BsNewspaper,
        title: 'Artikel berhasil diterbitkan',
        detail: 'Panen Raya Kopi Konawe 2026',
        time: '1 jam lalu',
        color: 'bg-sky-100 text-sky-700',
    },
    {
        icon: BsPeople,
        title: 'Mitra petani ditambahkan',
        detail: 'Kelompok Tani Mekar Jaya',
        time: '3 jam lalu',
        color: 'bg-emerald-100 text-emerald-700',
    },
    {
        icon: BsEnvelope,
        title: 'Pesan pelanggan masuk',
        detail: 'Permintaan informasi kemitraan',
        time: 'Kemarin',
        color: 'bg-rose-100 text-rose-700',
    },
]

const quickActions = [
    { title: 'Tambah Produk', detail: 'Buat katalog baru', href: '/secure/products', icon: BsBoxSeam },
    { title: 'Tulis Berita', detail: 'Terbitkan artikel', href: '/secure/news', icon: BsNewspaper },
    { title: 'Kelola Mitra', detail: 'Perbarui data petani', href: '/secure/farmer/headline-impact', icon: BsPeople },
    { title: 'Lihat Pesan', detail: 'Tanggapi pelanggan', href: '/secure/contact', icon: BsEnvelope },
]

const stockLegend = [
    { name: 'Arabica', value: 52, color: 'bg-[#c37c01]' },
    { name: 'Robusta', value: 46, color: 'bg-[#f2b84b]' },
    { name: 'Kopi Tolaki', value: 38, color: 'bg-[#fde68a]' },
    { name: 'Lainnya', value: 20, color: 'bg-neutral-200' },
]

const Page = () => {
    const today = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Makassar',
    }).format(new Date())

    return (
        <main className='min-h-full space-y-3 pb-3'>
            <section className='relative overflow-hidden rounded-lg bg-linear-to-r from-neutral-900 via-neutral-800 to-amber-900 px-5 py-5 text-white shadow-sm'>
                <div className='absolute -right-10 -top-16 h-44 w-44 rounded-full border-30 border-amber-400/10' />
                <div className='absolute right-24 -bottom-16 h-32 w-32 rounded-full bg-amber-400/10' />
                <div className='relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                    <div>
                        <p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-400'>Kopi Tolaki Admin</p>
                        <h1 className='mt-1 text-2xl font-bold'>Selamat datang kembali, Kiken!</h1>
                        <p className='mt-1 text-[12px] text-white/65'>Berikut ringkasan perkembangan bisnis Anda hari ini.</p>
                    </div>
                    <div className='rounded-md border border-white/10 bg-white/8 px-4 py-2 backdrop-blur-sm'>
                        <p className='text-[10px] uppercase tracking-wider text-white/50'>Hari ini</p>
                        <p className='mt-0.5 text-[12px] font-semibold'>{today}</p>
                    </div>
                </div>
            </section>

            <section className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'>
                {summaryCards.map((item) => {
                    const Icon = item.icon
                    const ChangeIcon = item.positive ? BsArrowUpRight : BsArrowDownRight

                    return (
                        <article key={item.title} className='rounded-lg border border-neutral-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'>
                            <div className='flex items-start justify-between'>
                                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconClass}`}>
                                    <Icon className='text-[18px]' />
                                </div>
                                <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${item.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                    <ChangeIcon />
                                    <span>{item.change}</span>
                                </div>
                            </div>
                            <p className='mt-4 text-[11px] font-medium text-neutral-500'>{item.title}</p>
                            <p className='mt-0.5 text-[22px] font-bold tracking-tight text-neutral-800'>{item.value}</p>
                            <p className='mt-1 text-[10px] text-neutral-400'>{item.note}</p>
                        </article>
                    )
                })}
            </section>

            <section className='grid grid-cols-12 gap-3'>
                <article className='col-span-12 rounded-lg border border-neutral-100 bg-white p-4 shadow-sm xl:col-span-8'>
                    <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                        <div>
                            <p className='text-[15px] font-bold text-neutral-800'>Tren Penjualan</p>
                            <p className='mt-0.5 text-[11px] text-neutral-400'>Perbandingan pendapatan tujuh bulan terakhir</p>
                        </div>
                        <div className='rounded-md bg-amber-50 px-3 py-2 text-right'>
                            <p className='text-[10px] text-amber-700'>Bulan ini</p>
                            <p className='text-[13px] font-bold text-amber-800'>{formatRupiah(18450000)}</p>
                        </div>
                    </div>
                    <HighchartsReact highcharts={Highcharts} options={salesOptions} />
                </article>

                <article className='col-span-12 rounded-lg border border-neutral-100 bg-white p-4 shadow-sm xl:col-span-4'>
                    <div>
                        <p className='text-[15px] font-bold text-neutral-800'>Komposisi Stok</p>
                        <p className='mt-0.5 text-[11px] text-neutral-400'>Persediaan produk yang tersedia</p>
                    </div>
                    <HighchartsReact highcharts={Highcharts} options={stockOptions} />
                    <div className='grid grid-cols-2 gap-x-5 gap-y-3'>
                        {stockLegend.map((item) => (
                            <div key={item.name} className='flex items-center gap-2'>
                                <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                                <div className='flex-1'>
                                    <p className='text-[10px] text-neutral-400'>{item.name}</p>
                                    <p className='text-[12px] font-bold text-neutral-700'>{item.value} pack</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            <section className='grid grid-cols-12 gap-3'>
                <article className='col-span-12 rounded-lg border border-neutral-100 bg-white p-4 shadow-sm lg:col-span-7'>
                    <div className='flex items-center justify-between border-b border-neutral-100 pb-3'>
                        <div>
                            <p className='text-[15px] font-bold text-neutral-800'>Aktivitas Terbaru</p>
                            <p className='mt-0.5 text-[11px] text-neutral-400'>Pembaruan terkini dari seluruh sistem</p>
                        </div>
                        <BsClockHistory className='text-[18px] text-amber-600' />
                    </div>
                    <div className='divide-y divide-neutral-100'>
                        {activities.map((item) => {
                            const Icon = item.icon

                            return (
                                <div key={item.title} className='flex items-center gap-3 py-3'>
                                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.color}`}>
                                        <Icon className='text-[15px]' />
                                    </div>
                                    <div className='min-w-0 flex-1'>
                                        <p className='truncate text-[12px] font-bold text-neutral-700'>{item.title}</p>
                                        <p className='truncate text-[10px] text-neutral-400'>{item.detail}</p>
                                    </div>
                                    <p className='shrink-0 text-[10px] text-neutral-400'>{item.time}</p>
                                </div>
                            )
                        })}
                    </div>
                </article>

                <article className='col-span-12 rounded-lg border border-neutral-100 bg-white p-4 shadow-sm lg:col-span-5'>
                    <div className='flex items-center justify-between border-b border-neutral-100 pb-3'>
                        <div>
                            <p className='text-[15px] font-bold text-neutral-800'>Akses Cepat</p>
                            <p className='mt-0.5 text-[11px] text-neutral-400'>Kelola konten utama lebih cepat</p>
                        </div>
                        <BsPlusLg className='text-[18px] text-amber-600' />
                    </div>
                    <div className='grid grid-cols-1 gap-2 pt-3 sm:grid-cols-2'>
                        {quickActions.map((item) => {
                            const Icon = item.icon

                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className='group flex items-center gap-3 rounded-md border border-neutral-100 bg-neutral-50/70 p-3 transition hover:border-amber-200 hover:bg-amber-50'
                                >
                                    <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-amber-700 shadow-sm'>
                                        <Icon className='text-[16px]' />
                                    </div>
                                    <div className='min-w-0 flex-1'>
                                        <p className='text-[11px] font-bold text-neutral-700'>{item.title}</p>
                                        <p className='text-[9px] text-neutral-400'>{item.detail}</p>
                                    </div>
                                    <BsChevronRight className='text-[11px] text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-amber-600' />
                                </Link>
                            )
                        })}
                    </div>

                    <div className='mt-3 flex items-center justify-between rounded-md bg-linear-to-r from-amber-700 to-yellow-600 p-3 text-white'>
                        <div className='flex items-center gap-3'>
                            <div className='flex h-9 w-9 items-center justify-center rounded-full bg-white/15'>
                                <BsEye />
                            </div>
                            <div>
                                <p className='text-[10px] text-white/70'>Kunjungan website</p>
                                <p className='text-[16px] font-bold'>1.284 <span className='text-[9px] font-normal text-white/60'>bulan ini</span></p>
                            </div>
                        </div>
                        <div className='flex items-center gap-1 text-[10px] font-bold text-emerald-100'>
                            <BsArrowUpRight />
                            18,4%
                        </div>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default Page
