import React, { useState, useEffect } from "react";

import
{
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SafeAreaView
}
from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App()
{
    const [isDarkMode, setIsDarkMode] = useState(true);

    const [showRegister, setShowRegister] = useState(false);

    const [isLogged, setIsLogged] = useState(false);

    const [clock, setClock] = useState("");

    const [loginEmail, setLoginEmail] = useState("");

    const [loginPassword, setLoginPassword] = useState("");

    const [registerName, setRegisterName] = useState("");

    const [registerEmail, setRegisterEmail] = useState("");

    const [registerPassword, setRegisterPassword] = useState("");

    const [userName, setUserName] = useState("");

    // =========================
    // RELOJ
    // =========================

    useEffect(() =>
    {
        const interval = setInterval(() =>
        {
            const now = new Date();

            setClock(now.toLocaleTimeString());

        }, 1000);

        return () => clearInterval(interval);

    }, []);

    // =========================
    // VALIDAR CORREO
    // =========================

    function validEmail(email)
    {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);
    }

    // =========================
    // REGISTRO
    // =========================

    async function register()
    {
        if(registerName === "" ||
           registerEmail === "" ||
           registerPassword === "")
        {
            Alert.alert("Error", "Completa todos los campos.");

            return;
        }

        if(!validEmail(registerEmail))
        {
            Alert.alert("Error", "Correo inválido.");

            return;
        }

        if(registerPassword.length < 4)
        {
            Alert.alert(
                "Error",
                "La contraseña debe tener mínimo 4 caracteres."
            );

            return;
        }

        const user =
        {
            name: registerName,
            email: registerEmail,
            password: registerPassword
        };

        await AsyncStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        Alert.alert("Correcto", "Cuenta creada correctamente.");

        setRegisterName("");

        setRegisterEmail("");

        setRegisterPassword("");

        setShowRegister(false);
    }

    // =========================
    // LOGIN
    // =========================

    async function login()
    {
        const data = await AsyncStorage.getItem("user");

        if(data === null)
        {
            Alert.alert(
                "Error",
                "Primero debes crear una cuenta."
            );

            return;
        }

        const user = JSON.parse(data);

        if(!validEmail(loginEmail))
        {
            Alert.alert("Error", "Correo inválido.");

            return;
        }

        if(loginEmail === user.email &&
           loginPassword === user.password)
        {
            setUserName(user.name);

            setIsLogged(true);
        }
        else
        {
            Alert.alert(
                "Error",
                "Correo o contraseña incorrectos."
            );
        }
    }

    // =========================
    // LOGOUT
    // =========================

    function logout()
    {
        setIsLogged(false);

        setLoginEmail("");

        setLoginPassword("");
    }

    // =========================
    // COLORES
    // =========================

    const backgroundColor = isDarkMode ? "#000" : "#f2f2f2";

    const cardColor = isDarkMode
        ? "rgba(0,0,0,0.9)"
        : "#fff";

    const textColor = isDarkMode ? "#00ff66" : "#00aa44";

    const inputColor = isDarkMode ? "#111" : "#eee";

    // =========================
    // RENDER
    // =========================

    return(
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor
                }
            ]}
        >
            <TouchableOpacity
                style={styles.modeButton}
                onPress={() => setIsDarkMode(!isDarkMode)}
            >
                <Text style={{ color: textColor }}>
                    ☀ / 🌙
                </Text>
            </TouchableOpacity>

            <View
                style={[
                    styles.card,
                    {
                        backgroundColor: cardColor,
                        borderColor: textColor
                    }
                ]}
            >

                {
                    !isLogged ?

                    (

                        !showRegister ?

                        (
                            <>
                                <Text
                                    style={[
                                        styles.title,
                                        { color: textColor }
                                    ]}
                                >
                                    {"> INICIAR SESIÓN_"}
                                </Text>

                                <TextInput
                                    placeholder="Correo"
                                    placeholderTextColor={textColor}

                                    style={[
                                        styles.input,
                                        {
                                            borderColor: textColor,
                                            color: textColor,
                                            backgroundColor: inputColor
                                        }
                                    ]}

                                    value={loginEmail}

                                    onChangeText={setLoginEmail}
                                />

                                <TextInput
                                    placeholder="Contraseña"

                                    placeholderTextColor={textColor}

                                    secureTextEntry

                                    style={[
                                        styles.input,
                                        {
                                            borderColor: textColor,
                                            color: textColor,
                                            backgroundColor: inputColor
                                        }
                                    ]}

                                    value={loginPassword}

                                    onChangeText={setLoginPassword}
                                />

                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        {
                                            backgroundColor: textColor
                                        }
                                    ]}

                                    onPress={login}
                                >
                                    <Text style={styles.buttonText}>
                                        ENTRAR
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setShowRegister(true)}
                                >
                                    <Text
                                        style={[
                                            styles.link,
                                            { color: textColor }
                                        ]}
                                    >
                                        ¿Sin cuenta? Crear una
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )

                        :

                        (
                            <>
                                <Text
                                    style={[
                                        styles.title,
                                        { color: textColor }
                                    ]}
                                >
                                    {"> CREAR CUENTA_"}
                                </Text>

                                <TextInput
                                    placeholder="Nombre"

                                    placeholderTextColor={textColor}

                                    style={[
                                        styles.input,
                                        {
                                            borderColor: textColor,
                                            color: textColor,
                                            backgroundColor: inputColor
                                        }
                                    ]}

                                    value={registerName}

                                    onChangeText={setRegisterName}
                                />

                                <TextInput
                                    placeholder="Correo"

                                    placeholderTextColor={textColor}

                                    style={[
                                        styles.input,
                                        {
                                            borderColor: textColor,
                                            color: textColor,
                                            backgroundColor: inputColor
                                        }
                                    ]}

                                    value={registerEmail}

                                    onChangeText={setRegisterEmail}
                                />

                                <TextInput
                                    placeholder="Contraseña"

                                    placeholderTextColor={textColor}

                                    secureTextEntry

                                    style={[
                                        styles.input,
                                        {
                                            borderColor: textColor,
                                            color: textColor,
                                            backgroundColor: inputColor
                                        }
                                    ]}

                                    value={registerPassword}

                                    onChangeText={setRegisterPassword}
                                />

                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        {
                                            backgroundColor: textColor
                                        }
                                    ]}

                                    onPress={register}
                                >
                                    <Text style={styles.buttonText}>
                                        CREAR CUENTA
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setShowRegister(false)}
                                >
                                    <Text
                                        style={[
                                            styles.link,
                                            { color: textColor }
                                        ]}
                                    >
                                        ¿Ya tienes cuenta? Iniciar sesión
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )
                    )

                    :

                    (
                        <>
                            <Text
                                style={[
                                    styles.title,
                                    { color: textColor }
                                ]}
                            >
                                Bienvenido, {userName}
                            </Text>

                            <Text
                                style={[
                                    styles.message,
                                    { color: textColor }
                                ]}
                            >
                                Has iniciado sesión correctamente.
                            </Text>

                            <Text
                                style={[
                                    styles.clock,
                                    { color: textColor }
                                ]}
                            >
                                {clock}
                            </Text>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: textColor
                                    }
                                ]}

                                onPress={logout}
                            >
                                <Text style={styles.buttonText}>
                                    CERRAR SESIÓN
                                </Text>
                            </TouchableOpacity>
                        </>
                    )
                }

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,

        justifyContent: "center",

        alignItems: "center"
    },

    card:
    {
        width: "85%",

        padding: 30,

        borderWidth: 2,

        borderRadius: 15
    },

    title:
    {
        fontSize: 26,

        fontWeight: "bold",

        textAlign: "center",

        marginBottom: 25
    },

    input:
    {
        borderWidth: 1,

        borderRadius: 8,

        padding: 12,

        marginBottom: 15
    },

    button:
    {
        padding: 14,

        borderRadius: 8,

        marginTop: 10
    },

    buttonText:
    {
        textAlign: "center",

        fontWeight: "bold",

        color: "black"
    },

    link:
    {
        textAlign: "center",

        marginTop: 20,

        textDecorationLine: "underline"
    },

    message:
    {
        textAlign: "center",

        marginTop: 10,

        fontSize: 16
    },

    clock:
    {
        textAlign: "center",

        fontSize: 42,

        marginTop: 30,

        fontWeight: "bold"
    },

    modeButton:
    {
        position: "absolute",

        top: 50,

        right: 30,

        zIndex: 10
    }
});
