import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

interface TabProps {
    headItems: any,
    contentItems: any
}

export default function Tabs({headItems, contentItems}: TabProps) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {headItems.map((item: any, index: number) => (
                <Tab key={item+index} label={item} value={index + 1} />   
            ))
            }            
          </TabList>
        </Box>
        {contentItems.map((item: any, index:number) => (
            <TabPanel key={item + index} value={`${index + 1}`}>
                { item }
            </TabPanel>        
        ))
        }
      </TabContext>
    </Box>
  );
}
