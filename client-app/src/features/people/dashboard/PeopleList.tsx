import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Grid, Input } from "semantic-ui-react"; //Button, Form, , Menu
import { RootStoreContext } from "../../../app/stores/rootStore";
import PeopleListItem from "./PeopleListItem";


const PeopleList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { displayPeople, setPredicate } = rootStore.peopleStore;

  const { t } = useTranslation(["social"]);

  const [input, setInput] = useState(""); 

  const handleSearchResults = (e: any) => {
    if (e.key === "Enter") {
      setPredicate("search", e.target.value);
      e.target.value = "";
    }
  };
 

  return (
    <Grid>
          <Grid.Column width={8}>
            <Input
              name='search'
              fluid
              placeholder={t('Search all')}
              value={input}
              onInput={(e: any) => setInput(e.target.value)}
              onKeyDown={(e: any) => handleSearchResults(e)}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Button
              content={t('See all')}
              fluid
              floated='right'
              onClick={() => setPredicate("all", "true")}
            />
          </Grid.Column>
         
      <Grid.Column width={16}>
       
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
