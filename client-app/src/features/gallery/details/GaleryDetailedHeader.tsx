import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image, Icon } from "semantic-ui-react";
import { IMotofy } from "../../../app/models/motofy";
import { RootStoreContext } from "../../../app/stores/rootStore";

import ConfirmDelete from "../modals/ConfirmDelete";

import { useTranslation } from "react-i18next";


const motofyImageStyle = {
  filter: "brightness(90%)",
  border: "white solid 1px",
  borderRadius: "5px",
};
const buttonOwnerStyle = {
  borderRadius: "7px",
  width: "40%",
};
const buttonVisitorStyle = {
  borderRadius: "7px",
  backgroundColor: "rgb(29, 115, 152)",
};

const motofyImageTextStyle = {
  position: "absolute",
  top: "10%",
  left: "10%",
  fontSize: "1rem",
  color: "#FFD700",
};

interface IProps {
  motofy: IMotofy;
}
const GaleryDetailedHeader: React.FC<IProps> = ({ motofy }) => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const { embraceMotofy, unembraceMotofy, loading } = rootStore.motofyStore;

  const { addFeedItem } = rootStore.feedStore;

  const { openModal } = rootStore.modalStore;

  const { t } = useTranslation(["gallery"]);


  const handleDeleteMotofy = (id: string) => {
    openModal(<ConfirmDelete motofyId={id} />);
  };
  const handleEmbraceMotofy = (id: string) => {
    embraceMotofy(id);
    addFeedItem(id, "Embraced Motofy");
  };
  const handleUnembraceMotofy = (id: string) => {
    unembraceMotofy(id);
    addFeedItem(id, "Unembraced Motofy");
  };

  //
  // const publisher = motofy.embracers.filter((x) => x)[0];

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: "0" }}>
        <Image
          src={motofy!.photoUrl || `/assets/placeholder.png`}
          fluid
          style={motofyImageStyle}
        />
        <Segment basic style={motofyImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='large'
                  content={motofy.name}
                  style={{ color: "white" }}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {motofy.publisherUsername === user!.userName ? (
          <Segment clearing>
            <Button
              as={Link}
              to={`/manageGallery/${motofy.id}`}
              color='teal'
              floated='left'
              style={buttonOwnerStyle}
            >
              <Icon name='edit' />
              {t("Manage")}
            </Button>
            <Button
              onClick={() => {
                handleDeleteMotofy(motofy.id!);
              }}
              color='red'
              floated='right'
              style={buttonOwnerStyle}
            >
              <Icon name='stop circle' />
              {t("Delete")}
            </Button>
          </Segment>
        ) : motofy.embraced ? (
          <Button
            style={buttonVisitorStyle}
            negative
            loading={loading}
            fluid
            onClick={() => handleUnembraceMotofy(motofy.id!)}
          >
            {t("Embraced")}
          </Button>
        ) : (
          <Button
            style={buttonVisitorStyle}
            loading={loading}
            fluid
            onClick={() => handleEmbraceMotofy(motofy.id)}
            color='teal'
          >
            <Icon name='heart' />
            {t("Embrace")}
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(GaleryDetailedHeader);
