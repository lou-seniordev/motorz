import { group } from "console";
import React, { Fragment, useContext } from "react";
import { Item, Label, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductListItem from "./ProductListItem";

const ProductList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { productsByDate } = rootStore.productStore;

  return (
    <Fragment>
      {productsByDate.map(([group, products]) => (
        <Fragment key={group}>
          {/* <Label size='large' color='blue'>
            Posted on {group}
          </Label> */}
           <Segment clearing>
              <Item.Group divided>
                {products.map((product) => (
                  <ProductListItem product={product} key={product.id}/>
                ))}
              </Item.Group>
           </Segment>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default ProductList;
