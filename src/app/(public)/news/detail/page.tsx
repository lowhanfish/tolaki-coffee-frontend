import HeaderPage from '@/components/HeaderPage'
import SideBarNews from '../components/SideBarNews'
import CardNewsList from '@/components/items/CardNewsList'
import { FaSearch } from "react-icons/fa";



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

const page = () => {
    return (
        <div className='bg relative '>
            <div className=''>
                <HeaderPage height='h-20' image={`/images/header_product7.webp`}>
                    <div className='z-2 flex flex-col items-center justify-center'>
                        <p className='text-[45px]'>Anoa Coffee</p>
                        <p className='-mt-2'>Product kami</p>
                    </div>
                </HeaderPage>
            </div>

            <div className='min-h-75 px-5 md:px-10 xl:px-38 py-5 xl:py-10 text-neutral-800'>
                <p className='text-[32px] font-bold'>Semua Berita</p>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-5 pt-3'>
                    <div className='col-span-1 lg:col-span-9'>
                        <p>


                            Lorem ipsum dolor sit amet, qui consectetur ut culpa laboris non. In aute ex deserunt officia fugiat magna dolor in exercitation. Laborum laborum cillum ut excepteur aliqua sed ut. Proident laborum nulla nostrud ullamco minim duis anim cupidatat officia.
                            Proident qui non cupidatat quis ex velit nostrud ut dolore voluptate laboris. Cillum ullamco incididunt deserunt mollit ut dolore enim ea. Consequat proident eiusmod velit consequat voluptate dolore magna. Est sunt minim duis laborum ea enim laborum in aliqua exercitation dolore et.
                            Enim commodo est officia sint anim irure irure do. Ut enim pariatur consequat aliqua minim eu irure cillum cillum excepteur in. Irure irure minim in consectetur esse non non in aliqua velit quis. Adipiscing tempor irure excepteur est occaecat pariatur ut.
                            Id minim in commodo nostrud in nostrud occaecat qui ex. Culpa nulla reprehenderit cupidatat pariatur laboris anim in consequat. Quis ad enim veniam dolore tempor in voluptate ullamco quis. Aliquip qui non duis dolore in in eu elit tempor non. Occaecat sint adipiscing nulla commodo adipiscing sunt pariatur pariatur id.
                            Nisi ea magna aute in est sunt qui ea ut in pariatur commodo. Aliquip ut incididunt nostrud do veniam veniam ex voluptate. Adipiscing aliquip aliqua quis in ut labore ut deserunt laboris. Et commodo laborum officia anim dolore officia tempor ea enim excepteur. In culpa nostrud officia elit velit dolor laboris ea consectetur fugiat consectetur sed.



                        </p>
                    </div>
                    <div className='col-span-1 lg:col-span-3 '>
                        <div className='flex flex-col gap-3'>


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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
