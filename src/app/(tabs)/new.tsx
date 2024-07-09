import { Text, View, Image, TextInput, Pressable } from "react-native"
import { useEffect, useState } from "react"
import * as ImagePicker from 'expo-image-picker';
import Button from "~/src/components/Button";
import { upload } from "cloudinary-react-native";
import { cld } from "~/src/lib/cloudinary";
import { UploadApiResponse } from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";


export default function CreatePost() {

  const [caption, setCaption] = useState('')
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      pickImage();
    }
  }, [image])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (file: string) => {

    const options = {
      upload_preset: 'Default',
      unsigned: true,
    }

    return new Promise<UploadApiResponse>(async (resolve, reject) => {
      // upload the image to cloudinary

      await upload(cld, {
        file,
        options: options,
        callback: (error, response) => {
          if (error || !response) {
            reject(error);
          } else {
            resolve(response);
          }
        },
      });
    });

  };

  const createPost = async () => {
    //save the post in database
    if (!image) {
      return
    }
    const response = await uploadImage(image);

    console.log("image id:", response?.public_id)
  }

  return (
    <View className="p-3 items-center flex-1">
      {/* image picker */}
      {image ? (<Image source={{ uri: image }}
        className="w-52 aspect-[3/4] rounded-lg bg-slate-300"
      />) :
        (<View className="w-52 aspect-[3/4] rounded-lg bg-slate-300" />
        )}
      <Text onPress={pickImage} className="text-blue-500 font-semibold m-5">Change</Text>

      {/* Textinput for caption */}
      <TextInput
        value={caption}
        placeholder="What is on your mind"
        className="w-full p-3"
        onChangeText={(newValue) => setCaption(newValue)}
      />

      {/* button */}
      <View className="mt-auto w-full">
        <Button title="Share" onPress={createPost} />
      </View>
    </View>
  )
}