import React from 'react'
import Content from '../SEOChecklist/Content'
import MetaTags from '../SEOChecklist/MetaTags'
import PageSpeed from '../SEOChecklist/PageSpeed'
import Images from '../SEOChecklist/Images'

const Page4 = () => {
    return (
        <>
            <div className="p-4 bg-[#e06665] text-lg text-white font-semibold">SEO CheckLists</div>
            <div className="container mx-auto my-5 flex flex-col gap-5">
                <Images/>
                <Content />
                <MetaTags />
                <PageSpeed />
            </div>
        </>
    )
}

export default Page4