import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileDescription from "./ProfileDescription";
import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";
import ProfileMotofies from "./ProfileMotofies";
import ProfileForumposts from "./ProfileForumposts";
import ProfileMechanics from "./ProfileMechanics";
import ProfileProducts from "./ProfileProducts";
import { useTranslation } from "react-i18next";

// const panes = [
//   { menuItem: "About", render: () => <ProfileDescription /> },
//   { menuItem: "Photos", render: () => <ProfilePhotos /> },
//   {
//     menuItem: "Motofies!",
//     render: () => <ProfileMotofies />,
//   },
//   {
//     menuItem: "Motorcycle Diaries",
//     render: () => <ProfileActivities />,
//   },
//   {
//     menuItem: "Forumposts",
//     render: () => <ProfileForumposts />,
//   },
//   {
//     menuItem: "Mechanics",
//     render: () => <ProfileMechanics />,
//   },
//   {
//     menuItem: "Products",
//     render: () => <ProfileProducts />,
//   },
//   {
//     menuItem: "Followers",
//     render: () => <ProfileFollowings />,
//   },
//   {
//     menuItem: "Followings",
//     render: () => <ProfileFollowings />,
//   },
// ];
const mobilePanes = [
  {
    menuItem: { key: "About", icon: "user" },
    render: () => <ProfileDescription />,
  },
  {
    menuItem: { key: "Photos", icon: "image" },
    render: () => <ProfilePhotos />,
  },
  {
    menuItem: { key: "Motofies!", icon: "motorcycle" },
    render: () => <ProfileMotofies />,
  },
  {
    menuItem: { key: "Motorcycle Diaries", icon: "blogger" },
    render: () => <ProfileActivities />,
  },
  {
    menuItem: { key: "Forumposts", icon: "question circle" },
    render: () => <ProfileForumposts />,
  },
  {
    menuItem: { key: "Mechanics", icon: "servicestack" },
    render: () => <ProfileMechanics />,
  },
  {
    menuItem: { key: "Products", icon: "shopping bag" },
    render: () => <ProfileProducts />,
  },
  {
    menuItem: { key: "Followers", icon: "user circle" },
    render: () => <ProfileFollowings />,
  },
  {
    menuItem: { key: "Followings", icon: "users" },
    render: () => <ProfileFollowings />,
  },
];

interface IProps {
  setActiveTab: (activeIndex: any) => void;
}
const ProfileContent: React.FC<IProps> = ({ setActiveTab }) => {

  const { t } = useTranslation(["social"]);


  const panes = [
    { menuItem: t("About"), render: () => <ProfileDescription /> },
    { menuItem: t("Photos"), render: () => <ProfilePhotos /> },
    {
      menuItem: "Motofies!",
      render: () => <ProfileMotofies />,
    },
    {
      menuItem: t("Motorcycle Diaries"),
      render: () => <ProfileActivities />,
    },
    {
      menuItem: t("Forumposts"),
      render: () => <ProfileForumposts />,
    },
    {
      menuItem: t("Mechanics"),
      render: () => <ProfileMechanics />,
    },
    {
      menuItem: t("Products"),
      render: () => <ProfileProducts />,
    },
    {
      menuItem: t("Followers"),
      render: () => <ProfileFollowings />,
    },
    {
      menuItem: t("Followings"),
      render: () => <ProfileFollowings />,
    },
  ];
  return (
    <>
      <Tab
        className='mobile hidden'
        menu={{ fluid: true, vertical: true }}
        menuPosition='right'
        panes={panes}
        onTabChange={(e, data) => setActiveTab(data.activeIndex)}
      />
      {/* , style:{width: '0.9em' */}
      <Tab
        className='mobile only'
        menu={{ fluid: true, style:{fontSize: '0.85em'} }}
        panes={mobilePanes}
        onTabChange={(e, data) => setActiveTab(data.activeIndex)}
      />
    </>
  );
};
// == so that the switching is disabled ==
// activeIndex={1}

export default ProfileContent;
