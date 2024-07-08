//홈페이지
import { FlatList } from "react-native"
import posts from '~/assets/data/posts.json'
import PostListItem from '~/src/components/PostListItem';

//포스트 양식
export default function FeedScreen() {


    return (
        <FlatList 
         data={posts}
         contentContainerStyle={{ gap: 10 }}
         /* postlistitem 컴포넌트를 components/PostlistItem에서 받아왔음 */
         renderItem={({ item }) => <PostListItem post={item}/>}
         showsVerticalScrollIndicator={false}
        />
    )
}