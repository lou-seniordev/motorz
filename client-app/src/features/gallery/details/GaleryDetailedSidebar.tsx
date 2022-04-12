import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Segment, List, Item, Label, Image, Grid } from "semantic-ui-react";
import { IEmbracer } from "../../../app/models/motofy";
import { useTranslation } from "react-i18next";


interface IProps {
  embracers: IEmbracer[];
}

const GaleryDetailedSidebar: React.FC<IProps> = ({ embracers }) => {
  const { t } = useTranslation(["gallery"]);
  
  const person = t("Person");
  const persons = t("People");
  return (
    <Fragment>
      <Segment
        textAlign='center'
        style={{ border: "none" }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {embracers.length} {embracers.length === 1 ? person : persons}{" "}
        {t("embraced")}
      </Segment>
      <>
        <List divided>
          <Item.Group divided>
            {embracers.map((embracer) => (
              <Segment key={embracer.username} style={{ position: "relative" }}>
                <Grid>
                  <Grid.Column width={4}>
                    <Image
                      size='mini'
                      circular
                      src={embracer.image || "/assets/user.png"}
                    />
                  </Grid.Column>
                  <Grid.Column width={12}>
                        <Link to={`/profile/${embracer.username}`}>
                          <Item.Extra as='h5'>
                            {embracer.displayName}
                           
                          </Item.Extra>

                          {embracer.isOwner && (
                            <Label
                              style={{ position: "top" }}
                              color='teal'
                              corner='right'
                            >
                              Pub
                            </Label>
                          )}
                        </Link>
                      </Grid.Column>
                </Grid>
              </Segment>
            ))}
          </Item.Group>
        </List>
      </>
    </Fragment>
  );
};

export default observer(GaleryDetailedSidebar);
