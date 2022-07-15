import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const PROJECT_URL: any = process.env.REACT_APP_HEROKU_URL + "concrete/";

export const getAllConcretes: any = createAsyncThunk(
  "getAllConcretes",
  async () => {
    try {
      const res = await axios.get(PROJECT_URL + "all/");
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const getConcretesByItp: any = createAsyncThunk(
  "getItnsByItp",
  async (value: any) => {
    try {
      const res = await axios.get(PROJECT_URL + "all/" + value.itp);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getConcrete = createAsyncThunk(
  "getConcrete",
  async (value: any) => {
    try {
      const res = await axios.get(
        PROJECT_URL + value.itp + "/" + value.concreteId
      );

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const createConcrete = createAsyncThunk(
  "createConcrete",
  async (value: any) => {
    try {
      const res = await axios.post(PROJECT_URL + "create/", value);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteConcrete = createAsyncThunk(
  "deleteConcrete",

  async (value: any) => {
    try {
      const res = await axios.delete(PROJECT_URL + value);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

interface concretesProps {
  concretez: {
    all: {}[];
    allitp: {}[];
    loading: boolean;
    individualConcrete: any;
    ww: any[];
    newLocation: string;
    newType: string;
    // newRelated: string;
  };
}

const initialState = {
  all: [{}],
  allitp: [{}],
  loading: true,
  individualConcrete: {},
  newLocation: "",
  newType: "",
  // newRelated: "",
  ww: [],
};

export const projectsSlice = createSlice({
  name: "projects-redux",
  initialState: initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateWw: (state, action) => {
      state.ww = action.payload;
    },
    UpdateValuesOfSelect: (state, action) => {
      state.newLocation = action.payload.newLocation;
      state.newType = action.payload.newType;
      // state.newRelated = action.payload.newRelated;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllConcretes.fulfilled, (state, action) => {
      state.all.push(action.payload);
      state.all.splice(0, 1);
    });

    builder.addCase(getConcretesByItp.fulfilled, (state, action) => {
      state.allitp.push(action.payload);
      state.allitp.splice(0, 1);
    });
    builder.addCase(createConcrete.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(getConcrete.fulfilled, (state, action) => {
      state.individualConcrete = action.payload;
    });
    builder.addCase(deleteConcrete.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const concreteData = (state: concretesProps) => state.concretez;

export const { updateWw, UpdateValuesOfSelect } = projectsSlice.actions;

export default projectsSlice.reducer;
