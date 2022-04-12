import { observer } from "mobx-react-lite";
import React
// , { 
//   Fragment, 
//   useCallback, 
//   useContext, 
//   useEffect 
// } 
from "react"; //useCallback,
import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
import { Segment, Item, Header, 
  // Button, 
  Image } from "semantic-ui-react";
import { IMechanic
  // , IMechanicCustomer 
} from "../../../app/models/mechanic";
// import { RootStoreContext } from "../../../app/stores/rootStore";
// import ConfirmDelete from "../modals/ConfirmDelete";

// import LoadingComponent from '../../../app/layout/LoadingComponent';

const mechanicImageStyle = {
  filter: "brightness(90%) contrast(50%) drop-shadow(4px 4px 8px teal)",
};

const mechanicImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const MechanicDetailedHeader: React.FC<{ mechanic: IMechanic }> = ({mechanic}) => {
  const { t } = useTranslation(["mechanics"]);

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: "0" }}>
        <Image
          src={mechanic.photoUrl || `/assets/placeholder.png`}
          fluid
          style={mechanicImageStyle}
          rounded
        />
        <Segment basic style={mechanicImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={mechanic.name}
                  style={{ color: "white" }}
                />
                <p>{t("In business since")} {mechanic.yearOfStart}</p>
                <p>
                  {t("Posted by")} <strong>{mechanic.publisher}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
    </Segment.Group>
  );
};

export default observer(MechanicDetailedHeader);
