import React, { useEffect } from 'react'
import EditProfile from '../component/common/EditProfile'
import { useSelector } from 'react-redux'


export default function Profile() {

    const {profileData} =useSelector((state) => state.auth)
    // const data = localStorage.getItem("profileData")

    // useEffect(() => {
    //   console.log(profileData,data)
    // }, []);
  return (
    <div className=' w-full flex justify-center items-center ' >
        <EditProfile userData={profileData} />
    </div>
  )
}
