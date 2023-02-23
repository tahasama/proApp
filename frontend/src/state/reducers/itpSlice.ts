import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../firebase";

const PROJECT_URL: any = process.env.REACT_APP_HEROKU_URL + "itp/";

export const uploadItp = createAsyncThunk("uploadItp", async (value: any) => {
  const storageRef = ref(storage, `itp/${value.itp}.pdf`);
  try {
    await uploadBytesResumable(storageRef, value.pdf);
    try {
      const res = await getDownloadURL(storageRef);
      await axios.post(PROJECT_URL + "create/", {
        ItpUrl: res,
        ItpName: value.itp,
      });
    } catch (error) {
      return error;
    }
  } catch (error: any) {
    return error;
  }
});

export const getItp: any = createAsyncThunk("getItp", async (value: any) => {
  try {
    const res = await axios.get(PROJECT_URL + value);

    return res.data;
  } catch (error) {
    return error;
  }
});

interface itpsProps {
  itpz: {
    all: {}[];
    allitp: {}[];
    loading: boolean;
    individualitp: any;
    newLocation: string;
    newRoutine: string;
    newReview: string;
    pdf: string;
    itpId: string;
    _id: string;
    filter: any;
    ww: any[];
    itp: string;
  };
}

const initialState = {
  all: [{}],
  allitp: [{}],
  loading: true,
  individualitp: {},
  newLocation: "",
  newRoutine: "",
  newReview: "",
  _id: "",
  pdf: "",
  itpId: "",
  filter: "",
  ww: [],
  itp: "",
};

export const projectsSlice = createSlice({
  name: "projects-redux",
  initialState: initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(uploadItp.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(getItp.fulfilled, (state, action) => {
      state.individualitp = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const itpData = (state: itpsProps) => state.itpz;

export const {
  updateLoading,
  // removeitps,
} = projectsSlice.actions;

export default projectsSlice.reducer;
