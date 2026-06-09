import { Stack, router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import { FontAwesome5, MaterialIcons, } from '@expo/vector-icons';

export default function Home() {

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>

        <View style={styles.header}>

          <View style={styles.logoContainer}>
            <MaterialIcons
              name="architecture"
              size={70}
              color="#0057B8"
            />
          </View>

          <Text style={styles.titulo}>
            Solicita Planta
          </Text>

          <Text style={styles.subtitulo}>
            Sistema de solicitação de projetos arquitetônicos
          </Text>

        </View>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/novaSolicitacao')}
        >

          <View style={styles.iconContainer}>
            <FontAwesome5
              name="file-signature"
              size={32}
              color="#0057B8"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.cardTitulo}>
              Nova Solicitação
            </Text>

            <Text style={styles.cardTexto}>
              Solicite novos projetos arquitetônicos
            </Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/acompanhar')}
        >

          <View style={styles.iconContainer}>
            <MaterialIcons
              name="search"
              size={34}
              color="#0057B8"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.cardTitulo}>
              Acompanhar Solicitação
            </Text>

            <Text style={styles.cardTexto}>
              Consulte o andamento da solicitação
            </Text>
          </View>

        </TouchableOpacity>

      </View>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0057B8',
    padding: 25,
    justifyContent: 'center',
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logoContainer: {
    backgroundColor: '#FFFFFF',
    width: 90,
    height: 90,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },

  subtitulo: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 30,
    paddingHorizontal: 10,
  },

  card: {
    backgroundColor: '#FFD700',
    borderRadius: 28,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,

    elevation: 6,
  },

  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: '#FFF8DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },

  textContainer: {
    flex: 1,
  },

  cardTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#002B5B',
    marginBottom: 8,
  },

  cardTexto: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26,
  },

});