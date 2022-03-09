import { formatDistance } from "date-fns";
import { toJS } from "mobx";
import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  GridColumn,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";
import { IMechanic, IMechanicCustomer } from "../../../app/models/mechanic";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
 
    customer: IMechanicCustomer
    mechanic:IMechanic
}
const ShowTestimonial: React.FC<IProps> = ({  customer, mechanic }) => {
  const rootStore = useContext(RootStoreContext);

  console.log('customer', customer)
  console.log('mechanic', toJS(mechanic))

  const { closeModal } = rootStore.modalStore;
//   const { deleteDiaryEntry } = rootStore.activityStore;
//   const host = activity.attendees.filter((h) => h.isHost)[0];

//   const { diaryEntries } = activity;

//   // const [actualDiary, setActualDiary] = useState(diaryEntries[0]);
//   const [actualDiary, setActualDiary] = useState(diary);

//   const counter = parseInt(actualDiary.dayNumber);
//   const numberDiaries = activity.diaryEntries.length;

//   const handleChange = async (diaryDay: number) => {
//     var diary: IDiaryEntry = diaryEntries.find(
//       (diary) => parseInt(diary.dayNumber) === diaryDay
//     )!;
//     setActualDiary(diary);
//   };

//   const handleDeleteEntry = async (id: string) => {
//     // console.log(id)
//     deleteDiaryEntry(diary, activity);
//   };

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
           
            <Grid.Column width={10}>
           
              <p>
               
                Published {" "}
                {formatDistance(
                  new Date(customer.testimonial?.dateAdded!),
                  new Date()
                )}{" "}
                ago{" "}
              </p>
              <Header.Subheader as='h2' color='pink'>
                <Link
                  to={`/profile/${customer.username}`}
                  onClick={() => closeModal()}
                >
                  by {customer.displayName}
                </Link>
              
              </Header.Subheader>
            </Grid.Column>
            <Grid.Column width={3}>
              <Image src={customer.image} size='tiny' circular />
             
            </Grid.Column>
           
          </Grid>
        </Segment>
        <Segment>
          {/* <Grid> */}
            {/* <Grid.Column width={7}> */}
              <Image src={mechanic.photoUrl} size='small' circular floated="left"/>
            {/* </Grid.Column> */}
            {/* <Grid.Column width={6}> */}
              <p style={{ whiteSpace: 'pre-wrap' }}>{customer.testimonial?.text}</p>
             
            {/* </Grid.Column> */}

           
            {/* <Grid.Column width={5}> */}
              <Button fluid onClick={() => closeModal()} content='Quit' />
            {/* </Grid.Column> */}
           
          {/* </Grid> */}
        </Segment>
      </Container>
    </Fragment>
  );
};

export default ShowTestimonial;
