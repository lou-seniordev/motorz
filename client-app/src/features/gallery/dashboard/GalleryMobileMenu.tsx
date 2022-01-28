// import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext} from "react"; //, useState 
// Input,
import { Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

const GalleryMobileMenu = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate, 
    // mostEmbraced, highestRatedMotofy 
  } =
    rootStore.motofyStore;
  // const motofy = toJS(mostEmbraced);
  // const highestMotofy = toJS(highestRatedMotofy);

  // const [state, setState] = useState();


  const handleItemClick = (e: any) => {
    console.log(e);
    //  setState( name )
  };

  //  const { activeItem } = state
  return (
    <Menu>
      <Menu.Item
        active={predicate.size === 0}
        onClick={() => setPredicate("all", "true")}
        color={"blue"}
        name={"all"}
        content={"All "}
      />

      <Menu.Item
        active={predicate.has("all")}
        onClick={() => setPredicate("iOwn", "true")}
        color={"blue"}
        name={"owner"}
        content={"My"}
      />

      <Menu.Item
        active={predicate.has("winningFive")}
        onClick={() => setPredicate("winningFive", "true")}
        color={"blue"}
        name={"winningFive"}
        content={"Most"}
      />

      <Menu.Item
        active={predicate.has("iEmbraced")}
        onClick={() => setPredicate("iEmbraced", "true")}
        color={"blue"}
        name={"username"}
        content={"I "}
      />
      <Menu.Item
        name='champions'
        //   active={activeItem === 'upcomingEvents'}
        onClick={handleItemClick}
      >
        Champs
      </Menu.Item>
      {/* <Menu.Item>
        <Input icon='search' placeholder='Search...' />
      </Menu.Item> */}
    </Menu>
  );
};

export default observer(GalleryMobileMenu);
