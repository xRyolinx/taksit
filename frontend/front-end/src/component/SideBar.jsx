import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { IoMenu } from "react-icons/io5";
import { useGetCategoriesQuery } from '../api/features/apiSlice';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const { collapseSidebar } = useProSidebar();
    const { data, isLoading } = useGetCategoriesQuery();
    console.log("data", data)
    return (
        <div className='fixed bg-Secondary-700 top-0  z-[99999]'>
            <Sidebar className='h-[100vh]'>

                <Menu>
                    <MenuItem
                        icon={<IoMenu size={40} />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                    >
                    </MenuItem>

                    <SubMenu label="Categories">
                        {
                            data?.categories?.map((item) => {
                                return (

                                    <SubMenu label={item.nom} >

                                    </SubMenu>

                                )


                            })
                        }
                    </SubMenu>

                    {/* 
                        <SubMenu label="electro">  </SubMenu>
                        <SubMenu label="foors">  </SubMenu>
                    </SubMenu>
                    <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem> */}
                </Menu>
            </Sidebar>
        </div>
    )
}

export default SideBar
