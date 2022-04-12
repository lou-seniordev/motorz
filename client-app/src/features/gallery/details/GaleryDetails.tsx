import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import GaleryDetailedChat from "./GaleryDetailedChat";
import GaleryDetailedHeader from "./GaleryDetailedHeader";
import GaleryDetailedRating from "./GaleryDetailedRating";
import GaleryDetailedSidebar from "./GaleryDetailedSidebar";
import GalleryDetailedInfo from "./GalleryDetailedInfo";
import { useTranslation } from "react-i18next";

interface DetailParams {
  id: string;
}
const GaleryDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { motofy, loadMotofy, loadingInitial } = rootStore.motofyStore;

  const { t } = useTranslation(["gallery"]);

  useEffect(() => {
    loadMotofy(match.params.id);
  }, [loadMotofy, match.params.id]);

  if (loadingInitial || !motofy)
    return <LoadingComponent content={t('Loading motofies...')} />;

  return (
    <Grid>     
      <Grid.Column computer={12} mobile={16} >
        <GaleryDetailedHeader motofy={motofy} />
        <GaleryDetailedRating motofy={motofy}/>
        <GalleryDetailedInfo motofy={motofy} />

        <GaleryDetailedChat />
      </Grid.Column>
     
      <Grid.Column computer={4} mobile={16} >
        <GaleryDetailedSidebar embracers={motofy.embracers} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(GaleryDetails);
