import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { API_URL } from '../config/config';

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

export default function Acompanhar() {

  const [protocolo, setProtocolo] = useState('');
  const [solicitacao, setSolicitacao] = useState<any>(null);

  const [editando, setEditando] = useState(false);

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [tipoProjeto, setTipoProjeto] = useState('');
  const [descricao, setDescricao] = useState('');

  async function handlePesquisar() {

    if (!protocolo) {
      alert('Digite o protocolo!');
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/solicitacao/${protocolo}`
      );

      const data = await response.json();

      if (data.erro) {
        setSolicitacao(null);
        alert('Solicitação não encontrada!');
        return;
      }

      setSolicitacao(data);

      setNome(data.nome);
      setCpf(data.cpf);
      setTelefone(data.telefone);
      setEndereco(data.endereco);
      setTipoProjeto(data.tipo_projeto);
      setDescricao(data.descricao);

    } catch (error) {

      console.log(error);

      alert('Erro ao conectar com a API!');
    }
  }

  async function handleCancelar() {

    try {

      const response = await fetch(
        `${API_URL}/cancelar/${solicitacao.protocolo}`,
        {
          method: 'PUT',
        }
      );

      const data = await response.json();

      alert(data.mensagem);

      setSolicitacao(null);
      setProtocolo('');

    } catch (error) {

      console.log(error);

      alert('Erro ao cancelar solicitação!');
    }
  }

  async function handleSalvarEdicao() {

    try {

      const response = await fetch(
        `${API_URL}/editar/${solicitacao.protocolo}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            protocolo: solicitacao.protocolo,
            nome,
            cpf,
            telefone,
            endereco,
            tipo_projeto: tipoProjeto,
            descricao,
            status: solicitacao.status,
          }),
        }
      );

      const data = await response.json();

      alert(data.mensagem);

      setEditando(false);

      handlePesquisar();

    } catch (error) {

      console.log(error);

      alert('Erro ao editar solicitação!');
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
              size={30}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.header}>

            <View style={styles.logoContainer}>
              <MaterialIcons
                name="search"
                size={50}
                color="#0057B8"
              />
            </View>

            <Text style={styles.titulo}>
              Acompanhar Solicitação
            </Text>

            <Text style={styles.subtitulo}>
              Consulte o andamento do seu pedido utilizando o protocolo
            </Text>

          </View>

          <TextInput
            style={styles.input}
            placeholder="Digite o protocolo"
            placeholderTextColor="#666"
            value={protocolo}
            onChangeText={setProtocolo}
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={handlePesquisar}
          >
            <Text style={styles.textoBotao}>
              Pesquisar
            </Text>
          </TouchableOpacity>

          {solicitacao && (

            <View style={styles.card}>

              <Text style={styles.protocolo}>
                PROTOCOLO: {solicitacao.protocolo}
              </Text>

              <Text style={styles.info}>
                Status: {solicitacao.status}
              </Text>

              {editando ? (

                <>

                  <TextInput
                    style={styles.inputEditar}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Nome"
                  />

                  <TextInput
                    style={styles.inputEditar}
                    value={cpf}
                    onChangeText={setCpf}
                    placeholder="CPF"
                  />

                  <TextInput
                    style={styles.inputEditar}
                    value={telefone}
                    onChangeText={setTelefone}
                    placeholder="Telefone"
                  />

                  <TextInput
                    style={styles.inputEditar}
                    value={endereco}
                    onChangeText={setEndereco}
                    placeholder="Endereço"
                  />

                  <TextInput
                    style={styles.inputEditar}
                    value={tipoProjeto}
                    onChangeText={setTipoProjeto}
                    placeholder="Tipo do Projeto"
                  />

                  <TextInput
                    style={styles.inputEditar}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Descrição"
                    multiline
                  />

                </>

              ) : (

                <>

                  <Text style={styles.info}>
                    Tipo: {solicitacao.tipo_projeto}
                  </Text>

                  <Text style={styles.info}>
                    Nome: {solicitacao.nome}
                  </Text>

                  <Text style={styles.info}>
                    Endereço: {solicitacao.endereco}
                  </Text>

                </>

              )}

              {editando ? (

                <TouchableOpacity
                  style={styles.botaoEditar}
                  onPress={handleSalvarEdicao}
                >
                  <Text style={styles.textoEditar}>
                    Salvar Alterações
                  </Text>
                </TouchableOpacity>

              ) : (

                <TouchableOpacity
                  style={styles.botaoEditar}
                  onPress={() => setEditando(true)}
                >
                  <Text style={styles.textoEditar}>
                    Editar Solicitação
                  </Text>
                </TouchableOpacity>

              )}

              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={handleCancelar}
              >
                <Text style={styles.textoCancelar}>
                  Cancelar Solicitação
                </Text>
              </TouchableOpacity>

            </View>

          )}

        </ScrollView>

      </KeyboardAvoidingView>

    </>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#0057B8',
    padding: 22,
    paddingTop: 45,
    paddingBottom: 40,
  },

  botaoVoltar: {
    marginBottom: 15,
    width: 45,
  },

  header: {
    alignItems: 'center',
    marginBottom: 35,
  },

  logoContainer: {
    backgroundColor: '#FFFFFF',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 18,
    fontSize: 16,
    color: '#333',
  },

  inputEditar: {
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 15,
  },

  botao: {
    backgroundColor: '#FFD700',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 28,
  },

  textoBotao: {
    color: '#002B5B',
    fontSize: 18,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
  },

  protocolo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0057B8',
    marginBottom: 18,
  },

  info: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },

  botaoEditar: {
    backgroundColor: '#1565C0',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 12,
  },

  textoEditar: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  botaoCancelar: {
    backgroundColor: '#D32F2F',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },

  textoCancelar: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

});