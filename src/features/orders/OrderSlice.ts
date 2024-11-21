import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of an individual order
interface Order {
  id: string;
  amount: number;
  barcode: string;
  date: string;
  donor_name: string;
  observer_name: string;
  panels_name: string;
  source_name: string;
  status_name: string;
}

// Define the initial state shape
interface OrderState {
  ordersData: Order[];
  selectedOrder: Order | null;
}

// Define the initial state
const initialState: OrderState = {
  ordersData: [],
  selectedOrder: null

};

// Create the slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: {
      reducer: (state, action: PayloadAction<Order>) => {
        state.ordersData.push(action.payload);
      },
      prepare: (
        amount: number,
        barcode: string,
        date: Date,
        donor_name: string,
        observer_name: string,
        panels_name: string,
        source_name: string,
        status_name: string
      ) => {
        return {
          payload: {
            id: nanoid(),
            amount,
            barcode,
            date: date.toISOString(),
            donor_name,
            observer_name,
            panels_name,
            source_name,
            status_name,
          },
        };
      },
    },
    fillEditOrderData: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingOrder = state.ordersData.find((item) => item.id === id);
      if (existingOrder) {
        state.selectedOrder = { ...existingOrder };
      }
    },

    updateOrder: (state, action: PayloadAction<Order>) => {
      const { id, amount, barcode, date, donor_name, observer_name, panels_name, source_name, status_name } = action.payload;
      state.ordersData.forEach((item) => {
        if (item.id === id) {
          item.amount = amount;
          item.barcode = barcode;
          item.date = date || new Date().toISOString();
          item.donor_name = donor_name;
          item.observer_name = observer_name;
          item.panels_name = panels_name;
          item.source_name = source_name;
        }
      })
    },

    deleteOrder: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const filteredOrdersData = state.ordersData.filter((item) => item.id !== id);
      state.ordersData = [...filteredOrdersData];
    }

  },
});

// Export actions and reducer
// export const selectAllOrders = (state: OrderState) => state.ordersData;

export const { addOrder, fillEditOrderData, updateOrder, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
