import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { Redirect, Route } from "react-router";

import { happy, sad } from "ionicons/icons";
import BadMemories from "./BadMemories";
import GoodMemories from "./GoodMemories";
import NewMemory from "./NewMemory";


const MemoriesTabs: React.FC = () => {
    return (
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/tabs" to="/tabs/good-memories" />
          <Route exact path="/tabs/good-memories" component={GoodMemories} />
          <Route exact path="/tabs/bad-memories" component={BadMemories} />
          <Route exact path="/tabs/new-memory" component={NewMemory} />
        </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="mail" href="/tabs/good-memories">
              <IonIcon icon={happy} />
              <IonLabel>Good Memories</IonLabel>
            </IonTabButton>
            <IonTabButton tab="bad-memories" href="/tabs/bad-memories">
              <IonIcon icon={sad} />
              <IonLabel>Bad Memories</IonLabel>
            </IonTabButton>
          </IonTabBar>
      </IonTabs>
    );
  };
  
  export default MemoriesTabs;