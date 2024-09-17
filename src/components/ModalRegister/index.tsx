
import { HStack, InputField, VStack, Button, Text } from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import { Keyboard, StyleSheet, TextInput, View, Alert, TouchableOpacity, ScrollView } from "react-native";
import Modal from "react-native-modal";
import ButtonProps from "../Button";
import { Input } from "@gluestack-ui/themed";
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  visible: boolean;
  onCloseModal: () => void;
  list: () => void;
}

export default function ModalRegister({
  visible,
  onCloseModal,
  list
}: Props) {
  const [task, setTask] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleRegister = async () => {
    if (task === "") {
      Alert.alert('Error', 'Por favor, insira uma tarefa.')
      return;
    }

    const jsonValue = await AsyncStorage.getItem('tasks');
    const tasksArray = jsonValue != null ? JSON.parse(jsonValue) : [];

    let counter: any = await AsyncStorage.getItem('taskCounter');
    counter = counter ? parseInt(counter) : 1;

    const currentDate = new Date().toLocaleDateString();
    const taskWithDate = { id: counter, title: task, descricao: description, prioridade: selectedPriority, dataInicial: currentDate, concluido: false };
    tasksArray.push(taskWithDate);

    const updatedJsonValue = JSON.stringify(tasksArray);

    await AsyncStorage.setItem('taskCounter', (counter + 1).toString());
    await AsyncStorage.setItem('tasks', updatedJsonValue);

    setTask('');
    setDescription('');
    setSelectedPriority(null)
    onCloseModal()
    list();
  }

  const getPriorityColor = () => {
    switch (selectedPriority) {
      case 'urgente':
        return '#FF0000';
      case 'media_urgencia':
        return '#FF6400';
      case 'baixa_urgencia':
        return '#008000';
      default:
        return '#d3d3d3';
    }
  };

  const getButtonStyle = (priority: string) => {
    return {
      bgColor: selectedPriority === priority ? getPriorityColor() : 'transparent',
      borderColor: selectedPriority === priority ? 'transparent' : '#d3d3d3',
      textColor: selectedPriority === priority ? 'white' : '#d3d3d3',
    };
  }

  console.log(selectedPriority)

  return (
    <Modal isVisible={visible} testID={'modal'}
      swipeDirection={[]} style={styles.view}>
      <VStack w="$full" h={keyboardOpen ? '81%' : '50%'} bgColor="#181832">
        <TouchableOpacity style={styles.container} onPress={onCloseModal} >
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>

        <View style={{
          width: '95%', alignItems: 'center', justifyContent: 'center', marginTop: 20
        }}>
          <Input marginLeft={24} w="$full" height={50} $active-borderColor="$white" $focus-borderColor="white" >
            <InputField placeholder="Task" defaultValue={task} type="text" color="white" fontFamily="JostRegular" fontSize={18}
              onChangeText={(value: string) => setTask(value)} />
          </Input>

          <Input marginLeft={24} w="$full" height={100} marginTop={15} $active-borderColor="$white" $focus-borderColor="white">
            <InputField
              defaultValue={description}
              type="text"
              color="white"
              fontFamily="JostRegular"
              fontSize={18}
              onChangeText={(value: string) => setDescription(value)}
              multiline={true}
              numberOfLines={4}
              placeholder="Descrição"
              textAlignVertical="top"
            />
          </Input>
        </View>

        <VStack
          justifyContent="center"
          alignItems="center"
          space="md"
          marginTop={5}
          style={{ overflow: 'hidden' }} // Adiciona overflow
        >
          <HStack
            space="md"
            style={{ width: '100%', justifyContent: 'center' }} // Para centralizar os botões
          >
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
          </HStack>

          <Button
            onPress={() => setSelectedPriority('baixa_urgencia')}
            borderColor={getButtonStyle('baixa_urgencia').borderColor}
            bg={getButtonStyle('baixa_urgencia').bgColor}
            borderWidth={1}
            width={180}
            height={36}
            justifyContent="center"
          >
            <Text color={getButtonStyle('baixa_urgencia').textColor}>Sem urgência</Text>
          </Button>
        </VStack>




        <ButtonProps title="Criar task" onPress={handleRegister} />
      </VStack>
    </Modal>
  )
}


const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    width: '98%',
    marginTop: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 5,

  },
});