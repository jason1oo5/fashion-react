import { Divider, Grid, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Page from "../../../components/Page";
import { EvoTypography } from "../../../components/styled-components";
import { getFavoriteProduct, removeFavorite } from "../../../service/productService";
import FavoriteTable from "./favoriteTable";

const FavoriteProductWrapper = styled(Grid)(({theme}) => ({
    width: '100%',
    minHeight: '100vh',
    borderRadius: 5,
    boxShadow: '0 0 30px 0 rgb(82 63 105 / 30%)',
    backgroundColor: 'white',    
}))


const FavoriteProduct = () => {
    const [favorites, setFavorites] = useState<any>();
    
    useEffect(() => {
        const fetch_favorites = async () => {
            const res = await getFavoriteProduct();
            setFavorites(res);
        }

        fetch_favorites().catch((err) => {
            console.log(err);
        })
    })

    const deleteFavorite = async (_id: any) => {
        await removeFavorite(_id).then((res) => {
            if(res) {
                toast.success("Successfully removed");
            } else {
                toast.error("Error occured.");
            }
        })
    }

    return (
        <Page title="Orders History">
            <Grid sx={{
                backgroundColor: '#eef0f8',
                minHeight: '100vh'
            }}>
                <Grid sx={{
                    marginInline: { xl:'auto', sm: '30px', xs: '90px'},  
                    maxWidth: '1340px', 
                    height: 'auto',
                    display: 'flex', 
                    justifyContent: 'center',                                
                    }}>                         
                    <Grid sx={{ width: '100%', mt: 10, mb: 5 }}>
                        <FavoriteProductWrapper>
                            <Grid sx={{ p: 3 }}>
                                <EvoTypography sx={{ fontSize: '16px', fontWeight: 600 }}>My Favorites</EvoTypography>
                            </Grid>
                            <Divider />
                            <Grid sx={{ p: 3 }}>
                                <FavoriteTable tableData={favorites} deleteFavorite={deleteFavorite} />                          
                            </Grid>
                        </FavoriteProductWrapper>
                    </Grid>                                
                </Grid>    
            </Grid>            
        </Page>
    )
}

export default FavoriteProduct;