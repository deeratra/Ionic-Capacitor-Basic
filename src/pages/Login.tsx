import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import {logInOutline, personCircleOutline} from 'ionicons/icons'
import React, { useEffect, useState } from 'react';
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';
import FCC from '../assests/fcc.svg'

const INTRO_KEY = 'intro-seen'

const Login: React.FC = () => {
    const router = useIonRouter()
    const [ introSeen, setIntroSeen] = useState(false)
    const [present, dismiss] = useIonLoading()

    useEffect(()=> {
        const checkStorage = async () => {
            const seen = await Preferences.get({key: INTRO_KEY})
            console.log("file: Ligin.tsx seen", seen)
            setIntroSeen(seen.value ==='true')
        }
        checkStorage()
    },[])
    const doLogin = async (e:any) => {
        e.preventDefault()
        console.log('Login In')
        await present('Loggin in...')
        setTimeout(()=>{
            dismiss()
            router.push('/app', 'root')
        },2000)
        
    }

    const finishIntro = async() => {
        console.log('FInish intro')
        setIntroSeen(true)
        Preferences.set({key: INTRO_KEY, value:'true'})
    }

    return (
        <>
        {!introSeen ? (<Intro onFinish={finishIntro}/>) : 
        <IonPage>
            <IonHeader>
                <IonToolbar color={'tertiary'}>
                    <IonTitle>Learn To Code</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false} className='ion-padding'>
                <IonGrid>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                            <div className='ion-text-center ion-padding'>
                                <img src={FCC} width={'50%'} />
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={doLogin}>
                            <IonInput placeholder='abc@gmail.com' label='Enter your Email' labelPlacement='floating' fill='outline' type='email' />
                            <IonInput className="ion-margin-top" placeholder='Secret' label='Enter your Password' labelPlacement='floating' fill='outline' type='password' />
                            <IonButton className="ion-margin-top" expand='block' type='submit'>
                                Login
                                <IonIcon icon={logInOutline} slot='end' />
                                </IonButton>
                            <IonButton routerLink="/register" color={'secondary'} className="ion-margin-top" expand='block' type='button'>
                                Register
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
        </IonPage>}
        </>
    );
};

export default Login;