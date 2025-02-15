import { useGSAP } from '@gsap/react'
import React from 'react'
import Image from 'next/image'
import { rightImg, watchImg } from '@/utils'
import gsap from 'gsap'
import VideoCarousel from './VideoCarousel'


const Highlights = () => {

    useGSAP(()=>{
        
        gsap.to('#title',{opacity:1,translateY:0,duration:1})
        gsap.to('.link',{opacity:1,translateY:0,duration:1,stagger:0.5})
    },[])
    return (
        <section id='highlights' className='w-screen  overflow-hidden h-full common-padding bg-zinc'>
            <div className='screen-max-width'>
                <div className='mb-12 w-full md:flex max-xl:items-center items-end justify-between'>
                <h1 id="title" class="section-heading opacity-0 translate-y-5">Get the highlights.</h1>
                <div className="flex flex-wrap gap-5 md:justify-center items-end">
                    <p className="link">Watch the film
                        <Image className='mx-2' src={watchImg} height={18} width={18}/>
                    </p>
                    <p className="link">Watch the film
                        <Image className='mx-2' src={rightImg} height={10} width={10}/>
                    </p>
                </div>
                </div>
                {/* ///Videos */}
                <VideoCarousel/>
            </div>
        </section>
    )
}

export default Highlights