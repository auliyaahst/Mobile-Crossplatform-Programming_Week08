import {
  IonApp,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { addOutline, arrowBack } from "ionicons/icons";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import MemoriesContext from "../data/memories-context";
import MemoryItem from "../components/MemoryItem";

const GoodMemories = () => {
  const history = useHistory();
  const [isAdding, setIsAdding] = useState(false);
  const memoriesCtx = useContext(MemoriesContext);
  const goodMemories = memoriesCtx.memories.filter(
    (memory) => memory.type === "good"
  );

  const startAddFriendHandler = () => {
    setIsAdding(true);
    history.push("/tabs/new-memory");
  };

  const cancelAddFriendHandler = () => {
    setIsAdding(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {!isPlatform("android") && (
            <IonButtons slot="end">
              <IonButton onClick={startAddFriendHandler}>
                <IonIcon icon={addOutline} />
              </IonButton>
            </IonButtons>
          )}
          <IonTitle>GoodMemories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {goodMemories.length === 0 && (
            <IonRow>
              <IonCol className="ion-text-center">
                <h2>No good memories found.</h2>
              </IonCol>
            </IonRow>
          )}
          {goodMemories.map((memory) => (
            <IonRow key={memory.id}>
              <IonCol>
                <IonCard>
                  <img src={memory.base64Url} alt={memory.title} />
                  <IonCardHeader>
                    <IonText>{memory.title}</IonText>
                  </IonCardHeader>
                  {/* <MemoryItem memory={memory} /> */}
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
        {isPlatform("android") && (
          <IonFab horizontal="end" vertical="bottom" slot="fixed">
            <IonFabButton color="secondary" onClick={startAddFriendHandler}>
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GoodMemories;
