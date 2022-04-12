import React from 'react'
import Banner from './banner'
import Categories from './Categories'
import Posts from './Posts'
import { Box, Grid, makeStyles } from '@material-ui/core'
import ProfileCardWrapper from '../ProfileCard/ProfileCardWrapper'
import Loadanimation from '../loadAnimation/Loadanimation'
import ProfileCard from '../ProfileCard/ProfileCard'


const useStyle = makeStyles((theme) =>( {
    categories: {
        position: "fixed",
        left: "30px",
        // top:"400px"
    }
}));
export default function Home() {
    const classes = useStyle();
    return (
        <>
         
            <Banner />
            
            <Grid container>
                
                <Grid item lg={2} xs={12} sm={2} >
                    

                    <Categories />
                    
                    </Grid>
                {/* </Box> */}
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts />
                </Grid>
                </Grid>
            

        </>
    )
}
