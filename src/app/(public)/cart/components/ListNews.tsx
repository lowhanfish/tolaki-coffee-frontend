"use client"
import CardNews from "@/components/items/CardNews"
import Pagination from "@/components/items/Pagination";
import { BsArrowRight } from "react-icons/bs";


const List = [
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

const ListNews = () => {
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <div className='col-span-1'>
                    <p className="text-[12px]">Menampilkan 1-12 dari 36 artikel</p>
                </div>
                <div className='col-span-1 flex justify-end items-end'>
                    <button className="
                        w-full md:w-50 p-2  
                        rounded-4xl border-[0.5px] border-neutral-400 
                        cursor-pointer 
                        flex items-center justify-center gap-3 
                        shadow-2xl
                        hover:bg-neutral-300
                    ">
                        <p className="text-[12px] font-bold">Terbaru</p>
                        <BsArrowRight />
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 pt-2'>
                {
                    List.map((item, index) => (
                        <div key={item.id} className='col-span-1 '>
                            <CardNews
                                id={item.id}
                                description={item.description}
                                title={item.title}
                                file={item.file}
                            />
                        </div>

                    ))
                }

            </div>

            <div className='flex justify-center items-center pt-10'>
                <div className=''>
                    <Pagination total={999} limit={5} />
                </div>
            </div>
        </div>
    )
}

export default ListNews
