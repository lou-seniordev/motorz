import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Card, Grid, Input } from "semantic-ui-react"; //Button, Form, , Menu
import { RootStoreContext } from "../../../app/stores/rootStore";
import PeopleListItem from "./PeopleListItem";

// import { Form as FinalForm, Field } from "react-final-form";
// import TextInput from "../../../app/common/form/TextInput";

const PeopleList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { displayPeople, setPredicate } = rootStore.peopleStore;

  const [input, setInput] = useState(""); // '' is the initial state value

  const handleSearchResults = (e: any) => {
    if (e.key === "Enter") {
      setPredicate("search", e.target.value);
      e.target.value = "";
    }
  };
  //CHECK when redeployed
  // const handleFinalFormSubmit = (values: any) => {
  //   console.log(values);
  // };

  return (
    <Grid>
          <Grid.Column width={8}>
            <Input
              // icon='Search'
              name='search'
              // style={{ width: "80%" }}
              fluid
              placeholder='Search all...'
              value={input}
              onInput={(e: any) => setInput(e.target.value)}
              onKeyDown={(e: any) => handleSearchResults(e)}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Button
              content='See all'
              fluid
              // style={{ width: "19%" }}
              floated='right'
              // onClick={()=>setPredicate("search", e.target.value)}
              onClick={() => setPredicate("all", "true")}
            />
          </Grid.Column>
        {/* </Grid>
    <Grid> */}
      <Grid.Column width={16}>
        {/* <Menu vertical size={"large"} style={{ width: "100%" }}> */}
        {/* <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Menu.Item
                >
                   <Field
                  name='rating'
                  placeholder='Search all...'
                  component={TextInput}
                  style={{ width: "80%" }}
                  onInput={(e: any) => setInput(e.target.value)}
                  onKeyDown={(e: any) => handleSearchResults(e)}
                /> */}
        

        {/*
                </Menu.Item>
              </Form>
            )}
          />*/}
        {/* </Menu>  */}
        <Card.Group itemsPerRow={4} stackable={true} doubling={true}>
          {displayPeople.map((member) => (
            <PeopleListItem member={member} key={member.id} />
          ))}
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PeopleList);
