import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Search = () => {
    return (
        <View style={styles.container}>
            <AntDesign name="search1" size={20} style={styles.icon}/>
            <TextInput placeholder="Tìm bạn bè" style={styles.input}/>
        </View>
    )
}

const styles = StyleSheet.create({
     container : {
         height: 50,
         flexDirection: 'row',
         backgroundColor: '#22aed1'
     }, 
     icon : {
         marginVertical: 13,
         marginHorizontal: 10
     },
     input : {
         flex : 1
     }
})

export default Search;