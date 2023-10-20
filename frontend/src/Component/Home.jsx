import React, { useEffect, useState } from "react";
import "./Home.css"
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineStar } from "react-icons/ai";
import { RiFolderUserFill } from "react-icons/ri";

import {Box, Button, Flex, HStack, Heading, Skeleton, useColorModeValue} from '@chakra-ui/react'
import Post from "./Post";
import { getAllProducts } from "../Redux/Products/action";


export default function Home() {
const [page,setPage]=useState(1)
const [sortOrder, setSortOrder] = useState("asc");
const dispatch=useDispatch()
const post=useSelector((store) => store.singleData.Alldata);
const isloading=useSelector((store)=>store.singleData.isLoading)
const totalData=useSelector((store)=>store.singleData.Totaldata)
const searchQuery = useSelector((store) => store.singleData.searchQuery);

const totalPage=Math.ceil(totalData/9)

    useEffect(() => {
        dispatch(getAllProducts(page,searchQuery,sortOrder));
      }, [page,searchQuery,sortOrder]);
    

      
const handlePageChange=(value)=>{
  setPage(prev=>prev+value)
}
const toggleSortOrder = () => {
  setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle between "asc" and "desc"
};
console.log(post);
  return (
    <div>

      <div className="homeSection">

      <Box className="heading" bg={useColorModeValue('blackAlpha.100', 'blackAlpha.500')}>
           Home
      </Box>
   
      <Box className="heading">
          Sort by Rating:
          <br />
          <input type="radio" checked={sortOrder === "asc"} onChange={toggleSortOrder} /> Ascending
         &nbsp;
          <input type="radio" checked={sortOrder === "desc"} onChange={toggleSortOrder} /> Descending
        </Box>
      
            <div className='homediv'>
          

                  {

                  isloading ?
                      post &&  post.map((el)=>(
                            <Skeleton height='200px' />
                         ))

                 
                        :
                    post && post.map((el)=>(

                          <Post key={el._id} {...el}/>
                      ))
                }


                
 
      </div>


     
            <div className="paginationDiv">
         
                <Button colorScheme='teal' size='sm' onClick={()=>handlePageChange(-1)} isDisabled={page==1}>
                Previous
              </Button>
                <Heading as='h5' size='sm'>
                {page}
              </Heading> 
              <Button colorScheme='teal' size='sm' onClick={()=>handlePageChange(1)} isDisabled={page==totalPage}>
                Next
              </Button>
            
            </div>
         

        </div>


  </div>
  )
}
