import React from 'react';
import { Image, List, Popup } from 'semantic-ui-react';
import { IEmbracer } from '../../../app/models/motofy';

interface IProps {
  embracers: IEmbracer[];
}
const GalleryListItemEmbracers: React.FC<IProps> = ({ embracers }) => {
  return (
    <List horizontal>
      {embracers.map(embracer => (
        <List.Item key={embracer.username}>
            <Popup
                header={embracer.displayName}
                trigger={<Image size='mini' circular src={embracer.image || '/assets/user.png'} />}
            />
        </List.Item>
      ))}
    </List>
  );
};

export default GalleryListItemEmbracers;
