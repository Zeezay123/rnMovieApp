import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/Services/useFetch';
import { FetchMovies, fetchMoviesDetails } from '@/Services/api';
import { icons } from '@/constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Details = () => {
const { id } = useLocalSearchParams();

const {data: movie, loading:Loading, error:moviesError } = useFetch(()=> fetchMoviesDetails(id as string)) 

interface MoviePros {
  label: string,
  name?: string | null | undefined
}


const MovieInfo =({label, name}:MoviePros)=>(
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'> {label}</Text>
    <Text className='text-light-100 font-bold text-sm mt-2'>{name || 'N/a'}</Text>
  </View>
)

// const MiniDits=({overview,date,status, genre,country}:any)=>{
//   const cDate = new Date(date)
//   const newDate = cDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" });
 
// return(
//   <ScrollView className='mt-10 px-5 flex-col'>
//     <View>
//     <Text className='text-light-200 text-lg mb-5'>Overview</Text>
//     <Text className='text-white text-lg'>{overview}</Text>
//     </View>


//     <View className='flex-row mt-3 items-center justify-start gap-x-5'>
//       <View className='mt-5 flex-col gap-y-1'>
//         <Text className='text-light-200 text-lg'>Release Date</Text>
//         <Text className='text-light-100'>{newDate} (Worldwide)</Text>
//       </View>
//       <View className='mt-5 flex-col gap-y-1'>
//         <Text className='text-light-200 text-lg'>Staus</Text>
//         <Text className='text-light-100'>{status}</Text>
//       </View>


//     </View>


  
// <View className='mt-10'>
// <Text className='text-light-200 text-lg' > Genres</Text>
// <FlatList 
// data={genre}
// renderItem={({item})=><View className=' flex-row' > 

//   <View className="bg-dark-100 px-4 py-2 rounded-md border">
//           <Text className="text-white font-bold text-center">{item.name}</Text>
//         </View>
// </View> }
// keyExtractor={(item)=>(item.id.toString())}
// className='flex-row mt-5 mb-4'
// numColumns={3}
// columnWrapperStyle={{
//   justifyContent:'flex-start',
//   gap:20,
//   padding:5,
  
// }}
// scrollEnabled={false}
// />
// </View>

// <View className='mt-10'>
// <Text className='text-light-200 text-lg' > Country</Text>
// <FlatList 
// data={country}
// renderItem={({item})=><View className=' flex-row' > 

//   <View>
//           <Text className="text-light-100 text-lg font-bold text-center">{item.name} {'.'}</Text>
  
//         </View>
// </View> }
// keyExtractor={(item)=>(item.id)}
// className='flex-row mt-5 mb-4'
// numColumns={3}
// columnWrapperStyle={{
//   justifyContent:'flex-start',
//   gap:20,
//   padding:5,
  
// }}
// scrollEnabled={false}

// />
// </View>
//   </ScrollView>
// )

// }

  return (
    <SafeAreaView className='bg-primary flex-1 relative'>
      <ScrollView contentContainerStyle={{
        paddingBottom:80
      }}>

<View>
  <Image source={{uri: `https://image.tmdb.org/t/p/w500${movie ?. poster_path}`}} className='w-full h-[550px]' resizeMode='stretch' />
</View>
<View className='flex-col items-start justify-center mt-5 px-5'>
  <Text className='text-white font-bold text-xl'>{movie?.title} </Text>
  <View className='flex-row item-center mt-2'>
    <Text className='text-light-300 text-sm'> {movie?.release_date.split('-')[0]}</Text>
   <Text className='text-light-300 text-sm'> {Math.floor((movie?.runtime ?? 0)/60)}h {Math.floor((movie?.runtime ?? 0)%60)}m </Text>
  </View>

  <View className='flex-row bg-dark-100 mt-2 px-2 py-1 rounded-md gap-x-1 items-center'>
    <Image source={icons.star}/>

    <Text className='text-white font-bold text-sm'> {Math.round(movie?.vote_average ?? 0)}/10 </Text>

    <Text className='text-light-200 text-sm'>
      ({movie?.vote_count} votes)
    </Text>
     </View>

{/* <MiniDits overview={movie?.overview} date={movie?.release_date} 
status={movie?.status} genre={movie?.genres} country={movie?.production_countries}/> */}


<MovieInfo label='Overview' name={movie?.overview}/>
<MovieInfo label='Genre' name={movie?.genres?.map((g)=>(g.name)).join(' - ') || 'N/A'}/>
    <View className='flex flex-row justify-between gap-x-5 w-1/2'>
      <MovieInfo label='Budget'  name={`$${(movie?.budget ?? 0) /1_000_000} million`}/>
      <MovieInfo label='Revenue' name={`${Math.round(movie?.revenue ?? 0)/1_000_000} million`}/>
    </View>
  
    <MovieInfo label='Production Companies'
     name={movie?.production_companies.map((g)=> g.name).join(' - ')|| 'N/A' }/>
    

</View>
    </ScrollView>

<TouchableOpacity 
  style={{ backgroundColor: '#AB8BFF' }} 
className='w-full h-12 inset-0 bottom-5 left-0 right-0  rounded-lg py-3.5 
flex flex-row items-center justify-center z-50' onPress={router.back}>
<Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor='#fff'/>
<Text className='text-white font-semibold text-base'> Go back </Text>
</TouchableOpacity>

    </SafeAreaView>
  )
}

export default Details