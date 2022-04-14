import React,{useState,useEffect} from 'react'
import Post from './post'
import { Box, Grid } from '@material-ui/core'
import { getpost } from '../../service/api';
import { useLocation, useParams } from 'react-router-dom'
import Loadanimation from '../loadAnimation/Loadanimation';
// import { motion } from "framer-motion";
// import { motion } from "framer-motion/dist/es/index";

export default function Posts() {
    const [post, setpost] = useState([]);
     const [flag, setflag] = useState(true);
    const { search } = useLocation();
    // const params = useParams();
    // console.log(params)
useEffect(() => {
    loadfun();
}, [search])
    // console.log(search);
    const loadfun = async () => {
        console.log(search);
        let req = await getpost(search);

        console.log(req);
        setflag(false);
        setpost(req.data);
       
    }
    // console.log(post);
   

    return (
        <>
            
            {
                flag ?
                    <Box style={{textAlign:"center",margin:"0 auto"}}>
                       <Loadanimation />  
                    </Box>
                    :
                post.map((item) => {
                return (
                    <Grid layout item lg={3} sm={4} xs={12} key={item._id}>
                       
                        <Post item={ item } />
                       
                    </Grid>

                );
            })}





        </>
    )
}
