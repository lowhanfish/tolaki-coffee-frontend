import CardNewsList from '@/components/items/CardNewsList'
import React from 'react'


const KategoriList = [
    { id: "1", title: "Semua Kategori" },
    { id: "2", title: "Berita Perusahaan" },
    { id: "3", title: "Produk" },
    { id: "4", title: "Petani & Kemitraan" },
    { id: "5", title: "Semua Kategori" },
    { id: "6", title: "Edukasi Kopi" },
    { id: "7", title: "Event & Kegiatan" },
]

const SideBarNews = () => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='border-[0.5px] border-neutral-400 rounded-2xl p-5'>
                <p className='text-[18px] font-bold'>Kategori</p>

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

                <div className='flex flex-col gap-3 pt-3'>
                    {
                        [...Array(6)].map((item, index) => (
                            <div>
                                <CardNewsList />
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default SideBarNews
