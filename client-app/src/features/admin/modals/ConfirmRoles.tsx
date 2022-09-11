import React, { SyntheticEvent, useContext, useState } from "react";
import { Header, Button, Grid, Input, GridRow, Dropdown } from "semantic-ui-react";
import { roles } from "../../../app/common/options/rolesOptions";
import { IMember } from "../../../app/models/member";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  member: IMember;
}
const ConfirmRoles: React.FC<IProps> = ({ member }) => {
  const rootStore = useContext(RootStoreContext);
  const { editRoles } = rootStore.adminStore;

  const { closeModal } = rootStore.modalStore;

  const [newRoles, setNewRoles] = useState<string[]>([]);

  const handleEditRoles = () => {
    // console.log(newRoles)
    editRoles(member, newRoles)
      .then(() => closeModal());
    // setNewRoles(data.value[])
    
  };

  const handleChange = (event: SyntheticEvent, data: any) => {
    // console.log(event);
    // console.log(data);
    setNewRoles(data.value);


  };
  const HandleLabelClick = (event: SyntheticEvent, data: any) => {
    console.log(event);
    console.log(data);

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
              "Pick roles to assign."
            }
            color='teal'
            textAlign='center'
          />
        </GridRow>
        <GridRow>
        <Dropdown
            placeholder={"filter by roles"}
            selection
            multiple 
            fluid
            options={roles}
            clearable
            onChange={handleChange}
            // onAddItem={HandleLabelClick}
          />
        </GridRow>
        <GridRow style={{marginTop: "10px"}}>
            <Button
              onClick={handleEditRoles}
              color='teal'
              content={"Yes, update roles"}
              floated='left'
              disabled={newRoles.length === 0}
            />
            <Button
              onClick={() => cancelDeleteMember()}
              content={"No, don't update"}
              floated='right'
            />
        </GridRow>
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmRoles;
