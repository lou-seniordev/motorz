import React from "react";
import { Segment, Grid, Icon, Image, GridRow } from "semantic-ui-react";
import { IMotofy } from "../../../app/models/motofy";
import { useTranslation } from "react-i18next";

const GalleryDetailedInfo: React.FC<{ motofy: IMotofy }> = ({ motofy }) => {
  const iconStyle = {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    justifyContent: "center",
  };

  const { t } = useTranslation(["gallery"]);


  return (
    <Segment.Group>
      <Segment
        attached='top'
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          justifyContent: "center",
          // color: 'red'
        }}
      >
        <Grid verticalAlign='middle'>
          <GridRow>
            <Grid.Column width={2}>
              <Image size='mini' src={motofy.brandLogoUrl} />
            </Grid.Column>
            <Grid.Column width={14}>
              <p>
                <strong>{motofy.brandName} - </strong> {motofy.model}
              </p>
            </Grid.Column>
          </GridRow>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid>
          <GridRow>
            <Grid.Column width={2}>
              <Icon
                size='large'
                color='teal'
                name='info'
                style={{ iconStyle }}
              />
            </Grid.Column>
            <Grid.Column width={14}>
              <p style={{ whiteSpace: "pre-wrap" }}>{motofy.description}</p>
            </Grid.Column>
          </GridRow>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign='middle'>
          <GridRow>
            <Grid.Column width={2}>
              <Icon name='calendar' size='large' color='teal' />
            </Grid.Column>
            <Grid.Column width={14}>
              <span>{t("Made")} {motofy.yearOfProduction}</span>
            </Grid.Column>
          </GridRow>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={2}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={14}>
            <span>
              {t("In")} {motofy.city}, {motofy.countryName}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={2}>
            <Icon name='motorcycle' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={14}>
            <span>
              {" "}
              {t("Engine")} {motofy.cubicCentimeters}{t("cc")}, {t("done")}{" "}
              {motofy.numberOfKilometers} {t("kilometers")}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={2}>
            <Icon name='euro sign' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={14}>
            <span>
              {" "}
              {t("Price paid")} {motofy.pricePaid} {t("Euro")}, {t(" present value")}{" "}
              {motofy.estimatedValue} Euro
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default GalleryDetailedInfo;
