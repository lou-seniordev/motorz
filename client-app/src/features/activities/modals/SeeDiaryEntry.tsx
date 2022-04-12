import { formatDistance } from "date-fns";
import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  GridColumn,
  Header,
  Image,
  Label,
  Segment,
} from "semantic-ui-react";
import { IActivity, IDiaryEntry } from "../../../app/models/activity";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { useTranslation } from "react-i18next";

interface IProps {
  diary: IDiaryEntry;
  activity: IActivity;
}
const SeeDiaryEntry: React.FC<IProps> = ({ diary, activity }) => {
  const rootStore = useContext(RootStoreContext);

  const { closeModal } = rootStore.modalStore;
  const { deleteDiaryEntry } = rootStore.activityStore;
  const host = activity.attendees.filter((h) => h.isHost)[0];

  const { diaryEntries } = activity;

  const { t } = useTranslation(["diaries"]);

  const [actualDiary, setActualDiary] = useState(diary);

  const counter = parseInt(actualDiary.dayNumber);
  const numberDiaries = activity.diaryEntries.length;

  const handleChange = async (diaryDay: number) => {
    var diary: IDiaryEntry = diaryEntries.find(
      (diary) => parseInt(diary.dayNumber) === diaryDay
    )!;
    setActualDiary(diary);
  };

  const handleDeleteEntry = async (id: string) => {
    deleteDiaryEntry(diary, activity);
  };

  return (
    <Fragment>
      <Container text>
        <Segment
          textAlign='center'
          style={{ border: "none" }}
          attached='top'
          secondary
          inverted
          color='teal'
        >
          <Grid>
            <Grid.Column width={3}>
              <Image src={host.image} size='tiny' circular />
              <p>{t("You are driving:")} {activity.motorcycleBrandName}</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h2' color='pink'>
                {t("Day")} {actualDiary.dayNumber} {t("of")} {activity.title}
              </Header>
              <p>
                {" "}
                {t("Published")}{" "}
                {formatDistance(new Date(actualDiary.entryDate), new Date(), {
                  addSuffix: true,
                })}
              </p>
              <Header.Subheader color='pink'>
                <Link
                  to={`/profile/${host.username}`}
                  onClick={() => closeModal()}
                >
                  {t("by")} {host.displayName}
                </Link>
                <p>
                  {" "}
                  {t("Started in")} {activity.city}, {activity.countryName}
                </p>
                <p>
                  {" "}
                  {t("At the moment in")} {actualDiary.locationCity},{" "}
                  {actualDiary.locationCountry}
                </p>
              </Header.Subheader>
            </Grid.Column>
            <Grid.Column width={3} style={{ color: "red" }}>
              <Grid.Row>
                <Image
                  src={activity.motorcycleBrandLogoUrl}
                  size='tiny'
                  circular
                />
              </Grid.Row>
              {activity.isHost && (
                <Grid.Row>
                  <GridColumn width={8}>
                    <Button
                      circular
                      icon='edit outline'
                      as={Link}
                      to={`/manageDiaryEntry/${actualDiary.id}/${activity.id}`}
                      onClick={() => closeModal()}
                    />
                  </GridColumn>
                  <GridColumn width={8}>
                    {Number(actualDiary.dayNumber) === numberDiaries && (
                      <Button
                        circular
                        icon='delete'
                        onClick={() => {
                          handleDeleteEntry(actualDiary.id);
                          closeModal();
                        }}
                      />
                    )}
                  </GridColumn>
                </Grid.Row>
              )}
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column computer={9} mobile={16}>
                <Image src={actualDiary.photoUrl} size='large' floated='left' />
              </Grid.Column>
              <Grid.Column computer={7} mobile={16}>
                <Segment attached>
                  <p>{t("At the moment in")} {actualDiary.locationCity}</p>
                </Segment>
                <Segment attached>
                  <p>{t("Feeling")} {actualDiary.mood}</p>
                </Segment>
                <Segment attached>
                  <p>{t("Road was")} {actualDiary.road}</p>
                </Segment>
                <Segment attached>
                  <p>{t("Weather was")} {actualDiary.road}</p>
                </Segment>
                <Segment attached>
                  <p>{t("Made")} {actualDiary.numberOfKilometers} {t("kilometers")} </p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Segment attached>
                <Label content={t("What happened today?")}/>
                <p style={{ whiteSpace: "pre-wrap" }}>{actualDiary.body}</p>
              </Segment>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5}>
                <Button
                  className='mobile hidden'
                  fluid
                  onClick={() =>
                    handleChange(parseInt(actualDiary.dayNumber) - 1)
                  }
                  content={t('Previous day')}
                  icon='angle left'
                  disabled={counter === 1}
                />
                <Button
                  className='mobile only'
                  circular
                  fluid
                  onClick={() =>
                    handleChange(parseInt(actualDiary.dayNumber) - 1)
                  }
                  icon='angle left'
                  disabled={counter === 1}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <Button fluid onClick={() => closeModal()} content={t('Quit')} />
              </Grid.Column>
              <Grid.Column width={5}>
                <Button
                  className='mobile hidden'
                  fluid
                  onClick={() =>
                    handleChange(parseInt(actualDiary.dayNumber) + 1)
                  }
                  content={t("Next day")}
                  icon='angle right'
                  disabled={counter === numberDiaries}
                />
                <Button
                  className='mobile only'
                  fluid
                  circular
                  onClick={() =>
                    handleChange(parseInt(actualDiary.dayNumber) + 1)
                  }
                  icon='angle right'
                  disabled={counter === numberDiaries}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </Fragment>
  );
};

export default SeeDiaryEntry;
