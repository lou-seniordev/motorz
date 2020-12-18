import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';
import ProfileDescription from './ProfileDescription';
import ProfileFollowings from './ProfileFollowings';

const panes = [
    { menuItem: 'About', render: () => <ProfileDescription /> },
    { menuItem: 'Photos', render: () => <ProfilePhotos /> },
    {
        menuItem: 'Riding Sessions',
        render: () => <Tab.Pane>Riding Sessions content</Tab.Pane>,
    },
    { menuItem: 'Followers', render: () => <ProfileFollowings /> },
    { menuItem: 'Followings', render: () => <ProfileFollowings /> },
];

interface IProps {
    setActiveTab: (activeIndex: any) => void;
}
const ProfileContent: React.FC<IProps> = ({setActiveTab}) => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
};
// == so that the switching is disabled ==
// activeIndex={1}

export default ProfileContent;
