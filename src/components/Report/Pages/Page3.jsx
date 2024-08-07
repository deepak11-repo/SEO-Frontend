import React from 'react'
import URL from '../SEOChecklist/URL'
import TitleMeta from '../SEOChecklist/TitleMeta'
import Headings from '../SEOChecklist/Headings'

const Page3 = () => {
    return (
        <>
            <div className="p-4 bg-[#e06665] text-lg text-white font-semibold">SEO CheckLists</div>
            <div className="container mx-auto my-5 flex flex-col gap-5">
                <URL/>
                <TitleMeta/>
                <Headings/>
            </div>
        </>
    )
}

export default Page3