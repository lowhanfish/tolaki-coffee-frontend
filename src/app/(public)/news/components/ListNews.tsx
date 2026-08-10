import CardNews from "@/components/items/CardNews"

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
                    <p>Menampilkan 1-12 dari 36 artikel</p>
                </div>
                <div className='col-span-1 flex justify-end items-end'>
                    <button>
                        <p>Terbaru</p>
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5'>
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
