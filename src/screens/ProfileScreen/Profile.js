import React from 'react'
import { View, Text,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native'
import {Auth, Hub,Storage} from 'aws-amplify';
import * as ImagePicker from 'react-native-image-picker';
import CustomButton from '../../components/CustomButton/CustomButton';
const Profile = () => {
  const [user, setUser] = React.useState(undefined);
  const [form,setForm]=React.useState({
    username:"",
    email:"",
    country:"",
    bio:"",
    imageUri:null,
    photoName:""
  });
  async function fetchImage(image){
    const imageset= Storage.get(image,{level:'private'})
    setForm({...form,imageUri:imageset})
  }
  async function updateImage(){
    try{
      const photo = await fetch(form.imageUri)
      const photoBlob=await photo.blob();
      await Storage.put(form.photoName,photoBlob,{
        level:'private',
        contentType:'image/jpg'
      })
      await Auth.updateUserAttributes(user,{
        'picture':form.photoName
      })
    }catch(e){}
  }
  const checkUser = async () => {
    try {

      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      console.log(authUser.attributes);
      setUser(authUser);
      setForm({...form,username:authUser.attributes.name,email:authUser.attributes.email})
    } catch (e) {
      setUser(null);
    }
  };
  const updateInfo = async()=>{
    const current=await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(current,{
      'email':form.email,
      'name':form.username,
      'prefered_name':form.username
    }).then((response)=>{
      console.log(response)
    });
  }

  React.useEffect(() => {
    checkUser();
  }, []);

  React.useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  React.useEffect(()=>{
    
  });
  return (
    <ScrollView
    
    style={{
      flex:1,
      backgroundColor:'#fff'
    }}
    >
        <View
        style={{
          paddingBottom:24,
          paddingTop:24
        }}
        >
          <Text
          style={{
            color:'#000',
            textAlign:'center',
            fontSize:24,
            textTransform:'capitalize'
          }}
          >{user===undefined ?"Loading..." :user.username}</Text>
        </View>
        <TouchableOpacity
        style={{
          alignItems:'center',
          padding:10
        }}
        onPress={
          ()=>{
            ImagePicker.launchImageLibrary({
              storageOptions:{
                skipBackup:true,
                path:"images"
              }
            },(response)=>{
            if(response.didCancel){
              return;
            }
              setForm({...form,imageUri:response.assets[0].uri,photoName:response.assets[0].fileName});
              updateImage();
            });
          }
        }
        >
        <Image
        defaultSource={require('../../../assets/images/Logo_1.png')}
        source={
          {uri:form.imageUri}
        }
        
        style={{
          borderRadius:75,
          height:150,
          width:150,
          borderWidth:4,
          borderColor:'black',
        }}
        />
        </TouchableOpacity>
      
      <View
      style={{
        flex:1,
        
      }}
      >
        <View
        style={{
          display:'flex',
          flexDirection:'row',
          padding:10,
          alignContent:'space-between',
          
        }}
        >
          <Text
          style={{
            color:'#000',
            padding:10
          }}
          >Username</Text>
          <TextInput
          style={{
            borderWidth:1,
            width:'75%',
            color:"#000",
            paddingLeft:25
            
          }}
          value={form.username}
          onChangeText={(e)=>{
            setForm({...form,username:e});
          }}
          />
        </View>
        <View
        style={{
          display:'flex',
          flexDirection:'row',
          padding:10,
          alignContent:'space-between',
          
        }}
        >
          <Text
          style={{
            color:'#000',
            padding:10
          }}
          >Email</Text>
          <TextInput
          style={{
            borderWidth:1,
            width:'75%',
            marginLeft:30,
            color:"#000",
            paddingLeft:25
            
          }}
          value={form.email}
          onChangeText={(e)=>{
            setForm({...form,email:e})
          }}
          />
        </View>
        <View
        style={{
          display:'flex',
          flexDirection:'row',
          padding:10,
          alignContent:'space-between',
          
        }}
        >
          <Text
          style={{
            color:'#000',
            padding:10
          }}
          >Country</Text>
          <TextInput
          style={{
            borderWidth:1,
            width:'75%',
            marginLeft:20,
            color:'#000',
            paddingLeft:20
          }}
          value={form.country}
          onChangeText={(value)=>{
            setForm({...form,country:value});
          }}
          />
        </View>
        <Text
        style={{
          textAlign:'center',
          color:"#000",
          fontWeight:"700",
          fontSize:24,
          paddingTop:4
        }}
        >
          Bio
        </Text>
        <View
        style={{
          
        }}
        >
<Text>{form.bio}</Text>
        </View>
      </View>
      <View
      style={{
        padding:15
      }}
      >
        <CustomButton
        text={"Update"}
        onPress={()=>{
          updateInfo()
        }}
        />
      </View>
    </ScrollView>
  )
}

export default Profile;