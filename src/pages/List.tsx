import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenu, IonMenuButton, IonModal, IonPage, IonRefresher, IonRefresherContent, IonRouterOutlet, IonSearchbar, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { trashBinOutline } from 'ionicons/icons';
import React, { useRef, useState } from 'react';

const List: React.FC = () => {
    const [users,setUsers ] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAlert] = useIonAlert()
    const [showToast] = useIonToast()
    const [ selectedUser, setSelectedUser ] = useState(null)
    const modal = useRef(null)


    useIonViewWillEnter(() => {
        const fetchData = async () => {
            try {
                const users = await getUsers();
                console.log('🚀 ~ file: List.tsx:10 ~ useIonViewWillEnter ~ users:', users);
                setUsers(users);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };
    
        fetchData();
    });
    
      const getUsers = async () => {
        const data = await fetch('https://randomuser.me/api?results=10');
        const users = await data.json();
        return users.results;
      };

      const clearList = () => {
        showAlert({
            header:'Confirm',
            message:"Are you sure you want to delete all users",
            buttons:[
                {text:'Cancel', role:'cancel'},
                {
                    text:'Delete',
                    handler:() => {
                        setUsers([])
                        showToast({
                            message:'All Users Deleted',
                            duration:2000,
                            color:'danger'
                        })
                    }
                }
            ]
        })
      }

      const doRefresh = async (e:any) => {
        setUsers(await getUsers())
        e.target.complete()
      }

    return (
        <IonPage>
            <IonHeader>
            
                <IonToolbar color={'tertiary'}>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                    <IonTitle>List</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={clearList}>
                            <IonIcon slot="icon-only" icon={trashBinOutline} color={'light'}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                <IonToolbar color={'tertiary'}>
                    <IonSearchbar />
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot='fixed' onIonRefresh={(e) => doRefresh(e)}>
                    <IonRefresherContent />
                </IonRefresher>
                {users.map((user,index) => (
                    <IonCard key={index} onClick={() => setSelectedUser(user)}>
                        <IonCardContent class="ion-no-padding">
                            <IonItem lines="none">
                                <IonAvatar slot="start">
                                    <IonImg src={user.picture.thumbnail} />
                                </IonAvatar>
                                <IonLabel>
                                    {user?.name?.first} {user?.name?.last}
                                </IonLabel>
                                <IonChip color={'primary'}>{user.nat}</IonChip>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ))}
                <IonModal ref={modal} isOpen={selectedUser!== null}
                onIonModalDidDismiss={()=> setSelectedUser(null)}>
                    <IonHeader>
                        <IonToolbar color={'success'}>
                            <IonButtons slot='start'>
                                <IonButton onClick={()=> modal.current?.dismiss()}>
                                    Close
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        Sheet
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default List;