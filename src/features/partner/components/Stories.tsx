import Image from 'next/image'
import React from 'react'
import StoriesCard from './stories/StoriesCard'


const Stories = () => {
    return (
        <div className='text-neutral-700'>
            <div className='grid gap-3 grid-cols-1 lg:grid-cols-4'>
                <div className='col-span-1'>
                    <p className='title-header-3'>
                        Cerita dari Kebun
                    </p>
                    <p className='text-[13px] mt-2 lg:pr-2'>
                        Kopi Tolaki hadir dari semangat petani lokal
                        Sulawesi Tenggara yang diwariskan turun-temurun dengan cinta pada tanah dan tradisi.
                    </p>
                </div>

                <div className='col-span-1'>
                    <StoriesCard />
                </div>
                <div className='col-span-1'>
                    <StoriesCard />
                </div>
                <div className='col-span-1'>
                    <StoriesCard />
                </div>

            </div>


        </div>
    )
}

export default Stories
