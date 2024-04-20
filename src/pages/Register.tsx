import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {checkmarkDoneOutline, logInOutline, personCircleOutline} from 'ionicons/icons'
import React from 'react';

const Login: React.FC = () => {

    const doRegister = (e:any) => {
        e.preventDefault()
        console.log('Registerd')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'tertiary'}>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref='/' />
                    </IonButtons>
                    <IonTitle>Learn To Code</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={doRegister}>
                            <IonInput placeholder='abc@gmail.com' label='Enter your Email' labelPlacement='floating' fill='outline' type='email' />
                            <IonInput className="ion-margin-top" placeholder='Secret' label='Enter your Password' labelPlacement='floating' fill='outline' type='password' />
                            <IonButton className="ion-margin-top" expand='block' type='submit'>
                                Register
                                <IonIcon icon={checkmarkDoneOutline} slot='end' />
                                </IonButton>
                            <IonButton routerLink="/login" color={'secondary'} className="ion-margin-top" expand='block' type='button'>
                                Login
                                <IonIcon icon={personCircleOutline} slot='end' />
                                </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>

            </IonContent>
            <IonFooter>
                <IonToolbar>
                   Copyright
                </IonToolbar> 
                </IonFooter>
        </IonPage>
    );
};

export default Login;