import CardNews from "@/components/items/CardNews"
import { BsArrowRight } from "react-icons/bs";

const List = [
    {
        id: "1",
        title: "Mendukung Petani Lokal, Menjaga Kualitas Kopi Tolaki",
        description: "Kami terus berkomitmen mendampingi petani kopi di Sulawesi Tenggara untuk menghasilkan kopi berkualitas tinggi dan berkelanjutan.",
        file: "/images/about.jpg"
    },
    {
        id: "2",
        title: "Mendukung Petani Lokal, Menjaga Kualitas Kopi Tolaki",
        description: "Kami terus berkomitmen mendampingi petani kopi di Sulawesi Tenggara untuk menghasilkan kopi berkualitas tinggi dan berkelanjutan.",
        file: "/images/about.jpg"
    },
    {
        id: "3",
        title: "Mendukung Petani Lokal, Menjaga Kualitas Kopi Tolaki",
        description: "Kami terus berkomitmen mendampingi petani kopi di Sulawesi Tenggara untuk menghasilkan kopi berkualitas tinggi dan berkelanjutan.",
        file: "/images/about.jpg"
    },
    {
        id: "4",
        title: "Mendukung Petani Lokal, Menjaga Kualitas Kopi Tolaki",
        description: "Kami terus berkomitmen mendampingi petani kopi di Sulawesi Tenggara untuk menghasilkan kopi berkualitas tinggi dan berkelanjutan.",
        file: "/images/about.jpg"
    },
    {
        id: "5",
        title: "Mendukung Petani Lokal, Menjaga Kualitas Kopi Tolaki",
        description: "Kami terus berkomitmen mendampingi petani kopi di Sulawesi Tenggara untuk menghasilkan kopi berkualitas tinggi dan berkelanjutan.",
        file: "/images/about.jpg"
    },
    {
        id: "6",
        title: "Mendukung Petani Lokal, Menjaga Kualitas Kopi Tolaki",
        description: "Kami terus berkomitmen mendampingi petani kopi di Sulawesi Tenggara untuk menghasilkan kopi berkualitas tinggi dan berkelanjutan.",
        file: "/images/about.jpg"
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
        </div>
    )
}

export default ListNews
