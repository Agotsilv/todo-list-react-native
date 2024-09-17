import { Button, HStack, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { FlatList, View } from "react-native";
import Card from "../../components/Card";
import ButtonProps from "../../components/Button";
import React, { useEffect, useState } from "react";
import ModalRegister from "../../components/ModalRegister";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home() {
 const [todoArray, setTodosArray] = useState([]);
 const [modalVisible, setModalVisible] = useState(false)
 const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

 const getTasks = async () => {
  try {
   const jsonValue = await AsyncStorage.getItem('tasks');
   const tasksArray = jsonValue != null ? JSON.parse(jsonValue) : [];
   setTodosArray(tasksArray);
   console.log(tasksArray)

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

 const filterTasks = () => {
  if (selectedPriority === null) {
   return todoArray.filter((task: any) => task.concluido === false);
  }

  if (selectedPriority === 'Finalizadas') {
   return todoArray.filter((task: any) => task.concluido === true);
  }

  if (selectedPriority !== null && selectedPriority !== 'Finalizadas') {
   return todoArray.filter((task: any) => task.concluido === false && task.prioridade === selectedPriority);
  }
 };

 console.log(filterTasks())

 useEffect(() => {
  filterTasks()
 }, [selectedPriority])

 const getButtonStyle = (priority: string) => {
  return {
   bgColor: selectedPriority === priority ? '#6161F3' : 'transparent',
   borderColor: selectedPriority === priority ? 'transparent' : '#d3d3d3',
   textColor: selectedPriority === priority ? 'white' : '#d3d3d3',
  };
 }

 return (
  <VStack flex={1} bgColor="#181832">

   <HStack marginLeft={10} justifyContent="center" alignItems="center" space="md" marginTop={5}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
     <Button
      onPress={() => setSelectedPriority('urgente')}
      borderColor={getButtonStyle('urgente').borderColor}
      bg={getButtonStyle('urgente').bgColor}
      borderWidth={1}
      width={180}
      height={36}
      marginRight={10}
      justifyContent="center"
     >
      <Text color={getButtonStyle('urgente').textColor}>Urgente</Text>
     </Button>
     <Button
      onPress={() => setSelectedPriority('media_urgencia')}
      borderColor={getButtonStyle('media_urgencia').borderColor}
      bg={getButtonStyle('media_urgencia').bgColor}
      borderWidth={1}
      width={180}
      height={36}
      marginRight={10}
      justifyContent="center"
     >
      <Text color={getButtonStyle('media_urgencia').textColor}>Média urgência</Text>
     </Button>
     <Button
      onPress={() => setSelectedPriority('baixa_urgencia')}
      borderColor={getButtonStyle('baixa_urgencia').borderColor}
      bg={getButtonStyle('baixa_urgencia').bgColor}
      borderWidth={1}
      width={180}
      height={36}
      marginRight={10}
      justifyContent="center"
     >
      <Text color={getButtonStyle('baixa_urgencia').textColor}>Sem urgência</Text>
     </Button>

     {/* <Button
      onPress={() => setSelectedPriority('nao_finalizadas')}
      borderColor={getButtonStyle('nao_finalizadas').borderColor}
      bg={getButtonStyle('nao_finalizadas').bgColor}
      borderWidth={1}
      width={180}
      height={36}
      marginRight={10}
      justifyContent="center"
     >
      <Text color={getButtonStyle('nao_finalizadas').textColor}>Não finalizadas</Text>
     </Button> */}

     <Button
      onPress={() => setSelectedPriority('Finalizadas')}
      borderColor={getButtonStyle('Finalizadas').borderColor}
      bg={getButtonStyle('Finalizadas').bgColor}
      borderWidth={1}
      width={180}
      height={36}
      marginRight={10}
      justifyContent="center"
     >
      <Text color={getButtonStyle('Finalizadas').textColor}>Finalizadas</Text>
     </Button>
    </ScrollView>



   </HStack>

   <TouchableOpacity
    style={{ width: '95%', alignItems: 'flex-end', }}
    onPress={() => setSelectedPriority(null)}
   >
    <Text color="white">Limpar filtro</Text>
   </TouchableOpacity>

   <View style={{ height: 550, width: '100%', marginTop: 10 }}>
    <FlatList
     data={filterTasks()}
     renderItem={({ item }) => <Card id={item.id} list={getTasks}
      title={item.title} onDelete={handleDelete}
      dataInicial={item.dataInicial} concluido={item.concluido} prioridade={item.prioridade} />}
     keyExtractor={(item: any) => item.id}
    />
   </View>

   <HStack marginTop={-10}>
    <ButtonProps title="Cadastrar" onPress={handleOpenModal} />
   </HStack>

   <ModalRegister visible={modalVisible} onCloseModal={handleCloseModal} list={getTasks} />
  </VStack>
 )
}