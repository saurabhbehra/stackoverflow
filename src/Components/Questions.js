import React,{useEffect,useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {Link} from 'react-router-dom'
import SearchBar from './SearchBar'
import Loader from './Loader'
import './question.css'

const Questions = () => {

    const [question,setQuestion] =useState([])
    const [title,setTitle]=useState('')
    const [hasMore,setHasMore]=useState(true)
    const [pageNumber,setPageNumber]=useState(2)
   
    const onChangeEvent=async event=>{
        setTitle(event.target.value)
        if(!event.target.value==' '){
            try{
                let response=await fetch(`https://api.stackexchange.com/2.3/search?pagesize=20&order=desc&sort=activity&intitle=${event.target.value}&site=stackoverflow`,{
    
                    headers:{
                        'content-type':'application/json'
                    },
                })
                let responseData=await response.json()
                console.log(responseData)
                setQuestion(responseData.items)
               }
            catch(err){}
        }
    }

    useEffect(()=>{
        const fetchQuestion=async () =>{
             try{
                 let response=await fetch('https://api.stackexchange.com/2.3/questions?page=1&pagesize=5&order=desc&sort=activity&site=stackoverflow',{
                     headers:{
                         'content-type':'application/json'
                     }
                 })
                 let responseData=await response.json()
                 console.log(responseData)
                 setQuestion(responseData.items)
                }
             catch(err){}
         }
         fetchQuestion()
      
     },[])

     const fetchDataOnScroll =async()=>{
        try{
            let response= await fetch(`https://api.stackexchange.com/2.3/questions?page=${pageNumber}&pagesize=5&order=desc&sort=activity&site=stackoverflow`,{
                 headers:{
                     'Content-Type':'application/json',
                 }
             })
             let responseData=await response.json()
             if(responseData.items.length==0){setHasMore(false)}
             setQuestion(prev=>[...prev, ...responseData.items])
             setPageNumber(prev=>prev+1)
             
         }
         catch(err){
             console.log(err)
         }
    
    }

    return (
        <>
            <SearchBar
                   value={title}
                   onChange={onChangeEvent}
            />
            <div className="container-fluid p-0">
                <div className="row no-gutters">
                    <div className="col-sm-3"></div>
                    <div className="col-12 col-sm-6">
                            <InfiniteScroll 
                                    hasMore={hasMore} 
                                    next={fetchDataOnScroll} 
                                    loader={<h4>Loading...</h4>}
                                    endMessage={"No more question found"}
                                    dataLength={question?.length}                        
                                 >
                                {question && question.map(q=>
                                    <Link to={`/question/${q.question_id}`}>
                                        
                                            <div className="card" key={q.question_id}>
                                                <div>
                                                    <div className="column left text-center"  style={{backgroundColor:"#CDCDCD"}}>
                                                        {q.view_count}<br/>0
                                                    </div>
                                                    <div className="column right">
                                                        <p className="question">
                                                            {q.title}
                                                        </p>
                                                    
                                                    {q.tags.map((t,index)=>
                                                        <div className="tag_box" key={index}>
                                                            {t}
                                                        </div>
                                                        )} 
                                                    
                                                        <p className="time">
                                                            <span>1 min ago</span>&nbsp;
                                                            <span>{q.owner.display_name}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div> 
                                        
                                    </Link>
                                )}
                           </InfiniteScroll>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        </>
    )
}

export default Questions
