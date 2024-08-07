import React from 'react'
import Page1 from '../Pages/Page1'
import Page2 from '../Pages/Page2'
import Page3 from '../Pages/Page3'
import Page4 from '../Pages/Page4'
import Page5 from '../Pages/Page5'

const ReportComponent = () => {
  return (
    <>
        {/* Page 1 */}
        <div id="page-1" className="w-[794px] h-[1122px] border border-black mb-8">
            <Page1/>
        </div>
        {/* Page 2 */}
        <div id="page-2" className="w-[794px] h-[1122px] border border-black mb-8 p-4">
            <Page2/>
        </div>
        {/* Page 3 */}
        <div id="page-3" className="w-[794px] h-[1122px] border border-black mb-8 p-4">
            <Page3/>
        </div>
        {/* Page 4 */}
        <div id="page-4" className="w-[794px] h-[1122px] border border-black mb-8 p-4">
            <Page4/>
        </div>
        {/* Page 5 */}
        <div id="page-5" className="w-[794px] h-[1122px] border border-black mb-8 p-4">
            <Page5/>
        </div>
    </>
  )
}

export default ReportComponent