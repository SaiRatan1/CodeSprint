import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Submissions from './submissions';


const Question = () => {

    const { id } = useParams();
    const [question, setQuestion] = useState({})
    const [code, setCode] = useState('')
    const [submissions, setSubmissions] = useState([]);


    const fetchdata = async () => {
        const res = await fetch(`/api/problems/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        const data = await res.json();
        if (res.status == 500 || !data) {
            console.log('Didnt find the question')
        }
        else {
            setQuestion(data);
        }
    }

    useEffect(() => {
        fetchdata();
        enableTab('text');
        getSubmissions();

    }, [])


    function enableTab(id) {
        var el = document.getElementById(id);
        el.onkeydown = function (e) {
            if (e.keyCode === 9) { // tab was pressed

                // get caret position/selection
                var val = this.value,
                    start = this.selectionStart,
                    end = this.selectionEnd;

                // set textarea value to: text before caret + tab + text after caret
                this.value = val.substring(0, start) + '\t' + val.substring(end);

                // put caret at right position again
                this.selectionStart = this.selectionEnd = start + 1;

                // prevent the focus lose
                return false;

            }
        };
    }
    // Enable the tab character onkeypress (onkeydown) inside textarea...
    // ... for a textarea that has an `id="text"`?>/

    const getSubmissions = async () => {
        console.log('in getSubmissions')
        const res = await fetch(`/api/problems/submissions/${id}`,{
            method:'GET',
            headers:{
                'content-type':'application/json'
            }
        })
        const data = await res.json();
        if(res.status==401|| res.status ==500 ||!data ){
            console.log('Internal server error')
        }
        else {
            if(data.message=='No submissions data found'){
                console.log(data.message, 'from getsubmissions')
            }
            else{
                setSubmissions(data.allSubmissions);
            }

        }
    }

    const submitCode = async () =>{
        if(code!=''){

            const res = await fetch('/api/problems/submitcode',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({
                    code,id
                })
            })
            const data = await res.json();
            if(res.status==400 || !data){
                console.log('Couldnt submit the code')
            }
            else{
                alert('Submitted!');
                console.log(data);
                setSubmissions([...submissions,data.submission])

                console.log('after destructuring: ',submissions)
            }

        }
        else{
            console.log('Empty code!!')
        }
    }

    const setTextArea = (code)=>{
        setCode(code);
    }

    return (
        <div className='bg-neutral-900 h-screen text-neutral-200 flex flex-col'>
            <div className="header h-12 flex flex-row items-center pl-4 bg-neutral-800 font-sans">
                <Link to="/">{': '} Problem List</Link>
            </div>

            <div className="flex flex-row w-full mt-2 flex-grow  font-sans bg-neutral-900 ">
                <div className="left w-5/12 mr-2 bg-neutral-800 ml-2 rounded-md flex flex-col mb-2 ">
                    <div className='p-2 pl-4 pr-4 text-neutral-200 border-b-2 border-b-neutral-600 flex flex-row h-10 items-center '>
                        <span className=' text-sm'>Description</span>
                        {/* <span className=' text-sm'>Submissions</span> */}
                    </div>
                    <div className=' h-full flex flex-col'>
                        <div className="title pl-4 pt-4 text-xl font-medium ">
                            {question.title}
                        </div>
                        <div className="belowtitle mt-3">
                            <span className={`pl-4 pt-4 text-sm ${question.difficulty == 'Easy' ? 'text-green-500' : question.difficulty == 'Medium' ? 'text-yellow-500' : 'text-red-600'}`}>
                                {question.difficulty}
                            </span>
                        </div>
                        <div className="desc pl-4 pt-4 pr-4 ">
                            {question.description}
                            <br />
                            <br />
                        </div>

                        <div className="exaples  pl-4 pt-4 pr-4">
                            <span className="font-bold">
                                Example: </span><br /><br />
                            <div className="examplebg bg-neutral-700 rounded-md p-2">
                                <div className="in mb-2 font-mono"><span className="font-semibold ">Input:</span> {question.exampleIn}</div>
                                <span className="font-semibold font-mono">Output:</span> {question.exampleOut}<br />
                            </div>
                        </div>
                        
                        <Submissions submissions = {submissions} setTextArea = {setTextArea}/>
                    </div>
                </div>
                <div className='right w-7/12 mr-2 flex flex-col mb-2 bg-neutral-900 rounded-md  overflow-hidden'>
                    <div className='p-2  pl-3 text-neutral-200 border-b-2 items-center  border-b-neutral-600 flex flex-row  bg-neutral-800 '>
                        <span className=' text-sm '>Code Here</span>
                    </div>
                    <textarea type='text-area' value={code} onChange={(e) => { setCode(e.target.value) }} spellCheck='false' className="p-2 pt-3 pl-6 bg-neutral-800 focus:outline-none h-full w-full resize-none rounded-b-md" id='text' />

                    <div className='p-2  pl-3 text-neutral-200 bg-neutral-800 rounded-md flex flex-row justify-between  mt-2 outline-none '>
                        <button className=" font-medium items-center whitespace-nowrap focus:outline-none inline-flex text-label-r bg-green-700 hover:bg-green-600 h-[28px] select-none rounded px-5 text-[13px] " onClick={submitCode}>
                            Submit
                        </button>
                    </div>

                </div>
            </div>
            {/* <div className="dummy h-4"></div> */}
        </div>
    )
}

export default Question
