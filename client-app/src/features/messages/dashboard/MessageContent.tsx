import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from '../../profiles/ProfilePhotos';
import ProfileDescription from '../../profiles/ProfileDescription';
import ProfileFollowings from '../../profiles/ProfileFollowings';
import ProfileActivities from '../../profiles/ProfileActivities';
import ProfileMotofies from '../../profiles/ProfileMotofies';

const panes = [
//   { menuItem: 'About', render: () => <ProfileDescription /> },
//   { menuItem: 'Photos', render: () => <ProfilePhotos /> },
//   {
//     menuItem: 'Motofies!',
//     render: () => <ProfileMotofies />,
//   },
//   {
//     menuItem: 'Moto Sessions',
//     render: () => <ProfileActivities />,
//   },
  // {
  //   menuItem: 'Motospots',
  //   render: () => <ProfileActivities />,
  // },
  {
    menuItem: 'Motoforum',
    // render: () => <ProfileActivities />,
  },
//   {
//     menuItem: 'Moto Mechanics',
//     render: () => <ProfileActivities />,
//   },
//   { menuItem: 'Followers', render: () => <ProfileFollowings /> },
//   { menuItem: 'Followings', render: () => <ProfileFollowings /> },
];

interface IProps {
  setActiveTab: (activeIndex: any) => void;
}
const MessageContent: React.FC<IProps> = ({ setActiveTab }) => {
    
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

export default MessageContent;
