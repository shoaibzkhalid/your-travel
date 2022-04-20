import React from 'react';
import {View, Text,Image,Pressable,Share} from 'react-native';
import {Auth} from 'aws-amplify';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomButton from '../../components/CustomButton/CustomButton';

const Index = () => {
  const signOut = () => {
    Auth.signOut();
  };
  const Tab=createBottomTabNavigator();
  return (
    <View style={{flex: 1}}>
    
      <View
      style={{
        margin:5,
      }}
      >
        <Image
        source={ require('../../../assets/images/home.jpeg')}
        style={{
          
        }}
        resizeMode="cover"
        />
      </View>
      <View
      style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop:5
      }}
      >
        <CustomButton
        text="Hotel"
        style={{
          width:'20%'
        }}
        />
        <CustomButton
        text="Flights"
        style={{
          width:'24%'
        }}
        />
        <CustomButton
        text="Destination"
        style={{
          width:'30%'
        }}
        />
        <CustomButton
        text="Tours"
        style={{
          width:'20%'
        }}
        />
      </View>
      <View
      style={{
        margin:5,
      }}
      >
        <Image
        source={ require('../../../assets/images/pas.jpeg')}
        style={{
          height:200,
        }}
        resizeMode="cover"
        />
      </View>
      <View>
        <Text
        style={{
          color:'#000',
          textAlign:'center',
          fontWeight:"700",
          fontSize:24
        }}
        >Share With</Text>
        <View
          style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-evenly',
            padding:5
          }}
        >
          <Pressable
          style={{
            backgroundColor: '#3B71F3',
            width:'20%',
            padding:15
          }}
          onPress={()=>{
            Share.share({
              message:"Testing"
            })
          }}
          >
            <Text>W</Text>
          </Pressable>
          <Pressable
          onPress={()=>{
            Share.share({
              message:"Testing"
            })
          }}
          style={{
            backgroundColor: '#3B71F3',
            width:'20%',
            padding:15
          }}
          >
            <Text>W</Text>
          </Pressable>
          <Pressable
          style={{
            backgroundColor: '#3B71F3',
            width:'20%',
            padding:15
          }}
          onPress={()=>{
            Share.share({
              message:"Testing"
            })
          }}
          >
            <Text>W</Text>
          </Pressable>
          <Pressable
          style={{
            backgroundColor: '#3B71F3',
            width:'20%',
            padding:15
          }}
          onPress={()=>{
            Share.share({
              message:"Testing"
            })
          }}
          >
            <Text>W</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Index;
