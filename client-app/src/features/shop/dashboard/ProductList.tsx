import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Item } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductListItem from "./ProductListItem";

const ProductList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { 
    productsByDate, 
    // moreProductsByDate, 
   } =
    rootStore.productStore;

  return (
    //==TODO--Revisit
    // <Fragment>
    //   {productsByDate.map(([group, products]) => (
    //     <Fragment key={group}>

    //        <Segment clearing>
    //           <Item.Group divided>
    //             {products.map((product) => (
    //               <ProductListItem product={product} key={product.id}/>
    //             ))}
    //           </Item.Group>
    //        </Segment>
    //     </Fragment>
    //   ))}
    // </Fragment>

    <Fragment>
      <Item.Group divided>
        {productsByDate.map((product) => (
          <ProductListItem product={product} key={product.id} />
        ))}
      </Item.Group>
    </Fragment>
  );
};

export default observer(ProductList);
