import React, { useState } from 'react'
import Navbar from './navbar'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Homepage = () => {

    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {

        const res = await fetch('/api/problems/getQuestions', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })

        const data = await res.json();
        if (res.status == 400 || !data) {
            console.log('Couldnt fetch questions')
        }
        else {
            setQuestions(data);
        }
    }

    useEffect(() => {
        getQuestions();
    }, [])

    return (
        <div className='w-full h-screen flex flex-col '>
            <Navbar />
            <div className='w-full   pt-28 bg-neutral-900 flex-grow'>
                <div className='flex flex-col ml-28  w-8/12  text-white pl-0'>
                    <div className='flex flex-row w-10/12 h-12 pl-2 items-center justify-between ml-10 border-b-neutral-700 border-b-2 text-neutral-300'>
                        <div className='w-6/12 '>Title</div>
                        <div className='w-2/12'>Acceptance</div>
                        <div className='w-2/12'>Difficulty</div>
                    </div>
                    {!questions && <div>Didnt get questions yet</div>}

                    {questions && questions.map((item, index) => {

                        return (<div className={`flex flex-row flex-grow w-10/12 h-10 p-6 pl-2 pr-0 items-center justify-between ml-10 ${index % 2 != 0 ? 'bg-neutral-800 rounded-sm' : ''}`} key={item._id}>
                            <Link to={`/problems/${item._id}`} className='w-6/12 hover:text-blue-500 '>{`${index + 1}. ${item.title}`}</Link>
                            <div className='w-2/12'>{`${item.acceptance}`}</div>
                            <div className={`w-2/12 ${item.difficulty == 'Easy' ? 'text-green-500' : item.difficulty == 'Medium' ? 'text-yellow-500' : 'text-red-600'}`}>{`${item.difficulty}`}</div>
                        </div>)

                    })}

                </div>
            </div>
        </div>
    )
}

export default Homepage
