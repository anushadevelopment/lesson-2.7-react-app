import { useState, useContext } from "react";

import styles from "./Product.module.css";
import Card from "./Card";
import ViewList from "./ViewList";
import Button from "./Button";

import ProductContext from "../context/ProductContext";
import ModeContext from "../context/ModeContext";
import Toggle from "./Toggle";
import { v4 as uuid } from "uuid";

function Product() {
  const ctx = useContext(ProductContext);
  const modeCtx = useContext(ModeContext);
  const [list, setList] = useState([]);
  const [sumTotal, setSumTotal] = useState(0);

  const [isCartVisible, setIsCartVisible] = useState(false);
  const handleShowCart = () => setIsCartVisible((prevState) => !prevState);

  const [isEditing, setIsEditing] = useState(false);
  
  const blankForm = {
    id: 0,
    name: '',
    quantity: 0,
    price: 0,
    discount: 0,
  }
  const [form, setForm] = useState(blankForm);


  const handlerSubmitForm = (event) => {
    event.preventDefault();

    // Create new item and copy values from form
    const newItem = {...list[form.id]};
    console.log(newItem);
    newItem.name = form.name;
    newItem.quantity = form.quantity;
    newItem.price = form.price;
    newItem.discount = form.discount;
    newItem.total = form.count * form.price * (100-form.discount)/100

    // Copy current list and replace edited item
    const newList = [...list];
    newList[form.id] = newItem;
    setList(newList);
    
    // Remove the total sum and replace with the new total
    const newSum = sumTotal - list[form.id].total + newItem.total;
    setSumTotal(newSum);

    setIsEditing(false);
  }

  const handlerUpdateForm = (event, key) => {
    const value = event.target.value;
    const updatedForm = {...form, [key]: value};
    setForm(updatedForm);
  }

  const handlerAddProduct = () => {
    // Create new list item
    const newItem = {
      id: uuid(),
      name: ctx.name,
      quantity: ctx.count,
      price: ctx.price,
      discount: ctx.discount,
      total: (ctx.count * ctx.price * (100 - ctx.discount)) / 100,
    };

    // Copy previous list and append new item to its end
    const newList = [...list, newItem];
    //  console.log('  newList:', newList);
    setList(newList);

    // Add the item total to the running listTotal
    const sum = sumTotal + newItem.total;
    //  console.log('  sumTotal:', sumTotal);
    setSumTotal(sum);
  };

  const handleEditProduct = (id) => {
    const itemId = list.findIndex((item) => item.id === id);

    const editItem = {
      id: itemId,
      name: list[itemId].name,
      quantity: list[itemId].count,
      price: list[itemId].price,
      discount: list[itemId].discount,
      total:
        (list[itemId].count *
          list[itemId].price *
          (100 - list[itemId].discount)) /
        100,
    };
    setForm(editItem);
    setIsEditing(true);
  };

  // let listComponent;
  // if (isCartVisible) listComponent = <ViewList list={list} sum={sumTotal} />;
  // else listComponent = <p>Click 🛒'Show Cart' to display the shopping cart.</p>;

  return (
    <div className={`${styles.container} ${!modeCtx.isLight && styles.dark}`}>
      <Toggle />
      <Card handlerAddProduct={handlerAddProduct} />
      {/* Add if statement here */}
      <Button
        label={isCartVisible ? "Hide Cart" : "Show Cart"}
        onClick={handleShowCart}
      />
      {/* <ViewList list={list} sum={sumTotal} /> */}
      {/* {listComponent} */}

      {/* conditional Rendering */}
      {isCartVisible ? (
        <ViewList
          list={list}
          sum={sumTotal}
          handleEditProduct={handleEditProduct}
        />
      ) : (
        <p>Click 🛒'Show Cart' to display the shopping cart.</p>
      )}

      {isEditing && (
        <form className={styles.form} onSubmit={handlerSubmitForm}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Disc %</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    value={form.name}
                    type="text"
                    onChange={(e) => handlerUpdateForm(e, "name")}
                  />
                </td>
                <td>
                  <input
                    value={form.count}
                    type="number"
                    min={1}
                    onChange={(e) => handlerUpdateForm(e, "quantity")}
                  />
                </td>
                <td>
                  <input
                    value={form.price}
                    type="number"
                    min={0}
                    step={0.01}
                    onChange={(e) => handlerUpdateForm(e, "price")}
                  />
                </td>
                <td>
                  <input
                    value={form.discount}
                    type="number"
                    min={0}
                    onChange={(e) => handlerUpdateForm(e, "discount")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" />
          <Button label="Cancel" onClick={() => setIsEditing(false)} />
        </form>
      )}
    </div>
  );
}
export default Product;
