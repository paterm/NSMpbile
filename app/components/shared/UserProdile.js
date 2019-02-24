import React from 'react';
import { View, Image, Text } from 'react-native';
import {ROLE_NAME} from '../../consts';
import {ProfileService} from "../../services";

const UserProfile = ({ user }) => {
    const avatarUrl = ProfileService.getAvatar(user);

    return (
        <View style={styles.container}>
            {avatarUrl &&
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{url: avatarUrl}}/>
                </View>
            }
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{`${user.lastName} ${user.firstName}`}</Text>
                <Text style={styles.roles}>{user.roles.map(role => ROLE_NAME[role]).join(', ')}</Text>
            </View>
        </View>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 10
    },
    name: {
        textAlign: 'left',
        fontSize: 24,
        fontWeight: '700'
    },
    roles: {
        fontSize: 12,
        color: '#999'
    },
    image: {
        width: 40,
        height: 40
    }
};

export default UserProfile;
