// import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext} from "react"; //, useState 
// Input,
import { Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

const GalleryMobileFilters = () => {
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

  return (
    <Menu>
      <Menu.Item
        active={predicate.size === 0}
        onClick={() => setPredicate("all", "true")}
        color={"blue"}
        icon={'globe'}
      />
      <Menu.Item
        active={predicate.has("bestRated")}
        onClick={() => setPredicate("bestRated", "true")}
        color={"blue"}
        icon={'hand spock'}
      />
      <Menu.Item
        active={predicate.has("mostEmbraced")}
        onClick={() => setPredicate("mostEmbraced", "true")}
        color={"blue"}
        icon={'winner'}
      />
      <Menu.Item
        active={predicate.has("iEmbraced")}
        onClick={() => setPredicate("iEmbraced", "true")}
        color={"blue"}
        icon={'heart'}
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

export default observer(GalleryMobileFilters);
