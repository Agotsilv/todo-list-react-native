import { HStack, VStack } from "@gluestack-ui/themed";
import { FlatList, Text, View } from "react-native";
import Card from "../../components/Card";
import ButtonProps from "../../components/Button";
import React, { useEffect, useState } from "react";
import ModalRegister from "../../components/ModalRegister";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
 const [todoArray, setTodosArray] = useState([]);
 const [modalVisible, setModalVisible] = useState(false)


 const getTasks = async () => {
  try {
   const jsonValue = await AsyncStorage.getItem('tasks');
   const tasksArray = jsonValue != null ? JSON.parse(jsonValue) : [];
   setTodosArray(tasksArray);



   const storageUser: any = await AsyncStorage.getItem('@RNAuth:user');

   console.log(storageUser)


  } catch (e) {
   console.log("Error retrieving tasks", e);
  }
 };

 useEffect(() => {
  getTasks();
 }, []);

 const handleCloseModal = () => {
  setModalVisible(false);
 };

 const handleOpenModal = () => {
  setModalVisible(true);
 };

 const handleDelete = async (id: string) => {
  const jsonValue = await AsyncStorage.getItem('tasks');
  let tasksArray = jsonValue != null ? JSON.parse(jsonValue) : [];

  tasksArray = tasksArray.filter((task: any) => task.id !== id);

  const updatedJsonValue = JSON.stringify(tasksArray);
  await AsyncStorage.setItem('tasks', updatedJsonValue);

  setTodosArray(tasksArray);
 };

 return (
  <VStack flex={1} bgColor="#181832">

   <View style={{ height: 700 }}>
    <FlatList
     data={todoArray}
     renderItem={({ item }) => <Card id={item.id}
      title={item.title} onDelete={handleDelete}
      dataInicial={item.dataInicial} concluido={item.concluido} />}
     keyExtractor={(item: any) => item.id}
    />
   </View>

   <HStack>
    <ButtonProps title="Cadastrar" onPress={handleOpenModal} />
   </HStack>

   <ModalRegister visible={modalVisible} onCloseModal={handleCloseModal} list={getTasks} />
  </VStack>
 )
}