import { v4 as uuidv4 } from "uuid";
import db from "../../firebase";

const initialState = {
  cart: [],
};

const cartReducer = (
  state = initialState,
  { type, payload, user, cartDataFromFirebase }
) => {
  switch (type) {
    case "ADD_TO_CART":
      let newItem = {
        ...payload,
        adddedAt: new Date().getTime(),
        id: uuidv4(),
      };
      /*       let findItem = state.cart.find((p) => p.name === newItem.name);
       */ console.log(cartDataFromFirebase);
      let findItemInFirebase = cartDataFromFirebase?.find(
        (data) => data.name === newItem.name
      );
      if (findItemInFirebase) {
        let findId = null;
        db.collection(`${user.email}-Cart`).onSnapshot((snapshot) => {
          snapshot.docs.map((doc, i) => {
            if (doc.data().id === findItemInFirebase.id) findId = doc.id;

            if (i === snapshot.docs.length - 1) {
              db.collection(`${user.email}-Cart`).doc(findId).delete();
              db.collection(`${user.email}-Cart`).add({
                ...findItemInFirebase,
                quantity: findItemInFirebase.quantity + 1,
              });
            }
          });
        });
      } else {
        db.collection(`${user.email}-Cart`).add({ ...newItem, quantity: 1 });
      }
      return state;
    /*  return {
        ...state,
        cart: findItem
          ? [
              ...state.cart.filter((p) => p.name !== newItem.name),
              { ...findItem, quantity: findItem.quantity + 1 },
            ]
          : [
              ...state.cart,
              { ...newItem, quantity: 1, addedAt: new Date().getTime() },
            ],
      }; */

    case "REMOVE_FROM_CART":
      /*       let newItems = state.cart.filter((product) => product.id !== payload);
       */ let findIdForRemoveItem = null;
      db.collection(`${user.email}-Cart`).onSnapshot((snapshot) => {
        snapshot.docs.map((doc, i) => {
          if (doc.data().id === payload) findIdForRemoveItem = doc.id;

          if (i === snapshot.docs.length - 1) {
            db.collection(`${user.email}-Cart`)
              .doc(findIdForRemoveItem)
              .delete();
          }
        });
      });

      /* return {
        ...state,
        cart: newItems,
      }; */
      return state;

    case "REMOVE_ONE_ITEM_FROM_CART":
      /* let elementReduced = state.cart.filter(
        (product) => product.id !== payload.id
      );
      let findItemFormDecrease = state.cart.find(
        (product) => product.id === payload.id
      ); */

      let findItemInFirebaseForRemoveOneItem = cartDataFromFirebase?.find(
        (data) => data.name === payload.name
      );

      let findItemForRemoveOneItem = null;
      db.collection(`${user.email}-Cart`).onSnapshot((snapshot) => {
        snapshot.docs.map((doc, i) => {
          if (doc.data().id === payload.id) findItemForRemoveOneItem = doc.id;

          if (i === snapshot.docs.length - 1) {
            db.collection(`${user.email}-Cart`)
              .doc(findItemForRemoveOneItem)
              .update({
                ...findItemInFirebaseForRemoveOneItem,
                quantity: findItemInFirebaseForRemoveOneItem.quantity - 1,
              });
          }
        });
      });

      /*  return {
        ...state,
        cart:
          findItemFormDecrease.quantity > 1
            ? [
                ...elementReduced,
                {
                  ...findItemFormDecrease,
                  quantity: findItemFormDecrease.quantity - 1,
                },
              ]
            : [...elementReduced],
      }; */
      return state;

    case "EMPTY_THE_CART":
      /* return {
        ...state,
        cart: [],
      }; */
      return state;
    default:
      return state;
  }
};

export default cartReducer;
