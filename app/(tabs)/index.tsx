import { Text, View,Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/Services/useFetch";
import { FetchMovies } from "@/Services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/Services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
const router = useRouter();

const {
  data:trendingMovies,
  loading:trendingLoading,
  error:trendingError
} = useFetch(getTrendingMovies)

const {data:movies, loading:moviesLoading, error:moviesError } = useFetch(()=> FetchMovies({
 query:''
})) 

  return (
    <View  className="flex-1 bg-primary">
      
      <Image source={images.bg} className=" absolute w-full z-0"/>

    <ScrollView className="flex-1 px-5"
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{minHeight:'100%', paddingBottom:10, }}>
      

      <Image source={icons.logo}  className="w-16 h-12 mt-10 mb-5 mx-auto"/>

      {moviesLoading || trendingLoading ? (<ActivityIndicator 
      size='large'
      color='#0000ff'
      className="mt-10 self-center"
      />)
      : moviesError || trendingError ? (
        <Text>Error:{moviesError?.message || trendingError?.message }</Text>
      )
   : (<View className="flex-1 mt-5">   

    <SearchBar onPress={()=> router.push("/search")}
      placeholder="Search for a movie"

      /> 

      {trendingMovies && (<View className="mt-10">

        <Text className=" text-lg text-white font-bold mt-5 mb-3">
          Trending Movies
        </Text>

      </View>)}
<>


<FlatList 
horizontal
showsHorizontalScrollIndicator={false}
ItemSeparatorComponent={()=><View className="w-4" />}
className="mb-4 mt-3"
 data={trendingMovies} 
renderItem={({item,index})=>(<TrendingCard movie={item} index={index}/>)} 
keyExtractor={(item)=>item.movie_id?.toString()}/>


<Text className="text-white text-lg font-bold
mt-5 mb-3">Latest Movies</Text>
    
<FlatList

data={movies}
renderItem={({ item })=>(
 <MovieCard
 {...item}/>
)}

 keyExtractor={(item)=>item.id.toString()}
numColumns={3}
columnWrapperStyle={{
  justifyContent:'flex-start',
  gap:20,
  paddingRight:5,
  marginBottom:10
}}

 className="mt-2 pb-32"
 scrollEnabled={false}
/>


</>
   </View>
)
    }
    
     
    </ScrollView>

    </View>
  );
}
