//홈페이지
import { FlatList,  } from "react-native"
import posts from '~/assets/data/posts.json'
import PostListItem from '~/src/components/PostListItem';

//포스트 양식
export default function FeedScreen() {


    return (
        <FlatList 
         data={posts}
         className="items-center"
         renderItem={({ item }) => <PostListItem post={item}/>}
         contentContainerStyle={{ gap: 10, maxWidth: 512, width: '100%' }}
         /* postlistitem 컴포넌트를 components/PostlistItem에서 받아왔음 */
         showsVerticalScrollIndicator={false}
        />
    )
} 
