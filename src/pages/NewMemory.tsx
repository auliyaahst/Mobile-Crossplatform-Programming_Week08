import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack, camera } from "ionicons/icons";
import { useHistory } from "react-router";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { base64FromPath } from "@ionic/react-hooks/filesystem";
import { useContext, useRef, useState } from "react";
import MemoriesContext from "../data/memories-context";

const NewMemory = () => {
  const history = useHistory();
  const [chosenMemoryType, setChosenMemoryType] = useState<"good" | "bad">(
    "good"
  );
  const titleRef = useRef<HTMLIonInputElement>(null);
  const memoriesCtx = useContext(MemoriesContext);

  const backToGoodMemories = () => {
    history.push("/tabs/good-memories");
  };

  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined;
    preview: string;
  }>();

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500,
    });
    console.log(photo);

    if (!photo || !photo.webPath) {
      return;
    }

    setTakenPhoto({
      path: photo.path!,
      preview: photo.webPath!,
    });
  };

  const selectMemoryTypeHandler = (event: CustomEvent) => {
    const selectedMemoryType = event.detail.value;
    setChosenMemoryType(selectedMemoryType);
  };

  const addMemoryHandler = async () => {
    const enteredTitle = titleRef.current?.value;
    if (
      !enteredTitle ||
      enteredTitle.toString().trim().length === 0 ||
      !takenPhoto ||
      !chosenMemoryType
    ) {
      return;
    }

    const fileName = new Date().getTime() + ".jpeg";
    const base64 = await base64FromPath(takenPhoto!.preview);
    await Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: Directory.Data,
    });

    memoriesCtx.addMemory(
      fileName,
      base64,
      enteredTitle.toString(),
      chosenMemoryType
    );
    history.length > 0
      ? history.goBack()
      : history.replace("/tabs/good-memories");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={backToGoodMemories}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Add New Memory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonInput
                type="text"
                label="Memory Title"
                labelPlacement="floating"
                placeholder="Enter text"
                ref={titleRef}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonSelect onIonChange={selectMemoryTypeHandler} value="good">
                <IonSelectOption value="good">Good Memory</IonSelectOption>
                <IonSelectOption value="bad">Bad Memory</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-text-center">
          <IonCol>
            <div className="image-preview">
              {!takenPhoto && <IonText>No photo taken.</IonText>}
              {takenPhoto && <img src={takenPhoto.preview} alt="Preview" />}
            </div>
            <IonButton fill="clear" onClick={takePhotoHandler}>
              <IonIcon slot="start" icon={camera} />
              <IonLabel>Take Photo</IonLabel>
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-margin-top">
          <IonCol className="ion-text-center">
            <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default NewMemory;
