import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';
import ProfileDescription from './ProfileDescription';
import ProfileFollowings from './ProfileFollowings';
import ProfileActivities from './ProfileActivities';
import ProfileMotofies from './ProfileMotofies';
import ProfileForumposts from './ProfileForumposts';

const panes = [
  { menuItem: 'About', render: () => <ProfileDescription /> },
  { menuItem: 'Photos', render: () => <ProfilePhotos /> },
  {
    menuItem: 'Motofies!',
    render: () => <ProfileMotofies />,
  },
  {
    menuItem: 'Motorcycle Diaries',
    render: () => <ProfileActivities />,
  },
  {
    menuItem: 'Forumposts',
    render: () => <ProfileForumposts />,
  },
  {
    menuItem: 'Motoforum',
    render: () => <ProfileActivities />,
  },
  {
    menuItem: 'Moto Mechanics',
    render: () => <ProfileActivities />,
  },
  { menuItem: 'Followers', render: () => <ProfileFollowings /> },
  { menuItem: 'Followings', render: () => <ProfileFollowings /> },
];

interface IProps {
  setActiveTab: (activeIndex: any) => void;
}
const ProfileContent: React.FC<IProps> = ({ setActiveTab }) => {
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
