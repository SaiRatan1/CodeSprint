import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Submissions = ({submissions,setTextArea}) => {

    console.log('inside submissions: ',submissions)
    const { id } = useParams();

    return (
        <div className='flex flex-col'>
            <div className='p-2 pl-4 pr-4 mt-10 text-neutral-200 border-b-2 border-b-neutral-600 flex flex-row justify-between h-10 items-center '>
                <span className=' text-sm'>Submissions</span>
            </div>
            {/* <div className=' '> */}
                {submissions && submissions.length == 0 ? <div className='text-sm p-2 pl-4'>No submissions yet!</div> :
                    submissions.map((item,index)=>{
                        return(<div key={item._id} className=' p-2 pl-4 hover:bg-neutral-700' onClick={()=>{setTextArea(item.code)}}>
                            <p className={`text-lg mb-2  ${item.result=='Accepted'? 'text-green-600':'text-red-500'}`}>{item.result}</p>
                            <p className='text-xs'>{item.submissionDateTime}</p>
                        </div>)
                    })
                }

            {/* </div> */}

        </div>
    )
}

export default Submissions
