
import { InputField, VStack } from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import { Button, Text, Keyboard, StyleSheet, TextInput, View, Alert, TouchableOpacity } from "react-native";
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
  const [todoArray, setTodosArray] = useState([])
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
    const taskWithDate = { id: counter, title: task, dataInicial: currentDate, concluido: false };
    tasksArray.push(taskWithDate);

    const updatedJsonValue = JSON.stringify(tasksArray);

    await AsyncStorage.setItem('taskCounter', (counter + 1).toString());
    await AsyncStorage.setItem('tasks', updatedJsonValue);

    setTask('');
    onCloseModal()
    list();
  }


  return (
    <Modal isVisible={visible} testID={'modal'}
      swipeDirection={['up', 'left', 'right', 'down']} style={styles.view}>
      <VStack w="$full" h={keyboardOpen ? '58%' : '30%'} bgColor="#181832">
        <TouchableOpacity style={styles.container} onPress={onCloseModal} >
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>

        <View style={{
          width: '95%', alignItems: 'center', justifyContent: 'center', marginTop: 20
        }}>
          <Input marginLeft={24} w="$full" height={50} $active-borderColor="$white" $focus-borderColor="white" >
            <InputField defaultValue={task} type="text" color="white" fontFamily="JostRegular" fontSize={18}
              onChangeText={(value: string) => setTask(value)} />
          </Input>
        </View>

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