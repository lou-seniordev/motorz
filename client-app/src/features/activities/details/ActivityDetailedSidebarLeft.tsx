import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import {
  Segment,
  List,
  Item,
  Image,
  Divider,
  // , Sidebar, Menu, Header
} from "semantic-ui-react";
import { IActivity, IDiaryEntry } from "../../../app/models/activity";
import { RootStoreContext } from "../../../app/stores/rootStore";
import SeeDiaryEntry from "../modals/SeeDiaryEntry";

interface IProps {
  diaryEntries: IDiaryEntry[];
  activity: IActivity
}
const ActivityDetailedSidebarLeft: React.FC<IProps> = ({ diaryEntries, activity }) => {
  const rootStore = useContext(RootStoreContext);

  const { openModal } = rootStore.modalStore;

  const handleOpenDiaryModal = (diary: IDiaryEntry) => {
    openModal(<SeeDiaryEntry diary={diary} activity={activity}/>);
  };
//mobx] `observableArray.sort()` will not update the array in place. Use `observableArray.slice().sort()`
// to suppress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().sort())` 
//to sort & update in place 
  const diariesByDate = diaryEntries.slice().sort(
    (a, b) => parseInt(b.dayNumber) - parseInt(a.dayNumber)
  );
  // console.table(toJS(diariesByDate));

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
        {diaryEntries.length} {diaryEntries.length === 1 ? "Day" : "Days "}{" "}
        passed
      </Segment>
      <Segment attached textAlign='center'>
        <List relaxed divided>
          {diariesByDate.map((entry) => (
            <div key={entry.id} >
              <Item as='h4' onClick={() => handleOpenDiaryModal(entry)} style={{cursor: 'pointer'}}>
                {"Day number "}
                {entry.dayNumber}
                <Image
                  size='small'
                  src={entry.photoUrl || "/assets/user.png"}
                />
              </Item>
              <Divider horizontal />
            </div>
          ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailedSidebarLeft);
