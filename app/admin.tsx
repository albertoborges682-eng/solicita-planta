import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';

import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { API_URL } from '../config/config';

export default function Admin() {

  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);

  async function carregarSolicitacoes() {

    try {

      const response = await fetch(
        `${API_URL}/solicitacoes`
      );

      const data = await response.json();

      setSolicitacoes(data);

    } catch (error) {

      console.log(error);

      alert('Erro ao carregar solicitações!');
    }
  }

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  return (

    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={styles.container}>

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
              name="admin-panel-settings"
              size={42}
              color="#0057B8"
            />
          </View>

          <Text style={styles.titulo}>
            Painel Administrativo
          </Text>

          <Text style={styles.subtitulo}>
            Lista de solicitações cadastradas
          </Text>

        </View>

        {solicitacoes.map((item, index) => (

          <View
            key={index}
            style={styles.card}
          >

            <Text style={styles.protocolo}>
              {item.protocolo}
            </Text>

            <Text style={styles.info}>
              Nome: {item.nome}
            </Text>

            <Text style={styles.info}>
              Tipo: {item.tipo_projeto}
            </Text>

            <Text style={styles.info}>
              Endereço: {item.endereco}
            </Text>

            <Text style={styles.status}>
              Status: {item.status}
            </Text>

          </View>

        ))}

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#0057B8',
    padding: 22,
    paddingTop: 25,
    paddingBottom: 30,
  },

  botaoVoltar: {
    marginBottom: 12,
    width: 45,
  },

  header: {
    alignItems: 'center',
    marginBottom: 25,
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
  },

  subtitulo: {
    fontSize: 15,
    color: '#FFFFFF',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
  },

  protocolo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0057B8',
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
  },

  status: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

});