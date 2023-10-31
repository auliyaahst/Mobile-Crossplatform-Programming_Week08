import React from 'react';
import { Memory } from '../data/memories-context';
import { IonCard, IonCardHeader, IonText } from '@ionic/react';

interface MemoryItemProps {
  memory: Memory;
}

const MemoryItem: React.FC<MemoryItemProps> = ({ memory }) => {
  return (
    <IonCard>
      <img src={memory.base64Url} alt={memory.title} />
      <IonCardHeader>
        <IonText>{memory.title}</IonText>
      </IonCardHeader>
    </IonCard>
  );
};

export default MemoryItem;
