import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Link href={"about"} style={styles.text}>Welcome Back Ernesto</Link>
            <StatusBar style="auto" />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
    },
    text: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: "orange",
    },
});
