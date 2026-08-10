import React from 'react'
import { FaSearch } from "react-icons/fa";
import CardNewsList from '@/components/items/CardNewsList'


const KategoriList = [
    { id: "1", title: "Semua Kategori" },
    { id: "2", title: "Berita Perusahaan" },
    { id: "3", title: "Produk" },
    { id: "4", title: "Petani & Kemitraan" },
    { id: "5", title: "Semua Kategori" },
    { id: "6", title: "Edukasi Kopi" },
    { id: "7", title: "Event & Kegiatan" },
]

const ListNews = [
    {
        id: "1",
        title: "Mendukung Petani Lokal, Menjaga Kualitas Kopi Tolaki",
        description: "Kami terus berkomitmen mendampingi petani kopi di Sulawesi Tenggara untuk menghasilkan kopi berkualitas tinggi dan berkelanjutan.",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "2",
        title: "Panen Kopi Berkualitas, Langkah Awal Rasa yang Istimewa",
        description: "Proses panen yang tepat waktu dan selektif menjadi kunci utama dalam menjaga cita rasa kopi terbaik.",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "3",
        title: "Kopi Tolaki Premium dengan Kemasan Baru",
        description: "Tampilan baru, rasa tetap istimewa. Nikmati pengalaman ngopi yang lebih berkesan.",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "4",
        title: "Pelatihan Petani: Tingkatkan Kualitas, Tingkatkan Kesejahteraan",
        description: "Kegiatan pelatihan rutin untuk petani mitra kami dalam budidaya kopi berkelanjutan.",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "5",
        title: "Komitmen Kami pada Proses yang Berkelanjutan",
        description: "Dari hulu ke hilir, setiep proses kami rancang untuk menjaga kualitas dan kelestarian lingkungan.",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "6",
        title: "Mengenal Single Origin: Apa dan Mengapa Istimewa?",
        description: "Pelajari lebih dalam tentang kopi single origin dan keunikan rasa dari setiap daerah.",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "7",
        title: "Kopi Tolaki Hadir di Festival Kopi Nusantara 2025?",
        description: "Terima kasih kepada semua yang telah berkunjung dan mendukung kami di acara ini!",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "8",
        title: "Cerita Pak La Ode: Dari Petani hingga Mitra Kopi Tolaki",
        description: "Perjalanan inspiratif salah satu petani mitra kami yang penuh dedikasi dan semangat.",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },
    {
        id: "9",
        title: "Tips Menyimpan Kopi agar Tetap Segar dan Nikmat",
        description: "Cara sederhana untuk menjaga kesegaran kopi bubuk maupun biji kopi di rumah.",
        file: "/images/about.jpg",
        date: "2 Agustus 2026"
    },

]


const SideBarNews = () => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='border-[0.5px] border-neutral-400 rounded-2xl p-5'>
                <p className='text-[18px] font-bold'>Kategori</p>

                <div className='border border-neutral-400 h-10 rounded-2xl relative flex items-center'>
                    <input type="text" className='z-1 w-full h-full rounded-2xl px-3 bg1' />
                    <FaSearch className='absolute z-9 right-2 text-neutral-400' />
                </div>

                <div className='flex flex-col gap-2 pt-3'>
                    {
                        KategoriList.map((item) => (

                            <label key={item.id} className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type="radio"
                                    name='gender'
                                    className='h-5 w-5 accent-amber-600 cursor-pointer bg '
                                />
                                <span className='text-[12px] font-semibold text-neutral-600 '>{item.title}</span>
                            </label>
                        ))
                    }

                </div>

            </div>

            <div className='border-[0.5px] border-neutral-400 rounded-2xl p-5'>
                <p className='text-[18px] font-bold'>Berita Populer</p>

                <div className='flex flex-col gap-5 lg:gap-3  pt-3'>
                    {
                        ListNews.map((item, index) => (
                            <div key={item.id}>
                                <CardNewsList
                                    title={item.title}
                                    file={item.file}
                                    date={item.date}
                                />
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default SideBarNews
