import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import { EvoTypography } from "../../../../../components/styled-components";
import OrderTable from "../../../../user/orders-history/tables/orderTable";
import OwnSKUTable from "./ownSkuTable";

const FashionEditTables = (props: any) => {
    const { skuData, orderList } = props;
    const [value, setValue] = React.useState('1');  
    
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };  
  
    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingInline: 5, pt: 3 }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{
                    '& .MuiTabs-indicator': { backgroundColor: '#3699ff'}
                }}>
                    <Tab label={<EvoTypography>Owned SKU</EvoTypography>} value='1' />  
                    <Tab label={<EvoTypography>Orders History</EvoTypography>} value='2' />  
                </TabList>
            </Box>
            <TabPanel value="1">
                <OwnSKUTable skuData={skuData} />
            </TabPanel>
            <TabPanel value="2">
                <OrderTable tableData={orderList} />
            </TabPanel>            
        </TabContext>
    )
}

export default FashionEditTables;