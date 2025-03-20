import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <div className='bg-[#000000]/50'>
            <div className='max-w-[96%] mx-auto flex justify-between items-center py-4 px-8'>
                <div>
                    <Image src="/assets/logo.png" alt="logo" width={48} height={48} />
                </div>
                <div>
                    <Link href='#'><Button>Shop Now</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default Header