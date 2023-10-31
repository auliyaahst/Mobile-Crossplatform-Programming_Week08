import {
  IonApp,
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonText,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonRow,
  isPlatform,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import MemoriesContext from "../data/memories-context";
import MemoryItem from "../components/MemoryItem";

const BadMemories = () => {
  const history = useHistory();
  const [isAdding, setIsAdding] = useState(false);
  const memoriesCtx = useContext(MemoriesContext);
  const badMemories = memoriesCtx.memories.filter(
    (memory) => memory.type === "bad"
  );

  const startAddFriendHandler = () => {
    setIsAdding(true);
    // setSelectedFriend(null);
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
          <IonTitle>BadMemories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {badMemories.length === 0 && (
            <IonRow>
              <IonCol className="ion-text-center">
                <h2>No bad memories found.</h2>
              </IonCol>
            </IonRow>
          )}
          {badMemories.map((memory) => (
            <IonRow key={memory.id}>
              <IonCol>
                <MemoryItem memory={memory} />
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

export default BadMemories;
