import { Button, Icon, Card, Input, Text } from '@ui-kitten/components';
import React, { Component, } from 'react';
import { inject, observer } from 'mobx-react';

import HomeStore from '../../stores/home.store';
import { StyleSheet } from 'react-native';


interface Props {
    homeStore: HomeStore
}

export const CarIcon = (style) => (
    <Icon name='droplet' {...style} />
);


@inject('homeStore')
@observer
export default class Home extends Component<Props> {

    render() {
        const { etanol, gasolina, resultado, calculate, handleForm } = this.props.homeStore;

        return (<>
            <Card >
                <Text>Informe o valor do etanol:</Text>
                <Input style={styles.input} value={etanol.toString()} onChangeText={(etanol) => handleForm({ etanol })} />

                <Text>Informe o valor da Gasolina:</Text>
                <Input style={styles.input} value={gasolina.toString()} onChangeText={(gasolina) => handleForm({ gasolina })} />

                <Button icon={CarIcon} onPress={() => calculate()}>Calcular</Button>
                <Text style={styles.paragraph}>{resultado}</Text>
            </Card>
        </>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        paddingTop: '10',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
      marginBottom: 30,
      marginTop: 10,  
    },
});
