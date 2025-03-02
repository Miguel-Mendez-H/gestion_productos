import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface NotificationState {
  message: string | null;
  type: "success" | "error" | "info" | null;
}

const initialState: NotificationState = {
  message: null,
  type: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{ message: string; type: "success" | "error" | "info" }>
    ) => {
      const { message, type } = action.payload;
      toast[type](message);
      state.message = message;
      state.type = type;
    },
  },
});

export const { showNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
