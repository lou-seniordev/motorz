import React, { useContext, useState } from "react";
import { Header, Button, Grid, Input, GridRow } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  username: string;
}
const ConfirmLockout: React.FC<IProps> = ({ username }) => {
  const rootStore = useContext(RootStoreContext);
  const { lockoutMember } = rootStore.adminStore;

  const { closeModal } = rootStore.modalStore;

  const [time, setTime] = useState<number>(0);

  const handleLockoutMember = () => {
    lockoutMember(username, time)
      .then(() => closeModal());
  };

  const handleChange = (event: any) => {
    setTime(event.target.value);
  };

  const cancelDeleteMember = () => {
    closeModal();
  };

  return (
    <Grid>
      <Grid.Column width={16}>
        <GridRow>
          <Header
            as='h2'
            content={
              "If you are sure you want to do this pick the number of days."
            }
            color='teal'
            textAlign='center'
          />
        </GridRow>
        <GridRow>
          <Input
            placeholder="Time (in days)?"
            focus
            fluid
            type='number'
            min="0"
            name='timevalue'
            onChange={handleChange}
          />
        </GridRow>
        <GridRow style={{marginTop: "10px"}}>
            <Button
              onClick={handleLockoutMember}
              color='teal'
              content={"Yes, lockout this member"}
              floated='left'
              disabled={time < 1}
            />
            <Button
              onClick={() => cancelDeleteMember()}
              content={"No, don't lockout"}
              floated='right'
            />
        </GridRow>
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmLockout;
