import React from 'react'
import Compilance from '../SEOChecklist/Compilance'
import TechnicalSEO from '../SEOChecklist/TechnicalSEO'
import InternalLinks from '../SEOChecklist/InternalLinks'

const Page5 = () => {
    return (
        <>
            <div className="p-4 bg-[#e06665] text-lg text-white font-semibold">SEO CheckLists</div>
            <div className="container mx-auto my-5 flex flex-col gap-5">
                <InternalLinks/>
                <TechnicalSEO/>
                <Compilance/>
            </div>
        </>
    )
}

export default Page5