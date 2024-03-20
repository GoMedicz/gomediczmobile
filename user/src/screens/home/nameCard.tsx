import React, { useEffect, useState } from 'react'
import { ServerUrl, configToken } from '../../components/includes'
import { getData } from '../../components/globalFunction'

import axios from 'axios';
import { Text, StyleSheet } from 'react-native';
import colors from '../../assets/colors';

function NameCard(props:any) {

    const [profile, setProfile]= useState({
        fullname:'',
        email_address:''
      })

    const  FetchProfile = async()=>{
        let config = await configToken()
        let code = await getData('code')
        let url = ServerUrl+'/api/user/display_one/'+code
        try{
       await axios.get(url, config).then(response=>{
          if(response.data.type==='success'){
            setProfile(response.data.data)
          }else{
            setProfile({} as any)
          }
      
        }) 
      }catch(e){
        console.log('error:',e)
      }
      }


      useEffect(()=>{
        FetchProfile()
      }, [])
  return (
    <Text style={props.style}>Hello, {profile.fullname}</Text>
  )
}

export default NameCard

const styles = StyleSheet.create({

   
    infoText:{
        fontSize:12,
        color:colors.grey,
        fontWeight:'500'
    
      },
    
    })