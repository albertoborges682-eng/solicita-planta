import { Stack, router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { API_URL } from '../config/config';

export default function NovaSolicitacao() {

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [tipoProjeto, setTipoProjeto] = useState('');
  const [descricao, setDescricao] = useState('');

  async function handleEnviar() {

    if (!nome || !cpf || !telefone || !endereco || !tipoProjeto || !descricao) {
      alert('Preencha todos os campos!');
      return;
    }

    const protocolo = `PLT-${Math.floor(Math.random() * 1000000)}`;

    try {

      const response = await fetch(`${API_URL}/solicitacao`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          protocolo,
          nome,
          cpf,
          telefone,
          endereco,
          tipo_projeto: tipoProjeto,
          descricao,
          status: 'Em análise',
        }),
      });

      const data = await response.json();

      console.log(data);

      alert(`Solicitação enviada com sucesso!\n\nProtocolo: ${protocolo}`);

      setNome('');
      setCpf('');
      setTelefone('');
      setEndereco('');
      setTipoProjeto('');
      setDescricao('');

    } catch (error) {

      console.log(error);

      alert('Erro ao conectar com a API!');
    }
  }

  return (

    <>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => router.push('/')}
          >
            <MaterialIcons
              name="arrow-back"
              size={28}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.header}>

            <View style={styles.logoContainer}>
              <MaterialIcons
                name="assignment"
                size={42}
                color="#0057B8"
              />
            </View>

            <Text style={styles.titulo}>
              Nova Solicitação
            </Text>

            <Text style={styles.subtitulo}>
              Preencha os dados abaixo para solicitar seu projeto arquitetônico
            </Text>

          </View>

          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#666"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#666"
            value={cpf}
            onChangeText={setCpf}
          />

          <TextInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor="#666"
            value={telefone}
            onChangeText={setTelefone}
          />

          <TextInput
            style={styles.input}
            placeholder="Endereço do projeto"
            placeholderTextColor="#666"
            value={endereco}
            onChangeText={setEndereco}
          />

          <TextInput
            style={styles.input}
            placeholder="Tipo do projeto"
            placeholderTextColor="#666"
            value={tipoProjeto}
            onChangeText={setTipoProjeto}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição do projeto"
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            value={descricao}
            onChangeText={setDescricao}
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={handleEnviar}
          >
            <Text style={styles.textoBotao}>
              Enviar Solicitação
            </Text>
          </TouchableOpacity>

        </ScrollView>

      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({

  botaoVoltar: {
    marginBottom: 12,
    width: 45,
  },

  container: {
    flexGrow: 1,
    backgroundColor: '#0057B8',
    padding: 22,
    paddingTop: 25,
    paddingBottom: 25,
  },

  header: {
    alignItems: 'center',
    marginBottom: 22,
  },

  logoContainer: {
    backgroundColor: '#FFFFFF',
    width: 85,
    height: 85,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    fontSize: 16,
    color: '#333',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,

    elevation: 3,
  },

  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },

  botao: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,

    elevation: 6,
  },

  textoBotao: {
    color: '#002B5B',
    fontSize: 18,
    fontWeight: 'bold',
  },

});