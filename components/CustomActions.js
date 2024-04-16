import { Pressable } from "react-native";

const CustomActions = () => {

    const onActionPress = () => { }

    return (
        <Pressable style={styles.container} onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </Pressable>
    );
}

export default CustomActions;