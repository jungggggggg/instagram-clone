import { View, Image, Text, useWindowDimensions } from "react-native";
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from 'cloudinary-react-native';

// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

//lib/cloudinary에서 cld함수를 가져옴.(외부 api)
import { cld } from "~/src/lib/cloudinary";



//모든 포스트를 같은 형식으로 홈화면에 올려줌 
export default function  PostListItem({ post }) {

    const { width } = useWindowDimensions();

    const Image = cld.image(post.image);
    Image.resize(thumbnail().width(width).height(width)) 
    
    const avatar = cld.image(post.user.avatar_url);
    Image.resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())))

    return (
        <View className='bg-white'>
            {/* Header */}
            <View className="p-3 flex-row items-center gap-2">
                <AdvancedImage cldImg={avatar} 
                className="w-12 aspect-square rounded-full" />
                <Text className="font-semibold">{post.user.username}</Text>
            </View>

            {/* content */}
            <AdvancedImage cldImg={Image} className="w-full aspect-[4/3]"/>
            {/* assets파일은 주석처리, api사용
             <Image source={{uri: post.image_url}} 
            className="w-full aspect-[4/3]"/> */}

            {/* Icons */}
            <View className="flex-row gap-3 p-3">
                <AntDesign name="hearto" size={20} />
                <Ionicons name="chatbubble-outline" size={20} />
                <Feather name="send" size={20} />

                <Feather name="bookmark" size={20} className="ml-auto" />
            </View>
        </View>
    )
}