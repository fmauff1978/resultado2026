import { Image } from "expo-image";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { db } from "@/firebase";
import { Link } from "expo-router";

type Conta = {
  id: string;
  cod: number;
  nome?: string;
  saldo?: number;
  [key: string]: any;
};

export default function HomeScreen() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContas() {
      try {
        const contasQuery = query(collection(db, "contas2025"), limit(20), orderBy("cod", "asc"));
        const snapshot = await getDocs(contasQuery);
        const loadedContas = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Conta[];
        setContas(loadedContas);
      } catch (err) {
        setError((err as Error)?.message ?? "Erro ao carregar contas.");
      } finally {
        setLoading(false);
      }
    }

    loadContas();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Contas</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Primeiras 5 contas do Firestore</ThemedText>
        {loading && <ThemedText>Carregando contas...</ThemedText>}
        {error && <ThemedText>{error}</ThemedText>}
        {!loading && !error && contas.length === 0 && (
          <ThemedText>Nenhuma conta encontrada.</ThemedText>
        )}
        {!loading &&
          !error &&
          contas.map((conta) => (
            <ThemedView key={conta.id} style={styles.contaItem}>
              <ThemedText type="defaultSemiBold">
                {conta.conta ?? "Conta sem nome"}
              </ThemedText>
              <ThemedText>{`ID: ${conta.cod}`}</ThemedText>
              {conta.saldo !== undefined && (
                <ThemedText>{`Saldo: ${conta.saldo}`}</ThemedText>
              )}
            </ThemedView>
          ))}
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title="Action"
              icon="cube"
              onPress={() => alert("Action pressed")}
            />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert("Share pressed")}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert("Delete pressed")}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  contaItem: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
