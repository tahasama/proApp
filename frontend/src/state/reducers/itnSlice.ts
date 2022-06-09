import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const POJECT_URL: any = process.env.REACT_APP_PROJECT_URL;
console.log("fffffffffffffffffffff", POJECT_URL);

export const getAllItns: any = createAsyncThunk("getAllItns", async () => {
  try {
    // console.log("All itn");

    const res = await axios.get(POJECT_URL + "all/");
    // console.log("All itn", res.data);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const getItnsByItp: any = createAsyncThunk(
  "getItnsByItp",
  async (value: any) => {
    try {
      console.log("All itn by itp..........", POJECT_URL + "all/" + value.itp);

      const res = await axios.get(POJECT_URL + "all/" + value.itp);
      console.log("All itn by itp", res.data);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

interface itnsProps {
  itnz: {
    all: {}[];
    allitp: {}[];
    loading: boolean;
  };
}

const initialState = {
  all: [{}],
  allitp: [{}],
  loading: true,
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
    builder.addCase(getAllItns.fulfilled, (state, action) => {
      console.log("getAllItns");
      state.all.push(action.payload);
      state.all.splice(0, 1);
    });

    builder.addCase(getItnsByItp.fulfilled, (state, action) => {
      console.log("getItnsByItp");
      state.allitp.push(action.payload);
      state.allitp.splice(0, 1);
    });
  },
});

// Action creators are generated for each case reducer function
export const itnData = (state: itnsProps) => state.itnz;

export const { updateLoading } = projectsSlice.actions;

export default projectsSlice.reducer;
