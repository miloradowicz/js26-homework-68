import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  show: boolean;
  title: string;
  body: string;
  onConfirm?: () => void;
}

const initialState: ModalState = {
  show: false,
  title: '',
  body: '',
  onConfirm: undefined,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,

  reducers: {
    showModal: (
      state,
      action: PayloadAction<{
        title: string;
        body: string;
        onConfirm?: () => Promise<void>;
      }>
    ) => {
      state.show = true;
      state.title = action.payload.title;
      state.body = action.payload.body;
      state.onConfirm = action.payload.onConfirm;
    },
    closeModal: (state) => {
      state.show = false;
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const { showModal, closeModal } = modalSlice.actions;
