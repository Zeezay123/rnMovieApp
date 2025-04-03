import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const _layout = () => {
    const TabIcon =({focused,icons, tittle}:any) => {
        if(focused){
        return(

                <ImageBackground 
                source={images.highlight} className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4
                justify-center items-center rounded-full overflow-hidden'>
                
                <Image source={icons} tintColor="#151312" className='size-5'/>
                <Text className='text-secondary text-base font-semibold ml-2 '>{tittle}</Text>
                
                </ImageBackground>
            )
        }
        return(

           <View className='size-full items-center justify-center mt-4'> 
            <Image source={icons} tintColor='#A8B5DB' className='size-5'/>
           </View>
        )



    }
  return (
   <Tabs 
   screenOptions={{
     tabBarShowLabel: false,
     tabBarItemStyle:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
     },
     tabBarStyle:{
        backgroundColor: '#0f0D23',
        borderRadius:50,
        marginHorizontal:10,
        marginBottom:56,
        height: 52,
        position:'absolute',
        overflow:'hidden',
        borderWidth: 0,
        borderColor:"#0f0d23"
     }
   }}>

    <Tabs.Screen
      name='index'
      options={{
          title: "home",
          headerShown: false,
          tabBarIcon: ({ focused} ) => (
           <TabIcon  focused = {focused} icons = {icons.home} tittle='Home'/>
          )
        }}
        />

<Tabs.Screen
      name='search'
      options={{
          title: "Search",
          headerShown: false,
          tabBarIcon:({focused})=>(
            <TabIcon  focused = {focused} icons = {icons.search} tittle='Search'/>
          )

        }}
        />

<Tabs.Screen
      name='saved'
      options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon:({focused})=>(
            <TabIcon  focused = {focused} icons = {icons.save} tittle='Saved'/>
          )
        }}
        />


        <Tabs.Screen
      name='profile'
      options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon:({focused})=>(
            <TabIcon  focused = {focused} icons = {icons.person} tittle='Profile'/>
          )
        }}
        />

        </Tabs>
  )
}

export default _layout