import { Box, Grid, IconButton } from "@mui/material";
import { EvoTypography } from "./styled-components";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const options = [    
    {
        title: 'Submit for Approval',
        icon: <DoneRoundedIcon />
    },
    {
        title: 'Delete',
        icon: <ClearRoundedIcon />
    },
    {
        title: 'Cancel',
        icon: <ArrowBackIosRoundedIcon />
    },
];

const ProductEditHeader = (props: any) => {
    const location = useLocation();    
    const navigate = useNavigate();
    const [editState, setEditState] = useState(true)

    useEffect(() => {
        const search_param = location.search.substr(1, location.search.length);
        if(search_param=='edit') {
            setEditState(true);
        } else {
            setEditState(false);
        }
    }, [])

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
  
    const submitApproval = () => {
        props.submitProductEdition();
    }

    const deleteProduct = () => {
        props.removeProduct();
    }
  
    const handleMenuItemClick = (
      event: React.MouseEvent<HTMLLIElement, MouseEvent>,
      index: number,
    ) => {
      setSelectedIndex(index);
      setOpen(false);
      switch(index) {
        case 0: 
            submitApproval();
            break;
        case 1:
            deleteProduct();
            break;
        default: 
            navigate(-1);
            break;
      }
    };
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event: Event) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
  
      setOpen(false);
    };
        
    return (
        <Grid sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingInline: 3,
            paddingBlock: 2
        }}>            
           <EvoTypography sx={{
            fontSize: '18px'
           }}>{editState?'Edit Product':'Add Product'}</EvoTypography>
           <Box sx={{
            display: 'flex',
            alignItems: 'center',            
           }}>
                <Button 
                onClick={() => navigate(-1)}
                sx={{
                    borderRadius: 1,
                    mr: 1,
                    backgroundColor: '#e1f0ff !important',
                    color: '#3699ff'
                }}>
                    <ArrowBackIosRoundedIcon />
                    <EvoTypography sx={{ml: 1, color: '#3699ff'}}>Back</EvoTypography>
                </Button>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button onClick={props.saveProduct} sx={{
                        backgroundColor: '#3699ff !important'
                    }}>
                        <EvoTypography sx={{fontSize: '15px'}}>Save</EvoTypography>
                    </Button>
                    <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    sx={{
                        backgroundColor: '#3699ff !important'
                    }}
                    >
                    <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper
                    sx={{
                    zIndex: 1,
                    }}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                        transformOrigin:
                            placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper sx={{ml: '-50px'}}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu" autoFocusItem>
                            {options.map((option, index) => (                                
                                    <MenuItem
                                        key={option.title}
                                        disabled={!editState&&index==1}
                                        selected={index === selectedIndex}
                                        onClick={(event: any) => handleMenuItemClick(event, index)}
                                    >   
                                        <Grid container sx={{minWidth: '200px', alignItems: 'center'}}>
                                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center'}}>
                                                {option.icon}
                                            </Grid>
                                            <Grid item xs={9}>
                                                <EvoTypography sx={{color: '#644', fontSize: '16px'}}>{option.title}</EvoTypography>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>                                
                            ))}
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>                
           </Box>
        </Grid>
    )
}

export default ProductEditHeader;