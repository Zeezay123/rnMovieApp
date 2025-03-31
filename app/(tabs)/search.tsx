import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/Services/useFetch'
import { FetchMovies } from '@/Services/api'
import { useRouter } from 'expo-router'
import { icons } from '@/constants/icons'

const search = () => {
const router = useRouter();

const {data:movies, loading:moviesLoading, error:moviesError}= useFetch(()=>FetchMovies({
    query: ''
}));


  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>

      <FlatList
      data={movies}
      renderItem={({item})=>(
        <MovieCard {...item}/>)}
      keyExtractor={(item)=>item.id.toString()}
      className='px-5'
      numColumns={3}
      columnWrapperStyle={{
        justifyContent:'center',
        gap: 16,
        marginVertical:16
      }}
      contentContainerStyle={{
        paddingBottom:100
      }}

      ListHeaderComponent={
        <>
        <View className='w-full flex-row justify-center mt-10'>
            <Image source={icons.logo} className='w-12 h-10'/>
        </View>

        <View className=''>

        </View>
        </>
      }
      />
    </View>
  )
}

export default search